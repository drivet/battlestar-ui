import { useState } from 'react';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Username } from '../profiles/profile-models';
import { getUsernames } from '../profiles/profile-service';

export interface InvitePanelProps {
  onSelectFn: (guest: Username) => void;
}

export function InvitePanel(props: InvitePanelProps): JSX.Element {
  const user = useFirebaseAuth();
  const [username, setUsername] = useState('');
  const [updating, setUpdating] = useState(false);
  const [badName, setBadName] = useState<string | null>(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      return;
    }
    setUpdating(true);
    setBadName(null);
    const usernameObjs = await getUsernames(await user.getIdToken(true), username);
    setUpdating(false);
    if (!usernameObjs.length) {
      setBadName(username);
    } else {
      props.onSelectFn(usernameObjs[0]);
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
              onChange={(e) => setUsername(e.target.value)}
              value={username}
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
