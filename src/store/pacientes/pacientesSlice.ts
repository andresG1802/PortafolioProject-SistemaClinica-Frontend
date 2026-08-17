import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Paciente } from '../../types';

interface PacientesState {
  pacientes: Paciente[];
  activePaciente: Paciente | null;
  isModalOpen: boolean;
  isLoading: boolean;
  errorMessage?: string;
}

const initialState: PacientesState = {
  pacientes: [],
  activePaciente: null,
  isModalOpen: false,
  isLoading: false,
};

export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    onPacientesLoaded: (state, { payload }: PayloadAction<Paciente[]>) => {
      state.pacientes = payload;
      state.isLoading = false;
    },
    onPacienteAdded: (state, { payload }: PayloadAction<Paciente>) => {
      state.pacientes.unshift(payload);
      state.isModalOpen = false;
      state.isLoading = false;
    },
    onPacienteUpdated: (state, { payload }: PayloadAction<Paciente>) => {
      state.pacientes = state.pacientes.map((p) => (p.id === payload.id ? payload : p));
      if (state.activePaciente?.id === payload.id) {
        state.activePaciente = payload;
      }
      state.isModalOpen = false;
      state.isLoading = false;
    },
    onPacienteRemoved: (state, { payload: id }: PayloadAction<string>) => {
      state.pacientes = state.pacientes.filter((p) => p.id !== id);
      if (state.activePaciente?.id === id) {
        state.activePaciente = null;
      }
    },
    onSetActivePaciente: (state, { payload }: PayloadAction<Paciente | null>) => {
      state.activePaciente = payload;
    },
    onOpenPacienteModal: (state) => {
      state.isModalOpen = true;
      state.errorMessage = undefined;
    },
    onClosePacienteModal: (state) => {
      state.isModalOpen = false;
      state.errorMessage = undefined;
    },
    onSetPacientesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    onSetPacientesError: (state, { payload }: PayloadAction<string | undefined>) => {
      state.errorMessage = payload;
      state.isLoading = false;
    },
  },
});

export const {
  onPacientesLoaded,
  onPacienteAdded,
  onPacienteUpdated,
  onPacienteRemoved,
  onSetActivePaciente,
  onOpenPacienteModal,
  onClosePacienteModal,
  onSetPacientesLoading,
  onSetPacientesError,
} = pacientesSlice.actions;
