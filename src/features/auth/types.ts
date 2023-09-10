import { IUserProps } from 'src/types/user';

// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};

export type SessionType = {
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken?: string;
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  method: string;
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;

  sendConfirmEmailCode: (email: string) => Promise<void>;
  verifyEmailCode: (email: string, code: string) => Promise<void>;
  sendConfirmPhoneCode: (email: string) => Promise<void>;
  verifyPhoneCode: (email: string, code: string) => Promise<void>;
  register: (user: IUserProps) => Promise<void>;
  confirmationCode: (email: string) => Promise<void>;
  confirmUser: (email: string, code: string, password?: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  updateUser: (user: AuthUserType) => Promise<boolean>;
  logout: () => void;
  fetchUser: () => void;
};
