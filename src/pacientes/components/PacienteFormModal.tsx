import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

import { Modal } from '../../components';
import { usePacientesStore } from '../../hooks';
import type { Genero, TipoDocumento } from '../../types';

interface FormState {
  nombres: string;
  apellidos: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  fechaNacimiento: string;
  genero: Genero;
  telefono: string;
  email: string;
  direccion: string;
}

const initialForm: FormState = {
  nombres: '',
  apellidos: '',
  tipoDocumento: 'DNI',
  numeroDocumento: '',
  fechaNacimiento: '',
  genero: 'MASCULINO',
  telefono: '',
  email: '',
  direccion: '',
};

export const PacienteFormModal = () => {
  const { activePaciente, isModalOpen, isLoading, errorMessage, closePacienteModal, startCreatePaciente, startUpdatePaciente } =
    usePacientesStore();
  const [form, setForm] = useState<FormState>(initialForm);

  const modoEdicion = !!activePaciente;

  useEffect(() => {
    if (!isModalOpen) {
      setForm(initialForm);
      return;
    }
    if (activePaciente) {
      setForm({
        nombres: activePaciente.nombres,
        apellidos: activePaciente.apellidos,
        tipoDocumento: activePaciente.tipoDocumento,
        numeroDocumento: activePaciente.numeroDocumento,
        fechaNacimiento: activePaciente.fechaNacimiento,
        genero: activePaciente.genero,
        telefono: activePaciente.telefono ?? '',
        email: activePaciente.email ?? '',
        direccion: activePaciente.direccion ?? '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const request = {
      ...form,
      telefono: form.telefono || undefined,
      email: form.email || undefined,
      direccion: form.direccion || undefined,
    };
    if (modoEdicion && activePaciente) {
      startUpdatePaciente(activePaciente.id, request);
    } else {
      startCreatePaciente(request);
    }
  };

  return (
    <Modal isOpen={isModalOpen} onClose={closePacienteModal} title={modoEdicion ? 'Editar paciente' : 'Nuevo paciente'} wide>
      {errorMessage && <div className="banner banner-error">{errorMessage}</div>}

      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="nombres">Nombres</label>
            <input id="nombres" name="nombres" value={form.nombres} onChange={onChange} required />
          </div>

          <div className="field">
            <label htmlFor="apellidos">Apellidos</label>
            <input id="apellidos" name="apellidos" value={form.apellidos} onChange={onChange} required />
          </div>

          <div className="field">
            <label htmlFor="tipoDocumento">Tipo de documento</label>
            <select id="tipoDocumento" name="tipoDocumento" value={form.tipoDocumento} onChange={onChange}>
              <option value="DNI">DNI</option>
              <option value="CARNET_EXTRANJERIA">Carnet de extranjeria</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="numeroDocumento">Numero de documento</label>
            <input id="numeroDocumento" name="numeroDocumento" value={form.numeroDocumento} onChange={onChange} required />
          </div>

          <div className="field">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              id="fechaNacimiento"
              type="date"
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={onChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="genero">Genero</label>
            <select id="genero" name="genero" value={form.genero} onChange={onChange}>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMENINO">Femenino</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="telefono">Telefono</label>
            <input id="telefono" name="telefono" value={form.telefono} onChange={onChange} />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={onChange} />
          </div>

          <div className="field field-full">
            <label htmlFor="direccion">Direccion</label>
            <input id="direccion" name="direccion" value={form.direccion} onChange={onChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={closePacienteModal}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading && <span className="spinner" />}
            {modoEdicion ? 'Guardar cambios' : 'Crear paciente'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
