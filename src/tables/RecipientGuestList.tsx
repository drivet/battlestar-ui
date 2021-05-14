import { acceptIcon, inviteStatus, rejectIcon } from './helpers';
import { Invite, InviteStatus, Table } from './table-models';

export interface RecipientGuestListProps {
  table: Table;
  user: string | undefined;
  inviteStatusFn: (recipient: string, status: InviteStatus) => void;
}

export function RecipientGuestList(props: RecipientGuestListProps): JSX.Element {
  function acceptButton(invite: Invite): JSX.Element {
    return (
      <button
        className="button is-small"
        onClick={() => props.inviteStatusFn(invite.recipient, 'accepted')}
      >
        {acceptIcon()}
      </button>
    );
  }

  function rejectButton(invite: Invite): JSX.Element {
    return (
      <button
        className="button is-small"
        onClick={() => props.inviteStatusFn(invite.recipient, 'rejected')}
      >
        {rejectIcon()}
      </button>
    );
  }

  function recipientControls(invite: Invite): JSX.Element {
    return (
      <div className="columns">
        <div className="column">{acceptButton(invite)}</div>
        <div className="column">{rejectButton(invite)}</div>
      </div>
    );
  }

  function inviteLine(invite: Invite): JSX.Element {
    return (
      <div className="columns">
        <div className="column">{inviteStatus(invite)}</div>
        <div className="column">{invite.recipientUsername}</div>
        <div className="column">
          {invite.recipient === props.user ? recipientControls(invite) : inviteStatus(invite)}
        </div>
      </div>
    );
  }

  return <div>{props.table.invitations?.map((invite) => inviteLine(invite))}</div>;
}
