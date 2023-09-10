import { Session, User } from 'next-auth';

declare module 'next-auth' {
  interface Session extends User {
    accessToken: string;
    user: User;
  }

  interface JWT {
    accessToken: string;
    refreshToken?: string;

    user: User;
  }

  interface User {
    _id: string;

    name: string | null;
    email: string | null;
    profile_picture?: string;

    permissions?: string[];
    phone?: string;
    birthdate?: string;
    gender?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    address: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };

    accessToken: string;
    refreshToken?: string;
    exp?: number;
  }
}
