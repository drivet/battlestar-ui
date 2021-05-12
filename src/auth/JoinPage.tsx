import firebase from 'firebase';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { createProfile } from '../profiles/profile-service';

export function JoinPage(): JSX.Element {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (!userCred.user) {
      return;
    }
    const user = userCred.user;

    const authToken = await user.getIdToken();
    await createProfile(authToken, user.uid, { username });
    await userCred.user.sendEmailVerification();
    setIsEmailSent(true);
  }

  function joinForm() {
    return (
      <div>
        <div className="hero">
          <h1 className="title">Battlestar Galactica</h1>
        </div>
        <div className="section columns">
          <div className="column is-half is-offset-one-quarter">
            <div className="card">
              <div className="card-content">
                <h2 className="title">Sign up</h2>
                <form>
                  <div className="field">
                    <label className="label" htmlFor="username">
                      Username
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        id="username"
                        name="username"
                        required={true}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="email">
                      Email
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="text"
                        id="email"
                        name="email"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        minLength={8}
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <div className="control">
                          <input
                            className="button"
                            type="submit"
                            value="Sign up"
                            onClick={(e) => handleSubmit(e)}
                          />
                        </div>
                      </div>
                      <div className="level-item">
                        <NavLink to="/login">Already have an account?</NavLink>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function successJoin() {
    return (
      <div>
        Success! You should be getting an email. Please follow the link to complete the signup
        process, and then try signing in again.
      </div>
    );
  }

  return <div>{isEmailSent ? successJoin() : joinForm()}</div>;
}
