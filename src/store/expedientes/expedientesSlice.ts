import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EntradaExpediente } from '../../types';

interface ExpedientesState {
  entradas: EntradaExpediente[];
  isModalOpen: boolean;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: ExpedientesState = {
  entradas: [],
  isModalOpen: false,
  isLoading: false,
};

export const expedientesSlice = createSlice({
  name: 'expedientes',
  initialState,
  reducers: {
    onEntradasLoaded: (state, { payload }: PayloadAction<EntradaExpediente[]>) => {
      state.entradas = payload;
      state.isLoading = false;
    },
    onEntradaAdded: (state, { payload }: PayloadAction<EntradaExpediente>) => {
      state.entradas.unshift(payload);
      state.isModalOpen = false;
      state.isLoading = false;
    },
    onOpenEntradaModal: (state) => {
      state.isModalOpen = true;
      state.errorMessage = undefined;
    },
    onCloseEntradaModal: (state) => {
      state.isModalOpen = false;
      state.errorMessage = undefined;
    },
    onSetExpedientesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    onSetExpedientesError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    },
  },
});

export const {
  onEntradasLoaded,
  onEntradaAdded,
  onOpenEntradaModal,
  onCloseEntradaModal,
  onSetExpedientesLoading,
  onSetExpedientesError,
} = expedientesSlice.actions;
