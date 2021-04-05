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

export type AuthInfoState = [AuthInfo, React.Dispatch<React.SetStateAction<AuthInfo>>];
