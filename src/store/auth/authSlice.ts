import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role } from '../../types';

export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

export interface AuthState {
  status: AuthStatus;
  userId?: string;
  username?: string;
  roles: Role[];
  errorMessage?: string;
}

const initialState: AuthState = {
  status: 'checking',
  roles: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
    },
    onLogin: (state, { payload }: PayloadAction<{ userId: string; username: string; roles: Role[] }>) => {
      state.status = 'authenticated';
      state.userId = payload.userId;
      state.username = payload.username;
      state.roles = payload.roles;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = 'not-authenticated';
      state.userId = undefined;
      state.username = undefined;
      state.roles = [];
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
