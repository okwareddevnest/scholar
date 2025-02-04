// types/auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User extends CustomUser {
    id: string;
    email: string;
    role: "student" | "writer" | "admin";
    // password: string; // Remove password property
  }

  interface Session {
    user: User;
  }
}

export type UserRole = "student" | "writer" | "admin";