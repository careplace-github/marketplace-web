import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// types
import { IUserProps } from 'src/types/user';
// utils
import axios from 'src/lib/axios';
import { localStorageAvailable, setItem, getItem } from 'src/utils';
//
import { isValidToken, setSession } from '../utils';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from '../types';

enum Types {
  INITIAL = 'INITIAL',

  REGISTER = 'REGISTER',
  CONFIRMATION_CODE = 'CONFIRMATION_CODE',
  CONFIRM_USER = 'CONFIRM_USER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  LOGIN = 'LOGIN',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  UPDATE_USER = 'UPDATE_USER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };

  [Types.REGISTER]: {};
  [Types.CONFIRMATION_CODE]: {};
  [Types.CONFIRM_USER]: {
    isAuthenticated: boolean;
    user: AuthUserType;
  };
  [Types.FORGOT_PASSWORD]: {};
  [Types.RESET_PASSWORD]: {};
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.CHANGE_PASSWORD]: {};
  [Types.UPDATE_USER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }

  if (action.type === Types.REGISTER) {
    return {
      ...state,
    };
  }
  if (action.type === Types.CONFIRMATION_CODE) {
    return {
      ...state,
    };
  }
  if (action.type === Types.CONFIRM_USER) {
    return {
      ...state,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === Types.FORGOT_PASSWORD) {
    return {
      ...state,
    };
  }
  if (action.type === Types.RESET_PASSWORD) {
    return {
      ...state,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === Types.CHANGE_PASSWORD) {
    return {
      ...state,
    };
  }
  if (action.type === Types.UPDATE_USER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const JwtAuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        let user = {
          name: getItem('name'),
          profile_picture: getItem('profile_picture'),
        };

        /**
         * Allows to initialize a login protected page without having to wait for the user to be fetched
         */
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });

        setSession(accessToken);

        const response = await axios.get('/auth/account', {
          headers: {
            'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
          },
        });

        user = response.data;

        setItem('profile_picture', user.profile_picture);
        setItem('name', user.name);

        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  /**
   * Refresh the auth context
   * This will c
   */
  useEffect(() => {
    initialize();
  }, [initialize]);

  // REGISTER
  const register = useCallback(async (payload: IUserProps) => {
    const response = await axios.post(
      '/auth/signup',
      {
        customer: payload.customer,
        password: payload.password,
      },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );

    dispatch({
      type: Types.REGISTER,
      payload: {},
    });
  }, []);

  // CONFIRMATION_CODE
  const confirmationCode = useCallback(async (email: string) => {
    const response = await axios.post(
      '/auth/send/confirmation-code',
      {
        email,
      },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  }, []);

  // CONFIRM MOBILE
  const sendConfirmPhoneCode = useCallback(async (email: string) => {
    const response = await axios.post(
      '/auth/send/confirm-phone-code',
      { email },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  });

  const verifyPhoneCode = useCallback(async (email: string, code: string) => {
    const response = await axios.post(
      '/auth/verify/confirm-phone-code',
      { email, code },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  });

  // CONFIRM EMAIL
  const sendConfirmEmailCode = useCallback(async (email: string) => {
    const response = await axios.post(
      '/auth/send/confirm-email-code',
      { email },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  });

  const verifyEmailCode = useCallback(async (email: string, code: string) => {
    const response = await axios.post(
      '/auth/verify/confirm-email-code',
      { email, code },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  });

  // CONFIRM_USER
  const confirmUser = useCallback(async (email: string, code: string, password?: string) => {
    const response = await axios.post(
      '/auth/verify/confirmation-code',
      {
        email,
        code,
      },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );

    // Check if the api response has a 200 status code
    if (response.status !== 200) {
      dispatch({
        type: Types.CONFIRM_USER,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });

      throw new Error('Invalid confirmation code');
    }
  }, []);

  // FORGOT_PASSWORD
  const forgotPassword = useCallback(async (email: string) => {
    const response = await axios.post(
      '/auth/send/forgot-password-code',
      {
        email,
      },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  }, []);

  // RESET_PASSWORD
  const resetPassword = useCallback(async (email: string, code: string, newPassword: string) => {
    const response = await axios.post(
      '/auth/verify/forgot-password-code',
      {
        email,
        code,
        newPassword,
      },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  }, []);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    let response = await axios.post(
      '/auth/signin',
      {
        email,
        password,
      },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
    const { accessToken } = response.data;
    setSession(accessToken);

    response = await axios.get('/auth/account', {
      headers: {
        'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
      },
    });

    const user = response.data;

    setItem('profile_picture', user.profile_picture);
    setItem('name', user.name);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user,
      },
    });
  }, []);

  // CHANGE_PASSWORD
  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    const response = await axios.post(
      '/auth/change-password',
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
        },
      }
    );
  }, []);

  // UPDATE_USER
  const updateUser = useCallback(async (user: AuthUserType): Promise<boolean> => {
    try {
      const updatedUser = (
        await axios.put(
          '/auth/account',
          {
            user,
          },
          {
            headers: {
              'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
            },
          }
        )
      ).data;

      setItem('profile_picture', updatedUser.profile_picture);
      setItem('name', updatedUser.name);
      dispatch({
        type: Types.UPDATE_USER,
        payload: {
          user: updatedUser,
        },
      });
    } catch (error) {
      return false;
      console.log(error);
    }
    return true;
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    setItem('profile_picture', null);
    setItem('name', null);

    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',

      register,
      confirmationCode,
      verifyEmailCode,
      verifyPhoneCode,
      sendConfirmEmailCode,
      sendConfirmPhoneCode,
      confirmUser,
      forgotPassword,
      resetPassword,
      login,
      changePassword,
      updateUser,
      logout,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      register,
      confirmationCode,
      verifyEmailCode,
      verifyPhoneCode,
      sendConfirmEmailCode,
      sendConfirmPhoneCode,
      confirmUser,
      forgotPassword,
      resetPassword,
      login,
      changePassword,
      updateUser,
      logout,
    ]
  );

  return <JwtAuthContext.Provider value={memoizedValue}>{children}</JwtAuthContext.Provider>;
}
