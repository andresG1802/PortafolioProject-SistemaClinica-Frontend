import { useEffect } from 'react';

import { PacienteSelector } from '../../pacientes';
import { ExpedienteTimeline } from '../components/ExpedienteTimeline';
import { EntradaFormModal } from '../components/EntradaFormModal';
import { useAuthStore, useExpedientesStore, usePacientesStore } from '../../hooks';
import { esMedico } from '../../helpers';

export const ExpedientesPage = () => {
  const { roles } = useAuthStore();
  const { activePaciente } = usePacientesStore();
  const { startLoadEntradasPorPaciente, openEntradaModal } = useExpedientesStore();

  useEffect(() => {
    if (activePaciente) startLoadEntradasPorPaciente(activePaciente.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePaciente?.id]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Expediente clínico</h1>
        {activePaciente && esMedico(roles) && (
          <button type="button" className="btn btn-primary" onClick={openEntradaModal}>
            + Agregar entrada
          </button>
        )}
      </div>

      <PacienteSelector />

      {activePaciente ? (
        <ExpedienteTimeline />
      ) : (
        <div className="card">Selecciona un paciente para ver su expediente.</div>
      )}

      <EntradaFormModal />
    </div>
  );
};
