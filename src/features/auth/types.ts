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
  
  // ----------------------------------------------------------------------
  
  export type JWTContextType = {
    method: string;
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUserType;
    
    register: (email: string, password: string, name: string, phone: string, country: string) => Promise<void>;
    confirmationCode: (email: string) => Promise<void>;
    confirmUser: (email: string, password: string, code: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
    updateUser: (user: AuthUserType) => Promise<void>;
    logout: () => void;
    
  };
  
  
 