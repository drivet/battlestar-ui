import { concat, from, Observable } from 'rxjs';
import { scan, shareReplay, switchMap } from 'rxjs/operators';

import { FullChangeEvent } from './table-change-models';
import { getTablesChanges } from './table-changes';
import { Table } from './table-models';
import { getTables } from './table-service';

export function getTables$(user: string, token: string): Observable<Table[]> {
  // hot observable, shareReplay queues up changes
  const changes$ = getTablesChanges(token).pipe(shareReplay());

  // Standard AJAX call, with share replay to reuse chached value later
  const tables$ = from(getTables()).pipe(shareReplay(1));

  // load the initial table list and feed it to the scan operator,
  // which will merge each change into the list
  const changedTables$ = tables$.pipe(
    switchMap((tables: Table[]) =>
      changes$.pipe(scan((tables, change) => mergeChange(user, tables, change), tables))
    )
  );

  return concat(tables$, changedTables$);
}

function mergeChange(user: string, tables: Table[], change: FullChangeEvent<Table>): Table[] {
  const index = tables.findIndex((t) => t._id === change.documentKey);
  if (index !== -1) {
    if (change.operationType === 'delete') {
      tables.splice(index, 1);
    } else if (change.operationType === 'replace' || change.operationType === 'update') {
      const inList = change.fullDocument.invitations?.map((i) => i.recipient).includes(user);
      if (inList) {
        tables[index] = change.fullDocument;
      } else {
        tables.splice(index, 1);
      }
    } else if (change.operationType === 'insert') {
      console.warn('Got insert change for pre-existent table, ignoring');
    }
  } else {
    if (change.operationType === 'delete') {
      console.warn('Got delete change for non-existent table, ignoring');
    } else if (change.operationType === 'insert') {
      tables.push(change.fullDocument);
    } else if (change.operationType === 'replace' || change.operationType === 'update') {
      console.warn('Got update change for non-existent table, treating as insert');
      tables.push(change.fullDocument);
    }
  }
  return [...tables];
}
