import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { fromEventSourceUrl } from '../common/utils';
import { getConfig } from '../config';
import { FullChangeEvent } from './table-change-models';
import { Table } from './table-models';

const config = getConfig();

/**
 * Get a stream of changes to the table collection
 * This is a hot observable.  As soon as it's created, it starts
 * @param token to authenticate
 * @returns stream of cnanges
 */
export function getTablesChanges(token?: string): Observable<FullChangeEvent<Table>> {
  const url = token
    ? `${config.apiBase}/tables/stream?authorization=${token}`
    : `${config.apiBase}/tables/stream`;
  return fromEventSourceUrl(url).pipe(map((e: MessageEvent) => JSON.parse(e.data)));
}
