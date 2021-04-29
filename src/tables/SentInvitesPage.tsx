import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../common/AuthProvider';
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
  const { authInfo } = useAuth();
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    async function fetchAndSet() {
      if (!authInfo.authToken || !authInfo.profile) {
        return;
      }
      const data = await getSentInvites(authInfo.authToken, authInfo.profile.id);
      setTables(data);
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
