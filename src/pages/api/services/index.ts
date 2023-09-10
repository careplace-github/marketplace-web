// next
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'src/lib/axios';

export default async function ServicesRoute(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method === 'GET') {
      try {
        const response = await axios.get('/services', { params: { ...req.params } });
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
