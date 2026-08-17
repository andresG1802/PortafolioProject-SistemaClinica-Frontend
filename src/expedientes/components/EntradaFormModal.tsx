import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Modal } from '../../components';
import { useAuthStore, useExpedientesStore, usePacientesStore } from '../../hooks';
import type { TipoEntrada } from '../../types';

interface FormState {
  tipo: TipoEntrada;
  contenido: string;
  entradaAnteriorId: string;
}

const initialForm: FormState = { tipo: 'NOTA_EVOLUCION', contenido: '', entradaAnteriorId: '' };

export const EntradaFormModal = () => {
  const { userId } = useAuthStore();
  const { activePaciente } = usePacientesStore();
  const { entradas, isModalOpen, isLoading, errorMessage, closeEntradaModal, startAgregarEntrada } = useExpedientesStore();
  const [form, setForm] = useState<FormState>(initialForm);

  useEffect(() => {
    if (!isModalOpen) setForm(initialForm);
  }, [isModalOpen]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!activePaciente || !userId) return;
    startAgregarEntrada({
      pacienteId: activePaciente.id,
      tipo: form.tipo,
      contenido: form.contenido,
      profesionalId: userId,
      entradaAnteriorId: form.entradaAnteriorId || undefined,
    });
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closeEntradaModal} title={`Nueva entrada para ${activePaciente?.nombres ?? ''}`} wide>
      {errorMessage && <div className="banner banner-error">{errorMessage}</div>}

      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="tipo">Tipo de entrada</label>
          <select id="tipo" name="tipo" value={form.tipo} onChange={onChange}>
            <option value="DIAGNOSTICO">Diagnostico</option>
            <option value="NOTA_EVOLUCION">Nota de evolucion</option>
            <option value="PRESCRIPCION">Prescripcion</option>
            <option value="RESULTADO_LABORATORIO">Resultado de laboratorio</option>
            <option value="ALERGIA">Alergia</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="contenido">Contenido</label>
          <textarea id="contenido" name="contenido" rows={4} value={form.contenido} onChange={onChange} required />
        </div>

        {entradas.length > 0 && (
          <div className="field">
            <label htmlFor="entradaAnteriorId">Corrige a la entrada (opcional)</label>
            <select id="entradaAnteriorId" name="entradaAnteriorId" value={form.entradaAnteriorId} onChange={onChange}>
              <option value="">Ninguna, es una entrada nueva</option>
              {entradas.map((entrada) => (
                <option key={entrada.id} value={entrada.id}>
                  {entrada.tipo} — {entrada.contenido.slice(0, 40)}
                </option>
              ))}
            </select>
            <span className="field-hint">El expediente es append-only: una correccion se registra como entrada nueva.</span>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={closeEntradaModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading && <span className="spinner" />}
            Agregar entrada
          </button>
        </div>
      </form>
    </Modal>
  );
};
