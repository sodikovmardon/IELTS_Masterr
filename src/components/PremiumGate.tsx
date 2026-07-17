"use client";

import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { motion } from "framer-motion";
import { Lock, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface PremiumGateProps {
  children: ReactNode;
  showOverlay?: boolean;
  blurAmount?: string;
  minimum?: number;
}

export default function PremiumGate({
  children,
  showOverlay = true,
  blurAmount = "blur-md",
  minimum = 1,
}: PremiumGateProps) {
  const { canAccessPremium, isFree } = usePremiumAccess();

  if (canAccessPremium) return <>{children}</>;

  if (!showOverlay) return <>{children}</>;

  return (
    <div className="relative">
      <div className={`${blurAmount} pointer-events-none select-none`}>{children}</div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-macos border border-amber-200 p-8 max-w-md text-center mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">🔒 Bu Premium dars</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Barcha darslar, Mock Exam va AI baholashga cheksiz kirish oling.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-amber-200"
          >
            <Crown className="w-5 h-5" />
            Premium&apos;ga o&apos;tish
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
