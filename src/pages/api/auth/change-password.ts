// next
import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth/next';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';
// lib
import axios from 'src/lib/axios';
// types
import { Session } from 'next-auth';

export default async function changePasswordRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = (await getServerSession(req, res, authOptions)) as Session | null;

    const { oldPassword, newPassword } = req.body;

    const accessToken = session?.accessToken; // Type assertion

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': accessToken,
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    };

    switch (req.method) {
      case 'POST': {
        const response = await axios.post(
          '/auth/change-password',
          { oldPassword, newPassword },
          config
        );
        return res.status(200).json({ success: true });
      }
      default:
        return res.status(404).json({ error: 'Not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
