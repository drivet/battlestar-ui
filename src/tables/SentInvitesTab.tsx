import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { formatDate } from '../common/utils';
import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Username } from '../profiles/profile-models';
import { InvitePanel } from './InvitePanel';
import { SenderGuestList } from './SenderGuestList';
import { Invite, InviteCreatePayload, Table } from './table-models';
import { createInvite, deleteInvite } from './table-service';

function createButton(): JSX.Element {
  return <NavLink to="/create-table">New table</NavLink>;
}

function noTables(): JSX.Element {
  return <div>No tables</div>;
}

export interface SentInvitesProps {
  tables: Table[];
  onTableDelete: (tableId: string) => void;
  onInvite: () => void;
}

export function SentInvitesTab(props: SentInvitesProps): JSX.Element {
  const user = useFirebaseAuth();
  const [inviteTable, setInviteTable] = useState<Table | null>(null);

  async function handleInviteDelete(table: Table, invite: Invite) {
    if (!user) {
      return;
    }
    await deleteInvite(await user.getIdToken(true), table._id, invite.recipient);
  }

  async function handleRecipientSelect(
    table: Table | null,
    recipient: string,
    payload: InviteCreatePayload
  ): Promise<void> {
    if (!table || !user) {
      return;
    }
    await createInvite(await user.getIdToken(), table._id, recipient, payload);
    setInviteTable(null);
    props.onInvite();
  }

  function inviteModal() {
    return (
      <div className={`modal ${inviteTable ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <InvitePanel
            onSelectFn={(recipient: Username) =>
              handleRecipientSelect(inviteTable, recipient._id, {
                recipientUsername: recipient.username,
              })
            }
          />
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
          <button className="delete" onClick={(_e) => props.onTableDelete(table._id)} />
        </td>
        <td>{formatDate(table.createdAt)}</td>
        <td>{table.seats}</td>
        <td>{table.bots}</td>
        <td>
          <SenderGuestList
            table={table}
            inviteFn={() => setInviteTable(table)}
            deleteFn={(invite) => handleInviteDelete(table, invite)}
          />
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
