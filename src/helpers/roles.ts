import type { Role } from '../types';

// La UI solo oculta botones para roles que el backend igual rechazaria con 403 (RBAC real
// vive en api-gateway/SecurityConfig); esto es puramente cosmetico. Ver el README para el
// detalle de que ruta exige que rol.

export function esAdmin(roles: Role[]): boolean {
  return roles.includes('ADMIN');
}

// MEDICO/ADMIN: puede escribir en expedientes y recetas (coincide con el RBAC real del gateway).
export function esMedico(roles: Role[]): boolean {
  return roles.includes('MEDICO') || roles.includes('ADMIN');
}

// MEDICO/ENFERMERO/ADMIN: puede agendar/cambiar el estado de citas, y en la UI tambien
// gestiona pacientes (el backend deja que PACIENTE tambien escriba /api/pacientes, pero no
// tiene sentido que un paciente edite el registro de otro paciente desde esta UI).
export function esPersonalClinico(roles: Role[]): boolean {
  return roles.includes('MEDICO') || roles.includes('ENFERMERO') || roles.includes('ADMIN');
}
