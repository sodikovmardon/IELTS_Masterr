"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Check, X, Loader2, Sparkles, HelpCircle, CreditCard, Shield, Clock } from "lucide-react";
import { useToast } from "@/components/Toast";

const plans = [
  {
    id: "monthly" as const,
    name: "Oylik reja",
    price: 99000,
    currency: "UZS",
    period: "oy",
    badge: null,
    description: "Eng yaxshi variant",
    features: [
      "Barcha Premium darslar (Reading, Writing, Listening, Speaking, Grammar, Vocabulary)",
      "Cheksiz AI Writing baholash",
      "Cheksiz AI Speaking baholash",
      "To'liq Mock Exam'lar",
      "Cheksiz Flashcards va Spaced Repetition",
      "Sertifikatlar",
    ],
  },
  {
    id: "yearly" as const,
    name: "Yillik reja",
    price: 799000,
    currency: "UZS",
    period: "yil",
    badge: "20% chegirma",
    description: "Eng tejamkor variant",
    features: [
      "Barcha Premium darslar (Reading, Writing, Listening, Speaking, Grammar, Vocabulary)",
      "Cheksiz AI Writing baholash",
      "Cheksiz AI Speaking baholash",
      "To'liq Mock Exam'lar",
      "Cheksiz Flashcards va Spaced Repetition",
      "Sertifikatlar",
      "Tezkor ustoz qayta aloqasi",
    ],
  },
];

const faqs = [
  {
    q: "Obunani istalgan vaqtda bekor qila olamanmi?",
    a: "Ha, obunangizni istalgan vaqtda profilingiz orqali bekor qilishingiz mumkin. To'langan muddat oxirigacha barcha imkoniyatlardan foydalana olasiz.",
  },
  {
    q: "To'lov qanday amalga oshiriladi?",
    a: "Hozircha to'lov tizimi ishga tushirilmoqda. Tez orada Payme va Click orqali to'lov qabul qilishni boshlaymiz.",
  },
  {
    q: "Premium darslar bepul darslardan nimasi bilan farq qiladi?",
    a: "Premium darslar chuqurroq tahlil, ko'proq amaliy mashqlar, AI tomonidan baholash va shaxsiy statisticslarni o'z ichiga oladi.",
  },
  {
    q: "Yillik rejani to'lab bo'lgach, qaytarib olish mumkinmi?",
    a: "Agar dastlabki 7 kun ichida bekor qilsangiz, to'lovni to'liq qaytarib olasiz. Keyingi holatlarda qaytarib berish faqat alohida hollarda ko'rib chiqiladi.",
  },
];

function PaymentModal({
  plan,
  onClose,
}: {
  plan: (typeof plans)[0];
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.id }),
      });

      if (!res.ok) throw new Error("Xatolik yuz berdi");

      await update();
      toast("Obuna muvaffaqiyatli faollashtirildi!");
      onClose();
      router.push("/profile");
    } catch {
      toast("Xatolik yuz berdi. Iltimos qayta urinib ko'ring.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">To'lov</h3>
              <p className="text-sm text-gray-500">{plan.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center py-6 border-y border-gray-100 mb-6">
          <p className="text-4xl font-bold text-gray-900">
            {plan.price.toLocaleString()} <span className="text-lg font-normal text-gray-500">{plan.currency}</span>
          </p>
          <p className="text-gray-500 mt-1">/{plan.period}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">Xavfsiz to'lov</p>
              <p className="text-xs text-blue-600">Ma'lumotlaringiz himoyalangan</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
            <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800">To'lov tizimi tez orada</p>
              <p className="text-xs text-amber-600">Payme va Click integratsiyasi ishga tushirilmoqda</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3.5 rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-600 transition-all disabled:opacity-50 shadow-lg"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Crown className="w-5 h-5" />
          )}
          {loading ? "Jarayon..." : `To'lovni amalga oshirish — ${plan.price.toLocaleString()} UZS`}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Obunani istalgan vaqtda bekor qilishingiz mumkin
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(null);
  const [showFaq, setShowFaq] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-200/50">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Premium a'zolik</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            IELTS platformasining barcha imkoniyatlaridan cheksiz foydalaning
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}
              <div
                className={`glass-card bg-white/90 backdrop-blur-sm rounded-3xl shadow-macos border border-white/20 p-8 h-full ${
                  plan.badge ? "ring-2 ring-amber-400" : ""
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2">UZS / {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all text-sm ${
                    plan.badge
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg hover:shadow-amber-200"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.badge ? "Premium'ga o'tish" : "Tanlash"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <button
            onClick={() => setShowFaq(!showFaq)}
            className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 mx-auto"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Ko'p beriladigan savollar</span>
          </button>

          <AnimatePresence>
            {showFaq && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {faqs.map((faq) => (
                  <div key={faq.q} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
