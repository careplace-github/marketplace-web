/* eslint-disable */

import { User as AdapterUser, Session } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';

import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import axios from '../../../lib/axios';
import { NextApiRequest, NextApiResponse } from 'next';
//

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    // Custom Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: Record<'email' | 'password', string> | undefined, req) => {
        try {
          // Implement your custom authentication logic here
          // Retrieve the user based on the provided credentials
          const { email, password } = credentials || {};
          if (!email || !password) {
            // Return null if credentials are missing
            return null;
          }

          let response = await axios.post(
            '/auth/signin',
            {
              email,
              password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const accessToken = response.data.accessToken;
          let userDB;

          if (response) {
            const test = await axios.get('/auth/account', {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            });

            userDB = test.data;
          }

          if (userDB._id) {
            // Add the user object and access token to the session
            const user = {
              accessToken,
              id: userDB._id,
              name: userDB.name,
              email: userDB.email,
              image: userDB.profile_picture,
              _id: userDB._id,
              role: userDB.role,
              permissions: userDB.permissions,
              health_unit: userDB.health_unit,
            };

            // Return the user object if authentication is successful
            return user; // Corrected here
          } else {
            return null;
          }
        } catch (error) {
          // Handle the error and return null
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
    // Other authentication providers can be added here
    // For example: Providers.Google({ ... }),
  ],
  callbacks: {
    jwt({ token, account, user }: { token: any; account: any; user: any }) {
      // Persist the OAuth access_token to the token right after signin

      if (user?.accessToken) {
        token = {
          accessToken: user.accessToken,
          refreshToken: user?.refreshToken,
          exp: user?.exp,

          user: {
            _id: user.id,
            name: user.name,
            email: user.email,
            profile_picture: user.profile_picture,
            role: user.role,
            permissions: user.profile_picture,
            health_unit: user.health_unit,
          },
        };

        return token;
      }

      if (token?.accessToken) {
        token = {
          accessToken: token.accessToken,
          refreshToken: token?.refreshToken,
          exp: token?.exp,

          user: {
            _id: token.user._id,
            name: token.user.name,
            email: token.user.email,
            profile_picture: token.user.profile_picture,
            role: token.user.role,
            permissions: token.user.permissions,
            health_unit: token.user.health_unit,
          },
        };

        return token;
      }

      return {};
    },
    async session({ session, token, user }: { session: any; token: any; user: AdapterUser }) {
      const expiresIn = token?.exp as number;

      const accessToken = token?.accessToken as string;

      if (!token?.accessToken) {
        return null;
      }

      let sessionUser = token?.user;
      let updateSession;

      try {
        updateSession = await axios
          .get('/auth/account', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data);
      } catch (error) {
        console.error(error);
      }

      // If there is an error with the request logout the user
      if (updateSession?.error) {
        return null;
      }

      // Send properties to the client, like an access_token from a provider.
      sessionUser = {
        id: updateSession._id,

        _id: updateSession._id,
        name: updateSession.name,
        email: updateSession.email,
        profile_picture: updateSession.profile_picture,
        role: updateSession.role,
        permissions: updateSession.permissions,
        health_unit: updateSession.health_unit,
      };

      // Send properties to the client, like an access_token from a provider.
      const customSession = {
        ...session,
        user: sessionUser,
        accessToken,
        refreshToken: token.refreshToken,
        expires: expiresIn.toString(),
      };

      return customSession;
    },
    async redirect({ url, baseUrl }) {
      // After signin, redirect to '/app'
      // After signout, redirect to '/'
      return url.startsWith(baseUrl + '/auth/login')
        ? Promise.resolve(baseUrl + '/')
        : Promise.resolve(baseUrl + '/');
    },
  },

  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
};

export default NextAuth(authOptions);
