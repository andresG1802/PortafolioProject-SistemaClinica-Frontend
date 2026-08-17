// Espejo de los DTOs del backend (api-gateway -> pacientes/expedientes/citas/recetas/auditoria-service).

export type Role = 'ADMIN' | 'MEDICO' | 'ENFERMERO' | 'PACIENTE';

// ----- pacientes-service -----

export type TipoDocumento = 'DNI' | 'CARNET_EXTRANJERIA' | 'PASAPORTE';
export type Genero = 'MASCULINO' | 'FEMENINO' | 'OTRO';

export interface Paciente {
  id: string;
  nombres: string;
  apellidos: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  fechaNacimiento: string;
  genero: Genero;
  telefono?: string;
  email?: string;
  direccion?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PacienteRequest {
  nombres: string;
  apellidos: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  fechaNacimiento: string;
  genero: Genero;
  telefono?: string;
  email?: string;
  direccion?: string;
}

// ----- expedientes-service -----

export type TipoEntrada = 'DIAGNOSTICO' | 'NOTA_EVOLUCION' | 'PRESCRIPCION' | 'RESULTADO_LABORATORIO' | 'ALERGIA';

export interface EntradaExpediente {
  id: string;
  pacienteId: string;
  tipo: TipoEntrada;
  contenido: string;
  profesionalId: string;
  entradaAnteriorId?: string;
  creadoEn: string;
}

export interface EntradaExpedienteRequest {
  pacienteId: string;
  tipo: TipoEntrada;
  contenido: string;
  profesionalId: string;
  entradaAnteriorId?: string;
}

// ----- citas-service -----

export type EstadoCita = 'PROGRAMADA' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA' | 'NO_ASISTIO';

export interface Cita {
  id: string;
  pacienteId: string;
  profesionalId: string;
  fechaHora: string;
  motivo: string;
  estado: EstadoCita;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CitaRequest {
  pacienteId: string;
  profesionalId: string;
  fechaHora: string;
  motivo: string;
  notas?: string;
}

export interface CambioEstadoCitaRequest {
  estado: EstadoCita;
}

// ----- recetas-service -----

export type EstadoReceta = 'ACTIVA' | 'DISPENSADA' | 'ANULADA';

export interface Receta {
  id: string;
  pacienteId: string;
  profesionalId: string;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracionDias: number;
  indicaciones?: string;
  estado: EstadoReceta;
  createdAt: string;
  updatedAt: string;
}

export interface RecetaRequest {
  pacienteId: string;
  profesionalId: string;
  medicamento: string;
  dosis: string;
  frecuencia: string;
  duracionDias: number;
  indicaciones?: string;
}

export interface CambioEstadoRecetaRequest {
  estado: EstadoReceta;
}

// ----- auditoria-service -----

export type AccionAuditoria = 'CREACION' | 'ACTUALIZACION' | 'CAMBIO_ESTADO' | 'ELIMINACION' | 'CONSULTA';

export interface RegistroAuditoria {
  id: string;
  servicioOrigen: string;
  entidadAfectada: string;
  entidadId: string;
  accion: AccionAuditoria;
  usuarioId: string;
  detalle?: string;
  creadoEn: string;
}

export interface RegistroAuditoriaRequest {
  servicioOrigen: string;
  entidadAfectada: string;
  entidadId: string;
  accion: AccionAuditoria;
  usuarioId: string;
  detalle?: string;
}

// ----- error generico del backend (GlobalExceptionHandler de cada servicio) -----

export interface ApiErrorBody {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  errores?: Record<string, string>;
}
