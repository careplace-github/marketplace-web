// next
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'src/lib/axios';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'src/pages/api/auth/[...nextauth]';
import { Session } from 'next-auth';

export default async function HealthUnitsRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = (await getServerSession(req, res, authOptions)) as Session | null;

    const accessToken = session?.accessToken;

    const healthUnitId = req.query.id;

    if (req.method === 'GET') {
      try {
        const response = await axios.get(`/health-units/${healthUnitId}`, {
          // Set authorization header bearer token
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken,

            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });
        return res.status(200).json(response.data);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
    }

    // This will be returned if the method doesn't match the ones above
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
