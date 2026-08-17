import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Modal } from '../../components';
import { useAuditoriaStore, useAuthStore } from '../../hooks';
import type { AccionAuditoria } from '../../types';

interface FormState {
  servicioOrigen: string;
  entidadAfectada: string;
  entidadId: string;
  accion: AccionAuditoria;
  usuarioId: string;
  detalle: string;
}

const initialForm = (usuarioId: string): FormState => ({
  servicioOrigen: 'pacientes-service',
  entidadAfectada: '',
  entidadId: '',
  accion: 'CONSULTA',
  usuarioId,
  detalle: '',
});

export const RegistroFormModal = () => {
  const { userId } = useAuthStore();
  const { isModalOpen, isLoading, errorMessage, closeRegistroModal, startRegistrar } = useAuditoriaStore();
  const [form, setForm] = useState<FormState>(initialForm(userId ?? ''));

  useEffect(() => {
    if (!isModalOpen) setForm(initialForm(userId ?? ''));
  }, [isModalOpen, userId]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    startRegistrar({ ...form, detalle: form.detalle || undefined });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeRegistroModal} title="Registrar entrada de auditoria" wide>
      {errorMessage && <div className="banner banner-error">{errorMessage}</div>}

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="servicioOrigen">Servicio de origen</label>
            <input id="servicioOrigen" name="servicioOrigen" value={form.servicioOrigen} onChange={onChange} required />
          </div>

          <div className="field">
            <label htmlFor="entidadAfectada">Entidad afectada</label>
            <input
              id="entidadAfectada"
              name="entidadAfectada"
              value={form.entidadAfectada}
              onChange={onChange}
              placeholder="Paciente, Cita, Receta..."
              required
            />
          </div>

          <div className="field">
            <label htmlFor="entidadId">Id de la entidad</label>
            <input id="entidadId" name="entidadId" value={form.entidadId} onChange={onChange} required />
          </div>

          <div className="field">
            <label htmlFor="accion">Accion</label>
            <select id="accion" name="accion" value={form.accion} onChange={onChange}>
              <option value="CREACION">Creacion</option>
              <option value="ACTUALIZACION">Actualizacion</option>
              <option value="CAMBIO_ESTADO">Cambio de estado</option>
              <option value="ELIMINACION">Eliminacion</option>
              <option value="CONSULTA">Consulta</option>
            </select>
          </div>

          <div className="field field-full">
            <label htmlFor="usuarioId">Usuario responsable (id)</label>
            <input id="usuarioId" name="usuarioId" value={form.usuarioId} onChange={onChange} required />
          </div>

          <div className="field field-full">
            <label htmlFor="detalle">Detalle (opcional)</label>
            <textarea id="detalle" name="detalle" rows={3} value={form.detalle} onChange={onChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={closeRegistroModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading && <span className="spinner" />}
            Registrar
          </button>
        </div>
      </form>
    </Modal>
  );
};
