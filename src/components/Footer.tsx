"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useLang } from "./LangProvider";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6 text-accent-mint" />
              <span className="text-lg font-bold text-white">IELTS</span>
            </div>
            <p className="text-sm text-gray-400">
              {lang === "uz" ? "IELTS va xorijiy tillarni o'rganish uchun shaxsiylashtirilgan platforma." : "A personalized learning platform for IELTS and foreign languages."}
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">{t("Platforma", lang)}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/courses" className="hover:text-white transition-colors">{t("Kurslar", lang)}</Link></li>
              <li><Link href="/practice" className="hover:text-white transition-colors">{t("Amaliyot", lang)}</Link></li>
              <li><Link href="/flashcards" className="hover:text-white transition-colors">{t("Flashcards", lang)}</Link></li>
              <li><Link href="/diagnostic-test" className="hover:text-white transition-colors">{t("Diagnostic Test", lang)}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">{t("Qo'llab-quvvatlash", lang)}</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">{t("Yordam", lang)}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">FAQ</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t("Biz bilan bog'lanish", lang)}</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">{t("Huquqiy", lang)}</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition-colors cursor-pointer">{t("Maxfiylik siyosati", lang)}</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">{t("Foydalanish shartlari", lang)}</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} IELTS. {t("Barcha huquqlar himoyalangan", lang)}.
        </div>
      </div>
    </footer>
  );
}
