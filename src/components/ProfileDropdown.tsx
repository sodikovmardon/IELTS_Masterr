"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { useLang } from "./LangProvider";
import { t } from "@/lib/i18n";

export default function ProfileDropdown({
  name,
  email,
  avatarUrl,
}: {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = name?.charAt(0).toUpperCase() || "U";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200 btn-macos"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name || "User"}
            className="w-8 h-8 rounded-full object-cover border-2 border-white/50 shadow-sm"
          />
        ) : (
          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-macos">
            {initial}
          </span>
        )}
        <span className="hidden lg:inline max-w-[100px] truncate">
          {name || email}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute right-0 top-full mt-2 w-56 glass-strong shadow-macos-lg rounded-2xl border border-glass-border-strong py-2 z-50"
          >
            <div className="px-4 py-3 border-b border-black/5">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {name || "Foydalanuvchi"}
              </p>
              <p className="text-xs text-gray-500 truncate">{email}</p>
            </div>

            <div className="py-1">
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-white/60 transition-colors rounded-lg mx-1"
              >
                <User className="w-4 h-4 text-gray-400" />
                {t("Profilim", lang)}
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-white/60 transition-colors rounded-lg mx-1"
              >
                <LayoutDashboard className="w-4 h-4 text-gray-400" />
                {t("Dashboard", lang)}
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-white/60 transition-colors rounded-lg mx-1"
              >
                <Settings className="w-4 h-4 text-gray-400" />
                {t("Sozlamalar", lang)}
              </Link>
            </div>

            <div className="border-t border-black/5 pt-1">
              <button
                onClick={() => { signOut(); setOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50/80 transition-colors rounded-lg mx-1"
              >
                <LogOut className="w-4 h-4" />
                {t("Chiqish", lang)}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
