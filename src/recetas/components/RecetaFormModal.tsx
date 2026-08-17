import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Modal } from '../../components';
import { useAuthStore, usePacientesStore, useRecetasStore } from '../../hooks';

interface FormState {
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracionDias: string;
  indicaciones: string;
}

const initialForm: FormState = { medicamento: '', dosis: '', frecuencia: '', duracionDias: '7', indicaciones: '' };

export const RecetaFormModal = () => {
  const { userId } = useAuthStore();
  const { activePaciente } = usePacientesStore();
  const { isModalOpen, isLoading, errorMessage, closeRecetaModal, startPrescribir } = useRecetasStore();
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
    startPrescribir({
      pacienteId: activePaciente.id,
      profesionalId: userId,
      medicamento: form.medicamento,
      dosis: form.dosis,
      frecuencia: form.frecuencia,
      duracionDias: Number(form.duracionDias),
      indicaciones: form.indicaciones || undefined,
    });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeRecetaModal} title={`Prescribir a ${activePaciente?.nombres ?? ''}`} wide>
      {errorMessage && <div className="banner banner-error">{errorMessage}</div>}

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="medicamento">Medicamento</label>
            <input id="medicamento" name="medicamento" value={form.medicamento} onChange={onChange} required />
          </div>

          <div className="field">
            <label htmlFor="dosis">Dosis</label>
            <input id="dosis" name="dosis" value={form.dosis} onChange={onChange} placeholder="500 mg" required />
          </div>

          <div className="field">
            <label htmlFor="frecuencia">Frecuencia</label>
            <input id="frecuencia" name="frecuencia" value={form.frecuencia} onChange={onChange} placeholder="Cada 8 horas" required />
          </div>

          <div className="field">
            <label htmlFor="duracionDias">Duracion (dias)</label>
            <input
              id="duracionDias"
              type="number"
              min="1"
              name="duracionDias"
              value={form.duracionDias}
              onChange={onChange}
              required
            />
          </div>

          <div className="field field-full">
            <label htmlFor="indicaciones">Indicaciones (opcional)</label>
            <textarea id="indicaciones" name="indicaciones" rows={3} value={form.indicaciones} onChange={onChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={closeRecetaModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading && <span className="spinner" />}
            Prescribir
          </button>
        </div>
      </form>
    </Modal>
  );
};
