"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";

export function usePremiumAccess() {
  const { data: session } = useSession();

  return useMemo(() => {
    const status = (session?.user as any)?.subscriptionStatus || "free";
    const plan = (session?.user as any)?.subscriptionPlan || null;
    const expiresAt = (session?.user as any)?.subscriptionExpiresAt || null;

    const isPremium = status === "active";
    const isExpired = status === "expired";
    const isCancelled = status === "cancelled";

    const daysRemaining = expiresAt
      ? Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
      : 0;

    const canAccessPremium = isPremium && !isExpired;

    return {
      isPremium,
      isExpired,
      isCancelled,
      isFree: !isPremium,
      plan,
      status,
      expiresAt,
      daysRemaining,
      canAccessPremium,
    };
  }, [session]);
}
