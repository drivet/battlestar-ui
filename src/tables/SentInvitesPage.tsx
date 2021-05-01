import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Table } from '../services/table-models';
import { getSentInvites } from '../services/table-service';
import { TablePage } from './TablePage';

function noTables() {
  return <div>No tables</div>;
}

function tableList(tables: Table[]): JSX.Element {
  return (
    <div>
      {tableHeader()}
      {tables.map((t) => tableRow(t))}
    </div>
  );
}

function tableHeader(): JSX.Element {
  return (
    <div>
      <div>Created on</div>
      <div>Seats</div>
      <div>Bots</div>
    </div>
  );
}

function tableRow(table: Table): JSX.Element {
  return (
    <div>
      <div>{table.createdAt}</div>
      <div>{table.seats}</div>
      <div>{table.bots}</div>
    </div>
  );
}

function createButton(): JSX.Element {
  return <NavLink to="/create-table">New table</NavLink>;
}

export function SentInvitesPage(): JSX.Element {
  const user = useFirebaseAuth();
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    async function fetchAndSet() {
      if (user) {
        const data = await getSentInvites(await user.getIdToken(true), user.uid);
        setTables(data);
      }
    }
    fetchAndSet();
  }, []);

  return (
    <TablePage>
      {createButton()}
      {tables.length > 0 ? tableList(tables) : noTables()}
    </TablePage>
  );
}
