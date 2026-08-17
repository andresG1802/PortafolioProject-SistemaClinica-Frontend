import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Modal } from '../../components';
import { useAuthStore, useCitasStore, usePacientesStore } from '../../hooks';

interface FormState {
  fechaHora: string;
  motivo: string;
  notas: string;
}

const initialForm: FormState = { fechaHora: '', motivo: '', notas: '' };

export const CitaFormModal = () => {
  const { userId } = useAuthStore();
  const { activePaciente } = usePacientesStore();
  const { isModalOpen, isLoading, errorMessage, closeCitaModal, startAgendarCita } = useCitasStore();
  const [form, setForm] = useState<FormState>(initialForm);

  useEffect(() => {
    if (!isModalOpen) setForm(initialForm);
  }, [isModalOpen]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!activePaciente || !userId) return;
    startAgendarCita({
      pacienteId: activePaciente.id,
      profesionalId: userId,
      fechaHora: form.fechaHora,
      motivo: form.motivo,
      notas: form.notas || undefined,
    });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeCitaModal} title={`Agendar cita para ${activePaciente?.nombres ?? ''}`}>
      {errorMessage && <div className="banner banner-error">{errorMessage}</div>}

      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="fechaHora">Fecha y hora</label>
          <input id="fechaHora" type="datetime-local" name="fechaHora" value={form.fechaHora} onChange={onChange} required />
        </div>

        <div className="field">
          <label htmlFor="motivo">Motivo</label>
          <input id="motivo" name="motivo" value={form.motivo} onChange={onChange} required />
        </div>

        <div className="field">
          <label htmlFor="notas">Notas (opcional)</label>
          <textarea id="notas" name="notas" rows={3} value={form.notas} onChange={onChange} />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={closeCitaModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading && <span className="spinner" />}
            Agendar
          </button>
        </div>
      </form>
    </Modal>
  );
};
