import { Invite, Table } from './table-models';
import { canInvite } from './table-utils';

export interface GuestListProps {
  table: Table;
  inviteFn: () => void;
}

export function GuestList(props: GuestListProps): JSX.Element {
  function inviteButton(): JSX.Element {
    return (
      <button className="button is-small" onClick={() => props.inviteFn()}>
        Invite
      </button>
    );
  }

  function inviteLine(invite: Invite): JSX.Element {
    return <div>{invite.recipientUsername}</div>;
  }

  return (
    <div>
      {canInvite(props.table) ? inviteButton() : null}
      {props.table.invitations?.map((invite) => inviteLine(invite))}
    </div>
  );
}
