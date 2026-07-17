import "next-auth";

declare module "next-auth" {
  interface User {
    level?: string;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      level?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    level?: string;
  }
}
