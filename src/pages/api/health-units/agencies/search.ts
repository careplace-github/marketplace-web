// next
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'src/lib/axios';

export default async function CompaniesSearchRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method === 'GET') {
      try {
        const response = await axios.get('/health-units/agencies/search', {
          params: {
            ...req.params,
            documentsPerPage: 5,
            headers: {
              'x-client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
            },
          },
        });
        return res.status(200).json(response.data);
      } catch (error) {
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
