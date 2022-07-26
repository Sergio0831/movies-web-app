import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import prisma from 'prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  const { category } = req.query;

  if (!user) {
    return res.status(201).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const movie = await prisma.movie.findMany({
        where: {
          category: category as string
        }
      });
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
