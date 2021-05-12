import firebase from 'firebase';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Page: React.FC = ({ children }) => {
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
            <NavLink className="navbar-item" to="/profile">
              Profile
            </NavLink>
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
