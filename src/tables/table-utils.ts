import { Table } from './table-models';

export function canInvite(table: Table): boolean {
  const inviteQuota = table.seats - table.bots - 1;
  const invitations = table.invitations ? table.invitations.length : 0;
  return invitations < inviteQuota;
}
