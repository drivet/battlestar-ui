import { useState } from 'react';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { getProfileByNickname } from '../profiles/profile-service';

export interface InvitePanelProps {
  onSelectFn: (guest: string) => void;
}

export function InvitePanel(props: InvitePanelProps): JSX.Element {
  const user = useFirebaseAuth();
  const [nickname, setNickname] = useState('');
  const [updating, setUpdating] = useState(false);
  const [badName, setBadName] = useState<string | null>(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      return;
    }
    setUpdating(true);
    setBadName(null);
    const profile = await getProfileByNickname(await user.getIdToken(true), nickname);
    setUpdating(false);
    if (!profile) {
      setBadName(nickname);
    } else {
      props.onSelectFn(profile.nickname);
    }
  }

  function errorMessage() {
    return (
      <div className="message is-danger">
        <div className="message-body">{badName} does not exist</div>
      </div>
    );
  }

  return (
    <div>
      <form className="content" onSubmit={(e) => handleSubmit(e)}>
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              name="nickname"
              placeholder="Enter nickname"
              onChange={(e) => setNickname(e.target.value)}
              value={nickname}
            />
          </div>
          <div className="control">
            <button className={`button ${updating ? 'is-loading' : ''}`}>Search</button>
          </div>
        </div>
      </form>
      {badName ? errorMessage() : null}
    </div>
  );
}
