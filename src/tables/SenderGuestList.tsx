import { inviteStatus } from './helpers';
import { Invite, Table } from './table-models';

export interface SenderGuestListProps {
  table: Table;
  inviteFn: () => void;
  deleteFn: (invite: Invite) => void;
}

export function SenderGuestList(props: SenderGuestListProps): JSX.Element {
  function inviteLine(invite: Invite): JSX.Element {
    return (
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <button
              title="Delete invite"
              className="delete is-small"
              onClick={() => props.deleteFn(invite)}
            />
          </div>
          <div className="level-item">{inviteStatus(invite)}</div>
          <div className="level-item">{invite.recipientUsername}</div>
        </div>
      </div>
    );
  }

  return <div>{props.table.invitations?.map((invite) => inviteLine(invite))}</div>;
}
