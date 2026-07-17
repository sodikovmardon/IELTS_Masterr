# IELTS Mastery

IELTS va xorijiy tillarni o'rganuvchilar uchun shaxsiylashtirilgan ta'lim platformasi.

## Texnologiyalar

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Backend:** Next.js API routes + Prisma ORM + SQLite
- **Auth:** NextAuth.js (credentials)
- **Grafiklar:** Recharts
- **Lug'at API:** Free Dictionary API

## Ishga tushirish

```bash
# 1. Paketlarni o'rnatish
npm install

# 2. Ma'lumotlar bazasini yaratish
npx prisma db push

# 3. Development serverni ishga tushirish
npm run dev
```

## Sahifalar

| Sahifa | Yo'nalish | Tavsif |
|--------|-----------|--------|
| Bosh sahifa | `/` | Hero, offers, testimonials, FAQ |
| Diagnostic Test | `/diagnostic-test` | 12 savolli test |
| Study Plan | `/study-plan` | Shaxsiy dars rejasi generatori |
| Kurslar | `/courses` | Barcha kurslar ro'yxati |
| Kurs detali | `/courses/[id]` | Kurs ichidagi darslar |
| Practice | `/practice` | Interaktiv reading practice |
| Flashcards | `/flashcards` | Spaced repetition flashcards |
| Dashboard | `/dashboard` | Progress, statistika, grafiklar |
| Ro'yxatdan o'tish | `/register` | Yangi akkaunt |
| Kirish | `/login` | Tizimga kirish |

## Loyiha tuzilishi

```
src/
├── app/
│   ├── api/          # API routes
│   ├── courses/      # Kurslar sahifalari
│   ├── dashboard/    # Dashboard
│   ├── diagnostic-test/
│   ├── flashcards/
│   ├── login/
│   ├── practice/
│   ├── register/
│   └── study-plan/
├── components/       # Qayta ishlatiladigan komponentlar
├── lib/              # Utility funksiyalar
└── types/            # TypeScript turlari
prisma/
└── schema.prisma     # Ma'lumotlar bazasi modeli
```
