import { hashPassword } from 'lib/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'prisma/prismaClient';
import { Inputs } from 'types/Inputs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password, passwordMatch } = data;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      !passwordMatch ||
      password !== passwordMatch
    ) {
      res
        .status(422)
        .json({ message: 'Invalid input - passwords should match' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(422).json({ message: 'User exist!' });
      prisma.$disconnect();
      return;
    }

    const hashedPassword = await hashPassword(password);
    const hashedPasswordMatch = await hashPassword(passwordMatch);

    const result = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        passwordMatch: hashedPasswordMatch
      }
    });

    res.status(201).json({ message: 'User created!' });
    prisma.$disconnect();
  }
}

