import { useDispatch, useSelector } from 'react-redux';
import clinicaApi from '../api/clinicaApi';
import type { AppDispatch, RootState } from '../store';
import {
  onRecetasLoaded,
  onRecetaAdded,
  onRecetaUpdated,
  onOpenRecetaModal,
  onCloseRecetaModal,
  onSetRecetasLoading,
  onSetRecetasError,
  showToast,
} from '../store';
import { extractErrorMessage } from '../helpers';
import type { EstadoReceta, Receta, RecetaRequest } from '../types';

export const useRecetasStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recetas, isModalOpen, isLoading, errorMessage } = useSelector((state: RootState) => state.recetas);

  const startLoadRecetasPorPaciente = async (pacienteId: string) => {
    dispatch(onSetRecetasLoading(true));
    try {
      const { data } = await clinicaApi.get<Receta[]>(`/api/recetas/paciente/${pacienteId}`);
      dispatch(onRecetasLoaded(data));
    } catch (error) {
      dispatch(onSetRecetasError(extractErrorMessage(error, 'No se pudieron cargar las recetas')));
    }
  };

  const startPrescribir = async (request: RecetaRequest) => {
    dispatch(onSetRecetasLoading(true));
    try {
      const { data } = await clinicaApi.post<Receta>('/api/recetas', request);
      dispatch(onRecetaAdded(data));
      dispatch(showToast({ type: 'success', message: 'Receta prescrita' }));
    } catch (error) {
      dispatch(onSetRecetasError(extractErrorMessage(error, 'No se pudo prescribir la receta')));
    }
  };

  const startCambiarEstadoReceta = async (id: string, estado: EstadoReceta) => {
    try {
      const { data } = await clinicaApi.patch<Receta>(`/api/recetas/${id}/estado`, { estado });
      dispatch(onRecetaUpdated(data));
      dispatch(showToast({ type: 'success', message: `Receta ahora esta ${data.estado}` }));
    } catch (error) {
      dispatch(showToast({ type: 'error', message: extractErrorMessage(error, 'No se pudo cambiar el estado de la receta') }));
    }
  };

  const openRecetaModal = () => dispatch(onOpenRecetaModal());
  const closeRecetaModal = () => dispatch(onCloseRecetaModal());

  return {
    // Propiedades
    recetas,
    isModalOpen,
    isLoading,
    errorMessage,

    // Metodos
    startLoadRecetasPorPaciente,
    startPrescribir,
    startCambiarEstadoReceta,
    openRecetaModal,
    closeRecetaModal,
  };
};
