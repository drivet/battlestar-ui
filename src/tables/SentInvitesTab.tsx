import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';

import { Table } from '../services/table-models';

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
}

export function SentInvitesTab(props: SentInvitesProps): JSX.Element {
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
        <td>{table.bots}</td>
      </tr>
    );
  }

  return (
    <div>
      {createButton()}
      {props.tables.length > 0 ? tableList(props.tables) : noTables()}
    </div>
  );
}
