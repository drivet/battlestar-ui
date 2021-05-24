import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useFirebaseAuth } from './firebase/firebase-auth';
import { Profile } from './profiles/profile-models';
import { getProfile } from './profiles/profile-service';

export const Page: React.FC = ({ children }) => {
  const user = useFirebaseAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function profile() {
      if (user) {
        setProfile(await getProfile(user.uid));
      }
    }
    profile();
  }, [user?.uid]);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-item">Home</div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/">
              Invitations
            </NavLink>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">Welcome {profile?.username}</div>
            <a className="navbar-item" onClick={() => firebase.auth().signOut()}>
              Sign out
            </a>
          </div>
        </div>
      </nav>
      <main className="section">{children}</main>
    </div>
  );
};
