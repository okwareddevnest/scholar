import NextAuth, { type NextAuthOptions, type DefaultSession, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the DefaultSession interface to include the role
declare module "next-auth" {
  interface Session {
    user: {
      role: "student" | "writer" | "admin"; // Restrict role to specific values
    } & DefaultSession["user"];
  }

  interface User {
    role: "student" | "writer" | "admin"; // Restrict role to specific values
  }

  interface JWT {
    role: "student" | "writer" | "admin"; // Restrict role to specific values
  }
}

// Define a custom User type
interface CustomUser extends User {
  role: "student" | "writer" | "admin"; // Restrict role to specific values
  password: string; // Add password property
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        // Replace this with your actual user lookup logic (e.g., database query)
        const users: CustomUser[] = [
          { id: "1", email: "student@example.com", password: "student123", role: "student" },
          { id: "2", email: "writer@example.com", password: "writer123", role: "writer" },
          { id: "3", email: "admin@example.com", password: "admin123", role: "admin" },
        ];

        const user: CustomUser | undefined = users.find(
          (u) => u.email === credentials?.email && u.password === credentials?.password
        );

        if (user) {
          const { password, ...userWithoutPassword } = user; // Exclude password
          return Promise.resolve(userWithoutPassword as CustomUser);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add role to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "student" | "writer" | "admin"; // Add role to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);