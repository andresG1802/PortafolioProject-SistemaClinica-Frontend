import { useEffect } from 'react';

import { PacienteSelector } from '../../pacientes';
import { RecetaTable } from '../components/RecetaTable';
import { RecetaFormModal } from '../components/RecetaFormModal';
import { useAuthStore, usePacientesStore, useRecetasStore } from '../../hooks';
import { esMedico } from '../../helpers';

export const RecetasPage = () => {
  const { roles } = useAuthStore();
  const { activePaciente } = usePacientesStore();
  const { startLoadRecetasPorPaciente, openRecetaModal } = useRecetasStore();

  useEffect(() => {
    if (activePaciente) startLoadRecetasPorPaciente(activePaciente.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePaciente?.id]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>Recetas</h1>
        {activePaciente && esMedico(roles) && (
          <button type="button" className="btn btn-primary" onClick={openRecetaModal}>
            + Prescribir
          </button>
        )}
      </div>

      <PacienteSelector />

      {activePaciente ? <RecetaTable /> : <div className="card">Selecciona un paciente para ver sus recetas.</div>}

      <RecetaFormModal />
    </div>
  );
};
