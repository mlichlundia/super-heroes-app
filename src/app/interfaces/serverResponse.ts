export interface ServerAuthResponse {
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
}

export interface UserCheckResponse {
  allProviders: string[];
  registered: boolean;
}
