import { useEffect, useState } from 'react';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { Page } from '../Page';
import { getProfile, updateProfile } from './profile-service';

export function EditProfilePage(): JSX.Element {
  const [nickname, setNickname] = useState('');
  const [updating, setUpdating] = useState(false);
  const user = useFirebaseAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!user) {
      throw new Error('user not signed in (user is null)');
    }
    setUpdating(true);
    await updateProfile(await user.getIdToken(true), { nickname }, user.uid);
    setUpdating(false);
  }

  async function load() {
    if (user) {
      const profile = await getProfile(await user.getIdToken(true), user.uid);
      if (!profile) {
        throw new Error(`Could not find profile for ${user.uid}`);
      }
      setNickname(profile.nickname);
    }
  }

  useEffect(() => {
    load();
  }, [user ? user.uid : undefined]);

  return (
    <Page>
      <h1 className="title">Edit Profile</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="field">
          <label className="label" htmlFor="nickname">
            Nickname:
          </label>
          <input
            className="input"
            type="text"
            name="nickname"
            placeholder="Nickname"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
          />
        </div>
        <button className={`button ${updating ? 'is-loading' : ''}`}>Update</button>
      </form>
    </Page>
  );
}
