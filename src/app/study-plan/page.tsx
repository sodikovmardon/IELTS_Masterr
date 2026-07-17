"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Target, Clock, BookOpen } from "lucide-react";

export default function StudyPlanPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    currentLevel: "beginner",
    targetScore: 6.5,
    hoursPerWeek: 5,
    durationWeeks: 8,
  });
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (session) {
        const res = await fetch("/api/study-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setPlan(JSON.parse(data.plan.planData));
      } else {
        const { generateStudyPlan } = await import("@/lib/utils");
        const planData = generateStudyPlan(
          form.currentLevel,
          form.targetScore,
          form.hoursPerWeek,
          form.durationWeeks
        );
        setPlan(planData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-10">
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Shaxsiy Dars Rejasi
          </h1>
          <p className="text-gray-600">
            Ma'lumotlaringizni kiriting va sizga mos o'quv jadvalini oling
          </p>
        </div>

        {!plan ? (
          <form
            onSubmit={handleSubmit}
            className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos p-8 border border-white/20 max-w-lg mx-auto space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hozirgi darajangiz
              </label>
              <select
                value={form.currentLevel}
                onChange={(e) =>
                  setForm({ ...form, currentLevel: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl input-macos focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="beginner">Boshlang'ich (Beginner)</option>
                <option value="intermediate">O'rta (Intermediate)</option>
                <option value="advanced">Yuqori (Advanced)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maqsad ball (IELTS)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="9"
                value={form.targetScore}
                onChange={(e) =>
                  setForm({
                    ...form,
                    targetScore: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl input-macos focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Haftalik bo'sh vaqt (soat)
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={form.hoursPerWeek}
                onChange={(e) =>
                  setForm({
                    ...form,
                    hoursPerWeek: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl input-macos focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tayyorgarlik muddati (hafta)
              </label>
              <input
                type="number"
                min="2"
                max="24"
                value={form.durationWeeks}
                onChange={(e) =>
                  setForm({
                    ...form,
                    durationWeeks: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl input-macos focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 rounded-xl btn-macos font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Yaratilmoqda..." : "Rejani yaratish"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-accent-mint bg-opacity-10 border border-accent-mint rounded-lg p-4 text-center">
              <p className="text-accent-mint font-semibold">
                Sizning shaxsiy dars rejangiz tayyor!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {form.durationWeeks} hafta, haftasiga {form.hoursPerWeek} soat
              </p>
            </div>
            {plan.map((week: any) => (
              <div
                key={week.week}
                className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 overflow-hidden"
              >
                <div className="bg-primary bg-opacity-5 px-6 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">
                    {week.week}-hafta
                  </h3>
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {week.days.map((day: any) => (
                    <div
                      key={day.day}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                        K{day.day}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900">
                          {day.topic}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded capitalize">
                            {day.type}
                          </span>
                          <span className="text-xs text-gray-500">
                            {day.duration} soat
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="text-center">
              {session ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl btn-macos font-medium hover:bg-primary-dark transition-colors"
                >
                  Dashboardga o'tish
                </button>
              ) : (
                <button
                  onClick={() => router.push("/register")}
                  className="bg-primary text-white px-6 py-2.5 rounded-xl btn-macos font-medium hover:bg-primary-dark transition-colors"
                >
                  Ro'yxatdan o'tish va rejani saqlash
                </button>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
