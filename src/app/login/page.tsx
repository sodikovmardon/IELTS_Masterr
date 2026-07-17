"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registered = searchParams.get("registered");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Tizimga kirish</h1>
          <p className="text-gray-600 mt-2">
            IELTS platformasiga xush kelibsiz
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos p-8 space-y-4 border border-white/20"
        >
          {registered && (
            <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm">
              Muvaffaqiyatli ro'yxatdan o'tdingiz! Tizimga kiring.
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl input-macos focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl input-macos focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all pr-10"
                placeholder="Parolingiz"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-xl btn-macos font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Yuklanmoqda..." : "Kirish"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Akkauntingiz yo'qmi?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Ro'yxatdan o'tish
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[80vh]"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
