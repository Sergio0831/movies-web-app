import { NextApiResponse, NextApiRequest } from 'next';
import prisma from 'prisma/prismaClient';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { searchQuery, category } = req.body;

    try {
      if (!category) {
        const result = await prisma.movie.findMany({
          where: {
            title: {
              contains: searchQuery.toString()
            }
          }
        });
        res.status(200).json(result);
      } else {
        const result = await prisma.movie.findMany({
          where: {
            category,
            title: {
              contains: searchQuery
            }
          }
        });
        res.status(200).json(result);
      }
    } catch (error) {
      res
        .status(204)
        .json({ message: `No ${category} with the name ${searchQuery} ` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
