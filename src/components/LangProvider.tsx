"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "uz", setLang: () => {} });

export function useLang() {
  return useContext(LangContext);
}

export default function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("uz");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
