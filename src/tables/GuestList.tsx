import { Invite, Table } from './table-models';
import { canInvite } from './table-utils';

export interface GuestListProps {
  table: Table;
}

export function GuestList(props: GuestListProps): JSX.Element {
  function inviteButton(): JSX.Element {
    return <button className="button is-small">Invite</button>;
  }

  function inviteLine(invite: Invite): JSX.Element {
    return <div>{invite.invitee}</div>;
  }

  return (
    <div>
      {canInvite(props.table) ? inviteButton() : null}
      {props.table.invitations?.map((invite) => inviteLine(invite))}
    </div>
  );
}
