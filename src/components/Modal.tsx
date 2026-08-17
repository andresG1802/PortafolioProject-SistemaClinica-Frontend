import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { modalOverlay, modalContent } from '../styles/motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  wide?: boolean;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, wide, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          variants={modalOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={`modal-content${wide ? ' modal-wide' : ''}`}
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{title}</h2>
              <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
                ✕
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
