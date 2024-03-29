import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { verifyPassword } from 'lib/auth';
import prisma from 'prisma/prismaClient';
import NextAuth from 'next-auth';
import { Inputs } from 'types/Inputs';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt'
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: '',
      credentials: {},
      async authorize(credentials: Inputs) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error("You havent't register yet");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return {
          id: user.id,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
