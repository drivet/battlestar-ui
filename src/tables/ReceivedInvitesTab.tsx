import { formatDate } from '../common/utils';
import { Table } from './table-models';

function noTables(): JSX.Element {
  return <div>No tables</div>;
}

export interface ReceivedInvitesProps {
  tables: Table[];
}

export function ReceivedInvitesTab(props: ReceivedInvitesProps): JSX.Element {
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
      </tr>
    );
  }

  function tableRow(table: Table): JSX.Element {
    return (
      <tr>
        <td>{formatDate(table.createdAt)}</td>
        <td>{table.seats}</td>
        <td>{table.bots}</td>
      </tr>
    );
  }

  return <div>{props.tables.length > 0 ? tableList(props.tables) : noTables()}</div>;
}
