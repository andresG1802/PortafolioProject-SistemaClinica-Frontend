import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RegistroAuditoria } from '../../types';

interface AuditoriaState {
  registros: RegistroAuditoria[];
  isModalOpen: boolean;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: AuditoriaState = {
  registros: [],
  isModalOpen: false,
  isLoading: false,
};

export const auditoriaSlice = createSlice({
  name: 'auditoria',
  initialState,
  reducers: {
    onRegistrosLoaded: (state, { payload }: PayloadAction<RegistroAuditoria[]>) => {
      state.registros = payload;
      state.isLoading = false;
    },
    onRegistroAdded: (state, { payload }: PayloadAction<RegistroAuditoria>) => {
      state.registros.unshift(payload);
      state.isModalOpen = false;
      state.isLoading = false;
    },
    onOpenRegistroModal: (state) => {
      state.isModalOpen = true;
      state.errorMessage = undefined;
    },
    onCloseRegistroModal: (state) => {
      state.isModalOpen = false;
      state.errorMessage = undefined;
    },
    onSetAuditoriaLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    onSetAuditoriaError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    },
  },
});

export const {
  onRegistrosLoaded,
  onRegistroAdded,
  onOpenRegistroModal,
  onCloseRegistroModal,
  onSetAuditoriaLoading,
  onSetAuditoriaError,
} = auditoriaSlice.actions;
