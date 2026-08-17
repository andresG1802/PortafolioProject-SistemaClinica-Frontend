import { isAxiosError } from 'axios';
import type { ApiErrorBody } from '../types';

// Todos los GlobalExceptionHandler del backend devuelven el mismo shape { message, errores? }.
// Este helper lo desenreda una sola vez para no repetir el mismo try/catch en cada hook.
export function extractErrorMessage(error: unknown, fallback: string): string {
  if (isAxiosError<ApiErrorBody>(error)) {
    const body = error.response?.data;
    if (body?.errores) {
      return Object.values(body.errores).join(', ');
    }
    if (body?.message) {
      return body.message;
    }
  }
  return fallback;
}
