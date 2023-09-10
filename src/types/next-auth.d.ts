import { Session, User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    user: User;
  }

  interface JWT {
    accessToken: string;
    refreshToken?: string;

    user: User;
  }

  interface User {
    name: string | null;
    email: string | null;
    _id: string;
    role: string;
    permissions: string[];
    profile_picture?: string;
    accessToken: string;
    refreshToken?: string;
    exp?: number;
    company?: string;
  }
}
