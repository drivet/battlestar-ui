import { Invite, Table } from './table-models';
import { canInvite } from './table-utils';

function inviteStatus(invite: Invite): JSX.Element {
  if (invite.status === 'accepted') {
    return (
      <span className="has-text-success">
        <i className="fas fa-check"></i>
      </span>
    );
  } else if (invite.status === 'rejected') {
    return (
      <span className="has-text-danger">
        <i className="fas fa-times-circle"></i>
      </span>
    );
  } else {
    return (
      <span className="has-text-warning">
        <i className="fas fa-exclamation-circle"></i>
      </span>
    );
  }
}

export interface SenderGuestListProps {
  table: Table;
  inviteFn: () => void;
  deleteFn: (invite: Invite) => void;
}

export function SenderGuestList(props: SenderGuestListProps): JSX.Element {
  function inviteButton(): JSX.Element {
    return (
      <button className="button is-small" onClick={() => props.inviteFn()}>
        Invite
      </button>
    );
  }

  function inviteLine(invite: Invite): JSX.Element {
    return (
      <div className="columns">
        <div className="column">{inviteStatus(invite)}</div>
        <div className="column">{invite.recipientUsername}</div>
        <div className="column">
          <button className="delete" onClick={() => props.deleteFn(invite)} />
        </div>
      </div>
    );
  }

  return (
    <div className="columns">
      <div className="column">{props.table.invitations?.map((invite) => inviteLine(invite))}</div>
      <div className="column">{canInvite(props.table) ? inviteButton() : null}</div>
    </div>
  );
}
