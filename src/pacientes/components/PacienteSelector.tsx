import { useEffect, type ChangeEvent } from 'react';

import { usePacientesStore } from '../../hooks';

// Compartido por expedientes/citas/recetas: esos dominios estan escopeados a un paciente, y
// este selector es la unica forma de elegir cual en la UI.
export const PacienteSelector = () => {
  const { pacientes, activePaciente, isLoading, startLoadPacientes, setActivePaciente } = usePacientesStore();

  useEffect(() => {
    if (pacientes.length === 0) startLoadPacientes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const paciente = pacientes.find((p) => p.id === event.target.value) ?? null;
    setActivePaciente(paciente);
  };

  return (
    <div className="field selector-field">
      <label htmlFor="pacienteSelector">Paciente</label>
      <select id="pacienteSelector" value={activePaciente?.id ?? ''} onChange={onChange} disabled={isLoading}>
        <option value="">Selecciona un paciente…</option>
        {pacientes.map((paciente) => (
          <option key={paciente.id} value={paciente.id}>
            {paciente.nombres} {paciente.apellidos} — {paciente.numeroDocumento}
          </option>
        ))}
      </select>
    </div>
  );
};
