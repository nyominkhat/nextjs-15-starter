import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { type Adapter } from 'next-auth/adapters';

import { compare } from 'bcrypt';
import prisma from './prisma';

declare module 'next-auth' {
  interface User {
    username: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      username: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      credentials: {
        phone: {},
        password: {},
        username: {},
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!username || !password) {
          throw new Error('Missing username or password');
        }

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          throw new Error("User doesn't exit!");
        }

        const isCorrectPassword = await compare(password as string, user.hashedPassword as string);

        if (!isCorrectPassword) {
          throw new Error('Invalid password!');
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          username: user.username,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        username: token.username as string,
      };

      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.AUTH_SECRET,
});
