import { Table } from './table-models';

export interface ReceivedInvitesProps {
  tables: Table[];
}

export function ReceivedInvitesTab(props: ReceivedInvitesProps): JSX.Element {
  return <div>Tables {props.tables ? props.tables.length : 0}</div>;
}
