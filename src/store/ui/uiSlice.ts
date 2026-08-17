import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ToastType = 'success' | 'error';

export interface Toast {
  type: ToastType;
  message: string;
}

interface UiState {
  sidebarOpen: boolean;
  toast: Toast | null;
}

const initialState: UiState = {
  sidebarOpen: false,
  toast: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    showToast: (state, { payload }: PayloadAction<Toast>) => {
      state.toast = payload;
    },
    hideToast: (state) => {
      state.toast = null;
    },
  },
});

export const { toggleSidebar, closeSidebar, showToast, hideToast } = uiSlice.actions;
