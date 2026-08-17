import { motion } from 'framer-motion';

import { Badge } from '../../components';
import { useAuditoriaStore } from '../../hooks';
import { formatDateTime } from '../../helpers';
import { listContainer, listItem } from '../../styles/motion';
import type { AccionAuditoria } from '../../types';

const tonoPorAccion: Record<AccionAuditoria, 'primary' | 'warning' | 'danger' | 'neutral'> = {
  CREACION: 'primary',
  ACTUALIZACION: 'warning',
  CAMBIO_ESTADO: 'warning',
  ELIMINACION: 'danger',
  CONSULTA: 'neutral',
};

export const RegistroAuditoriaTable = () => {
  const { registros, isLoading } = useAuditoriaStore();

  if (isLoading) {
    return (
      <div className="table-wrap">
        <div className="empty-row">
          <span className="spinner spinner-dark" />
        </div>
      </div>
    );
  }

  if (registros.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">Busca por id de entidad o por servicio para ver registros.</div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Entidad</th>
            <th>Accion</th>
            <th>Usuario</th>
            <th>Detalle</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <motion.tbody variants={listContainer} initial="initial" animate="animate">
          {registros.map((registro) => (
            <motion.tr key={registro.id} variants={listItem}>
              <td>{registro.servicioOrigen}</td>
              <td>
                {registro.entidadAfectada} ({registro.entidadId.slice(0, 8)}…)
              </td>
              <td>
                <Badge tone={tonoPorAccion[registro.accion]}>{registro.accion.replaceAll('_', ' ')}</Badge>
              </td>
              <td>{registro.usuarioId.slice(0, 8)}…</td>
              <td>{registro.detalle ?? '—'}</td>
              <td>{formatDateTime(registro.creadoEn)}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};
