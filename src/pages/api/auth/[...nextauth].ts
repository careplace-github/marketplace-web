/* eslint-disable */

import { User as AdapterUser, Session } from 'next-auth';
import type { NextAuthOptions, User } from 'next-auth';

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
          const refreshToken = response.data.refreshToken;
          const exp = response.data.exp;
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
            const user: User = {
              id: userDB._id,
              _id: userDB._id,

              name: userDB.name,
              email: userDB.email,
              profile_picture: userDB.profile_picture,

              permissions: userDB.permissions,
              phone: userDB.phone,
              birthdate: userDB.birthdate,
              gender: userDB.gender,
              email_verified: userDB.email_verified,
              phone_verified: userDB.phone_verified,
              address: userDB.address,

              accessToken,
              refreshToken,
              exp,
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
            _id: user._id,

            name: user.name,
            email: user.email,
            profile_picture: user.profile_picture,

            permissions: user.permissions,
            phone: user.phone,
            birthdate: user.birthdate,
            gender: user.gender,
            email_verified: user.email_verified,
            phone_verified: user.phone_verified,
            address: user.address,
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
            _id: token._id,

            name: token.name,
            email: token.email,
            profile_picture: token.profile_picture,

            permissions: token.permissions,
            phone: token.phone,
            birthdate: token.birthdate,
            gender: token.gender,
            email_verified: token.email_verified,
            phone_verified: token.phone_verified,
            address: token.address,
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

        permissions: updateSession.permissions,
        phone: updateSession.phone,
        birthdate: updateSession.birthdate,
        gender: updateSession.gender,
        email_verified: updateSession.email_verified,
        phone_verified: updateSession.phone_verified,
        address: updateSession.address,
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
