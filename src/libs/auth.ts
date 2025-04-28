import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface User {
    apiKey: string;
  }
  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        apiKey: { label: "API Key", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorizing with credentials:', credentials);
        if (!credentials?.apiKey) {
          console.log('No API key provided');
          return null;
        }
        return { id: '1', apiKey: credentials.apiKey };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback - token:', token, 'user:', user);
      if (user) {
        token.apiKey = user.apiKey;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - session:', session, 'token:', token);
      if (session.user) {
        session.user.apiKey = token.apiKey as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login'
  },
  debug: true
}; 