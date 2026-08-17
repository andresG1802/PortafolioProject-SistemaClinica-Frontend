import { format as formatDateFns } from 'date-fns';
import { es } from 'date-fns/locale';

export function formatDateTime(iso: string): string {
  return formatDateFns(new Date(iso), 'dd/MM/yyyy HH:mm', { locale: es });
}

export function formatDate(iso: string): string {
  return formatDateFns(new Date(iso), 'dd/MM/yyyy', { locale: es });
}
