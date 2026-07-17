import "next-auth";

declare module "next-auth" {
  interface User {
    level?: string;
    subscriptionPlan?: string | null;
    subscriptionStatus?: string;
    subscriptionExpiresAt?: Date | null;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      level?: string;
      subscriptionPlan?: string | null;
      subscriptionStatus?: string;
      subscriptionExpiresAt?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    level?: string;
    subscriptionPlan?: string | null;
    subscriptionStatus?: string;
    subscriptionExpiresAt?: string | null;
  }
}
