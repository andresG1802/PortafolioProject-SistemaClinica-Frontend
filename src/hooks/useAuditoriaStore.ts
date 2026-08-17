import { useDispatch, useSelector } from 'react-redux';
import clinicaApi from '../api/clinicaApi';
import type { AppDispatch, RootState } from '../store';
import {
  onRegistrosLoaded,
  onRegistroAdded,
  onOpenRegistroModal,
  onCloseRegistroModal,
  onSetAuditoriaLoading,
  onSetAuditoriaError,
  showToast,
} from '../store';
import { extractErrorMessage } from '../helpers';
import type { RegistroAuditoria, RegistroAuditoriaRequest } from '../types';

export const useAuditoriaStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { registros, isModalOpen, isLoading, errorMessage } = useSelector((state: RootState) => state.auditoria);

  const startBuscarPorEntidad = async (entidadId: string) => {
    dispatch(onSetAuditoriaLoading(true));
    try {
      const { data } = await clinicaApi.get<RegistroAuditoria[]>(`/api/auditoria/entidad/${entidadId}`);
      dispatch(onRegistrosLoaded(data));
    } catch (error) {
      dispatch(onSetAuditoriaError(extractErrorMessage(error, 'No se pudo buscar por entidad')));
    }
  };

  const startBuscarPorServicio = async (servicioOrigen: string) => {
    dispatch(onSetAuditoriaLoading(true));
    try {
      const { data } = await clinicaApi.get<RegistroAuditoria[]>(`/api/auditoria/servicio/${servicioOrigen}`);
      dispatch(onRegistrosLoaded(data));
    } catch (error) {
      dispatch(onSetAuditoriaError(extractErrorMessage(error, 'No se pudo buscar por servicio')));
    }
  };

  const startRegistrar = async (request: RegistroAuditoriaRequest) => {
    dispatch(onSetAuditoriaLoading(true));
    try {
      const { data } = await clinicaApi.post<RegistroAuditoria>('/api/auditoria', request);
      dispatch(onRegistroAdded(data));
      dispatch(showToast({ type: 'success', message: 'Registro de auditoria creado' }));
    } catch (error) {
      dispatch(onSetAuditoriaError(extractErrorMessage(error, 'No se pudo crear el registro')));
    }
  };

  const openRegistroModal = () => dispatch(onOpenRegistroModal());
  const closeRegistroModal = () => dispatch(onCloseRegistroModal());

  return {
    // Propiedades
    registros,
    isModalOpen,
    isLoading,
    errorMessage,

    // Metodos
    startBuscarPorEntidad,
    startBuscarPorServicio,
    startRegistrar,
    openRegistroModal,
    closeRegistroModal,
  };
};
