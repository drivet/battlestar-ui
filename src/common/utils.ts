import { format } from 'date-fns';
import { Observable } from 'rxjs';

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss');
}

export function fromEventSource(eventSource: EventSource): Observable<MessageEvent> {
  return new Observable((observer) => {
    eventSource.onmessage = (x: MessageEvent) => observer.next(x);
    eventSource.onerror = (x) => observer.error(x);
    return () => {
      eventSource.close();
    };
  });
}

export function fromEventSourceUrl(url: string): Observable<MessageEvent> {
  return fromEventSource(new EventSource(url));
}
