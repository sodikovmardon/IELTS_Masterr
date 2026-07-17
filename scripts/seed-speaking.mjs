import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.cueCard.deleteMany();
  await prisma.speakingTopicGroup.deleteMany();

  const groups = [
    { name: "Odamlar", icon: "👤", description: "Insonlar, oila a'zolari, do'stlar, tanishlar...", status: "ready", order: 1 },
    { name: "Joylar", icon: "📍", description: "Shaharlar, mamlakatlar, binolar, tabiiy joylar...", status: "ready", order: 2 },
    { name: "Narsalar", icon: "🎁", description: "Buyumlar, sovg'alar, qadrli narsalar...", status: "coming_soon", order: 3 },
    { name: "Tajribalar va tadbirlar", icon: "✨", description: "Voqealar, bayramlar, muhim kunlar...", status: "coming_soon", order: 4 },
    { name: "Faoliyat va hobbi", icon: "⚽", description: "Sport, mashg'ulotlar, dam olish...", status: "coming_soon", order: 5 },
    { name: "Media va ko'ngilochar", icon: "🎬", description: "Filmlar, kitoblar, musiqa, TV...", status: "coming_soon", order: 6 },
    { name: "Mavhum mavzular", icon: "💭", description: "Fikrlar, rejalar, orzular, qarorlar...", status: "coming_soon", order: 7 },
    { name: "Tabiat va atrof-muhit", icon: "🌿", description: "Hayvonlar, o'simliklar, ob-havo...", status: "coming_soon", order: 8 },
  ];

  for (const g of groups) {
    await prisma.speakingTopicGroup.create({ data: g });
  }

  const peopleGroup = await prisma.speakingTopicGroup.findFirst({ where: { name: "Odamlar" } });
  const placesGroup = await prisma.speakingTopicGroup.findFirst({ where: { name: "Joylar" } });

  if (peopleGroup) {
    const cards = [
      { title: "Sizga ilhom bergan odamni tasvirlang", points: ["Who this person is", "How you know them", "What they do", "Why they inspire you"] },
      { title: "Siz hayratga qoyil qarindoshingizni tasvirlang", points: ["Who this relative is", "How they are related to you", "What they are like", "Why you admire them"] },
      { title: "Bolalikdagi eng yaxshi do'stingizni tasvirlang", points: ["Who they were", "How you met", "What you did together", "Why they were special"] },
      { title: "Siz bilan tez-tez gaplashadigan odamni tasvirlang", points: ["Who this person is", "How often you talk", "What you talk about", "Why you enjoy talking"] },
      { title: "Yaxshi tanigan keksa odamni tasvirlang", points: ["Who this person is", "How you know them", "What they are like", "Why you respect them"] },
      { title: "Birgalikda ishlashni yoqtirgan hamkasbingizni tasvirlang", points: ["Who this colleague is", "What work you do together", "What they are like", "Why you enjoy working"] },
    ];
    for (const c of cards) {
      await prisma.cueCard.create({
        data: { topicGroupId: peopleGroup.id, title: c.title, cuePoints: JSON.stringify(c.points) },
      });
    }
  }

  if (placesGroup) {
    const cards = [
      { title: "Tashrif buyurgan go'zal joyni tasvirlang", points: ["Where this place is", "When you visited", "What you saw there", "Why you found it beautiful"] },
      { title: "Bolaligingizdagi uyingizni tasvirlang", points: ["Where it was", "What it looked like", "What you did there", "Why it was special"] },
      { title: "Dam olish uchun sevimli joyingizni tasvirlang", points: ["Where this place is", "How often you go there", "What you do there", "Why you like it"] },
      { title: "Tashrif buyurgan shaharni tasvirlang", points: ["Which city it was", "When you visited", "What you did there", "Why you liked/disliked it"] },
      { title: "O'rganish uchun mos joyni tasvirlang", points: ["Where this place is", "What it looks like", "What you study/work on", "Why it helps you focus"] },
      { title: "Sayohat qilmoqchi bo'lgan mamlakatni tasvirlang", points: ["Which country it is", "Why you want to go", "What you would do", "Who you would go with"] },
      { title: "Yoshingizda tez-tez borgan joyni tasvirlang", points: ["Where it was", "How often you went", "What you did there", "Why you have fond memories"] },
    ];
    for (const c of cards) {
      await prisma.cueCard.create({
        data: { topicGroupId: placesGroup.id, title: c.title, cuePoints: JSON.stringify(c.points) },
      });
    }
  }

  console.log("Seeded groups and cue cards");
}

main().catch(console.error).finally(() => prisma.$disconnect());
