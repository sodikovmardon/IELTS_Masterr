"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { BookOpen, Menu, X, Languages, User, LayoutDashboard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LangProvider";
import ProfileDropdown from "./ProfileDropdown";
import { t } from "@/lib/i18n";

const NAV_LINKS = [
  { href: "/courses", key: "Kurslar" },
  { href: "/practice", key: "Amaliyot" },
  { href: "/flashcards", key: "Flashcards" },
  { href: "/mock-exam", key: "Mock Exam" },
];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`relative px-1 py-1 text-sm font-medium transition-colors duration-200 ${
        active ? "text-primary" : "text-gray-600 hover:text-primary"
      }`}
    >
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute left-0 -bottom-0.5 h-0.5 bg-primary rounded-full w-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-macos h-14"
          : "bg-transparent h-16"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Chap — Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">IELTS</span>
          </Link>

          {/* O'rta — Nav linklari */}
          <nav className="hidden md:flex items-center gap-8 mx-auto px-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={t(link.key, lang)}
                active={pathname.startsWith(link.href)}
              />
            ))}
          </nav>

          {/* O'ng — Action guruh */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "uz" ? "en" : "uz")}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 border border-white/30 dark:border-gray-700 px-2.5 py-1.5 rounded-xl hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors duration-200 btn-macos"
            >
              <Languages className="w-3.5 h-3.5" />
              {lang === "uz" ? "EN" : "UZ"}
            </button>

            {session ? (
              <ProfileDropdown
                name={session.user?.name}
                email={session.user?.email}
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                >
                  {t("Kirish", lang)}
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors duration-200 shadow-macos btn-macos"
                >
                  {t("Ro'yxatdan o'tish", lang)}
                </Link>
              </>
            )}
          </div>

          {/* Mobil menu toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-gray-600 dark:text-gray-400 btn-macos rounded-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobil menyu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/20 dark:border-gray-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname.startsWith(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {t(link.key, lang)}
                </Link>
              ))}
              <hr className="my-2 border-gray-100 dark:border-gray-800" />
              <button
                onClick={() => { setLang(lang === "uz" ? "en" : "uz"); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <Languages className="w-4 h-4" />
                {lang === "uz" ? "English" : "O'zbekcha"}
              </button>
              {session ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    {t("Profilim", lang)}
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {t("Dashboard", lang)}
                  </Link>
                  <button
                    onClick={() => { signOut(); setMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("Chiqish", lang)}
                  </button>
                </>
              ) : (
                <>
                  <hr className="my-2 border-gray-100 dark:border-gray-800" />
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {t("Kirish", lang)}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-colors btn-macos"
                  >
                    {t("Ro'yxatdan o'tish", lang)}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
