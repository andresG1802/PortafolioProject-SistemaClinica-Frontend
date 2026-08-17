import { useState, type ChangeEvent, type FormEvent } from 'react';

import { useAuditoriaStore } from '../../hooks';

const servicios = ['pacientes-service', 'expedientes-service', 'citas-service', 'recetas-service'];

export const BuscadorAuditoria = () => {
  const { isLoading, startBuscarPorEntidad, startBuscarPorServicio } = useAuditoriaStore();
  const [entidadId, setEntidadId] = useState('');
  const [servicioOrigen, setServicioOrigen] = useState('');

  const buscarPorEntidad = (event: FormEvent) => {
    event.preventDefault();
    if (entidadId.trim()) startBuscarPorEntidad(entidadId.trim());
  };

  const onChangeServicio = (event: ChangeEvent<HTMLSelectElement>) => {
    const valor = event.target.value;
    setServicioOrigen(valor);
    if (valor) startBuscarPorServicio(valor);
  };

  return (
    <div className="card">
      <h2 className="section-title">Buscar registros</h2>
      <div className="form-grid">
        <form className="field" onSubmit={buscarPorEntidad}>
          <label htmlFor="entidadId">Por id de entidad (paciente, cita, receta...)</label>
          <div className="row-actions">
            <input
              id="entidadId"
              value={entidadId}
              onChange={(e) => setEntidadId(e.target.value)}
              placeholder="UUID de la entidad"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}>
              Buscar
            </button>
          </div>
        </form>

        <div className="field">
          <label htmlFor="servicioOrigen">Por servicio de origen</label>
          <select id="servicioOrigen" value={servicioOrigen} onChange={onChangeServicio}>
            <option value="">Selecciona un servicio…</option>
            {servicios.map((servicio) => (
              <option key={servicio} value={servicio}>
                {servicio}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
