import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import prisma from './lib/prisma';

// 1. Extendemos los tipos de la sesión correctamente
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string;
    } & DefaultSession['user'];
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  // IMPORTANTE: Agregamos el secret explícitamente aquí también
  secret: process.env.AUTH_SECRET,
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Aquí podrías proteger rutas si quisieras en el futuro
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ 
          where: { email: email.toLowerCase() } 
        });

        if (!user) return null;

        // bcryptjs a veces falla en Edge, pero para el authorize suele funcionar.
        // Si sigue fallando, es probable que necesites 'bcrypt' (sin el js) 
        // o usar una librería compatible con Edge como 'jose' para el hashing.
        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;
        return rest;
      },
    }),
  ],
};

// 2. Exportamos los handlers
export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);