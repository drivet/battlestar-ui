import { Location } from 'history';
import { Redirect, Route } from 'react-router-dom';

import { useFirebaseAuth } from '../firebase/firebase-auth';
import { LocationState } from './models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function redirectFrom(location: Location<LocationState>): JSX.Element {
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function PrivateRoute({ children, ...rest }): JSX.Element {
  const user = useFirebaseAuth();
  if (user === undefined) {
    return <Route></Route>;
  } else {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? children : redirectFrom(location as Location<LocationState>)
        }
      />
    );
  }
}
