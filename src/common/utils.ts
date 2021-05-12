import { format } from 'date-fns';

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss');
}
