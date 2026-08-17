import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Receta } from '../../types';

interface RecetasState {
  recetas: Receta[];
  isModalOpen: boolean;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: RecetasState = {
  recetas: [],
  isModalOpen: false,
  isLoading: false,
};

export const recetasSlice = createSlice({
  name: 'recetas',
  initialState,
  reducers: {
    onRecetasLoaded: (state, { payload }: PayloadAction<Receta[]>) => {
      state.recetas = payload;
      state.isLoading = false;
    },
    onRecetaAdded: (state, { payload }: PayloadAction<Receta>) => {
      state.recetas.unshift(payload);
      state.isModalOpen = false;
      state.isLoading = false;
    },
    onRecetaUpdated: (state, { payload }: PayloadAction<Receta>) => {
      state.recetas = state.recetas.map((r) => (r.id === payload.id ? payload : r));
    },
    onOpenRecetaModal: (state) => {
      state.isModalOpen = true;
      state.errorMessage = undefined;
    },
    onCloseRecetaModal: (state) => {
      state.isModalOpen = false;
      state.errorMessage = undefined;
    },
    onSetRecetasLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    onSetRecetasError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    },
  },
});

export const {
  onRecetasLoaded,
  onRecetaAdded,
  onRecetaUpdated,
  onOpenRecetaModal,
  onCloseRecetaModal,
  onSetRecetasLoading,
  onSetRecetasError,
} = recetasSlice.actions;
