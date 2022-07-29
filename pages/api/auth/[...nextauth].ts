import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyPassword } from "lib/auth";
import prisma from "prisma/prismaClient";
import Providers from "next-auth/providers";
import NextAuth from "next-auth";
import { Inputs } from "types/Inputs";

export default NextAuth({
  session: {
    jwt: true
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Providers.Credentials({
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
          throw new Error("Could not log you in!");
        }

        return {
          email: user.email,
          image: user.image
        };
      }
    })
  ]
});

