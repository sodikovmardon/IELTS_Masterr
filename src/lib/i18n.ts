export type Lang = "uz" | "en";

type Dict = Record<string, { uz: string; en: string }>;

export const dict: Dict = {
  "IELTS": { uz: "IELTS", en: "IELTS" },
  Kurslar: { uz: "Kurslar", en: "Courses" },
  Amaliyot: { uz: "Amaliyot", en: "Practice" },
  Flashcards: { uz: "Flashcards", en: "Flashcards" },
  Dashboard: { uz: "Dashboard", en: "Dashboard" },
  Chiqish: { uz: "Chiqish", en: "Log out" },
  Kirish: { uz: "Kirish", en: "Sign in" },
  "Ro'yxatdan o'tish": { uz: "Ro'yxatdan o'tish", en: "Register" },
  Profilim: { uz: "Profilim", en: "My Profile" },
  Sozlamalar: { uz: "Sozlamalar", en: "Settings" },

  "Barcha kurslar": { uz: "Barcha kurslar", en: "All courses" },
  Reading: { uz: "Reading", en: "Reading" },
  Writing: { uz: "Writing", en: "Writing" },
  Listening: { uz: "Listening", en: "Listening" },
  Speaking: { uz: "Speaking", en: "Speaking" },
  Grammar: { uz: "Grammar", en: "Grammar" },
  Vocabulary: { uz: "Vocabulary", en: "Vocabulary" },
  "Diagnostic Test": { uz: "Diagnostic Test", en: "Diagnostic Test" },
  "Study Plan": { uz: "Study Plan", en: "Study Plan" },

  Barchasi: { uz: "Barchasi", en: "All" },
  Bepul: { uz: "Bepul", en: "Free" },
  Premium: { uz: "Premium", en: "Premium" },
  Bajarilmagan: { uz: "Bajarilmagan", en: "Not completed" },
  Oson: { uz: "Oson", en: "Easy" },
  "O'rta": { uz: "O'rta", en: "Medium" },
  Qiyin: { uz: "Qiyin", en: "Hard" },
  "Davom etish": { uz: "Davom etish", en: "Continue" },
  Progress: { uz: "Progress", en: "Progress" },
  "Hech qanday dars topilmadi": { uz: "Hech qanday dars topilmadi", en: "No lessons found" },
  Ochish: { uz: "Ochish", en: "Unlock" },

  "Flashcard Review": { uz: "Flashcard Review", en: "Flashcard Review" },
  Takrorlash: { uz: "Takrorlash", en: "Review" },
  "Hali flashcards yo'q": { uz: "Hali flashcards yo'q", en: "No flashcards yet" },
  "Practice paytida so'zlarni bosib flashcardsga qo'shing": { uz: "Practice paytida so'zlarni bosib flashcardsga qo'shing", en: "Add words during practice" },
  "Esimda yo'q": { uz: "Esimda yo'q", en: "Don't remember" },
  Bilaman: { uz: "Bilaman", en: "I know" },
  "Ma'nosini ko'rish": { uz: "Ma'nosini ko'rish", en: "Show meaning" },
  "ta so'z": { uz: "ta so'z", en: "words" },
  "ta takrorlash kerak": { uz: "ta takrorlash kerak", en: "need review" },

  "Mashqni boshlash": { uz: "Mashqni boshlash", en: "Start practice" },
  "Natijalarni ko'rish": { uz: "Natijalarni ko'rish", en: "View results" },
  "Qayta urinish": { uz: "Qayta urinish", en: "Try again" },
  "Keyingi dars": { uz: "Keyingi dars", en: "Next lesson" },
  "Tugatildi": { uz: "Tugatildi", en: "Completed" },
  "To'g'ri javob": { uz: "To'g'ri javob", en: "Correct answer" },
  "Sizning javobingiz": { uz: "Sizning javobingiz", en: "Your answer" },
  "Javobingizni yozing": { uz: "Javobingizni yozing", en: "Type your answer" },
  Tanlang: { uz: "Tanlang...", en: "Select..." },

  "Barcha huquqlar himoyalangan": { uz: "Barcha huquqlar himoyalangan", en: "All rights reserved" },
  Platforma: { uz: "Platforma", en: "Platform" },
  "Qo'llab-quvvatlash": { uz: "Qo'llab-quvvatlash", en: "Support" },
  Huquqiy: { uz: "Huquqiy", en: "Legal" },
  Yordam: { uz: "Yordam", en: "Help" },
  "Biz bilan bog'lanish": { uz: "Biz bilan bog'lanish", en: "Contact us" },
  "Maxfiylik siyosati": { uz: "Maxfiylik siyosati", en: "Privacy policy" },
  "Foydalanish shartlari": { uz: "Foydalanish shartlari", en: "Terms of service" },
};

export function t(key: string, lang: Lang): string {
  return dict[key]?.[lang] ?? key;
}
