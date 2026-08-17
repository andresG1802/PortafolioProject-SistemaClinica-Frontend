import { useDispatch, useSelector } from 'react-redux';
import clinicaApi from '../api/clinicaApi';
import type { AppDispatch, RootState } from '../store';
import {
  onPacientesLoaded,
  onPacienteAdded,
  onPacienteUpdated,
  onPacienteRemoved,
  onSetActivePaciente,
  onOpenPacienteModal,
  onClosePacienteModal,
  onSetPacientesLoading,
  onSetPacientesError,
  showToast,
} from '../store';
import { extractErrorMessage } from '../helpers';
import type { Paciente, PacienteRequest } from '../types';

export const usePacientesStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pacientes, activePaciente, isModalOpen, isLoading, errorMessage } = useSelector(
    (state: RootState) => state.pacientes
  );

  const startLoadPacientes = async () => {
    dispatch(onSetPacientesLoading(true));
    try {
      const { data } = await clinicaApi.get<Paciente[]>('/api/pacientes');
      dispatch(onPacientesLoaded(data));
    } catch (error) {
      dispatch(onSetPacientesError(extractErrorMessage(error, 'No se pudieron cargar los pacientes')));
    }
  };

  const startCreatePaciente = async (request: PacienteRequest) => {
    dispatch(onSetPacientesLoading(true));
    try {
      const { data } = await clinicaApi.post<Paciente>('/api/pacientes', request);
      dispatch(onPacienteAdded(data));
      dispatch(showToast({ type: 'success', message: `Paciente ${data.nombres} ${data.apellidos} creado` }));
    } catch (error) {
      dispatch(onSetPacientesError(extractErrorMessage(error, 'No se pudo crear el paciente')));
    }
  };

  const startUpdatePaciente = async (id: string, request: PacienteRequest) => {
    dispatch(onSetPacientesLoading(true));
    try {
      const { data } = await clinicaApi.put<Paciente>(`/api/pacientes/${id}`, request);
      dispatch(onPacienteUpdated(data));
      dispatch(showToast({ type: 'success', message: `Paciente ${data.nombres} ${data.apellidos} actualizado` }));
    } catch (error) {
      dispatch(onSetPacientesError(extractErrorMessage(error, 'No se pudo actualizar el paciente')));
    }
  };

  const startDeletePaciente = async (id: string) => {
    try {
      await clinicaApi.delete(`/api/pacientes/${id}`);
      dispatch(onPacienteRemoved(id));
      dispatch(showToast({ type: 'success', message: 'Paciente eliminado' }));
    } catch (error) {
      dispatch(showToast({ type: 'error', message: extractErrorMessage(error, 'No se pudo eliminar el paciente') }));
    }
  };

  const setActivePaciente = (paciente: Paciente | null) => dispatch(onSetActivePaciente(paciente));

  const openPacienteModal = (paciente: Paciente | null = null) => {
    dispatch(onSetActivePaciente(paciente));
    dispatch(onOpenPacienteModal());
  };
  const closePacienteModal = () => dispatch(onClosePacienteModal());

  return {
    // Propiedades
    pacientes,
    activePaciente,
    isModalOpen,
    isLoading,
    errorMessage,

    // Metodos
    startLoadPacientes,
    startCreatePaciente,
    startUpdatePaciente,
    startDeletePaciente,
    setActivePaciente,
    openPacienteModal,
    closePacienteModal,
  };
};
