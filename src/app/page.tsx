"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Target,
  Zap,
  Award,
  BarChart3,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const offers = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Interaktiv Reading Materiallari",
    desc: "IELTS reading passage'lari asosida tuzilgan matnlar va savollar",
    color: "bg-indigo-100 text-indigo-600",
    border: "border-indigo-500",
    bg: "from-indigo-50 to-white",
    href: "/courses/reading",
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: "Smart Dictionary",
    desc: "Matn ichidagi so'zlarni bosish bilan ma'nosini ko'ring va flashcardsga qo'shing",
    color: "bg-emerald-100 text-emerald-600",
    border: "border-emerald-500",
    bg: "from-emerald-50 to-white",
    href: "/courses/reading",
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: "Shaxsiy Dars Rejasi",
    desc: "Darajangiz va maqsadingizga mos avtomatik yaratilgan o'quv jadvali",
    color: "bg-amber-100 text-amber-600",
    border: "border-amber-500",
    bg: "from-amber-50 to-white",
    href: "/study-plan",
  },
  {
    icon: <BarChart3 className="w-7 h-7" />,
    title: "Tahliliy Natijalar",
    desc: "Batafsil progress grafiklari va statistikalar",
    color: "bg-rose-100 text-rose-600",
    border: "border-rose-500",
    bg: "from-rose-50 to-white",
    href: "/dashboard",
  },
];

const features = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Gamification",
    desc: "Streak, yutuqlar va badge'lar bilan o'rganishni qiziqarli qilamiz",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Shaxsiylashtirish",
    desc: "Diagnostic test orqali darajangiz aniqlanadi va shaxsiy reja tuziladi",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Spaced Repetition",
    desc: "Flashcards'lar Anki usulida takrorlanadi, eslab qolish kafolatlanadi",
  },
];

const testimonials = [
  {
    name: "Aziza Karimova",
    score: "IELTS 8.0",
    text: "IELTS orqali 3 oy ichida 6.5 dan 8.0 ga ko'tarildim. Smart Dictionary eng sevimli funksiyam!",
    avatar: "AK",
  },
  {
    name: "Jahongir Abdullayev",
    score: "IELTS 7.5",
    text: "Shaxsiy dars rejasi va flashcards tizimi juda samarali. Har kuni 30 daqiqa bilan katta natijaga erishdim.",
    avatar: "JA",
  },
  {
    name: "Malika Rahimova",
    score: "IELTS 7.0",
    text: "Diagnostic test darajamni aniqlab, aynan kerakli mavzularga e'tibor qaratishimga yordam berdi.",
    avatar: "MR",
  },
  {
    name: "Bobur Iskandarov",
    score: "IELTS 8.5",
    text: "Interaktiv reading va grammar mashqlari juda foydali. Natijalarimni grafikda kuzatish juda motivatsiya beradi.",
    avatar: "BI",
  },
];

const faqData = [
  {
    q: "IELTS bepulmi?",
    a: "Platformamiz asosiy funksiyalari (diagnostic test, cheklangan practice, flashcards) bilan bepul. To'liq kurslar va shaxsiy reja uchun premium obuna mavjud.",
  },
  {
    q: "Qancha vaqt ichida IELTS natijamni oshira olaman?",
    a: "Bu sizning hozirgi darajangiz va haftalik vaqtingizga bog'liq. O'rtacha, muntazam o'qigan foydalanuvchilar 2-3 oy ichida 0.5-1.0 ball o'sishiga erishadilar.",
  },
  {
    q: "Mobil qurilmalarda ishlaydimi?",
    a: "Ha, platforma to'liq responsive va barcha mobil qurilmalarda, planshetlarda va kompyuterlarda mukammal ishlaydi.",
  },
  {
    q: "Qanday IELTS modullari mavjud?",
    a: "Academic va General Training modullari uchun reading, writing, listening va speaking bo'yicha materiallar mavjud.",
  },
  {
    q: "Kursni to'lagandan so'ng qaytarib olish mumkinmi?",
    a: "Ha, 14 kun ichida to'liq qaytarib olish kafolati mavjud. Agar platforma sizga mos kelmasa, pulingizni qaytarib beramiz.",
  },
];

function FAQItem({
  question,
  answer,
  open,
  toggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  toggle: () => void;
}) {
  return (
    <div className="glass-card border border-white/20 rounded-2xl overflow-hidden shadow-macos">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
      >
        {question}
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-600 text-sm">{answer}</div>
      )}
    </div>
  );
}

export default function HomePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [arrowHover, setArrowHover] = useState(false);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                IELTS 9.0 ga yo'lingiz
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              IELTS va Tillarni
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-mint to-accent-yellow">
                Aqlli O'rganing
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto"
            >
              Shaxsiylashtirilgan dars rejasi, smart dictionary, flashcards va
              gamification — barchasi bir platformada.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/register"
                className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl btn-press"
              >
                Ro'yxatdan o'tish
              </Link>
              <Link
                href="/diagnostic-test"
                onMouseEnter={() => setArrowHover(true)}
                onMouseLeave={() => setArrowHover(false)}
                className="group border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all btn-press inline-flex items-center gap-2"
              >
                Bepul testni boshlash
                <motion.span
                  animate={{ x: arrowHover ? 4 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-10">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-widest">Platforma imkoniyatlari</span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              IELTS ga tayyorlanishning eng oson usuli
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">
              Barcha kerakli vositalar bir joyda — o'qing, tinglang, yozing va gapiring
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {offers.map((offer, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Link
                  href={offer.href}
                  className={`group block bg-gradient-to-b ${offer.bg} rounded-2xl border-t-4 ${offer.border} border-x border-b border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${offer.color}`}>
                    {offer.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {offer.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-indigo-600 transition-colors">
                    Batafsil
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              className="glass-card text-center p-8 card-hover rounded-3xl shadow-macos"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                className="w-16 h-16 bg-indigo-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                {feat.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feat.title}
              </h3>
              <p className="text-gray-600">{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl font-bold text-center text-gray-900 mb-12"
            >
              Foydalanuvchilarimizning natijalari
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                  className="glass-card bg-bg-light/90 backdrop-blur-sm rounded-2xl shadow-macos border border-white/20 p-6 card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-accent-mint text-xs font-medium">
                        {t.score}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">&ldquo;{t.text}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl font-bold text-center text-gray-900 mb-12"
          >
            Ko'p beriladigan savollar
          </motion.h2>
          <motion.div variants={fadeInUp} className="space-y-3">
            {faqData.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.q}
                answer={faq.a}
                open={openFAQ === i}
                toggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
