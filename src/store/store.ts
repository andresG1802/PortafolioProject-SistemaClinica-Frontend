import { configureStore } from '@reduxjs/toolkit';
import {
  authSlice,
  uiSlice,
  pacientesSlice,
  expedientesSlice,
  citasSlice,
  recetasSlice,
  auditoriaSlice,
} from './';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    pacientes: pacientesSlice.reducer,
    expedientes: expedientesSlice.reducer,
    citas: citasSlice.reducer,
    recetas: recetasSlice.reducer,
    auditoria: auditoriaSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
