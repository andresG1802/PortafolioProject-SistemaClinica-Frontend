import { useDispatch, useSelector } from 'react-redux';
import clinicaApi from '../api/clinicaApi';
import type { AppDispatch, RootState } from '../store';
import {
  onCitasLoaded,
  onCitaAdded,
  onCitaUpdated,
  onOpenCitaModal,
  onCloseCitaModal,
  onSetCitasLoading,
  onSetCitasError,
  showToast,
} from '../store';
import { extractErrorMessage } from '../helpers';
import type { Cita, CitaRequest, EstadoCita } from '../types';

export const useCitasStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { citas, isModalOpen, isLoading, errorMessage } = useSelector((state: RootState) => state.citas);

  const startLoadCitasPorPaciente = async (pacienteId: string) => {
    dispatch(onSetCitasLoading(true));
    try {
      const { data } = await clinicaApi.get<Cita[]>(`/api/citas/paciente/${pacienteId}`);
      dispatch(onCitasLoaded(data));
    } catch (error) {
      dispatch(onSetCitasError(extractErrorMessage(error, 'No se pudieron cargar las citas')));
    }
  };

  const startAgendarCita = async (request: CitaRequest) => {
    dispatch(onSetCitasLoading(true));
    try {
      const { data } = await clinicaApi.post<Cita>('/api/citas', request);
      dispatch(onCitaAdded(data));
      dispatch(showToast({ type: 'success', message: 'Cita agendada' }));
    } catch (error) {
      dispatch(onSetCitasError(extractErrorMessage(error, 'No se pudo agendar la cita')));
    }
  };

  const startCambiarEstadoCita = async (id: string, estado: EstadoCita) => {
    try {
      const { data } = await clinicaApi.patch<Cita>(`/api/citas/${id}/estado`, { estado });
      dispatch(onCitaUpdated(data));
      dispatch(showToast({ type: 'success', message: `Cita ahora esta ${data.estado}` }));
    } catch (error) {
      dispatch(showToast({ type: 'error', message: extractErrorMessage(error, 'No se pudo cambiar el estado de la cita') }));
    }
  };

  const openCitaModal = () => dispatch(onOpenCitaModal());
  const closeCitaModal = () => dispatch(onCloseCitaModal());

  return {
    // Propiedades
    citas,
    isModalOpen,
    isLoading,
    errorMessage,

    // Metodos
    startLoadCitasPorPaciente,
    startAgendarCita,
    startCambiarEstadoCita,
    openCitaModal,
    closeCitaModal,
  };
};
