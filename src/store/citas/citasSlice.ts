import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cita } from '../../types';

interface CitasState {
  citas: Cita[];
  isModalOpen: boolean;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: CitasState = {
  citas: [],
  isModalOpen: false,
  isLoading: false,
};

export const citasSlice = createSlice({
  name: 'citas',
  initialState,
  reducers: {
    onCitasLoaded: (state, { payload }: PayloadAction<Cita[]>) => {
      state.citas = payload;
      state.isLoading = false;
    },
    onCitaAdded: (state, { payload }: PayloadAction<Cita>) => {
      state.citas.unshift(payload);
      state.isModalOpen = false;
      state.isLoading = false;
    },
    onCitaUpdated: (state, { payload }: PayloadAction<Cita>) => {
      state.citas = state.citas.map((c) => (c.id === payload.id ? payload : c));
    },
    onOpenCitaModal: (state) => {
      state.isModalOpen = true;
      state.errorMessage = undefined;
    },
    onCloseCitaModal: (state) => {
      state.isModalOpen = false;
      state.errorMessage = undefined;
    },
    onSetCitasLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    onSetCitasError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    },
  },
});

export const {
  onCitasLoaded,
  onCitaAdded,
  onCitaUpdated,
  onOpenCitaModal,
  onCloseCitaModal,
  onSetCitasLoading,
  onSetCitasError,
} = citasSlice.actions;
