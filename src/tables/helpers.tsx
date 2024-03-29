import { Invite } from './table-models';

export function acceptIcon(): JSX.Element {
  return (
    <span className="icon is-small has-text-success">
      <i className="fas fa-check"></i>
    </span>
  );
}

export function rejectIcon(): JSX.Element {
  return (
    <span className="icon is-small has-text-danger">
      <i className="fas fa-times-circle"></i>
    </span>
  );
}

export function pendingIcon(): JSX.Element {
  return (
    <span className="icon is-small has-text-warning">
      <i className="fas fa-exclamation-circle"></i>
    </span>
  );
}

export function inviteStatus(invite: Invite): JSX.Element {
  if (invite.status === 'accepted') {
    return <div title="Invite accepted">{acceptIcon()}</div>;
  } else if (invite.status === 'rejected') {
    return <div title="Invite rejected">{rejectIcon()}</div>;
  } else {
    return <div title="Invite pending">{pendingIcon()}</div>;
  }
}
