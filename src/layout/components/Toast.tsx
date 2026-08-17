import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useUiStore } from '../../hooks';

export const Toast = () => {
  const { toast, hideToast } = useUiStore();

  useEffect(() => {
    if (!toast) return;
    const timeoutId = setTimeout(hideToast, 3500);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  return (
    <div className="toast-slot">
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`toast toast-${toast.type}`}
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={hideToast}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
