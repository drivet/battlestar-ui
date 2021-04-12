export interface Profile {
  id: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  imageUrl: string;
}

export interface AuthInfo {
  isAuthenticated: boolean;
  profile?: Profile;
}

export const DEFAULT_AUTH_INFO: AuthInfo = {
  isAuthenticated: false,
};

export interface Session {
  access_token: string;
}

export interface AuthContextState {
  authInfo: AuthInfo;
  signIn: (cb: () => void) => void;
  signOut: (cb: () => void) => void;
}
