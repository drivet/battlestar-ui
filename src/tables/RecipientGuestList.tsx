import { acceptIcon, inviteStatus, rejectIcon } from './helpers';
import { Invite, InviteStatus, Table } from './table-models';

export interface RecipientGuestListProps {
  table: Table;
  user: string | undefined;
  inviteStatusFn: (recipient: string, status: InviteStatus) => void;
}

export function RecipientGuestList(props: RecipientGuestListProps): JSX.Element {
  function acceptButton(invite: Invite): JSX.Element {
    const disabled = invite.status === 'accepted';
    return (
      <button
        title="Accept invite"
        className="button is-small"
        disabled={disabled}
        onClick={() => props.inviteStatusFn(invite.recipient, 'accepted')}
      >
        {acceptIcon()}
      </button>
    );
  }

  function rejectButton(invite: Invite): JSX.Element {
    const disabled = invite.status === 'rejected';
    return (
      <button
        title="Reject invite"
        className="button is-small"
        disabled={disabled}
        onClick={() => props.inviteStatusFn(invite.recipient, 'rejected')}
      >
        {rejectIcon()}
      </button>
    );
  }

  function recipientControls(invite: Invite): JSX.Element {
    return (
      <div className="level">
        <div className="level-right">
          <div className="level-item">{acceptButton(invite)}</div>
          <div className="level-item">{rejectButton(invite)}</div>
        </div>
      </div>
    );
  }

  function inviteLine(invite: Invite): JSX.Element {
    return (
      <div className="columns">
        <div className="column">{inviteStatus(invite)}</div>
        <div className="column">{invite.recipientUsername}</div>
        <div className="column">
          {invite.recipient === props.user ? recipientControls(invite) : null}
        </div>
      </div>
    );
  }

  return <div>{props.table.invitations?.map((invite) => inviteLine(invite))}</div>;
}
