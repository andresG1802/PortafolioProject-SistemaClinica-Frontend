import { motion } from 'framer-motion';

import { useExpedientesStore } from '../../hooks';
import { formatDateTime } from '../../helpers';
import { listContainer, listItem } from '../../styles/motion';
import type { TipoEntrada } from '../../types';

const iconoPorTipo: Record<TipoEntrada, string> = {
  DIAGNOSTICO: '🩻',
  NOTA_EVOLUCION: '📝',
  PRESCRIPCION: '💊',
  RESULTADO_LABORATORIO: '🧪',
  ALERGIA: '⚠️',
};

export const ExpedienteTimeline = () => {
  const { entradas, isLoading } = useExpedientesStore();

  if (isLoading && entradas.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">
          <span className="spinner spinner-dark" />
        </div>
      </div>
    );
  }

  if (entradas.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">Este paciente todavia no tiene entradas en su expediente.</div>
      </div>
    );
  }

  return (
    <motion.ul className="feed" variants={listContainer} initial="initial" animate="animate">
      {entradas.map((entrada) => (
        <motion.li key={entrada.id} className="feed-item" variants={listItem}>
          <span className="feed-icon">{iconoPorTipo[entrada.tipo]}</span>
          <div className="feed-body">
            <div className="feed-header">
              <strong>{entrada.tipo.replaceAll('_', ' ')}</strong>
              {entrada.entradaAnteriorId && <span className="badge badge-warning">CORRECCION</span>}
            </div>
            <p>{entrada.contenido}</p>
            <span className="feed-meta">{formatDateTime(entrada.creadoEn)}</span>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};
