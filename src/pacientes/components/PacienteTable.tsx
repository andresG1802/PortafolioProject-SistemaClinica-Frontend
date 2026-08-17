import { motion } from 'framer-motion';

import { useAuthStore, usePacientesStore } from '../../hooks';
import { esPersonalClinico, formatDate } from '../../helpers';
import { listContainer, listItem } from '../../styles/motion';

export const PacienteTable = () => {
  const { roles } = useAuthStore();
  const { pacientes, activePaciente, isLoading, setActivePaciente, openPacienteModal, startDeletePaciente } =
    usePacientesStore();

  const eliminar = (id: string, nombreCompleto: string) => {
    if (window.confirm(`¿Eliminar a ${nombreCompleto}? Esta accion no se puede deshacer.`)) {
      startDeletePaciente(id);
    }
  };

  if (isLoading && pacientes.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">
          <span className="spinner spinner-dark" />
        </div>
      </div>
    );
  }

  if (pacientes.length === 0) {
    return (
      <div className="table-wrap">
        <div className="empty-row">Todavia no hay pacientes registrados.</div>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Genero</th>
            <th>Contacto</th>
            <th>Alta</th>
            {esPersonalClinico(roles) && <th>Acciones</th>}
          </tr>
        </thead>
        <motion.tbody variants={listContainer} initial="initial" animate="animate">
          {pacientes.map((paciente) => (
            <motion.tr
              key={paciente.id}
              variants={listItem}
              className={paciente.id === activePaciente?.id ? 'row-active' : undefined}
              onClick={() => setActivePaciente(paciente)}
              style={{ cursor: 'pointer' }}
            >
              <td>
                {paciente.nombres} {paciente.apellidos}
              </td>
              <td>
                {paciente.tipoDocumento} {paciente.numeroDocumento}
              </td>
              <td>{paciente.genero}</td>
              <td>{paciente.email || paciente.telefono || '—'}</td>
              <td>{formatDate(paciente.createdAt)}</td>
              {esPersonalClinico(roles) && (
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        openPacienteModal(paciente);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={(event) => {
                        event.stopPropagation();
                        eliminar(paciente.id, `${paciente.nombres} ${paciente.apellidos}`);
                      }}
                    >
                      Eliminar
                    </button>
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
