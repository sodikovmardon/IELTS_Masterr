"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Crown,
  Shield,
  AlertTriangle,
  ChevronRight,
  Award,
  BookOpen,
  X,
  Trash2,
  LogOut,
  CheckCircle2,
  XCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/components/Toast";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import { signOut } from "next-auth/react";

interface ProfileData {
  name: string | null;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  level: string;
  targetScore: number | null;
  streakCount: number;
  completedLessons: number;
  totalHours: number;
  createdAt: string;
  subscriptionPlan: string | null;
  subscriptionStatus: string;
  subscriptionExpiresAt: string | null;
  mockExams: {
    id: string;
    overallBand: number | null;
    completedAt: string | null;
    listeningBand: number | null;
    readingBand: number | null;
    writingBand: number | null;
    speakingBand: number | null;
  }[];
}

const levelLabels: Record<string, string> = {
  unknown: "Aniqlanmagan",
  beginner: "Boshlang'ich",
  intermediate: "O'rta",
  "upper-intermediate": "O'rta yuqori",
  advanced: "Yuqori",
};

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const { toast } = useToast();
  const { isPremium, plan, expiresAt, daysRemaining } = usePremiumAccess();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [level, setLevel] = useState("");
  const [targetScore, setTargetScore] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!session) return;
    if (!session.user) return redirect("/login");

    fetch("/api/profile")
      .then((res) => res.json())
      .then((data: ProfileData) => {
        setProfile(data);
        setName(data.name || "");
        setAvatarUrl(data.avatarUrl || "");
        setBio(data.bio || "");
        setLevel(data.level || "unknown");
        setTargetScore(data.targetScore?.toString() || "");
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

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

      toast("Profil saqlandi!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      update();
    } catch (err: any) {
      toast(err.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleCancelSubscription() {
    setCancelling(true);
    try {
      const res = await fetch("/api/subscription", { method: "DELETE" });
      if (!res.ok) throw new Error("Xatolik yuz berdi");
      toast("Obuna bekor qilindi");
      setShowCancelModal(false);
      update();
    } catch {
      toast("Xatolik yuz berdi", "error");
    } finally {
      setCancelling(false);
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
    { icon: BarChart3, label: "Tugallangan darslar", value: profile?.completedLessons || 0, color: "text-blue-600 bg-blue-100" },
    { icon: Flame, label: "Streak kunlari", value: profile?.streakCount || 0, color: "text-orange-600 bg-orange-100" },
    { icon: Clock, label: "Jami mashq soatlari", value: profile?.totalHours || 0, color: "text-emerald-600 bg-emerald-100" },
  ];

  const mockExams = profile?.mockExams || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profilim</h1>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Chiqish
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* a) Profil kartasi */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Profil kartasi
            </h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative group">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
                ) : (
                  <span className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
                    {name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="hidden"
                    placeholder="Rasm URL"
                  />
                </label>
              </div>
              <div className="flex-1 w-full space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Ism familya</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="Ismingiz"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      <Mail className="w-3 h-3 inline mr-1" /> Email
                    </label>
                    <input
                      type="email"
                      value={session?.user?.email || ""}
                      disabled
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={2}
                    placeholder="O'zingiz haqingizda qisqacha..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  Ro'yxatdan o'tgan: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString("uz-UZ") : "—"}
                </div>
              </div>
            </div>
          </section>

          {/* b) Ta'lim ma'lumotlari */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" /> Ta'lim ma'lumotlari
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hozirgi daraja</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {Object.entries(levelLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
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

          {/* c) Premium bloki */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" /> Premium a'zolik
              </h2>
              {isPremium ? (
                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  <Star className="w-3 h-3" /> Premium a'zo
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full">
                  Bepul reja
                </span>
              )}
            </div>

            {isPremium ? (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Reja</span>
                    <span className="text-sm font-bold text-amber-700 capitalize">{plan === "yearly" ? "Yillik" : "Oylik"} reja</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Amal qilish muddati</span>
                    <span className="text-sm text-gray-600">
                      {expiresAt ? new Date(expiresAt).toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" }) : "—"}
                    </span>
                  </div>
                  {daysRemaining > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      Yana {daysRemaining} kun qoldi
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:from-amber-600 hover:to-yellow-600 transition-all shadow-md"
                  >
                    <Crown className="w-4 h-4" />
                    Obunani yangilash
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                    className="inline-flex items-center gap-2 text-red-500 border border-red-200 px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Bekor qilish
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  Premium'ga o'tib, barcha darslar, Mock Exam va AI baholashga cheksiz kirish oling.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-amber-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-amber-200"
                >
                  <Crown className="w-5 h-5" />
                  Premium'ga o'tish
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </section>

          {/* d) Statistika */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Statistika
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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

            {mockExams.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" /> So'nggi Mock Exam natijalari
                </h3>
                <div className="space-y-2">
                  {mockExams.map((exam) => (
                    <Link
                      key={exam.id}
                      href={`/mock-exam/results/${exam.id}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                          <Award className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {exam.completedAt
                              ? new Date(exam.completedAt).toLocaleDateString("uz-UZ", { day: "numeric", month: "short", year: "numeric" })
                              : "Noma'lum"}
                          </p>
                          <p className="text-xs text-gray-500">
                            L:{exam.listeningBand ?? "?"} R:{exam.readingBand ?? "?"} W:{exam.writingBand ?? "?"} S:{exam.speakingBand ?? "?"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-900">{exam.overallBand ?? "?"}</span>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/profile/mock-exams"
                  className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-3 hover:underline"
                >
                  Barchasini ko'rish <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </section>

          {/* e) Xavfsizlik */}
          <section className="glass-card bg-white/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Xavfsizlik
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parolni o'zgartirish</label>
                <p className="text-xs text-gray-500 mb-3">
                  Parolni o'zgartirish uchun joriy parolni kiriting va yangi parolni belgilang.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Joriy parol"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Yangi parol"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Yangi parol (tasdiqlash)"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl input-macos text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-2">Parollar mos kelmadi</p>
                )}
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                  Hisobni o'chirish
                </button>
              </div>
            </div>
          </section>

          {/* f) Saqlash tugmasi */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 shadow-md"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saqlanmoqda..." : "Profilni saqlash"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Cancel subscription modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Obunani bekor qilish</h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                Obunangizni bekor qilsangiz, muddat oxirigacha (yana {daysRemaining} kun) Premium imkoniyatlardan foydalana olasiz. Shundan so'ng Bepul rejaga o'tasiz.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={handleCancelSubscription}
                  disabled={cancelling}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {cancelling ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Obunani bekor qilish"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete account modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Hisobni o'chirish</h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                Hisobingizni o'chirsangiz, barcha ma'lumotlaringiz (dars natijalari, Mock Exam, sertifikatlar) butunlay yo'qoladi. Bu amalni qaytarib bo'lmaydi.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Hisobni o'chirish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
