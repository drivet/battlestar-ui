import firebase from 'firebase';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const Page: React.FC = ({ children }) => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <NavLink className="navbar-item" to="/invitations">
              Invitations
            </NavLink>
          </div>
          <div className="navbar-end">
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
