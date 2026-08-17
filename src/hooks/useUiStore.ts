import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { toggleSidebar, closeSidebar, hideToast } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sidebarOpen, toast } = useSelector((state: RootState) => state.ui);

  return {
    // Propiedades
    sidebarOpen,
    toast,

    // Metodos
    toggleSidebar: () => dispatch(toggleSidebar()),
    closeSidebar: () => dispatch(closeSidebar()),
    hideToast: () => dispatch(hideToast()),
  };
};
