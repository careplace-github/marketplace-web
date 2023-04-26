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

        const response = await axios.get('/users/account');

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
  const register = useCallback(async (user: IUserProps) => {
    const response = await axios.post('/auth/marketplace/signup', {
      user,
    });

    dispatch({
      type: Types.REGISTER,
      payload: {},
    });
  }, []);

  // CONFIRMATION_CODE
  const confirmationCode = useCallback(async (email: string) => {
    const response = await axios.post('/auth/marketplace/send/confirmation-code', {
      email,
    });
  }, []);

  // CONFIRM_USER
  const confirmUser = useCallback(async (email: string, password: string, code: string) => {
    const response = await axios.post('/auth/marketplace/verify/confirmation-code', {
      email,
      code,
    });

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

    const accessToken = (
      await axios.post('/auth/marketplace/login', {
        email,
        password,
      })
    ).data.accessToken;

    setSession(accessToken);

    const user = (await axios.get('/users/account')).data;

    setItem('profile_picture', user.profile_picture);
    setItem('name', user.name);

    dispatch({
      type: Types.CONFIRM_USER,
      payload: {
        isAuthenticated: true,
        user,
      },
    });
  }, []);

  // FORGOT_PASSWORD
  const forgotPassword = useCallback(async (email: string) => {
    const response = await axios.post('/auth/marketplace/send/forgot-password-code', {
      email,
    });
  }, []);

  // RESET_PASSWORD
  const resetPassword = useCallback(async (email: string, code: string, newPassword: string) => {
    const response = await axios.post('/auth/marketplace/verify/reset-password-code', {
      email,
      code,
      newPassword,
    });
  }, []);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    let response = await axios.post('/auth/marketplace/login', {
      email,
      password,
    });
    const { accessToken } = response.data;
    setSession(accessToken);

    response = await axios.get('/users/account');

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
    const response = await axios.post('/auth/change-password', {
      oldPassword,
      newPassword,
    });
  }, []);

  // UPDATE_USER
  const updateUser = useCallback(async (user: AuthUserType) => {
    const updatedUser = (
      await axios.put('/users/account', {
        user,
      })
    ).data;

    setItem('profile_picture', updatedUser.profile_picture);
    setItem('name', updatedUser.name);

    dispatch({
      type: Types.UPDATE_USER,
      payload: {
        user: updatedUser,
      },
    });
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
