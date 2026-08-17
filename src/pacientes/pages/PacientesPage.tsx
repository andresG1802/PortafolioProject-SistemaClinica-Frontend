import { useEffect } from 'react';

import { PacienteTable } from '../components/PacienteTable';
import { PacienteFormModal } from '../components/PacienteFormModal';
import { useAuthStore, usePacientesStore } from '../../hooks';
import { esPersonalClinico } from '../../helpers';

export const PacientesPage = () => {
  const { roles } = useAuthStore();
  const { startLoadPacientes, openPacienteModal } = usePacientesStore();

  useEffect(() => {
    startLoadPacientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Pacientes</h1>
        {esPersonalClinico(roles) && (
          <button type="button" className="btn btn-primary" onClick={() => openPacienteModal()}>
            + Nuevo paciente
          </button>
        )}
      </div>

      <PacienteTable />
      <PacienteFormModal />
    </div>
  );
};
