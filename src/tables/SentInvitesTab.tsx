import { format } from 'date-fns';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { GuestList } from './GuestList';
import { InvitePanel } from './InvitePanel';
import { Table } from './table-models';
import { createInvite } from './table-service';

function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss');
}

function createButton(): JSX.Element {
  return <NavLink to="/create-table">New table</NavLink>;
}

function noTables(): JSX.Element {
  return <div>No tables</div>;
}

export interface SentInvitesProps {
  tables: Table[];
  onDelete: (tableId: string) => void;
  onInvite: () => void;
}

export function SentInvitesTab(props: SentInvitesProps): JSX.Element {
  const user = useFirebaseAuth();
  const [inviteTable, setInviteTable] = useState<Table | null>(null);

  async function handleSelect(table: Table | null, invited: string): Promise<void> {
    if (!table || !user) {
      return;
    }
    await createInvite(await user.getIdToken(), table._id, invited);
    setInviteTable(null);
    props.onInvite();
  }

  function inviteModal() {
    return (
      <div className={`modal ${inviteTable ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <InvitePanel onSelectFn={(invited: string) => handleSelect(inviteTable, invited)} />
        </div>
        <button className="modal-close is-large" onClick={() => setInviteTable(null)}></button>
      </div>
    );
  }

  function tableList(tables: Table[]): JSX.Element {
    return (
      <table className="table">
        <thead>{tableHeader()}</thead>
        <tbody>{tables.map((t) => tableRow(t))}</tbody>
      </table>
    );
  }

  function tableHeader(): JSX.Element {
    return (
      <tr>
        <th></th>
        <th>Created on</th>
        <th>Seats</th>
        <th>Bots</th>
        <th>Guests</th>
      </tr>
    );
  }

  function tableRow(table: Table): JSX.Element {
    return (
      <tr>
        <td>
          <button className="delete" onClick={(_e) => props.onDelete(table._id)} />
        </td>
        <td>{formatDate(table.createdAt)}</td>
        <td>{table.seats}</td>
        <td>{table.bots}</td>
        <td>
          <GuestList table={table} inviteFn={() => setInviteTable(table)} />
        </td>
      </tr>
    );
  }

  return (
    <div>
      {inviteModal()}
      {createButton()}
      {props.tables.length > 0 ? tableList(props.tables) : noTables()}
    </div>
  );
}
