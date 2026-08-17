import { useDispatch, useSelector } from 'react-redux';
import clinicaApi from '../api/clinicaApi';
import type { AppDispatch, RootState } from '../store';
import {
  onEntradasLoaded,
  onEntradaAdded,
  onOpenEntradaModal,
  onCloseEntradaModal,
  onSetExpedientesLoading,
  onSetExpedientesError,
  showToast,
} from '../store';
import { extractErrorMessage } from '../helpers';
import type { EntradaExpediente, EntradaExpedienteRequest } from '../types';

export const useExpedientesStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { entradas, isModalOpen, isLoading, errorMessage } = useSelector((state: RootState) => state.expedientes);

  const startLoadEntradasPorPaciente = async (pacienteId: string) => {
    dispatch(onSetExpedientesLoading(true));
    try {
      const { data } = await clinicaApi.get<EntradaExpediente[]>(`/api/expedientes/paciente/${pacienteId}`);
      dispatch(onEntradasLoaded(data));
    } catch (error) {
      dispatch(onSetExpedientesError(extractErrorMessage(error, 'No se pudo cargar el expediente')));
    }
  };

  const startAgregarEntrada = async (request: EntradaExpedienteRequest) => {
    dispatch(onSetExpedientesLoading(true));
    try {
      const { data } = await clinicaApi.post<EntradaExpediente>('/api/expedientes', request);
      dispatch(onEntradaAdded(data));
      dispatch(showToast({ type: 'success', message: 'Entrada agregada al expediente' }));
    } catch (error) {
      dispatch(onSetExpedientesError(extractErrorMessage(error, 'No se pudo agregar la entrada')));
    }
  };

  const openEntradaModal = () => dispatch(onOpenEntradaModal());
  const closeEntradaModal = () => dispatch(onCloseEntradaModal());

  return {
    // Propiedades
    entradas,
    isModalOpen,
    isLoading,
    errorMessage,

    // Metodos
    startLoadEntradasPorPaciente,
    startAgregarEntrada,
    openEntradaModal,
    closeEntradaModal,
  };
};
