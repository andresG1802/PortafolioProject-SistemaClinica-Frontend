import { useEffect } from 'react';

import { PacienteSelector } from '../../pacientes';
import { CitaTable } from '../components/CitaTable';
import { CitaFormModal } from '../components/CitaFormModal';
import { useAuthStore, useCitasStore, usePacientesStore } from '../../hooks';
import { esPersonalClinico } from '../../helpers';

export const CitasPage = () => {
  const { roles } = useAuthStore();
  const { activePaciente } = usePacientesStore();
  const { startLoadCitasPorPaciente, openCitaModal } = useCitasStore();

  useEffect(() => {
    if (activePaciente) startLoadCitasPorPaciente(activePaciente.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePaciente?.id]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Citas</h1>
        {activePaciente && esPersonalClinico(roles) && (
          <button type="button" className="btn btn-primary" onClick={openCitaModal}>
            + Agendar cita
          </button>
        )}
      </div>

      <PacienteSelector />

      {activePaciente ? <CitaTable /> : <div className="card">Selecciona un paciente para ver sus citas.</div>}

      <CitaFormModal />
    </div>
  );
};
