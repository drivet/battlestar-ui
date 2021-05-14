import { formatDate } from '../common/utils';
import { useFirebaseAuth } from '../firebase/firebase-auth';
import { RecipientGuestList } from './RecipientGuestList';
import { InviteStatus, Table } from './table-models';

function noTables(): JSX.Element {
  return <div>No tables</div>;
}

export interface ReceivedInvitesProps {
  tables: Table[];
  onInviteUpdate: (table: Table, recipient: string, status: InviteStatus) => void;
}

export function ReceivedInvitesTab(props: ReceivedInvitesProps): JSX.Element {
  const user = useFirebaseAuth();

  function handleInviteStatus(table, recipient: string, status: InviteStatus) {
    props.onInviteUpdate(table, recipient, status);
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
        <td>{formatDate(table.createdAt)}</td>
        <td>{table.seats}</td>
        <td>{table.bots}</td>
        <td>
          <RecipientGuestList
            table={table}
            user={user?.uid}
            inviteStatusFn={(recipient, status) => handleInviteStatus(table, recipient, status)}
          />
        </td>
      </tr>
    );
  }

  return <div>{props.tables.length > 0 ? tableList(props.tables) : noTables()}</div>;
}
