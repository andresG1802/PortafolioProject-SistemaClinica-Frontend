import { motion } from 'framer-motion';

import { Badge } from '../../components';
import { useAuthStore, useRecetasStore } from '../../hooks';
import { esMedico } from '../../helpers';
import { listContainer, listItem } from '../../styles/motion';
import type { EstadoReceta } from '../../types';

const tonoPorEstado: Record<EstadoReceta, 'primary' | 'success' | 'danger'> = {
  ACTIVA: 'primary',
  DISPENSADA: 'success',
  ANULADA: 'danger',
};

export const RecetaTable = () => {
  const { roles } = useAuthStore();
  const { recetas, isLoading, startCambiarEstadoReceta } = useRecetasStore();

  if (isLoading && recetas.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">
          <span className="spinner spinner-dark" />
        </div>
      </div>
    );
  }

  if (recetas.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">Este paciente todavia no tiene recetas.</div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>Frecuencia</th>
            <th>Duracion</th>
            <th>Estado</th>
            {esMedico(roles) && <th>Acciones</th>}
          </tr>
        </thead>
        <motion.tbody variants={listContainer} initial="initial" animate="animate">
          {recetas.map((receta) => (
            <motion.tr key={receta.id} variants={listItem}>
              <td>{receta.medicamento}</td>
              <td>{receta.dosis}</td>
              <td>{receta.frecuencia}</td>
              <td>{receta.duracionDias} dias</td>
              <td>
                <Badge tone={tonoPorEstado[receta.estado]}>{receta.estado}</Badge>
              </td>
              {esMedico(roles) && (
                <td>
                  {receta.estado === 'ACTIVA' && (
                    <div className="row-actions">
                      <button
                        type="button"
                        className="btn btn-accent btn-sm"
                        onClick={() => startCambiarEstadoReceta(receta.id, 'DISPENSADA')}
                      >
                        Dispensar
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => startCambiarEstadoReceta(receta.id, 'ANULADA')}
                      >
                        Anular
                      </button>
                    </div>
                  )}
                </td>
              )}
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};
