import { motion } from 'framer-motion';

import { Badge } from '../../components';
import { useAuthStore, useCitasStore } from '../../hooks';
import { esPersonalClinico, formatDateTime } from '../../helpers';
import { listContainer, listItem } from '../../styles/motion';
import type { EstadoCita } from '../../types';

const tonoPorEstado: Record<EstadoCita, 'neutral' | 'primary' | 'success' | 'danger' | 'warning'> = {
  PROGRAMADA: 'neutral',
  CONFIRMADA: 'primary',
  COMPLETADA: 'success',
  CANCELADA: 'danger',
  NO_ASISTIO: 'warning',
};

export const CitaTable = () => {
  const { roles } = useAuthStore();
  const { citas, isLoading, startCambiarEstadoCita } = useCitasStore();

  if (isLoading && citas.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">
          <span className="spinner spinner-dark" />
        </div>
      </div>
    );
  }

  if (citas.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">Este paciente todavia no tiene citas.</div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Motivo</th>
            <th>Estado</th>
            {esPersonalClinico(roles) && <th>Acciones</th>}
          </tr>
        </thead>
        <motion.tbody variants={listContainer} initial="initial" animate="animate">
          {citas.map((cita) => (
            <motion.tr key={cita.id} variants={listItem}>
              <td>{formatDateTime(cita.fechaHora)}</td>
              <td>{cita.motivo}</td>
              <td>
                <Badge tone={tonoPorEstado[cita.estado]}>{cita.estado.replaceAll('_', ' ')}</Badge>
              </td>
              {esPersonalClinico(roles) && (
                <td>
                  <div className="row-actions">
                    {cita.estado === 'PROGRAMADA' && (
                      <>
                        <button
                          type="button"
                          className="btn btn-accent btn-sm"
                          onClick={() => startCambiarEstadoCita(cita.id, 'CONFIRMADA')}
                        >
                          Confirmar
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => startCambiarEstadoCita(cita.id, 'CANCELADA')}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {cita.estado === 'CONFIRMADA' && (
                      <>
                        <button
                          type="button"
                          className="btn btn-accent btn-sm"
                          onClick={() => startCambiarEstadoCita(cita.id, 'COMPLETADA')}
                        >
                          Completar
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          onClick={() => startCambiarEstadoCita(cita.id, 'NO_ASISTIO')}
                        >
                          No asistió
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => startCambiarEstadoCita(cita.id, 'CANCELADA')}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </td>
              )}
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};
