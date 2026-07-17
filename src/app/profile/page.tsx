"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Target,
  BarChart3,
  Flame,
  Clock,
  Lock,
  Camera,
  Save,
  Loader2,
} from "lucide-react";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [level, setLevel] = useState("");
  const [targetScore, setTargetScore] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [stats, setStats] = useState({
    completedLessons: 0,
    streakDays: 0,
    totalHours: 0,
    createdAt: "",
  });

  useEffect(() => {
    if (!session) return;
    if (!session.user) return redirect("/login");

    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setAvatarUrl(data.avatarUrl || "");
        setBio(data.bio || "");
        setLevel(data.level || "unknown");
        setTargetScore(data.targetScore?.toString() || "");
        setStats({
          completedLessons: data.completedLessons || 0,
          streakDays: data.streakCount || 0,
          totalHours: data.totalHours || 0,
          createdAt: data.createdAt || "",
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          avatarUrl,
          bio,
          level,
          targetScore: targetScore ? parseFloat(targetScore) : null,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Xatolik yuz berdi");
      }

      setMessage({ type: "success", text: "Profil saqlandi!" });
      setCurrentPassword("");
      setNewPassword("");
      update();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    { icon: BarChart3, label: "Tugallangan darslar", value: stats.completedLessons, color: "text-blue-600 bg-blue-100" },
    { icon: Flame, label: "Streak kunlari", value: stats.streakDays, color: "text-orange-600 bg-orange-100" },
    { icon: Clock, label: "Jami mashq soatlari", value: stats.totalHours, color: "text-emerald-600 bg-emerald-100" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profilim</h1>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* Avatar */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profil rasmi
            </h2>
            <div className="flex items-center gap-6">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
              ) : (
                <span className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                  {name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Camera className="w-4 h-4" /> Rasm URL
                </label>
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Shaxsiy ma'lumotlar */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Shaxsiy ma&apos;lumotlar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ism</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-3.5 h-3.5 inline mr-1" /> Email
                </label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-3.5 h-3.5 inline mr-1" /> Ro&apos;yxatdan o&apos;tgan sana
                </label>
                <input
                  type="text"
                  value={stats.createdAt ? new Date(stats.createdAt).toLocaleDateString("uz-UZ") : "—"}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  placeholder="O'zingiz haqingizda qisqacha..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            </div>
          </section>

          {/* Daraja va maqsad */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Daraja va maqsad
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hozirgi daraja</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="unknown">Aniqlanmagan</option>
                  <option value="beginner">Boshlang'ich</option>
                  <option value="intermediate">O'rta</option>
                  <option value="upper-intermediate">O'rta yuqori</option>
                  <option value="advanced">Yuqori</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maqsad ball (IELTS)</label>
                <input
                  type="number"
                  min={0}
                  max={9}
                  step={0.5}
                  value={targetScore}
                  onChange={(e) => setTargetScore(e.target.value)}
                  placeholder="7.5"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Statistika */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Statistika
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {statCards.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Parolni o'zgartirish */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> Parolni o&apos;zgartirish
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Parolni o&apos;zgartirish uchun joriy parolni kiriting va yangi parolni belgilang.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joriy parol</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yangi parol</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </section>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saqlanmoqda..." : "Profilni saqlash"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
