import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import LangProvider from "@/components/LangProvider";
import ThemeProvider from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/Toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "IELTS - tillarni o'rganish platformasi",
  description:
    "IELTS va xorijiy tillarni o'rganish uchun shaxsiylashtirilgan ta'lim platformasi. Diagnostic test, smart dictionary, flashcards va gamification.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-bg-light">
        <Providers>
          <ThemeProvider>
            <LangProvider>
              <ToastProvider>
                <Header />
                <main className="flex-1 pt-16">{children}</main>
                <Footer />
              </ToastProvider>
            </LangProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
