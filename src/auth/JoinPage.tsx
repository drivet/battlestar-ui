import firebase from 'firebase';
import { useState } from 'react';

export function JoinPage(): JSX.Element {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    await userCred.user?.sendEmailVerification();
    setIsEmailSent(true);
  }

  function joinForm() {
    return (
      <div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password (8 characters minimum):</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={8}
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Sign up" onClick={(e) => handleSubmit(e)}></input>
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

  return isEmailSent ? successJoin() : joinForm();
}
