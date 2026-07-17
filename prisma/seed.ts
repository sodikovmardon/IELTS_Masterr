import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Data preservation: clear only if re-seeding all lessons
  // Commented out to avoid deleting existing data when adding writing lessons
  // await prisma.lesson.deleteMany();

  // ─── Lesson 1: Skimming texnikasi ───────────────────────────────────
  const lesson1 = await prisma.lesson.create({
    data: {
      title: "Skimming texnikasi",
      category: "reading",
      durationMin: 20,
      isPremium: false,
      difficulty: "Easy",
      order: 1,
      prerequisiteLessonId: null,
      theoryContent: `Skimming — bu matnni umumiy mazmunini tushunish uchun tezda o'qish texnikasidir. IELTS Reading bo'limida vaqt juda muhim, shuning uchun skimming yordamida siz matnning asosiy g'oyasini, tuzilishini va paragraflarning mavzusini qisqa vaqt ichida aniqlab olishingiz mumkin. Bu texnika, ayniqsa, "Matching headings" va "True/False/Not Given" kabi savol turlarida juda foydalidir.

Skimming qilishda siz har bir paragrafning birinchi va oxirgi jumlasiga, shuningdek, kalit so'zlar va takrorlanadigan atamalarga e'tibor qaratishingiz kerak. Matnni boshidan oxirigacha emas, balki ko'z yugurtirib, muhim ma'lumotlarni ajratib olishingiz lozim. Odatda, skimming uchun har bir paragrafga 5-10 soniya ajratish kifoya.

IELTS imtihonida skimmingni qo'llash uchun avval savollarni o'qib chiqmasdan, matnning o'zini tezda ko'zdan kechirish tavsiya etiladi. Bu sizga matnning umumiy tuzilishi haqida tasavvur beradi va keyin savollarga javob izlashda qaysi qismlarga murojaat qilishni bilishga yordam beradi. Skimming vaqtni tejashning eng samarali usullaridan biridir.`,
      passageText: `The History of Libraries

The concept of collecting written knowledge dates back thousands of years. The earliest known libraries appeared in Mesopotamia around 2500 BCE, where clay tablets inscribed with cuneiform script were stored in temple complexes. These collections were primarily administrative and religious in nature, documenting everything from tax records to mythological stories.

The most famous library of the ancient world was the Library of Alexandria, founded in the third century BCE in Egypt. It was said to have housed hundreds of thousands of scrolls covering philosophy, science, medicine, and literature. Scholars from across the Mediterranean travelled to Alexandria to study, making it the intellectual capital of its time. Although the library was eventually destroyed, its legacy as a centre of learning has endured for centuries.

During the Middle Ages, libraries in Europe were largely maintained by monasteries. Monks painstakingly copied manuscripts by hand, preserving classical texts that might otherwise have been lost. These monastic libraries were small and accessible only to a select few. Meanwhile, in the Islamic world, great libraries flourished in cities such as Baghdad, Cordoba, and Cairo. The House of Wisdom in Baghdad became a renowned centre of translation and scholarship, where works from Greek, Persian, and Indian sources were translated into Arabic.

The invention of the printing press by Johannes Gutenberg in the fifteenth century revolutionised the production of books. For the first time, texts could be mass-produced, making them more affordable and accessible. This led to a dramatic increase in literacy rates across Europe and the establishment of public libraries. By the nineteenth century, public libraries had become common in many countries, offering free access to knowledge for all citizens.

In the modern era, libraries have evolved to include digital resources. Many libraries now provide access to e-books, online databases, and multimedia materials. Despite predictions that the internet would make libraries obsolete, they have remained relevant by adapting to technological changes. Today, libraries serve not only as repositories of books but also as community centres, offering educational programmes, workshops, and digital literacy training.`,
      tipsAndTricks: `1. Skimming qilishda matnni jumma-jumma o'qishdan ko'ra, ko'z yugurtirib, kalit so'zlarga e'tibor qarating. Har bir paragrafning birinchi jumlasi odatda asosiy g'oyani o'z ichiga oladi.

2. Matnni o'qishdan oldin, sarlavha va subtitlovchilarni, shuningdek, rasmlar va diagrammalarni ko'zdan kechiring. Bu sizga matnning mavzusi haqida tezkor ma'lumot beradi.

3. Va'da qilingan vaqtdan oshib ketmang — har bir paragrafga 5-10 soniya ajrating. Agar kerakli ma'lumotni topa olmasangiz, keyinroq batafsil o'qish uchun qaytishingiz mumkin.`,
      commonMistakes: `1. Eng keng tarqalgan xato: skimmingni batafsil o'qish bilan aralashtirish. Skimming paytida har bir so'zni o'qishga urinmang — bu sizning vaqtingizni behuda sarflaydi.

2. Ba'zi talabalar skimmingni o'tkazib yuborib, darhol savollarga javob izlashga intiladi. Bu noto'g'ri yondashuv, chunki matnning umumiy mazmunini tushunmasdan savollarga javob topish qiyinroq bo'ladi.

3. Skimming vaqtida notanish so'zlarga duch kelganda to'xtab qolish. Notanish so'zlarning ma'nosini taxmin qilishga harakat qiling yoki ularni e'tiborsiz qoldiring.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "multiple-choice",
          question: "What was the primary purpose of the earliest libraries in Mesopotamia?",
          options: [
            "Entertainment and leisure reading",
            "Administrative and religious documentation",
            "Scientific research and experimentation",
            "Military strategy and planning",
          ],
          correctAnswer: 1,
          explanation: "The passage states that early Mesopotamian libraries 'were primarily administrative and religious in nature, documenting everything from tax records to mythological stories.'",
          quoteFromText: "These collections were primarily administrative and religious in nature, documenting everything from tax records to mythological stories.",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What made the Library of Alexandria significant in the ancient world?",
          options: [
            "It was the first library to use the printing press",
            "It was exclusively for government officials",
            "It attracted scholars from across the Mediterranean",
            "It contained only religious texts",
          ],
          correctAnswer: 2,
          explanation: "According to the passage, 'Scholars from across the Mediterranean travelled to Alexandria to study, making it the intellectual capital of its time.'",
          quoteFromText: "Scholars from across the Mediterranean travelled to Alexandria to study, making it the intellectual capital of its time.",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "How did the printing press affect libraries and literacy?",
          options: [
            "It reduced the number of books available",
            "It made books more affordable and increased literacy",
            "It caused libraries to close permanently",
            "It had no significant impact on literacy rates",
          ],
          correctAnswer: 1,
          explanation: "The passage says the printing press made texts 'more affordable and accessible' and 'led to a dramatic increase in literacy rates across Europe.'",
          quoteFromText: "For the first time, texts could be mass-produced, making them more affordable and accessible. This led to a dramatic increase in literacy rates across Europe.",
        },
      ]),
    },
  });
  console.log("Lesson 1 created:", lesson1.title);

  // ─── Lesson 2: Scanning texnikasi ────────────────────────────────────
  const lesson2 = await prisma.lesson.create({
    data: {
      title: "Scanning texnikasi",
      category: "reading",
      durationMin: 25,
      isPremium: false,
      difficulty: "Easy",
      order: 2,
      prerequisiteLessonId: lesson1.id,
      theoryContent: `Scanning — bu matn ichidan aniq ma'lumotni topish uchun tezda qidirish texnikasidir. Skimmingdan farqli ravishda, scanningda siz matnning umumiy mazmuniga emas, balki muayyan raqamlar, sanalar, ismlar yoki kalit so'zlarga e'tibor qaratasiz. Bu texnika IELTS imtihonida "True/False/Not Given" yoki "Sentence completion" kabi savol turlarida juda muhimdir.

Scanningni samarali qo'llash uchun avval savolni o'qib chiqib, undagi kalit so'zlarni aniqlash kerak. Keyin esa matnni ko'z yugurtirib, aynan o'sha so'zlar yoki ularning sinonimlarini qidirish lozim. Masalan, agar savolda "1998" yili haqida so'ralsa, matndan aynan shu raqamni qidirasiz. Scanning paytida matnning boshqa qismlariga e'tibor qaratmaslik muhim.

Scanning tezligini oshirish uchun muntazam mashq qilish talab etiladi. Ingliz tilidagi gazeta va jurnallarni o'qish, undan ma'lum ma'lumotlarni qidirish bu ko'nikmani rivojlantirishga yordam beradi. IELTS imtihonida scanningni to'g'ri qo'llash orqali siz javob topish vaqtini sezilarli darajada qisqartirishingiz mumkin.`,
      passageText: `Solar Energy: A Sustainable Solution

Solar energy has emerged as one of the most promising renewable energy sources in the twenty-first century. Every hour, the sun delivers more energy to the Earth than the entire human population consumes in a year. Despite this abundance, harnessing solar power efficiently has been a significant technological challenge.

There are two primary methods of capturing solar energy: photovoltaic (PV) cells and concentrated solar power (CSP) systems. Photovoltaic cells, commonly known as solar panels, convert sunlight directly into electricity. First developed at Bell Laboratories in 1954, these cells have become increasingly efficient and affordable over the decades. Modern solar panels can convert approximately 20 to 23 percent of the sunlight they receive into usable electricity. In contrast, CSP systems use mirrors to concentrate sunlight onto a receiver, which heats a fluid to produce steam that drives a turbine. The first commercial CSP plant was built in California in 1984.

The cost of solar energy has dropped dramatically in recent years. In 2010, the average cost of a solar panel was around $4.00 per watt. By 2023, that figure had fallen to approximately $0.30 per watt. This price reduction has made solar energy competitive with fossil fuels in many parts of the world. Germany, China, and the United States are currently the largest producers of solar energy globally.

However, solar energy does have certain limitations. Solar panels generate electricity only when the sun is shining, which means energy storage is essential for round-the-clock power supply. Battery technology, particularly lithium-ion batteries, has improved significantly, but large-scale storage remains expensive. Additionally, solar panels require substantial land area and their manufacturing process involves the use of some hazardous materials.

Despite these challenges, the future of solar energy looks bright. According to the International Energy Agency, solar power is expected to become the largest source of electricity by 2050. Continued research into more efficient materials, such as perovskite solar cells, promises to further reduce costs and improve performance. Solar energy will undoubtedly play a crucial role in the global transition to clean energy.`,
      tipsAndTricks: `1. Scanningni boshlashdan oldin, savollardagi kalit so'zlarni (odatda otlar, sonlar va xos ismlar) ajratib oling. Aynan shu so'zlar matn ichida qidirish uchun yo'nalish beradi.

2. Matnni ko'z bilan vertikal yoki "Z" shaklida skaner qiling. Har bir satrni boshidan oxirigacha o'qish scanning samaradorligini pasaytiradi.

3. Sinonimlar va parafraze qilingan iboralarga e'tibor bering. Savolda "expensive" deyilgan bo'lsa, matnda "costly" yoki "high-priced" kabi so'zlar bo'lishi mumkin.`,
      commonMistakes: `1. Scanning paytida matnni boshidan batafsil o'qishni boshlab yuborish. Scanning vaqtida faqat qidirilayotgan ma'lumotga e'tibor qaratish kerak, qolgan qismlarni o'qish shart emas.

2. Birinchi topilgan ma'lumotni darhol javob deb qabul qilish. Ba'zida bir kalit so'z matnning bir necha joyida takrorlanishi mumkin, shuning uchun to'g'ri javobni topish uchun kontekstni tekshirish lozim.

3. Savollarni to'liq o'qimasdan scanningni boshlash. Savolning to'liq ma'nosini tushunmasdan qidirish noto'g'ri ma'lumotni topishga olib kelishi mumkin.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "short-answer",
          question: "In which year were photovoltaic cells first developed?",
          options: ["1954", "1984", "2010", "2023"],
          correctAnswer: 0,
          explanation: "The passage states: 'First developed at Bell Laboratories in 1954' referring to photovoltaic cells.",
          quoteFromText: "First developed at Bell Laboratories in 1954, these cells have become increasingly efficient and affordable over the decades.",
        },
        {
          id: 2,
          type: "short-answer",
          question: "What was the average cost per watt of a solar panel in 2010?",
          options: ["$0.30", "$0.50", "$4.00", "$5.00"],
          correctAnswer: 2,
          explanation: "The passage mentions that 'in 2010, the average cost of a solar panel was around $4.00 per watt.'",
          quoteFromText: "In 2010, the average cost of a solar panel was around $4.00 per watt.",
        },
        {
          id: 3,
          type: "short-answer",
          question: "Which three countries are mentioned as the largest producers of solar energy?",
          options: [
            "USA, Japan, and India",
            "Germany, China, and the United States",
            "China, Russia, and Germany",
            "UK, France, and Germany",
          ],
          correctAnswer: 1,
          explanation: "The passage states: 'Germany, China, and the United States are currently the largest producers of solar energy globally.'",
          quoteFromText: "Germany, China, and the United States are currently the largest producers of solar energy globally.",
        },
      ]),
    },
  });
  console.log("Lesson 2 created:", lesson2.title);

  // ─── Lesson 3: Detailed reading ─────────────────────────────────────
  const lesson3 = await prisma.lesson.create({
    data: {
      title: "Detailed reading",
      category: "reading",
      durationMin: 30,
      isPremium: false,
      difficulty: "Medium",
      order: 3,
      prerequisiteLessonId: lesson2.id,
      theoryContent: `Detailed reading — bu matnni har bir jumla va so'zga e'tibor berib, chuqur va sinchkovlik bilan o'qish texnikasidir. Bu usul, ayniqsa, matndagi aniq ma'lumotlarni tushunish, murakkab argumentlarni kuzatish va nozik farqlarni aniqlash uchun zarurdir. IELTS imtihonida "Summary completion" va "Multiple choice" kabi savol turlari detailed readingni talab qiladi.

Detailed readingni qo'llashda matnni qismlarga bo'lib o'qish tavsiya etiladi. Har bir paragrafni alohida o'qib, undagi asosiy fikrni, dalillarni va misollarni tahlil qilish kerak. Agar biror jumla murakkab bo'lsa, uni qayta o'qish yoki grammatik tuzilishini tahlil qilish mumkin. Notanish so'zlarga duch kelganda, kontekstdan kelib chiqib ma'nosini aniqlashga harakat qiling.

Skimming va scanningdan farqli o'laroq, detailed reading ko'proq vaqt talab qiladi. Shuning uchun bu texnikani imtihonning faqat kerakli qismlarida, ya'ni aniq javob topish uchun murakkab ma'lumotlarni tahlil qilishda qo'llash maqsadga muvofiqdir. Dastlab matnni skimming qilib, so'ngra savollarga mos keladigan qismlarni detailed reading bilan o'qish eng samarali yondashuvdir.`,
      passageText: `The Science of Sleep

Sleep is a fundamental biological process that occupies approximately one-third of the human lifespan. Far from being a passive state of rest, sleep is a highly active and dynamic period during which the brain performs essential functions. Modern sleep research, which began in earnest with the discovery of rapid eye movement (REM) sleep in 1953, has revealed that sleep consists of several distinct stages that cycle throughout the night.

The sleep cycle is divided into two main types: non-rapid eye movement (NREM) sleep and REM sleep. NREM sleep itself is subdivided into three stages: N1, N2, and N3. Stage N1 is the lightest phase of sleep, lasting only a few minutes, during which a person can be easily awakened. Stage N2 represents a deeper level of sleep, characterised by a slowing of brain activity and the appearance of sleep spindles. Stage N3, also known as slow-wave sleep or deep sleep, is the most restorative phase, during which the body repairs tissues and strengthens the immune system.

REM sleep, which typically begins about ninety minutes after falling asleep, is associated with vivid dreaming. During this stage, the eyes move rapidly beneath the eyelids, and brain activity closely resembles that of wakefulness. Interestingly, the skeletal muscles are temporarily paralysed during REM sleep, a phenomenon known as REM atonia, which prevents individuals from physically acting out their dreams.

The recommended amount of sleep varies by age. The National Sleep Foundation advises that adults aged 18 to 64 should obtain between seven and nine hours of sleep per night, while teenagers require about eight to ten hours. Sleep deprivation has been linked to a wide range of health problems, including obesity, cardiovascular disease, impaired cognitive function, and weakened immune response. Chronic sleep loss is also associated with an increased risk of mental health disorders such as depression and anxiety.

Circadian rhythms, the internal biological clocks that regulate the sleep-wake cycle, are influenced by external cues, particularly light exposure. Exposure to blue light from electronic devices before bedtime can disrupt the production of melatonin, the hormone responsible for promoting sleep, leading to difficulty falling asleep and reduced sleep quality.`,
      tipsAndTricks: `1. Detailed reading vaqtida matnni bir necha marta o'qishdan qo'rqmang. Murakkab jumlalarni tushunish uchun ularni qayta-qayta o'qish va grammatik tahlil qilish normal holat.

2. Matnni o'qiyotganda, asosiy fikrni qo'llab-quvvatlovchi dalillar va misollarni ajratib olishga harakat qiling. Bu savollarga javob berishda yordam beradi.

3. Agar biror paragrafni to'liq tushunmasangiz, keyingi paragraflarga o'ting va keyin qaytib keling. Ba'zida keyingi ma'lumotlar oldingi qismni tushunishga yordam beradi.`,
      commonMistakes: `1. Butun matnni detailed reading usulida o'qish — bu eng katta xato. Imtihonda vaqt cheklanganligini unutmang, shuning uchun detailed readingni faqat kerakli qismlarga qo'llang.

2. Har bir so'zni lug'atdan qidirish. Notanish so'zlarning hammasini tarjima qilishga urinish vaqtni juda ko'p oladi. Kontekstdan ma'nosini taxmin qilishni o'rganing.

3. Savollarni o'qimasdan detailed readingni boshlash. Avval savollarni o'qib, keyin matndagi tegishli qismlarni chuqur o'qish samaraliroq.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "multiple-choice",
          question: "What happens during stage N3 of the sleep cycle?",
          options: [
            "The eyes begin to move rapidly",
            "The body repairs tissues and strengthens the immune system",
            "The person experiences vivid dreams",
            "Sleep spindles begin to appear",
          ],
          correctAnswer: 1,
          explanation: "The passage states that 'Stage N3, also known as slow-wave sleep or deep sleep, is the most restorative phase, during which the body repairs tissues and strengthens the immune system.'",
          quoteFromText: "Stage N3, also known as slow-wave sleep or deep sleep, is the most restorative phase, during which the body repairs tissues and strengthens the immune system.",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What is REM atonia?",
          options: [
            "The rapid movement of eyes during sleep",
            "The temporary paralysis of skeletal muscles during REM sleep",
            "The slowing of brain activity in deep sleep",
            "The production of melatonin by the brain",
          ],
          correctAnswer: 1,
          explanation: "The passage explains that 'the skeletal muscles are temporarily paralysed during REM sleep, a phenomenon known as REM atonia.'",
          quoteFromText: "the skeletal muscles are temporarily paralysed during REM sleep, a phenomenon known as REM atonia, which prevents individuals from physically acting out their dreams.",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "How does blue light from electronic devices affect sleep?",
          options: [
            "It increases melatonin production",
            "It disrupts the production of melatonin",
            "It has no effect on sleep quality",
            "It decreases the number of sleep cycles",
          ],
          correctAnswer: 1,
          explanation: "The passage states that 'Exposure to blue light from electronic devices before bedtime can disrupt the production of melatonin, the hormone responsible for promoting sleep.'",
          quoteFromText: "Exposure to blue light from electronic devices before bedtime can disrupt the production of melatonin, the hormone responsible for promoting sleep, leading to difficulty falling asleep and reduced sleep quality.",
        },
      ]),
    },
  });
  console.log("Lesson 3 created:", lesson3.title);

  // ─── Lesson 4: True/False/Not Given savollari ──────────────────────
  const lesson4 = await prisma.lesson.create({
    data: {
      title: "True/False/Not Given savollari",
      category: "reading",
      durationMin: 35,
      isPremium: true,
      difficulty: "Medium",
      order: 4,
      prerequisiteLessonId: lesson3.id,
      theoryContent: `True/False/Not Given — IELTS Reading bo'limidagi eng murakkab savol turlaridan biridir. Bu savol turida sizga berilgan ma'lumot matnda keltirilgan fikrga mos kelishini aniqlashingiz kerak. "True" — agar matndagi ma'lumot bilan to'liq mos kelsa, "False" — agar matndagi ma'lumot bilan zid bo'lsa, "Not Given" — agar matnda bu haqda hech qanday ma'lumot bo'lmasa.

True va Not Given o'rtasidagi farqni tushunish eng muhim ko'nikmalardan biridir. Agar matnda biror narsa haqida ma'lumot berilmagan bo'lsa, bu Not Given hisoblanadi. Talabalar ko'pincha matnda aytilmagan narsalarni o'z bilimlari asosida to'g'ri deb hisoblashadi — bu juda keng tarqalgan xato. Matnda faqat keltirilgan ma'lumotga asoslanishingiz kerak, tashqi bilimlaringizga emas.

False va Not Given o'rtasidagi farqni aniqlash ham muhimdir. Agar matn bir narsani aytib, savol buning teskarisini da'vo qilsa, bu False. Agar matn savolda aytilgan narsa haqida umuman gapirmasa, bu Not Given. IELTS imtihonida topshiriqlar matnda berilgan tartibda joylashadi, shuning uchun birinchi savolga javobni matnning boshidan qidirish kerak.`,
      passageText: `Urban Migration: Causes and Consequences

Over the past century, the world has witnessed an unprecedented shift of population from rural to urban areas. In 1900, only about 15 percent of the global population lived in cities. By 2023, this figure had risen to approximately 57 percent, and the United Nations projects that it will reach 68 percent by 2050. This movement of people is known as urban migration or rural-to-urban migration.

Several factors drive urban migration. Economic opportunities are the most significant pull factor: cities typically offer higher wages, more diverse employment options, and better career advancement prospects than rural areas. Young adults aged 18 to 35 are the most likely demographic to migrate to cities in search of work or education. Push factors, which encourage people to leave rural areas, include limited access to healthcare and education, agricultural hardship due to climate change, and declining rural economies.

The consequences of rapid urbanisation are complex and multifaceted. On the positive side, cities are centres of innovation and economic growth. They concentrate talent, infrastructure, and resources, which can lead to higher productivity and improved living standards. According to the World Bank, more than 80 percent of global GDP is generated in cities.

However, rapid urban growth also presents significant challenges. Housing shortages are common, leading to the proliferation of informal settlements or slums on the outskirts of major cities. Traffic congestion, air pollution, and inadequate waste management systems are frequent problems in densely populated urban areas. Furthermore, the influx of new residents often puts strain on public services such as water supply, electricity, and healthcare.

Some governments have implemented policies to manage urban growth more effectively. For example, investment in public transportation infrastructure has been shown to reduce traffic congestion and improve air quality. Additionally, promoting economic development in rural areas can help to balance population distribution and reduce the pressure on major cities. Japan has been particularly successful in maintaining rural populations through targeted subsidies and regional development programmes.`,
      tipsAndTricks: `1. "Not Given" bilan "False"ni adashtirmang. Agar savoldagi ma'lumot matndagi ma'lumot bilan zid bo'lsa — False. Agar matnda bu haqda hech narsa aytilmagan bo'lsa — Not Given. Matnda aytilmagan narsa haqida o'z bilimingiz asosida xulosa chiqarmang.

2. Kalit so'zlarning sinonim va parafrazlarini qidiring. "True" javobini topish uchun matn va savol bir xil so'zlarni ishlatmasligi mumkin, ammo ma'no bir xil bo'ladi.

3. "False" javobini aniqlashda mutlaq so'zlarga ("always", "never", "all") e'tibor bering. Agar matn "sometimes" deyib, savol "always" desa, bu False.`,
      commonMistakes: `1. O'z bilimlari asosida javob berish. IELTS testida faqat matnda keltirilgan ma'lumotga tayanishingiz kerak. Dunyoda haqiqatan ham to'g'ri bo'lgan ma'lumot, agar matnda bo'lmasa, "Not Given" hisoblanadi.

2. "Not Given" ni "False" deb belgilash. Agar matn savoldagi ma'lumotni na tasdiqlamasa, na rad qilmasa, bu "Not Given".

3. Savol va matndagi so'zlarning aynan bir xil bo'lishini kutish. IELTS ko'pincha sinonimlar va parafraze qilingan iboralarni ishlatadi, shuning uchun ma'noga e'tibor qarating.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "true-false-not-given",
          question: "More than 80 percent of the world's population currently lives in cities.",
          options: ["True", "False", "Not Given"],
          correctAnswer: 1,
          explanation: "The passage states that by 2023, approximately 57 percent of the global population lived in cities, not more than 80 percent. The 80 percent figure refers to global GDP generated in cities, not population.",
          quoteFromText: "By 2023, this figure had risen to approximately 57 percent, and the United Nations projects that it will reach 68 percent by 2050.",
        },
        {
          id: 2,
          type: "true-false-not-given",
          question: "Young adults are more likely to move to cities than older people.",
          options: ["True", "False", "Not Given"],
          correctAnswer: 0,
          explanation: "The passage explicitly states that 'Young adults aged 18 to 35 are the most likely demographic to migrate to cities.'",
          quoteFromText: "Young adults aged 18 to 35 are the most likely demographic to migrate to cities in search of work or education.",
        },
        {
          id: 3,
          type: "true-false-not-given",
          question: "Japan has the highest urban population in the world.",
          options: ["True", "False", "Not Given"],
          correctAnswer: 2,
          explanation: "The passage mentions that Japan has been successful in maintaining rural populations through subsidies, but it does not provide any information about Japan having the highest urban population in the world.",
          quoteFromText: "Japan has been particularly successful in maintaining rural populations through targeted subsidies and regional development programmes.",
        },
      ]),
    },
  });
  console.log("Lesson 4 created:", lesson4.title);

  // ─── Lesson 5: Matching headings ────────────────────────────────────
  const lesson5 = await prisma.lesson.create({
    data: {
      title: "Matching headings",
      category: "reading",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 5,
      prerequisiteLessonId: lesson4.id,
      theoryContent: `Matching headings — IELTS Reading bo'limidagi keng tarqalgan savol turi bo'lib, unda siz matnning har bir paragrafi uchun mos sarlavhani tanlashingiz kerak. Odatda, sarlavhalar soni paragraflar sonidan ko'p bo'ladi, shuning uchun bir nechta sarlavha keraksiz bo'lib qoladi. Bu savol turi sizning matnning asosiy g'oyasini tezda aniqlash qobiliyatingizni tekshiradi.

Matching headings topshirig'ida muvaffaqiyatli bo'lish uchun eng muhim strategiya — skimming texnikasidan foydalanishdir. Har bir paragrafni tezda o'qib, uning asosiy mavzusini tushunish kerak. Paragrafning birinchi va oxirgi jumlalari odatda asosiy g'oyani o'z ichiga oladi. Shuningdek, paragrafdagi takrorlanadigan so'zlar va kalit atamalarga e'tibor berish lozim.

Matching headings topshirig'ini bajarishda tavsiya etiladigan usul — birinchi navbatda barcha sarlavhalarni o'qib chiqish, so'ngra matnni paragrafma-paragraf o'qish va har biriga mos sarlavhani tanlashdir. Agar biror paragrafga mos sarlavha topa olmasangiz, uni vaqtincha qoldirib, keyingi paragraflarga o'ting. Ba'zida qolgan sarlavhalar orasidan mosini topish osonroq bo'ladi.`,
      passageText: `The Origins of Language

[A] The question of how human language originated has fascinated scholars for centuries. Unlike writing, which leaves behind physical evidence, spoken language leaves no direct trace in the archaeological record. This has made the study of language origins particularly challenging. Various theories have been proposed, ranging from religious explanations to scientific hypotheses based on evidence from anthropology, neuroscience, and primatology.

[B] One of the earliest scientific theories was the "bow-wow" theory, which suggested that language began as an imitation of natural sounds. According to this view, early humans mimicked the sounds of animals and environmental phenomena, and these imitations gradually evolved into words. A related theory, the "pooh-pooh" theory, proposed that language originated from instinctive sounds made in response to emotions such as pain, surprise, or joy. While these theories are intuitively appealing, most modern linguists consider them overly simplistic.

[C] A more recent and influential perspective comes from the study of animal communication. Primatologists have observed that chimpanzees and bonobos can learn to use sign language and symbols to communicate with humans. However, these animals rarely combine symbols into complex sequences, suggesting that the ability to combine discrete units into an infinite variety of expressions — known as recursion — may be uniquely human. The FOXP2 gene, discovered in the 1990s, has been linked to speech production in humans and is often cited as evidence for a genetic basis of language.

[D] The emergence of language likely occurred gradually over hundreds of thousands of years. Some researchers believe that language evolved in conjunction with tool-making, as both activities require complex sequencing and planning. Others point to the development of the human brain, particularly the expansion of the prefrontal cortex, as a critical factor. The fossil record shows that the hyoid bone, which supports the tongue and is essential for speech, first appeared in Homo heidelbergensis approximately 500,000 years ago. This suggests that the physical capacity for speech may have existed long before the development of fully modern language.

[E] Despite decades of research, many questions about language origins remain unanswered. The debate continues between those who believe language emerged suddenly as a result of a single genetic mutation and those who argue for a more gradual evolution driven by social and environmental pressures. What is clear is that language is a defining characteristic of the human species, and its origins are deeply intertwined with the story of human evolution itself.`,
      tipsAndTricks: `1. Avval barcha sarlavhalarni o'qib chiqing va ularning ma'nosini tushunib oling. Sarlavhalarni tushunmasdan paragraflarni o'qishni boshlash vaqtni behuda sarflaydi.

2. Har bir paragrafni o'qiyotganda, uning asosiy g'oyasini topishga harakat qiling. Buning uchun birinchi va oxirgi jumlalarga, shuningdek, takrorlanuvchi so'zlarga e'tibor bering.

3. Agar bir paragrafga bir nechta sarlavha mos keladigan bo'lsa, paragrafda eng ko'p muhokama qilingan mavzuni tanlang. Sarlavha paragrafning to'liq mazmunini qamrab olishi kerak.`,
      commonMistakes: `1. Sarlavhadagi bir so'zga asoslanib javob tanlash. Sarlavha paragrafning to'liq mazmunini aks ettirishi kerak, faqat bir so'zning mos kelishi yetarli emas.

2. Avval matnni to'liq o'qib, keyin sarlavhalarni tanlash. Bu juda ko'p vaqt oladi. Skimming qiling va har bir paragrafdan keyin sarlavhalarni qarab ko'ring.

3. Qiyin paragraflarga juda ko'p vaqt sarflash. Agar bir paragrafga sarlavha topa olmasangiz, uni keyinga qoldiring va boshqa paragraflar bilan davom eting.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "matching-headings",
          question: "Paragraph [A]",
          options: [
            "Animal Communication Studies",
            "The Physical Evidence for Speech",
            "The Challenge of Studying Language Origins",
            "Gradual Evolution of Language",
          ],
          correctAnswer: 2,
          explanation: "Paragraph A discusses the difficulty of studying language origins because spoken language leaves no direct physical trace.",
          quoteFromText: "Unlike writing, which leaves behind physical evidence, spoken language leaves no direct trace in the archaeological record. This has made the study of language origins particularly challenging.",
        },
        {
          id: 2,
          type: "matching-headings",
          question: "Paragraph [C]",
          options: [
            "The Challenge of Studying Language Origins",
            "Animal Communication Studies",
            "Gradual Evolution of Language",
            "Early Theories of Language",
          ],
          correctAnswer: 1,
          explanation: "Paragraph C discusses what the study of animal communication, particularly in chimpanzees and bonobos, reveals about language.",
          quoteFromText: "A more recent and influential perspective comes from the study of animal communication. Primatologists have observed that chimpanzees and bonobos can learn to use sign language and symbols to communicate with humans.",
        },
        {
          id: 3,
          type: "matching-headings",
          question: "Paragraph [E]",
          options: [
            "The Physical Evidence for Speech",
            "Animal Communication Studies",
            "Early Theories of Language",
            "Unresolved Questions about Language Origins",
          ],
          correctAnswer: 3,
          explanation: "Paragraph E discusses how many questions remain unanswered and describes the ongoing debate between different theories.",
          quoteFromText: "Despite decades of research, many questions about language origins remain unanswered. The debate continues between those who believe language emerged suddenly as a result of a single genetic mutation and those who argue for a more gradual evolution.",
        },
      ]),
    },
  });
  console.log("Lesson 5 created:", lesson5.title);

  // ─── Lesson 6: Sentence completion ──────────────────────────────────
  const lesson6 = await prisma.lesson.create({
    data: {
      title: "Sentence completion",
      category: "reading",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 6,
      prerequisiteLessonId: lesson5.id,
      theoryContent: `Sentence completion — IELTS Reading bo'limida tez-tez uchraydigan savol turi bo'lib, unda siz berilgan jumlalarni matndan olingan so'zlar bilan to'ldirishingiz kerak. Odatda, bo'sh joyga qo'yiladigan so'zlar soni ko'rsatilgan bo'ladi, masalan, "NO MORE THAN TWO WORDS" yoki "ONE WORD ONLY" kabi talablar mavjud.

Sentence completion topshirig'ida muvaffaqiyatli bo'lish uchun avval berilgan jumlalarni o'qib chiqish va undagi kalit so'zlarni aniqlash kerak. So'ngra scanning texnikasi yordamida matndan o'sha kalit so'zlarni qidirish lozim. Jumlalardagi bo'sh joyga qo'yiladigan so'z odatda kalit so'zga yaqin joyda joylashgan bo'ladi. Topilgan javobni jumlaga qo'yib, grammatik jihatdan to'g'ri ekanligini tekshiring.

Bu savol turida yana bir muhim nuqta — so'zlarni matndan to'g'ridan-to'g'ri olish kerak. Siz so'zlarning shaklini o'zgartira olmaysiz, ya'ni fe'lning zamonini yoki otning sonini o'zgartirish mumkin emas. Agar matnda "develop" deb yozilgan bo'lsa, siz "development" deb yozishingiz kerak bo'lgan bo'sh joy bo'lsa, bu noto'g'ri hisoblanadi.`,
      passageText: `The Green Revolution

The term "Green Revolution" refers to a period of agricultural transformation that took place between the 1940s and the late 1960s. During this time, agricultural production increased dramatically worldwide, particularly in developing countries, thanks to the introduction of new technologies, crop varieties, and farming practices. The Green Revolution is widely credited with saving over a billion people from starvation.

The scientific foundation of the Green Revolution was laid by the American agronomist Norman Borlaug, who developed high-yielding varieties (HYVs) of wheat in Mexico during the 1940s and 1950s. These new varieties were dwarf in height, which meant they could support heavier grain heads without falling over. They were also responsive to fertilisers, allowing farmers to achieve significantly higher yields per hectare. Borlaug's work earned him the Nobel Peace Prize in 1970.

The Green Revolution had a profound impact on global food production. In India, for example, wheat production rose from 12 million tons in 1965 to 20 million tons by 1970. Similar increases were observed in other Asian countries, including Pakistan and the Philippines. The introduction of high-yielding rice varieties, developed at the International Rice Research Institute in the Philippines, was particularly successful in transforming rice production across Asia.

However, the Green Revolution was not without its critics. Environmentalists have pointed out that the intensive farming methods it promoted led to soil degradation, water scarcity, and increased use of chemical fertilisers and pesticides. The heavy reliance on a small number of crop varieties also reduced agricultural biodiversity, making crops more vulnerable to diseases and pests. Furthermore, the benefits of the Green Revolution were not evenly distributed — wealthier farmers who could afford the new technologies benefited far more than poorer smallholders.

In recent years, there has been growing interest in sustainable agricultural practices that build on the lessons of the Green Revolution while addressing its shortcomings. Approaches such as agroecology, conservation agriculture, and precision farming aim to increase food production without causing environmental harm. These methods seek to balance productivity with sustainability, ensuring food security for future generations without depleting natural resources.`,
      tipsAndTricks: `1. Javobni topishda grammatik ko'rsatkichlardan foydalaning. Bo'sh joydan oldin kelgan so'z (masalan, "the", "a", "to") sizga qidirilayotgan so'z turi (ot, fe'l, sifat) haqida ma'lumot beradi.

2. So'z soni chekloviga rioya qiling. Agar "NO MORE THAN TWO WORDS" deb ko'rsatilgan bo'lsa, faqat 1 yoki 2 so'z yozishingiz mumkin. Uch so'z yozish noto'g'ri hisoblanadi.

3. Javobni matndan topgach, uni jumlaga qo'yib o'qing. Agar jumla grammatik jihatdan to'g'ri va ma'noli bo'lsa, javobingiz to'g'ri. Agar jumla mantiqsiz bo'lsa, qayta qidiring.`,
      commonMistakes: `1. So'zlarning shaklini o'zgartirish. Matnda "develop" yozilgan bo'lsa, siz "developed" yoki "development" yoza olmaysiz. So'zni aynan matnda qanday bo'lsa, shunday yozish kerak.

2. Cheklovni hisobga olmaslik. "ONE WORD ONLY" deyilgan bo'lsa, bir nechta so'z yozish yoki aksincha, talab qilinganidan kam so'z yozish xato.

3. Javobni noto'g'ri joydan qidirish. Jumlalar matndagi tartibda joylashgan, shuning uchun birinchi jumlaga javobni matnning boshidan qidiring.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "sentence-completion",
          question: "The Green Revolution introduced new technologies and ______ that increased agricultural production.",
          options: [
            "fertilisers",
            "crop varieties",
            "irrigation systems",
            "machinery",
          ],
          correctAnswer: 1,
          explanation: "The passage states that the Green Revolution involved 'the introduction of new technologies, crop varieties, and farming practices.'",
          quoteFromText: "thanks to the introduction of new technologies, crop varieties, and farming practices.",
        },
        {
          id: 2,
          type: "sentence-completion",
          question: "The high-yielding wheat varieties developed by Borlaug were dwarf in height and responsive to ______.",
          options: [
            "pesticides",
            "water",
            "fertilisers",
            "sunlight",
          ],
          correctAnswer: 2,
          explanation: "The passage states the new varieties 'were also responsive to fertilisers, allowing farmers to achieve significantly higher yields per hectare.'",
          quoteFromText: "They were also responsive to fertilisers, allowing farmers to achieve significantly higher yields per hectare.",
        },
        {
          id: 3,
          type: "sentence-completion",
          question: "The benefits of the Green Revolution were unevenly distributed, favouring ______ who could afford new technologies.",
          options: [
            "large corporations",
            "wealthier farmers",
            "government agencies",
            "foreign investors",
          ],
          correctAnswer: 1,
          explanation: "The passage states that 'wealthier farmers who could afford the new technologies benefited far more than poorer smallholders.'",
          quoteFromText: "wealthier farmers who could afford the new technologies benefited far more than poorer smallholders.",
        },
      ]),
    },
  });
  console.log("Lesson 6 created:", lesson6.title);

  // ─── Lesson 7: Multiple choice strategiyasi ─────────────────────────
  const lesson7 = await prisma.lesson.create({
    data: {
      title: "Multiple choice strategiyasi",
      category: "reading",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 7,
      prerequisiteLessonId: lesson6.id,
      theoryContent: `Multiple choice savollari IELTS Reading bo'limining eng keng tarqalgan savol turlaridan biridir. Bu savol turida sizga berilgan savolga to'g'ri javobni bir nechta variant orasidan tanlashingiz kerak. Odatda to'rtta variant (A, B, C, D) beriladi va ulardan faqat bittasi to'g'ri javob hisoblanadi.

Multiple choice savollarida muvaffaqiyatli bo'lish uchun avval savolni diqqat bilan o'qib, undan kalit so'zlarni ajratib olish kerak. So'ngra scanning texnikasidan foydalanib, matndan tegishli qismni toping. Matnni topgach, detailed reading bilan o'qib, to'g'ri variantni aniqlang. Javobni tanlashda "distractor" (chalg'ituvchi) variantlarga e'tibor bering — ular odatda matnda haqiqatan ham tilga olingan, ammo savolga to'g'ri javob bo'lmagan ma'lumotlarni o'z ichiga oladi.

Multiple choice savollarida eng samarali strategiya — noto'g'ri variantlarni chiqarib tashlash (elimination) usulidir. Avval aniq noto'g'ri variantlarni chiqarib tashlang, so'ng qolgan variantlar orasidan eng to'g'risini tanlang. Agar biror variantda "always", "never", "all" kabi mutlaq so'zlar bo'lsa, ehtiyot bo'ling — ular ko'pincha noto'g'ri bo'ladi.`,
      passageText: `Artificial Intelligence: Promise and Peril

Artificial intelligence (AI) has become one of the most transformative technologies of the twenty-first century. Broadly defined, AI refers to computer systems that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation. The field has experienced remarkable progress since the early 2000s, driven by advances in machine learning, increased computational power, and the availability of vast amounts of data.

Machine learning, a subset of AI, involves training algorithms on large datasets so that they can identify patterns and make predictions without being explicitly programmed for each task. Deep learning, a more advanced form of machine learning, uses artificial neural networks inspired by the structure of the human brain. These techniques have led to breakthroughs in areas such as image recognition, natural language processing, and autonomous vehicles. For instance, modern AI systems can diagnose certain medical conditions from scans with greater accuracy than human radiologists.

The economic impact of AI is substantial and growing. According to a report by McKinsey Global Institute, AI could contribute up to 13 trillion dollars to the global economy by 2030. Businesses are using AI to optimise supply chains, personalise customer experiences, and automate routine tasks. However, the same report warns that AI-driven automation could displace up to 375 million workers worldwide by 2030, requiring significant investment in retraining and education.

Ethical concerns surrounding AI have also attracted increasing attention. Issues such as algorithmic bias, privacy infringement, and the potential for autonomous weapons systems have prompted calls for stronger regulation. In 2023, the European Union passed the AI Act, the world's first comprehensive legal framework for AI, which classifies AI applications into different risk categories and imposes corresponding requirements.

Looking ahead, researchers are working on artificial general intelligence (AGI) — AI systems that would match or exceed human capabilities across a wide range of cognitive tasks. While AGI remains theoretical, its potential implications are profound. Many experts believe that ensuring AGI systems are aligned with human values is one of the most important challenges facing humanity.`,
      tipsAndTricks: `1. Noto'g'ri variantlarni chiqarib tashlash (elimination) usulidan foydalaning. Agar bir variant noto'g'ri ekanligiga ishonchingiz komil bo'lsa, uni kesib tashlang va qolgan variantlar orasidan tanlang.

2. "Distractor" variantlarga e'tiborli bo'ling. Ular odatda matnda eslatib o'tilgan, ammo savolga to'g'ri javob bo'lmagan ma'lumotlarni o'z ichiga oladi. Variantni tanlashdan oldin savolni qayta o'qing.

3. Mutlaq so'zlar ("always", "never", "every", "all") qatnashgan variantlar odatda noto'g'ri bo'ladi. IELTS matnlarida mutlaq tasdiqlar kam uchraydi.`,
      commonMistakes: `1. Savolni to'liq tushunmasdan javob tanlash. Ba'zi talabalar matndan tanish so'zni ko'rib, darhol shu variantni tanlashadi, ammo savol butunlay boshqa narsani so'rashi mumkin.

2. Birinchi to'g'ri ko'ringan variantni tanlab olish. Barcha variantlarni o'qib chiqing, chunki birinchi variant qisman to'g'ri bo'lishi mumkin, ammo to'liq javob boshqa variantda bo'ladi.

3. Matndan tashqari bilimlarga asoslanish. To'g'ri javob faqat matnda keltirilgan ma'lumotga asoslangan bo'lishi kerak, sizning shaxsiy bilimingizga emas.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "multiple-choice",
          question: "What is deep learning?",
          options: [
            "A type of AI that uses simple rule-based algorithms",
            "A form of machine learning using artificial neural networks",
            "A method of training AI with small datasets",
            "A system that replaces all human decision-making",
          ],
          correctAnswer: 1,
          explanation: "The passage states that 'Deep learning, a more advanced form of machine learning, uses artificial neural networks inspired by the structure of the human brain.'",
          quoteFromText: "Deep learning, a more advanced form of machine learning, uses artificial neural networks inspired by the structure of the human brain.",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What does the McKinsey report suggest about AI's impact on employment?",
          options: [
            "AI will create more jobs than it displaces",
            "AI could displace up to 375 million workers by 2030",
            "AI will only affect manufacturing jobs",
            "AI will not significantly impact the job market",
          ],
          correctAnswer: 1,
          explanation: "According to the passage, the McKinsey report warns that 'AI-driven automation could displace up to 375 million workers worldwide by 2030.'",
          quoteFromText: "the same report warns that AI-driven automation could displace up to 375 million workers worldwide by 2030, requiring significant investment in retraining and education.",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "What did the European Union do in 2023 regarding AI?",
          options: [
            "It banned all AI development in Europe",
            "It passed the world's first comprehensive AI legal framework",
            "It created a new AI research institute",
            "It imposed a moratorium on AI research",
          ],
          correctAnswer: 1,
          explanation: "The passage states that 'the European Union passed the AI Act, the world's first comprehensive legal framework for AI.'",
          quoteFromText: "In 2023, the European Union passed the AI Act, the world's first comprehensive legal framework for AI, which classifies AI applications into different risk categories and imposes corresponding requirements.",
        },
      ]),
    },
  });
  console.log("Lesson 7 created:", lesson7.title);

  // ─── Lesson 8: Summary completion ──────────────────────────────────
  const lesson8 = await prisma.lesson.create({
    data: {
      title: "Summary completion",
      category: "reading",
      durationMin: 25,
      isPremium: true,
      difficulty: "Hard",
      order: 8,
      prerequisiteLessonId: lesson7.id,
      theoryContent: `Summary completion — IELTS Reading bo'limidagi murakkab savol turlaridan biri bo'lib, unda sizga matnning qisqartirilgan xulosasi (summary) beriladi va undagi bo'sh joylarni to'ldirishingiz kerak. Odatda xulosa matnning ma'lum bir qismiga yoki butun matnga tegishli bo'lishi mumkin. Bo'sh joylar bir yoki ikki so'z bilan to'ldirilishi talab qilinadi.

Summary completion topshirig'ida muvaffaqiyatli bo'lish uchun avval xulosani o'qib chiqish va unda qaysi ma'lumotlar yetishmayotganini tushunish kerak. So'ngra matnni skimming qilib, xulosaga mos keladigan qismini topish lozim. Xulosadagi bo'sh joylar odatda asosiy ma'lumotlarni o'z ichiga oladi — sabablar, natijalar, sanalar, ismlar yoki jarayonlarning nomlari.

Bu savol turini bajarishda eng muhim strategiya — xulosadagi kalit so'zlarni matndagi sinonimlari bilan moslashtirishdir. Xulosa odatda matndagi so'zlarni o'zgartirib (parafraze) berilgan bo'ladi, shuning uchun aynan bir xil so'zlarni qidirmaslik kerak. Buning o'rniga, ma'noni tushunish va matndagi tegishli ma'lumotni topish muhimdir. Javobni matndan topgach, uni xulosaga qo'yib, grammatik va mantiqiy jihatdan tekshirishni unutmang.`,
      passageText: `Oceanography: Exploring the Deep

The world's oceans cover approximately 71 percent of the Earth's surface and contain about 97 percent of the planet's water. Despite their vastness, more than 80 percent of the ocean remains unexplored and unmapped. Oceanography, the scientific study of the ocean, seeks to understand the physical, chemical, biological, and geological characteristics of marine environments.

Physical oceanography focuses on the movements and properties of ocean water. This includes the study of currents, waves, tides, and the transfer of heat between the ocean and the atmosphere. The global ocean conveyor belt, a large-scale system of currents driven by differences in temperature and salinity, plays a crucial role in regulating the Earth's climate. Warm surface waters travel from the equator towards the poles, while cold, deep waters flow back towards the equator.

Chemical oceanography examines the composition of seawater and the chemical processes that occur within it. Seawater contains dissolved salts, gases, and nutrients that are essential for marine life. One area of particular concern is ocean acidification, which is caused by the absorption of excess carbon dioxide from the atmosphere. Since the Industrial Revolution, the acidity of the ocean has increased by approximately 30 percent, threatening organisms such as corals and shellfish that rely on calcium carbonate to build their shells.

Biological oceanography explores the diversity and distribution of marine organisms. The ocean is home to an estimated 2.2 million species, of which only about 240,000 have been formally described. Marine ecosystems range from sunlit surface waters to the dark, high-pressure environment of the deep sea. Hydrothermal vents, discovered in 1977, host unique communities of organisms that thrive in extreme conditions without sunlight, relying instead on chemosynthesis — a process in which bacteria convert chemicals from the vents into energy.

Geological oceanography investigates the structure and composition of the ocean floor. The seafloor is not flat; it includes mountain ranges, volcanoes, trenches, and vast plains. The Mid-Atlantic Ridge, the longest mountain range in the world, stretches for approximately 16,000 kilometres beneath the Atlantic Ocean. Understanding the geology of the ocean floor is essential for studying plate tectonics, predicting earthquakes and tsunamis, and locating mineral resources.`,
      tipsAndTricks: `1. Xulosani o'qiyotganda, bo'sh joylardan oldin va keyin kelgan so'zlarga e'tibor bering. Ular sizga qaysi turdagi so'z (ot, sifat, fe'l) kerakligini ko'rsatadi.

2. Parafraze qilingan iboralarga e'tiborli bo'ling. Xulosadagi "a large-scale system of currents" matnda "global ocean conveyor belt" deb atalishi mumkin.

3. Javobingizni har doim grammatik jihatdan tekshiring. Bo'sh joyga qo'yilgan so'z jumlada grammatik jihatdan to'g'ri bo'lishi kerak.`,
      commonMistakes: `1. Xulosani o'qimasdan darhol matnni qidirishni boshlash. Avval xulosani tushunib oling, so'ng kerakli ma'lumotni qidiring.

2. Matndagi so'zlarni aynan xulosaga ko'chirishga urinish. Xulosa parafraze qilingan bo'ladi, shuning uchun ma'noga e'tibor bering, so'zlarning aynan bir xil bo'lishiga emas.

3. Javobni grammatik tekshirmaslik. Agar xulosadagi jumla grammatik jihatdan to'g'ri bo'lmasa, javobingiz noto'g'ri.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "summary-completion",
          question: "The ocean covers about 71% of Earth's surface, yet over ______ remains unexplored.",
          options: [
            "50 percent",
            "80 percent",
            "97 percent",
            "30 percent",
          ],
          correctAnswer: 1,
          explanation: "The passage states that 'more than 80 percent of the ocean remains unexplored and unmapped.'",
          quoteFromText: "more than 80 percent of the ocean remains unexplored and unmapped.",
        },
        {
          id: 2,
          type: "summary-completion",
          question: "Ocean acidification has increased by approximately ______ since the Industrial Revolution.",
          options: [
            "30 percent",
            "71 percent",
            "80 percent",
            "97 percent",
          ],
          correctAnswer: 0,
          explanation: "The passage states that 'the acidity of the ocean has increased by approximately 30 percent' since the Industrial Revolution.",
          quoteFromText: "Since the Industrial Revolution, the acidity of the ocean has increased by approximately 30 percent, threatening organisms such as corals and shellfish that rely on calcium carbonate to build their shells.",
        },
        {
          id: 3,
          type: "summary-completion",
          question: "The Mid-Atlantic Ridge stretches for approximately ______ kilometres beneath the Atlantic Ocean.",
          options: [
            "2.2 million",
            "240,000",
            "16,000",
            "1977",
          ],
          correctAnswer: 2,
          explanation: "The passage states that the Mid-Atlantic Ridge 'stretches for approximately 16,000 kilometres beneath the Atlantic Ocean.'",
          quoteFromText: "The Mid-Atlantic Ridge, the longest mountain range in the world, stretches for approximately 16,000 kilometres beneath the Atlantic Ocean.",
        },
      ]),
    },
  });
  console.log("Lesson 8 created:", lesson8.title);

  // ─── Lesson 9: Diagram labeling ─────────────────────────────────────
  const lesson9 = await prisma.lesson.create({
    data: {
      title: "Diagram labeling",
      category: "reading",
      durationMin: 20,
      isPremium: true,
      difficulty: "Medium",
      order: 9,
      prerequisiteLessonId: lesson8.id,
      theoryContent: `Diagram labeling — IELTS Reading bo'limida uchraydigan vizual savol turidir. Bunda sizga biror jarayon, tuzilma yoki mexanizmning diagrammasi beriladi va undagi bo'sh joylarni matndagi ma'lumotlarga asoslanib to'ldirishingiz kerak. Diagramma odatda mashina, anatomik tuzilma, geologik jarayon yoki ishlab chiqarish jarayonini ko'rsatishi mumkin.

Diagram labeling topshirig'ida muvaffaqiyatli bo'lish uchun avval diagrammani sinchkovlik bilan o'rganib chiqish kerak. Diagrammaning sarlavhasi va undagi mavjud yorliqlar matnning qaysi qismiga murojaat qilish kerakligini ko'rsatadi. So'ngra matnni o'qib, diagrammadagi har bir bo'sh joyga mos keladigan ma'lumotni topish lozim. Diagrammadagi raqamlar yoki harflar odatda matndagi ma'lum bir tartibda joylashgan bo'ladi.

Diagramma yorliqlarini to'ldirishda so'z soni chekloviga rioya qilish muhimdir. Odatda "NO MORE THAN TWO WORDS" yoki "ONE WORD ONLY" kabi talablar beriladi. Javoblar matndan to'g'ridan-to'g'ri olinishi kerak va so'zlarning shaklini o'zgartirish mumkin emas. Diagrammadagi o'qlar va yo'nalishlar jarayonning qanday ketma-ketlikda sodir bo'lishini tushunishga yordam beradi.`,
      passageText: `The Human Brain: Structure and Function

The human brain is an extraordinarily complex organ, containing approximately 86 billion neurons. It is divided into several major regions, each responsible for different functions. Understanding the basic structure of the brain is essential for appreciating how it controls thought, emotion, movement, and bodily functions.

The largest part of the brain is the cerebrum, which is divided into two hemispheres — left and right — connected by a thick band of nerve fibres called the corpus callosum. The outer layer of the cerebrum, known as the cerebral cortex, is highly folded and is responsible for higher cognitive functions such as language, memory, reasoning, and conscious thought. The cerebrum is further divided into four lobes: the frontal lobe, parietal lobe, temporal lobe, and occipital lobe.

The frontal lobe, located at the front of the brain, is associated with executive functions such as planning, decision-making, impulse control, and social behaviour. It also contains the motor cortex, which controls voluntary movement. Behind the frontal lobe lies the parietal lobe, which processes sensory information from the body, including touch, temperature, and pain. The temporal lobe, situated on the sides of the brain, is primarily involved in auditory processing, language comprehension, and memory formation. The hippocampus, a small structure within the temporal lobe, plays a critical role in forming new memories.

At the back of the brain sits the occipital lobe, which is dedicated to visual processing. It receives and interprets signals from the eyes, allowing us to see and recognise objects, faces, and written words. Beneath the cerebrum lies the cerebellum, which coordinates balance, posture, and fine motor movements. Damage to the cerebellum can result in loss of coordination and difficulty performing precise movements.

The brainstem, located at the base of the brain, connects the brain to the spinal cord. It controls essential life-sustaining functions such as breathing, heart rate, blood pressure, and sleep cycles. The brainstem consists of three main parts: the midbrain, pons, and medulla oblongata. Without the brainstem, the brain would be unable to communicate with the rest of the body, and basic bodily functions would cease.`,
      tipsAndTricks: `1. Diagrammani o'rganishga vaqt ajrating. O'qlar va yo'nalishlar jarayonning ketma-ketligini ko'rsatadi. Sarlavha va mavjud yorliqlar matnning qaysi qismiga murojaat qilishni belgilashga yordam beradi.

2. Diagrammadagi bo'sh joylar matndagi ma'lum bir tartibda joylashgan. Birinchi bo'sh joyga javobni matnning boshidan, keyingilarini esa davomidan qidiring.

3. Javoblarni matndan aynan oling. So'zlarning shaklini o'zgartirmang va "NO MORE THAN TWO WORDS" chekloviga rioya qiling.`,
      commonMistakes: `1. Diagrammani tushunmasdan javob qidirishni boshlash. Diagrammani sinchkovlik bilan o'rganmaslik noto'g'ri javoblarga olib keladi.

2. Matndan topilgan birinchi so'zni javob deb yozish. Diagrammadagi bo'sh joyga mos keladigan so'zni topish uchun matnni batafsil o'qish kerak bo'lishi mumkin.

3. So'z soni chekloviga rioya qilmaslik. "ONE WORD ONLY" talab qilingan bo'lsa, ikkita so'z yozish noto'g'ri.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "diagram-labeling",
          question: "The structure that connects the left and right hemispheres of the cerebrum is called the ______.",
          options: [
            "cerebral cortex",
            "corpus callosum",
            "hippocampus",
            "brainstem",
          ],
          correctAnswer: 1,
          explanation: "The passage states that the two hemispheres are 'connected by a thick band of nerve fibres called the corpus callosum.'",
          quoteFromText: "The largest part of the brain is the cerebrum, which is divided into two hemispheres — left and right — connected by a thick band of nerve fibres called the corpus callosum.",
        },
        {
          id: 2,
          type: "diagram-labeling",
          question: "The lobe located at the front of the brain responsible for planning and decision-making is the ______.",
          options: [
            "parietal lobe",
            "temporal lobe",
            "frontal lobe",
            "occipital lobe",
          ],
          correctAnswer: 2,
          explanation: "The passage states that 'The frontal lobe, located at the front of the brain, is associated with executive functions such as planning, decision-making, impulse control, and social behaviour.'",
          quoteFromText: "The frontal lobe, located at the front of the brain, is associated with executive functions such as planning, decision-making, impulse control, and social behaviour.",
        },
        {
          id: 3,
          type: "diagram-labeling",
          question: "The part of the brain that coordinates balance and fine motor movements is the ______.",
          options: [
            "cerebellum",
            "cerebrum",
            "hippocampus",
            "brainstem",
          ],
          correctAnswer: 0,
          explanation: "The passage states that 'the cerebellum... coordinates balance, posture, and fine motor movements.'",
          quoteFromText: "Beneath the cerebrum lies the cerebellum, which coordinates balance, posture, and fine motor movements.",
        },
      ]),
    },
  });
  console.log("Lesson 9 created:", lesson9.title);

  // ─── Lesson 10: Matching features ──────────────────────────────────
  const lesson10 = await prisma.lesson.create({
    data: {
      title: "Matching features",
      category: "reading",
      durationMin: 30,
      isPremium: true,
      difficulty: "Hard",
      order: 10,
      prerequisiteLessonId: lesson9.id,
      theoryContent: `Matching features — IELTS Reading bo'limidagi murakkab savol turlaridan biri bo'lib, unda siz matndagi ma'lumotlarni bir-biriga moslashtirishingiz kerak. Odatda, sizga bir nechta shaxslar, tadqiqotchilar, nazariyalar yoki davrlar beriladi va siz ularning har biriga tegishli fikr, kashfiyot yoki xususiyatni moslashtirishingiz kerak. Bu savol turi "Matching information to paragraphs" yoki "Which paragraph contains..." deb ham nomlanishi mumkin.

Matching features topshirig'ida muvaffaqiyatli bo'lish uchun avval berilgan xususiyatlar (statements) ro'yxatini o'qib chiqish va ulardagi kalit so'zlarni aniqlash kerak. So'ngra scanning texnikasi yordamida matndan bu kalit so'zlar yoki ularning sinonimlarini qidirish lozim. Har bir xususiyat uchun matnda faqat bitta mos ma'lumot bo'ladi, shuning uchun bir xususiyatni bir necha marta ishlatib bo'lmaydi.

Bu savol turida vaqtni tejash uchun birinchi navbatda matnni skimming qilib, har bir paragrafning mavzusini tushunib olish tavsiya etiladi. Keyin har bir xususiyatni o'qib, qaysi paragrafda bu haqida ma'lumot bo'lishi mumkinligini taxmin qilish mumkin. Agar bir xususiyatga bir nechta paragraf mos kelsa, ularni batafsil o'qib, eng to'g'risini tanlash kerak.`,
      passageText: `Endangered Species: A Global Crisis

The current rate of species extinction is estimated to be between 1,000 and 10,000 times higher than the natural background rate. According to the International Union for Conservation of Nature (IUCN), more than 42,000 species are currently threatened with extinction, representing approximately 28 percent of all assessed species. This biodiversity crisis is driven primarily by human activities.

[1] Habitat destruction is the single greatest threat to endangered species worldwide. Deforestation, urban expansion, and agricultural development have destroyed vast areas of natural habitat. The Amazon rainforest, often described as the "lungs of the Earth," has lost approximately 17 percent of its forest cover in the past fifty years. Species that depend on specific habitats, such as the orangutan in Southeast Asia, are particularly vulnerable to habitat loss.

[2] Climate change has emerged as a rapidly growing threat to biodiversity. Rising global temperatures are forcing species to migrate towards the poles or to higher elevations in search of suitable conditions. The polar bear, which depends on sea ice for hunting, has become an iconic symbol of climate change impacts. Scientists predict that if current warming trends continue, one-third of all plant and animal species could face extinction by 2070.

[3] Poaching and illegal wildlife trade represent another significant threat. Despite international bans, an estimated 20,000 African elephants are killed each year for their ivory. Rhinos are poached for their horns, which are falsely believed to have medicinal properties. The illegal wildlife trade is estimated to be worth between 7 and 23 billion dollars annually, making it one of the most profitable forms of organised crime.

[4] Conservation efforts have achieved some notable successes. The recovery of the humpback whale, which was brought back from the brink of extinction through a global moratorium on commercial whaling, demonstrates that conservation can work. Similarly, the giant panda has been downgraded from "endangered" to "vulnerable" thanks to decades of protection and habitat restoration in China.

[5] International cooperation is essential for addressing the biodiversity crisis. The Convention on Biological Diversity, signed by 196 countries, sets global targets for conservation. Protected areas now cover approximately 15 percent of land and 7 percent of marine environments worldwide. However, many experts argue that these targets are insufficient and that much stronger action is needed to prevent mass extinction.`,
      tipsAndTricks: `1. Avval xususiyatlar (features) ro'yxatini o'qib, kalit so'zlarni ajratib oling. So'ngra matnni skimming qilib, har bir paragrafning mavzusini tushunib oling.

2. Bir vaqtning o'zida bir nechta xususiyatni qidirish o'rniga, ularni birma-bir tekshiring. Bu chalkashlikning oldini oladi va aniqroq javob topishga yordam beradi.

3. Agar bir xususiyatga bir nechta mos keladigan joy topsangiz, kontekstni batafsil o'qib, qaysi biri eng to'g'ri ekanligini aniqlang.`,
      commonMistakes: `1. Xususiyatlarni to'liq o'qimasdan moslashtirishga urinish. Ba'zi xususiyatlar bir-biriga juda o'xshash bo'lishi mumkin, shuning uchun ularni to'liq o'qish muhim.

2. Bir xususiyatni bir necha marta ishlatish. Har bir xususiyat faqat bir marta ishlatilishi kerak, agar bir nechta mos keladigan joy bo'lsa, ulardan faqat bittasini tanlang.

3. Shaxsiy bilimlarga asoslanib javob berish. Matnda aytilmagan bo'lsa ham, o'z bilishingizga asoslanib javob bermang.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "matching-features",
          question: "Which section mentions a species that has been successfully recovered through conservation efforts?",
          options: ["Habitat destruction", "Climate change", "Poaching", "Conservation efforts"],
          correctAnswer: 3,
          explanation: "Section 4 discusses the recovery of the humpback whale and the giant panda through conservation efforts.",
          quoteFromText: "The recovery of the humpback whale, which was brought back from the brink of extinction through a global moratorium on commercial whaling, demonstrates that conservation can work.",
        },
        {
          id: 2,
          type: "matching-features",
          question: "Which section describes the economic value of illegal wildlife activities?",
          options: ["Climate change", "Poaching and illegal wildlife trade", "Habitat destruction", "International cooperation"],
          correctAnswer: 1,
          explanation: "Section 3 states that the illegal wildlife trade is estimated to be worth between 7 and 23 billion dollars annually.",
          quoteFromText: "The illegal wildlife trade is estimated to be worth between 7 and 23 billion dollars annually, making it one of the most profitable forms of organised crime.",
        },
        {
          id: 3,
          type: "matching-features",
          question: "Which section identifies the primary cause of the biodiversity crisis according to the passage?",
          options: ["Conservation efforts", "International cooperation", "Habitat destruction", "Poaching"],
          correctAnswer: 2,
          explanation: "Section 1 states that 'Habitat destruction is the single greatest threat to endangered species worldwide.'",
          quoteFromText: "Habitat destruction is the single greatest threat to endangered species worldwide.",
        },
      ]),
    },
  });
  console.log("Lesson 10 created:", lesson10.title);

  // ─── Lesson 11: Table completion ────────────────────────────────────
  const lesson11 = await prisma.lesson.create({
    data: {
      title: "Table completion",
      category: "reading",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 11,
      prerequisiteLessonId: lesson10.id,
      theoryContent: `Table completion — IELTS Reading bo'limida keng tarqalgan savol turi bo'lib, unda sizga ma'lumotlar jadvali beriladi va undagi bo'sh joylarni matndan olingan ma'lumotlar bilan to'ldirishingiz kerak. Jadvalda odatda bir nechta kategoriyalar (masalan, davr, joy, kashfiyot, shaxs) bo'lib, siz matnni o'qib, yetishmayotgan ma'lumotlarni topishingiz kerak.

Table completion topshirig'ida muvaffaqiyatli bo'lish uchun avval jadvalni diqqat bilan o'rganib chiqish kerak. Jadvalning sarlavhalari va ustun nomlari sizga qanday ma'lumot qidirish kerakligini ko'rsatadi. Jadvaldagi mavjud ma'lumotlar matnda qaysi qismga murojaat qilishni aniqlashda yordam beradi. So'ngra scanning texnikasi yordamida matndan kerakli ma'lumotlarni qidirish mumkin.

Jadvalni to'ldirishda, odatda, "NO MORE THAN TWO WORDS" yoki "NO MORE THAN THREE WORDS" kabi so'z soni cheklovlari bo'ladi. Javoblar matndan to'g'ridan-to'g'ri olinishi kerak va ularning shaklini o'zgartirish mumkin emas. Jadvaldagi bo'sh joylar odatda matndagi tartibda joylashgan, shuning uchun birinchi bo'sh joyga javobni matnning boshidan, ikkinchisini esa davomidan qidirish kerak.`,
      passageText: `The Silk Road: A History of Exchange

The Silk Road was not a single road but a vast network of trade routes that connected East Asia with the Mediterranean world for more than 1,500 years. The term "Silk Road" was first coined by the German geographer Ferdinand von Richthofen in 1877. While silk was indeed one of the most important commodities traded along these routes, a wide variety of goods, ideas, and technologies were exchanged.

The earliest origins of the Silk Road can be traced back to the Han Dynasty of China, which established diplomatic missions to Central Asia in the second century BCE. The Chinese emperor Wu Di sent an envoy named Zhang Qian to form alliances with Central Asian tribes. Although Zhang Qian did not achieve his diplomatic objectives, his travels provided valuable information about the regions to the west and opened the way for future trade.

Silk was produced exclusively in China, where the secret of sericulture — the production of raw silk from silkworms — was closely guarded. In return for their silk, Chinese traders received goods such as horses from Central Asia, glassware from Rome, spices from India, and gold from the Byzantine Empire. The value of silk was so high that it was often used as currency in international transactions.

Religion and culture also travelled along the Silk Road. Buddhism spread from India to China, Korea, and Japan via these trade routes. Nestorian Christianity, Islam, and Manichaeism also found their way into Central Asia and China through the movement of merchants, missionaries, and pilgrims. The transmission of knowledge was equally significant: papermaking technology from China reached the Islamic world in the eighth century and eventually Europe in the twelfth century, revolutionising written communication.

The decline of the Silk Road began in the fifteenth century, largely due to the rise of maritime trade routes. European explorers such as Vasco da Gama opened sea routes to Asia that were faster, safer, and more cost-effective than overland travel. By the seventeenth century, the Silk Road had largely fallen into disuse, although its legacy as a conduit of cultural and economic exchange continues to fascinate historians and archaeologists to this day.`,
      tipsAndTricks: `1. Jadvalni to'ldirishni boshlashdan oldin, ustun va qator nomlarini diqqat bilan o'qing. Ular sizga qanday ma'lumot qidirish kerakligi haqida yo'nalish beradi.

2. Jadvaldagi mavjud ma'lumotlardan foydalaning. Misol uchun, agar jadvalda "Dynasty" ustoni bo'lsa va "Han" deb yozilgan bo'lsa, matndan "Han" so'zini qidirish orqali kerakli ma'lumotni topishingiz mumkin.

3. So'z soni chekloviga rioya qiling. Agar "NO MORE THAN TWO WORDS" talab qilinsa, uch so'z yozish noto'g'ri.`,
      commonMistakes: `1. Jadvalni tahlil qilmasdan darhol matnni o'qishni boshlash. Jadvaldagi ma'lumotlar qanday tuzilganligini tushunmasdan qidirish samarasiz.

2. Jadvaldagi barcha bo'sh joylarni bir vaqtning o'zida to'ldirishga urinish. Har bir bo'sh joyni alohida qidirish va to'ldirish tavsiya etiladi.

3. Javoblarni shaxsiy bilimlar asosida yozish. Barcha javoblar matndan olinishi kerak, tashqi bilimlardan foydalanmang.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "table-completion",
          question: "Who first coined the term 'Silk Road'?",
          options: [
            "Zhang Qian",
            "Ferdinand von Richthofen",
            "Wu Di",
            "Vasco da Gama",
          ],
          correctAnswer: 1,
          explanation: "The passage states that 'The term Silk Road was first coined by the German geographer Ferdinand von Richthofen in 1877.'",
          quoteFromText: "The term 'Silk Road' was first coined by the German geographer Ferdinand von Richthofen in 1877.",
        },
        {
          id: 2,
          type: "table-completion",
          question: "What Chinese emperor sent Zhang Qian to Central Asia?",
          options: [
            "Wu Di",
            "Zhang Qian",
            "Ferdinand von Richthofen",
            "Vasco da Gama",
          ],
          correctAnswer: 0,
          explanation: "The passage mentions that 'The Chinese emperor Wu Di sent an envoy named Zhang Qian to form alliances with Central Asian tribes.'",
          quoteFromText: "The Chinese emperor Wu Di sent an envoy named Zhang Qian to form alliances with Central Asian tribes.",
        },
        {
          id: 3,
          type: "table-completion",
          question: "When did papermaking technology from China reach Europe?",
          options: [
            "Eighth century",
            "Second century BCE",
            "Fifteenth century",
            "Twelfth century",
          ],
          correctAnswer: 3,
          explanation: "The passage states that papermaking 'reached the Islamic world in the eighth century and eventually Europe in the twelfth century.'",
          quoteFromText: "papermaking technology from China reached the Islamic world in the eighth century and eventually Europe in the twelfth century, revolutionising written communication.",
        },
      ]),
    },
  });
  console.log("Lesson 11 created:", lesson11.title);

  // ─── Lesson 12: Full reading practice test ────────────────────────
  const lesson12 = await prisma.lesson.create({
    data: {
      title: "Full reading practice test",
      category: "reading",
      durationMin: 60,
      isPremium: true,
      difficulty: "Hard",
      order: 12,
      prerequisiteLessonId: lesson11.id,
      theoryContent: `Full reading practice test — bu IELTS Academic Reading bo'limining to'liq simulyatsiyasi bo'lib, unda siz 60 daqiqa ichida uchta uzun matn (passage) bilan ishlashingiz va 40 ta savolga javob berishingiz kerak. Ushbu darsda siz barcha o'rgangan ko'nikmalaringizni — skimming, scanning, detailed reading, va turli xil savol turlariga javob berishni — amalda qo'llaysiz.

IELTS Academic Reading bo'limi uch qismdan iborat bo'lib, har bir qismda 13-14 ta savol mavjud. Matnlar ilmiy jurnallar, gazetalar va kitoblardan olingan bo'lib, ularning qiyinchilik darajasi odatda birinchi qismdan uchinchi qismga qadar ortib boradi. Imtihon vaqti 60 daqiqa bo'lib, qo'shimcha vaqt berilmaydi, shuning uchun vaqtni to'g'ri taqsimlash juda muhimdir.

To'liq practice testni bajarishda quyidagi vaqt taqsimoti tavsiya etiladi: har bir matn uchun 20 daqiqa. Bu vaqt ichida matnni o'qish va savollarga javob berish kerak. Agar biror savolga javob topa olmasangiz, ko'p vaqt sarflamang — keyingi savolga o'ting va vaqtingiz qolsa, qaytib kelishingiz mumkin. Imtihon yakunida javob varaqasiga (answer sheet) javoblarni ko'chirish uchun 5-10 daqiqa qoldirishni unutmang.`,
      passageText: `Climate Change and Human History

Climate has played a decisive role in shaping human history. From the emergence of agriculture to the rise and fall of civilisations, environmental conditions have influenced where people settled, how they lived, and whether societies prospered or collapsed. Understanding this relationship is increasingly important as the world faces the challenges of modern climate change.

Section A: The Neolithic Revolution and Climate

The end of the last Ice Age, approximately 12,000 years ago, brought about a period of relative climate stability known as the Holocene. Warmer temperatures and more predictable rainfall patterns created favourable conditions for the development of agriculture in several regions of the world, including the Fertile Crescent in the Middle East. The ability to cultivate crops and domesticate animals allowed human populations to settle in permanent communities, leading to the first cities and the birth of civilisation. Archaeological evidence suggests that the transition to farming occurred independently in at least seven different regions, including Mesoamerica, China, and West Africa.

Section B: Climate and the Collapse of Civilisations

Historical records indicate that climate variability has been a factor in several societal collapses. The Maya civilisation in Central America, which flourished between 250 and 900 CE, experienced a period of severe and prolonged drought that coincided with its decline. Analysis of sediment cores from lakes in the Yucatan Peninsula has revealed that rainfall decreased by up to 70 percent during this period. Similarly, the Akkadian Empire in Mesopotamia, which existed around 4,200 years ago, collapsed during a major drought event. Ice core records from Greenland show that this drought was part of a broader climatic shift affecting the entire region.

Section C: The Little Ice Age

Between approximately 1300 and 1850, the Northern Hemisphere experienced a period of cooler temperatures known as the Little Ice Age. This climatic event had profound effects on European society. Crop failures and famines became more frequent, leading to social unrest and population decline. The Great Famine of 1315-1317, which killed millions of people across Europe, was partly attributed to cold and wet weather conditions. In contrast, the Little Ice Age may have benefited some regions: the expansion of sea ice in the North Atlantic allowed Norse communities in Greenland to hunt seals more effectively, although they ultimately disappeared in the fifteenth century.

Section D: The Industrial Revolution and Carbon Emissions

The Industrial Revolution, which began in Britain around 1760, marked a turning point in the relationship between humans and climate. The widespread use of fossil fuels — coal, oil, and natural gas — released vast quantities of carbon dioxide into the atmosphere. For thousands of years, atmospheric CO2 levels had remained below 280 parts per million (ppm). By 2023, they had reached 420 ppm, a level not seen in at least 3 million years. The burning of fossil fuels has been identified as the primary cause of the rapid warming observed since the mid-twentieth century.

Section E: Modern Climate Change and Its Impacts

The consequences of modern climate change are already visible. Global average temperatures have risen by approximately 1.2 degrees Celsius above pre-industrial levels. Sea levels are rising due to thermal expansion and the melting of glaciers and ice sheets, threatening coastal communities worldwide. Extreme weather events — including heatwaves, hurricanes, floods, and droughts — have become more frequent and intense. The Intergovernmental Panel on Climate Change (IPCC) has warned that without immediate and substantial reductions in greenhouse gas emissions, the impacts of climate change will become increasingly severe and potentially irreversible.

Section F: Adaptation and Mitigation

Addressing climate change requires both adaptation and mitigation strategies. Adaptation involves adjusting to the effects of climate change that are already happening, such as building sea walls to protect against rising sea levels and developing drought-resistant crop varieties. Mitigation focuses on reducing greenhouse gas emissions through the transition to renewable energy, improving energy efficiency, and protecting forests. The Paris Agreement, signed in 2015 by 196 countries, aims to limit global warming to well below 2 degrees Celsius above pre-industrial levels, with an aspirational target of 1.5 degrees Celsius. Achieving these goals will require unprecedented international cooperation and fundamental changes in how societies produce and consume energy.`,
      tipsAndTricks: `1. 60 daqiqani to'g'ri taqsimlang: har bir section uchun 20 daqiqa. Agar biror savolga 2 daqiqadan ko'proq vaqt sarflasangiz, uni qoldirib, keyingisiga o'ting.

2. Avval soddaroq savol turlariga javob bering, keyin murakkablariga qayting. Masalan, "True/False/Not Given" va "Sentence completion" odatda "Matching headings" ga qaraganda tezroq bajariladi.

3. Imtihon oxirida javoblaringizni tekshirishga 5 daqiqa qoldiring. Agar biror savolga javob bermagan bo'lsangiz, eng mantiqiy variantni belgilang — bo'sh qoldirishdan ko'ra taxmin qilish yaxshiroq.`,
      commonMistakes: `1. Birinchi sectionga juda ko'p vaqt sarflash. Ba'zi talabalar birinchi matnga 30 daqiqa sarflaydi va keyingi matnlarga vaqt yetmay qoladi. Vaqtni teng taqsimlang.

2. Javob varaqasiga javoblarni ko'chirishni unutish. Kompyuterda topshiriladigan testda ham, qog'ozda ham barcha javoblar to'g'ri joyga yozilganligiga ishonch hosil qiling.

3. Imtihonda stressga berilish. Agar biror savolga javob topa olmasangiz, vahimaga tushmang. Chuqur nafas oling va keyingi savolga o'ting.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "multiple-choice",
          question: "According to Section A, when did the Holocene period begin?",
          options: [
            "Approximately 4,200 years ago",
            "Approximately 12,000 years ago",
            "Around 250 CE",
            "Approximately 1,500 years ago",
          ],
          correctAnswer: 1,
          explanation: "Section A states that 'The end of the last Ice Age, approximately 12,000 years ago, brought about a period of relative climate stability known as the Holocene.'",
          quoteFromText: "The end of the last Ice Age, approximately 12,000 years ago, brought about a period of relative climate stability known as the Holocene.",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What evidence is used to support the claim that drought contributed to the Maya collapse?",
          options: [
            "Tree ring data from the Yucatan",
            "Analysis of sediment cores from lakes",
            "Ice core records from Greenland",
            "Historical texts from Mayan scribes",
          ],
          correctAnswer: 1,
          explanation: "Section B states that 'Analysis of sediment cores from lakes in the Yucatan Peninsula has revealed that rainfall decreased by up to 70 percent during this period.'",
          quoteFromText: "Analysis of sediment cores from lakes in the Yucatan Peninsula has revealed that rainfall decreased by up to 70 percent during this period.",
        },
        {
          id: 3,
          type: "true-false-not-given",
          question: "The Little Ice Age had exclusively negative effects on human societies.",
          options: ["True", "False", "Not Given"],
          correctAnswer: 1,
          explanation: "Section C states that the Little Ice Age 'may have benefited some regions' such as Norse communities in Greenland who could hunt seals more effectively, so the effects were not exclusively negative.",
          quoteFromText: "In contrast, the Little Ice Age may have benefited some regions: the expansion of sea ice in the North Atlantic allowed Norse communities in Greenland to hunt seals more effectively.",
        },
        {
          id: 4,
          type: "true-false-not-given",
          question: "Atmospheric CO2 levels reached 420 ppm for the first time in 2023.",
          options: ["True", "False", "Not Given"],
          correctAnswer: 0,
          explanation: "Section D states that 'By 2023, they had reached 420 ppm, a level not seen in at least 3 million years.' The phrasing confirms it reached this level in 2023.",
          quoteFromText: "By 2023, they had reached 420 ppm, a level not seen in at least 3 million years.",
        },
        {
          id: 5,
          type: "sentence-completion",
          question: "The Paris Agreement aims to limit global warming to well below ___ degrees Celsius.",
          options: [
            "1.2",
            "1.5",
            "2",
            "3",
          ],
          correctAnswer: 2,
          explanation: "Section F states that 'The Paris Agreement... aims to limit global warming to well below 2 degrees Celsius above pre-industrial levels.'",
          quoteFromText: "The Paris Agreement, signed in 2015 by 196 countries, aims to limit global warming to well below 2 degrees Celsius above pre-industrial levels, with an aspirational target of 1.5 degrees Celsius.",
        },
      ]),
    },
  });
  console.log("Lesson 12 created:", lesson12.title);

  // ═══════════════════════════════════════════════════════════════════
  // WRITING LESSONS
  // ═══════════════════════════════════════════════════════════════════

  // ─── Writing Lesson 1: Task 1 - Ma'lumot tahlili ─────────────────
  const lesson13 = await prisma.lesson.create({
    data: {
      title: "Task 1 - Ma'lumot tahlili",
      category: "writing",
      durationMin: 30,
      isPremium: false,
      difficulty: "Easy",
      order: 13,
      prerequisiteLessonId: null,
      theoryContent: `Task 1 Writing bo'limida sizga diagramma, jadval, chiziqli grafik yoki map beriladi va siz asosiy ma'lumotlarni tanlab, ularni umumlashtirishingiz kerak. Ma'lumot tahlili — bu vizual ma'lumotni to'g'ri o'qish, eng muhim nuqtalarni aniqlash va ularni mantiqiy ketma-ketlikda taqdim etishdir.

Tuzilishi:
Introduction (1-2 jumla): Berilgan diagrammani parafraze qiling. "The bar chart shows..." yoki "The graph illustrates..." kabi iboralarni ishlating.
Overview (1-2 jumla): Eng umumiy trend yoki xususiyatni ta'riflang.
Body 1 (3-4 jumla): Birinchi guruh ma'lumotlarni batafsil tasvirlang.
Body 2 (3-4 jumla): Ikkinchi guruh ma'lumotlarni batafsil tasvirlang.

Samarali ma'lumot tahlili uchun quyidagi bosqichlarni bajaring:
1) Diagrammani diqqat bilan o'rganing — o'qlar, birliklar, vaqt oralig'i va afsonani (legend) tekshiring;
2) Eng yuqori va eng past qiymatlarni aniqlang;
3) Umumiy trendlarni toping (o'sish, pasayish, barqarorlik);
4) Ma'lumotlarni guruhlarga ajrating (masalan, o'xshash trenddagi ma'lumotlarni birga);
5) Taqqoslashlar qiling.

Muhim qoidalar:
- Faqat berilgan ma'lumotni tasvirlang, sababini tushuntirmang ("because" ishlatmang);
- kamida 150 so'z yozing;
- Overview alohida paragraf bo'lishi shart;
- 20 daqiqadan oshmasligi kerak.`,
      passageText: `The bar chart below shows the average monthly rainfall in three cities — London, Sydney, and Dubai — over a 12-month period in 2023.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
      tipsAndTricks: `1. Overview paragrafida eng umumiy ma'lumotni bering: eng katta farq, eng muhim trend yoki eng ko'zga tashlanadigan xususiyat. Bu sizning Task Achievement ballingizni oshiradi.

2. Ma'lumotlarni guruhlab yozing: bir-biriga o'xshash ma'lumotlarni bir paragrafda birlashtiring. Masalan, barcha o'sish ko'rsatkichlari birga, pasayish ko'rsatkichlari birga.

3. Raqamlarni to'g'ri ishlating: "approximately", "roughly", "just over", "nearly" kabi so'zlar bilan raqamlarni yumshatib bering. Aniq raqamlar kerak bo'lsa, ularni to'g'ri keltiring.`,
      commonMistakes: `1. Eng keng tarqalgan xato: sabablarni tushuntirish. "Because the weather was hot" yoki "due to climate change" kabi izohlar yozmang — faqat ma'lumotni tasvirlang.

2. Overview paragrafini yozmaslik. Overview Task Achievement ballingizning muhim qismidir va alohida paragraf bo'lishi kerak.

3. Barcha ma'lumotlarni sanab chiqish. Eng muhim ma'lumotlarni tanlang va kam ahamiyatli detallarni qoldirib keting. 150 so'z ichida barcha ma'lumotni berish mumkin emas.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `The bar chart compares the average monthly rainfall in London, Sydney, and Dubai over a 12-month period in 2023. Units are measured in millimetres.

Overall, London experienced the most consistent rainfall throughout the year, while Dubai had the lowest precipitation levels. Sydney showed the most variation, with significantly higher rainfall during the first and last quarters.

In London, rainfall remained relatively stable between 40mm and 60mm each month, with the highest level of approximately 58mm in October and the lowest of around 38mm in February. Dubai, by contrast, had very low rainfall throughout the year, never exceeding 20mm per month. The highest rainfall in Dubai was around 18mm in January, while the summer months from May to September recorded almost no precipitation.

Sydney's rainfall pattern differed markedly from the other two cities. The city experienced its wettest period from January to March, with rainfall peaking at about 110mm in February. Levels then dropped significantly during the middle of the year, reaching a low of approximately 35mm in July, before rising again towards the end of the year, with around 80mm in December.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 1 created:", lesson13.title);

  // ─── Writing Lesson 2: Task 1 - Trend va comparison ──────────────
  const lesson14 = await prisma.lesson.create({
    data: {
      title: "Task 1 - Trend va comparison",
      category: "writing",
      durationMin: 35,
      isPremium: false,
      difficulty: "Medium",
      order: 14,
      prerequisiteLessonId: lesson13.id,
      theoryContent: `Trend va comparison — Task 1 Writingning eng muhim elementlaridir. Trend — bu vaqt o'tishi bilan ma'lumotlarning o'zgarish yo'nalishi (o'sish, pasayish, barqarorlik). Comparison — bu ikki yoki undan ortiq ma'lumotlar o'rtasidagi farq va o'xshashliklarni ko'rsatish.

Tuzilishi:
Introduction: "The line graph illustrates the changes in... from [yil] to [yil]."
Overview: "Overall, [asosiy trend]."
Body 1: Birinchi kategoriya yoki davr ma'lumotlari.
Body 2: Ikkinchi kategoriya yoki davr ma'lumotlari (taqqoslash bilan).

Trendlarni tasvirlash uchun foydali so'zlar:
- O'sish: rose, increased, grew, climbed, surged, peaked at
- Pasayish: fell, dropped, declined, decreased, plunged, bottomed out at
- Barqarorlik: remained stable, stayed constant, levelled off, fluctuated
- Yuqori daraja: reached a peak of, hit the highest point of
- Past daraja: reached a low of, hit the lowest point of

Comparison uchun foydali iboralar:
- "in comparison to", "compared with", "by contrast", "similarly", "likewise"
- "...was significantly higher than...", "...was almost twice as much as..."
- "The most noticeable difference is..."`,
      passageText: `The line graph below shows the population growth of four countries — India, Nigeria, Japan, and Germany — from 1950 to 2023, with projections to 2050.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
      tipsAndTricks: `1. Trendlarni tasvirlashda aniq fe'llardan foydalaning. "It changed" o'rniga "it increased sharply" yoki "it declined steadily" kabi aniq ifodalarni ishlating.

2. Taqqoslashlarni ko'rsatishda turli darajadagi so'zlarni ishlating: "slightly", "moderately", "significantly", "dramatically". Bu sizning Lexical Resource ballingizni oshiradi.

3. Proyeksiya ma'lumotlarini tasvirlashda "is expected to", "is projected to", "is predicted to" kabi iboralarni ishlating.`,
      commonMistakes: `1. Trendlarni tasvirlashda noto'g'ri fe'l zamonlarini ishlatish. O'tgan vaqt uchun Past Simple ("increased"), proyeksiya uchun "is expected to" ishlating.

2. Faqat o'sish va pasayishni aytib, miqdorlarni bermaslik. Har bir trend bilan birga raqamlarni ham keltiring.

3. Taqqoslashlarni umuman qilmaslik. Vazifada "make comparisons" talab qilinadi, shuning uchun kamida 2-3 taqqoslash bo'lishi kerak.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `The line graph illustrates the population changes in India, Nigeria, Japan, and Germany from 1950 to 2023, alongside projections up to 2050.

Overall, India and Nigeria experienced significant population growth over the period, whereas Japan and Germany saw much slower increases or even decline. By 2050, India is projected to become the most populous country among the four, while Japan's population is expected to fall substantially.

India's population rose steadily from approximately 350 million in 1950 to around 1.4 billion in 2023. This upward trend is projected to continue, reaching roughly 1.6 billion by 2050. Nigeria's population grew even more dramatically, from about 40 million in 1950 to over 220 million in 2023, and is forecast to surpass 400 million by 2050.

In contrast, Japan's population increased moderately from 85 million in 1950 to a peak of approximately 128 million in 2010, after which it began to decline, falling to around 125 million in 2023. This decline is expected to accelerate, with projections indicating a drop to about 105 million by 2050. Germany's population remained relatively stable throughout the period, fluctuating between 70 and 83 million, and is predicted to decline slightly to around 75 million by 2050.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 2 created:", lesson14.title);

  // ─── Writing Lesson 3: Task 1 - Process diagram ──────────────────
  const lesson15 = await prisma.lesson.create({
    data: {
      title: "Task 1 - Process diagram",
      category: "writing",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 15,
      prerequisiteLessonId: lesson14.id,
      theoryContent: `Process diagram — Task 1 Writingning alohida turi bo'lib, unda sizga biror jarayonning bosqichlari ko'rsatilgan diagramma beriladi. Bu tabiiy jarayon (masalan, suv aylanishi) yoki sun'iy jarayon (masalan, sement ishlab chiqarish) bo'lishi mumkin.

Tuzilishi:
Introduction (1 jumla): Diagrammani parafraze qiling. "The diagram illustrates the process of..."
Overview (1-2 jumla): Jarayonda nechta bosqich borligini va qanday boshlanishi/tugashini ayting.
Body 1 (3-5 jumla): Jarayonning birinchi yarmini tasvirlang (birinchi bosqichlardan o'rtasigacha).
Body 2 (3-5 jumla): Jarayonning ikkinchi yarmini tasvirlang (o'rtadan oxirigacha).

Process diagram uchun maxsus qoidalar:
- Passive voice ko'p ishlatiladi: "the water is heated", "the mixture is poured"
- Ketma-ketlikni ko'rsatuvchi so'zlardan foydalaning: "first", "next", "then", "after that", "subsequently", "finally"
- Jarayonning har bir bosqichini tushuntirib o'ting
- 150 so'zdan kam bo'lmasligi kerak`,
      passageText: `The diagram below shows the process of generating electricity from geothermal energy in a geothermal power plant.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.`,
      tipsAndTricks: `1. Process diagramda passive voice juda muhim: "The water is pumped", "The steam is collected", "The turbine is turned". Bu akademik uslubning bir qismidir.

2. Ketma-ketlikni ko'rsatuvchi so'zlarni xilma-xil ishlating. "Then" so'zini har jumlada takrorlamang — "subsequently", "following this", "once this is complete" kabi variantlardan foydalaning.

3. Jarayonning boshlanish va tugash nuqtalarini aniq ko'rsating. Bu overview paragrafida berilishi kerak.`,
      commonMistakes: `1. Active voice ishlatish. Akademik Writingda process diagram passive voice bilan yozilishi kerak.

2. Bosqichlar sonini noto'g'ri sanash. Diagrammani diqqat bilan o'rganib, har bir bosqichni alohida tasvirlang.

3. Overviewda faqat birinchi bosqichni aytib, qolganini tushuntirmaslik. Overview jarayonning to'liq ko'rinishini berishi kerak.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `The diagram illustrates the process of generating electricity from geothermal energy in a geothermal power plant.

Overall, the process consists of five main stages, beginning with the injection of cold water into the ground and ending with the transmission of electricity to the power grid.

In the first stage, cold water is pumped down through an injection well into the geothermal zone, which is located deep underground where hot rocks are present. The water passes through these hot rocks and is heated to a high temperature. Subsequently, the heated water is forced up through a production well to the surface in the form of hot water or steam.

Next, the hot water and steam are directed into a separator, where the steam is separated from the water. The steam then travels through a pipeline to a turbine, causing it to spin at high speed. This mechanical energy is converted into electricity by a generator connected to the turbine. Finally, the electricity is transmitted to the power grid for distribution. The remaining water is cooled and reinjected into the ground, allowing the cycle to continue.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 3 created:", lesson15.title);

  // ─── Writing Lesson 4: Task 2 - Essay tuzilishi ──────────────────
  const lesson16 = await prisma.lesson.create({
    data: {
      title: "Task 2 - Essay tuzilishi",
      category: "writing",
      durationMin: 25,
      isPremium: false,
      difficulty: "Easy",
      order: 16,
      prerequisiteLessonId: lesson15.id,
      theoryContent: `Task 2 Essay — IELTS Writingning ikkinchi qismi bo'lib, unda sizga berilgan mavzu bo'yicha 250 so'zdan kam bo'lmagan insho yozishingiz kerak. Essay tuzilishi to'g'ri bo'lishi ballingizga katta ta'sir ko'rsatadi.

Tuzilishi:
Introduction (2-3 jumla): Mavzuni parafraze qiling + thesis statement (sizning asosiy fikringiz).
Body 1 (4-6 jumla): Birinchi asosiy fikr + tushuntirish + misol.
Body 2 (4-6 jumla): Ikkinchi asosiy fikr + tushuntirish + misol.
Conclusion (2-3 jumla): Asosiy fikrlarni qisqacha takrorlang va xulosa chiqaring.

Har bir paragraf bitta asosiy g'oyani o'z ichiga olishi kerak (one paragraph = one idea). Paragraphni topic sentence bilan boshlang, so'ngra tushuntirish va misol bilan davom ettiring.

Task 2 da 5 xil essay turi bor:
1) Opinion (Agree/Disagree) — bir fikrga qo'shilasizmi yoki yo'qmi
2) Discussion (Discuss both views) — ikki xil fikrni muhokama qiling
3) Problem/Solution — muammo va yechimlarni tahlil qiling
4) Advantages/Disadvantages — afzallik va kamchiliklarni solishtiring
5) Direct Questions — berilgan savollarga javob bering`,
      passageText: `Some people believe that the government should spend more money on public services such as healthcare and education, rather than on the arts such as music and theatre. To what extent do you agree or disagree?

Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
      tipsAndTricks: `1. Thesis statement introductionning eng muhim qismidir. U sizning pozitsiyangizni aniq ko'rsatishi kerak. Masalan: "While I acknowledge the importance of the arts, I strongly believe that public services should be the government's primary focus."

2. Har bir body paragraphni topic sentence bilan boshlang: "Firstly, investing in healthcare directly improves the quality of life for citizens."

3. Conclusionda yangi fikr kiritmang. Faqat yuqorida aytilgan fikrlarni qisqacha takrorlang va umumiy xulosa chiqaring.`,
      commonMistakes: `1. Introduction juda uzun bo'lishi. Introduction 2-3 jumladan oshmasligi kerak. Asosiy fikrlar body paragraphlarda beriladi.

2. Conclusionni unutish yoki juda qisqa yozish. Conclusion essayning muhim qismi bo'lib, ballingizga ta'sir qiladi.

3. Mavzudan chetga chiqish. Berilgan savolga to'liq javob bering va keraksiz ma'lumotlarni qo'shmang.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `Some people argue that government funds should be prioritised for public services such as healthcare and education rather than for the arts. While I agree that essential services require substantial investment, I believe that the arts also deserve meaningful support and that a balanced approach is most beneficial.

On the one hand, there are compelling reasons to allocate the majority of government spending to public services. Healthcare and education are fundamental to the wellbeing and development of any society. A well-funded healthcare system ensures that citizens receive timely medical treatment, which directly improves life expectancy and quality of life. Similarly, investment in education equips young people with the skills and knowledge needed to contribute to the economy. For example, countries such as Finland and Sweden, which invest heavily in education and healthcare, consistently rank among the highest in terms of quality of life and economic productivity.

On the other hand, the arts play an equally vital role in society and should not be neglected. Music, theatre, and other cultural activities enrich people's lives, preserve cultural heritage, and foster creativity. Moreover, the arts contribute significantly to the economy through tourism and cultural industries. For instance, London's West End theatre district generates billions of pounds annually and supports thousands of jobs. Without government funding, many cultural institutions would struggle to survive, leading to a less vibrant and culturally impoverished society.

In conclusion, while public services such as healthcare and education should undoubtedly receive the largest share of government funding, I believe that the arts also warrant continued support. A balanced approach that prioritises essential services while maintaining investment in culture is the most effective way to build a prosperous and well-rounded society.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 4 created:", lesson16.title);

  // ─── Writing Lesson 5: Task 2 - Opinion essays ───────────────────
  const lesson17 = await prisma.lesson.create({
    data: {
      title: "Task 2 - Opinion essays",
      category: "writing",
      durationMin: 35,
      isPremium: true,
      difficulty: "Medium",
      order: 17,
      prerequisiteLessonId: lesson16.id,
      theoryContent: `Opinion essays (Agree/Disagree) — Task 2 ning eng keng tarqalgan turlaridan biri. Bunda sizga bir fikr beriladi va siz uni qanchalik qo'llab-quvvatlashingizni bildirishingiz kerak. Siz to'liq qo'shilishingiz, to'liq qarshi bo'lishingiz yoki qisman qo'shilishingiz mumkin.

Tuzilishi:
Introduction (2-3 jumla): Mavzuni parafraze qiling + aniq pozitsiyangizni bildiring.
  "I completely agree that..." / "I disagree with this view because..." / "While I agree that..., I also believe that..."

Body 1 (4-6 jumla): Birinchi sabab yoki dalil.
  Topic sentence → Tushuntirish → Misol → Natija

Body 2 (4-6 jumla): Ikkinchi sabab yoki dalil (yoki qarama-qarshi fikr).
  Agar qisman qo'shilsangiz, bir bodyda qo'llab-quvvatlovchi, ikkinchisida qarama-qarshi fikrni keltiring.

Conclusion (2-3 jumla): Pozitsiyangizni takrorlang va asosiy fikrlarni umumlashtiring.

Muhim: Opinion essayda sizning shaxsiy fikringiz muhim. "I believe", "In my opinion", "From my perspective" kabi iboralarni ishlating.`,
      passageText: `In many countries, people are living longer than ever before. Some say that an ageing population creates problems for governments, while others believe there are benefits to having an older population.

Discuss both these views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
      tipsAndTricks: `1. Opinion essayda pozitsiyangiz aniq bo'lishi kerak. Introductiondayoq o'z fikringizni bildiring — o'quvchi sizning qaysi tarafda ekanligingizni bilishi kerak.

2. "I believe", "In my view", "It seems to me that" kabi iboralarni ishlating. Bu Task Response ballingizga ijobiy ta'sir qiladi.

3. Agar qisman qo'shilsangiz, "While I agree that... I also believe that..." strukturasi eng samarali usuldir.`,
      commonMistakes: `1. Pozitsiyani aniq bildirmaslik. "Some people think this, others think that" deb yozib, o'z fikringizni aytmaslik keng tarqalgan xato.

2. Faqat bir tomonni muhokama qilish. Savol "discuss both views" deb so'rasa, ikkala fikrni ham muhokama qilishingiz kerak.

3. Shaxsiy fikr o'rniga umumiy fikrlarni yozish. "It is believed" yozish o'rniga "I believe" deb yozing.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `In recent decades, advances in healthcare and living standards have led to a significant increase in life expectancy worldwide. While some argue that an ageing population places undue strain on society, others contend that older people bring valuable benefits. This essay will discuss both perspectives before presenting my own view.

On the one hand, there are legitimate concerns about the economic and social challenges posed by an ageing population. As people live longer, the demand for healthcare services and pensions increases substantially, placing a heavier burden on government budgets. Fewer working-age people means a smaller tax base to fund these services, potentially leading to higher taxes or reduced public spending in other areas. For example, Japan, which has one of the oldest populations in the world, faces significant labour shortages and rising healthcare costs, prompting the government to implement policies to encourage older citizens to remain in the workforce.

On the other hand, older people make invaluable contributions to their families and communities. Many grandparents provide childcare, allowing their adult children to work and contribute to the economy. Additionally, older individuals possess a wealth of experience and knowledge that can benefit younger generations through mentorship and volunteering. In many societies, older people also engage in charitable work and community leadership, strengthening social cohesion. Countries such as Italy and Greece, where multigenerational households are common, demonstrate the positive role that older family members can play.

In my opinion, while an ageing population does present certain challenges, the benefits should not be underestimated. Rather than viewing older people as a burden, governments should implement policies that enable them to continue contributing to society, such as flexible working arrangements and lifelong learning opportunities. With the right approach, the growing proportion of older citizens can become an asset rather than a liability.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 5 created:", lesson17.title);

  // ─── Writing Lesson 6: Task 2 - Discussion essays ────────────────
  const lesson18 = await prisma.lesson.create({
    data: {
      title: "Task 2 - Discussion essays",
      category: "writing",
      durationMin: 35,
      isPremium: true,
      difficulty: "Medium",
      order: 18,
      prerequisiteLessonId: lesson17.id,
      theoryContent: `Discussion essays (Discuss both views) — bu turdagi essayda sizga ikki xil qarama-qarshi fikr beriladi va siz ikkalasini ham muhokama qilishingiz, so'ngra o'z fikringizni bildirishingiz kerak.

Tuzilishi:
Introduction (2-3 jumla): Mavzuni parafraze qiling + ikkala fikrni qisqacha eslatib o'ting.
  "On the one hand, some people believe that... On the other hand, others argue that..."

Body 1 (4-6 jumla): Birinchi fikrni tahlil qiling.
  Nega ba'zi odamlar bu fikrni qo'llab-quvvatlaydi? Dalillar va misollar keltiring.

Body 2 (4-6 jumla): Ikkinchi fikrni tahlil qiling.
  Nega boshqalar bu fikrni qo'llab-quvvatlaydi? Dalillar va misollar keltiring.

Conclusion (2-3 jumla): Ikkala fikrni qisqacha takrorlang va o'z fikringizni bildiring.

Muhim farq: Discussion essayda ikkala fikrga ham teng e'tibor berilishi kerak. Opinion essaydan farqli ravishda, bu yerda siz ikkala tomonni ham xolis tahlil qilishingiz lozim.`,
      passageText: `Some people believe that children should be taught how to manage money and basic financial skills at school. Others think that these skills should be learned at home from parents.

Discuss both these views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
      tipsAndTricks: `1. Ikkala fikrga ham teng miqdorda yozing. Har bir body paragraph taxminan bir xil uzunlikda bo'lishi kerak.

2. "On the one hand" va "On the other hand" iboralari discussion essay uchun eng mos keladigan bog'lovchilardir.

3. Conclusionda o'z fikringizni bildirishni unutmang. "In my opinion" yoki "I believe that" bilan o'z pozitsiyangizni aniq ifoda eting.`,
      commonMistakes: `1. Faqat bir tomonni batafsil yozib, ikkinchi tomonni kam yoritish. Ikkala fikrga ham teng vaqt ajrating.

2. Ikkala fikrni bir body paragraphda yozish. Har bir fikr alohida paragrafda bo'lishi kerak.

3. O'z fikringizni umuman bildirmaslik. Savol "give your own opinion" deb so'raydi, shuning uchun conclusionda o'z fikringizni aniq ayting.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `Financial literacy is an essential life skill, yet there is debate about whether it should be taught in schools or left to parents to teach at home. This essay will examine both perspectives before offering my own view.

On the one hand, there are strong arguments for teaching financial skills in schools. Schools already provide education in a wide range of subjects that prepare children for adult life, and financial management should be no exception. A structured curriculum ensures that all children, regardless of their family background, receive the same foundational knowledge about budgeting, saving, and responsible spending. Furthermore, qualified teachers can deliver this content in an age-appropriate and engaging manner. For example, some schools have introduced programmes where students manage virtual budgets or run small businesses, providing practical experience in a safe environment. This approach helps to create a financially literate generation who are better prepared for the challenges of modern life.

On the other hand, many people believe that financial education is best delivered at home by parents. Parents have the opportunity to teach their children about money through real-life experiences, such as giving pocket money, involving them in household budgeting, or discussing family financial decisions. These practical lessons often have a more lasting impact than theoretical classroom instruction. Moreover, parents can tailor their teaching to their child's individual needs and circumstances. A child whose family runs a small business, for instance, may learn about profit and loss naturally through daily conversations. However, this approach relies heavily on parents themselves having sufficient financial knowledge, which is not always the case.

In my opinion, a combination of both approaches is most effective. Schools should provide a basic foundation in financial literacy, while parents reinforce these lessons through practical application at home. This dual approach ensures that all children receive some financial education while also benefiting from the real-world context that family life provides.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 6 created:", lesson18.title);

  // ─── Writing Lesson 7: Task 2 - Problem/Solution essays ──────────
  const lesson19 = await prisma.lesson.create({
    data: {
      title: "Task 2 - Problem/Solution essays",
      category: "writing",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 19,
      prerequisiteLessonId: lesson18.id,
      theoryContent: `Problem/Solution essays — bu turdagi essayda sizga bir muammo beriladi va siz uning sabablarini va yechimlarini tahlil qilishingiz kerak. Bu turdagi essaylar "causes and effects" yoki "problems and solutions" deb ham ataladi.

Tuzilishi:
Introduction (2-3 jumla): Muammoni parafraze qiling va essayning strukturasini ko'rsating.
  "This essay will examine the main causes of... and propose possible solutions."

Body 1 (4-6 jumla): Muammoning sabablari yoki oqibatlari.
  Topic sentence → Sabab 1 + tushuntirish + misol → Sabab 2 + tushuntirish + misol

Body 2 (4-6 jumla): Yechimlar.
  Topic sentence → Yechim 1 + qanday amalga oshirish → Yechim 2 + qanday amalga oshirish

Conclusion (2-3 jumla): Asosiy sabab va yechimlarni qisqacha takrorlang.

Muhim: Har bir muammoga aniq bir yechim taklif qilishingiz kerak. Yechimlar real va amaliy bo'lishi lozim.`,
      passageText: `In many cities around the world, traffic congestion has become a serious problem that affects people's daily lives.

What are the causes of this problem, and what measures can be taken to solve it?

Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
      tipsAndTricks: `1. Har bir muammoga aniq bir yechim taklif qiling. "Government should..." yoki "People could..." kabi aniq takliflar bering.

2. Sabab va yechimlarni bir-biriga bog'lang. Agar birinchi sabab "ko'p mashina" bo'lsa, yechim "jamoat transportini rivojlantirish" bo'lishi mumkin.

3. Misollar keltirishni unutmang. Haqiqiy shaharlar yoki davlatlar misolida yechimlarni ko'rsating.`,
      commonMistakes: `1. Muammoni tasvirlashga ko'p vaqt sarflash. Asosiy e'tibor sabab va yechimlarga qaratilishi kerak.

2. Yechimlarni juda umumiy berish. "Government should do something" emas, balki aniq choralarni taklif qiling.

3. Sabab va yechimlarni aralashtirib yuborish. Birinchi body sabablarga, ikkinchi body yechimlarga bag'ishlanishi kerak.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `Traffic congestion has become an increasingly pressing issue in urban areas worldwide, causing frustration, lost productivity, and environmental damage. This essay will examine the primary causes of this problem and suggest practical solutions.

The main cause of traffic congestion is the rapid increase in the number of private vehicles on the road. Rising incomes have made car ownership more affordable, while public transport systems in many cities have failed to keep pace with population growth. As a result, more people choose to drive rather than use unreliable or overcrowded buses and trains. A second significant cause is inadequate urban planning. Many cities were designed primarily for cars rather than for pedestrians and cyclists, with insufficient road infrastructure to handle peak-hour traffic. Additionally, the lack of efficient traffic management systems, such as synchronised traffic lights and real-time congestion monitoring, exacerbates the problem.

To address this issue, governments should invest heavily in public transportation. Expanding metro networks, increasing the frequency of bus services, and reducing fares would encourage more people to leave their cars at home. For example, London's congestion charge, introduced in 2003, successfully reduced traffic volumes in the city centre by approximately 30 percent. Another effective measure is to promote alternative modes of transport. Building dedicated cycling lanes, improving pedestrian infrastructure, and implementing car-sharing schemes can provide viable alternatives to private car use. Furthermore, cities could adopt smarter traffic management technologies, such as AI-controlled traffic signals and dynamic lane management, to optimise the flow of vehicles.

In conclusion, traffic congestion stems primarily from the over-reliance on private vehicles and poor urban planning. By investing in public transport, promoting sustainable alternatives, and adopting intelligent traffic management, cities can significantly reduce congestion and improve the quality of life for their residents.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 7 created:", lesson19.title);

  // ─── Writing Lesson 8: Cohesion va Coherence ─────────────────────
  const lesson20 = await prisma.lesson.create({
    data: {
      title: "Cohesion va Coherence",
      category: "writing",
      durationMin: 25,
      isPremium: true,
      difficulty: "Hard",
      order: 20,
      prerequisiteLessonId: lesson19.id,
      theoryContent: `Coherence va Cohesion — IELTS Writing baholash mezonlarining ikki muhim komponentidir.

Coherence — bu sizning essayingizning umumiy tuzilishi va mantiqiy ketma-ketligi. O'quvchi sizning fikringizni osongina kuzatib borishi kerak. Coherence yuqori bo'lishi uchun:
- Har bir paragraf bitta asosiy g'oyani o'z ichiga olishi kerak
- Paragraflar mantiqiy ketma-ketlikda joylashgan bo'lishi kerak
- Introduction, body, va conclusion aniq ajratilgan bo'lishi kerak

Cohesion — bu jumlalar va paragraflar o'rtasidagi bog'liqlik. Cohesion yuqori bo'lishi uchun:

Linking words (bog'lovchi so'zlar):
- Qo'shimcha fikr: furthermore, moreover, in addition, also, besides
- Qarama-qarshilik: however, on the other hand, whereas, although, despite
- Sabab-natija: therefore, consequently, as a result, thus, because of
- Misol: for example, for instance, such as, in particular
- Xulosa: in conclusion, to sum up, overall, in summary

Pronouns va synonyms:
- "The government..." → "It..." → "This institution..."
- Takrorlanmaslik uchun sinonimlardan foydalaning`,
      passageText: `Some people think that the best way to reduce crime is to give longer prison sentences. Others believe that there are better alternatives such as education and community programmes.

Discuss both these views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
      tipsAndTricks: `1. Linking words ni me'yorida ishlating. Har bir jumlada bog'lovchi so'z ishlatish shart emas — tabiiy ravishda, kerakli joylarda ishlating.

2. Referencing (oldingi gapga ishora) coherence uchun juda muhim: "This approach...", "Such measures...", "These policies..." kabi iboralarni ishlating.

3. Paragraflar o'rtasida mantiqiy bog'lanish bo'lishi kerak. Bir paragrafdan ikkinchisiga o'tishda "Turning to the other view..." yoki "Having examined X, we now consider Y..." kabi o'tish iboralaridan foydalaning.`,
      commonMistakes: `1. Linking words ni noto'g'ri ishlatish. "On the contrary" va "on the other hand" farqini tushunish muhim. "On the contrary" bir fikrni to'liq inkor etganda ishlatiladi.

2. Har bir jumlani linking word bilan boshlash. Bu essayni sun'iy va o'qish qiyin bo'lgan matnga aylantiradi.

3. Pronounlarni noto'g'ri ishlatish. "It" yoki "this" qaysi otga ishora qilayotgani aniq bo'lishi kerak.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `The question of how best to reduce crime is a subject of ongoing debate. While some advocate for longer prison sentences as a deterrent, others argue that education and community-based programmes offer more effective solutions. This essay will discuss both perspectives before presenting my own view.

On the one hand, there are valid arguments in favour of longer prison sentences. The primary rationale is that harsher punishments act as a deterrent, discouraging potential offenders from committing crimes. Furthermore, lengthy prison terms ensure that dangerous individuals are kept off the streets, thereby protecting the public. For instance, countries that have implemented strict sentencing policies, such as the United States, have seen reductions in certain categories of crime. However, research also indicates that lengthy incarceration does not necessarily address the underlying causes of criminal behaviour, and many released prisoners re-offend within a few years, suggesting that deterrence alone is insufficient.

On the other hand, education and community programmes address the root causes of crime. Many offenders come from disadvantaged backgrounds characterised by poverty, low educational attainment, and limited employment opportunities. Programmes that provide vocational training, mental health support, and substance abuse treatment can help individuals reintegrate into society and lead law-abiding lives. For example, Norway's rehabilitation-focused approach, which emphasises education and skill development within the prison system, has resulted in one of the lowest re-offending rates in the world, at approximately 20 percent compared to over 60 percent in some other countries.

In my opinion, a balanced approach combining both strategies is most effective. While longer sentences may be necessary for serious and violent offenders, greater investment in education and community programmes offers a more sustainable long-term solution to crime reduction.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 8 created:", lesson20.title);

  // ─── Writing Lesson 9: Lexical Resource ──────────────────────────
  const lesson21 = await prisma.lesson.create({
    data: {
      title: "Lexical Resource",
      category: "writing",
      durationMin: 20,
      isPremium: true,
      difficulty: "Hard",
      order: 21,
      prerequisiteLessonId: lesson20.id,
      theoryContent: `Lexical Resource — IELTS Writing baholash mezonlaridan biri bo'lib, sizning so'z boyligingiz va so'zlarni qanchalik to'g'ri va xilma-xil ishlatishingizni baholaydi. Yuqori ball olish uchun siz keng qamrovli lug'at boyligini namoyish qilishingiz kerak.

Lexical Resource uchun muhim jihatlar:

1. Sinonimlar: Bir so'zni takrorlamaslik uchun sinonimlardan foydalaning.
  - Important → significant, crucial, vital, essential, paramount
  - Problem → issue, challenge, concern, difficulty, obstacle
  - Solution → answer, remedy, resolution, measure, approach
  - People → individuals, citizens, population, society, the public

2. Kollokatsiyalar (so'z birikmalari):
  - "Make a decision" (not "do a decision")
  - "Take measures" (not "make measures")
  - "Play a role" (not "do a role")
  - "Address an issue" (not "solve an issue")

3. Akademik so'zlar:
  - Demonstrates, illustrates, indicates (shows o'rniga)
  - Consequently, therefore, thus (so o'rniga)
  - Significant, substantial, considerable (big o'rniga)

4. Topic-spesifik vocabulary: Har bir mavzu uchun maxsus so'zlar.
  - Environment: sustainability, emissions, biodiversity, conservation
  - Education: curriculum, pedagogy, literacy, attainment
  - Technology: innovation, automation, digitalisation, breakthrough`,
      passageText: `In the modern world, technology is playing an increasingly important role in education. Some people believe that technology will eventually replace traditional teachers in the classroom.

To what extent do you agree or disagree?

Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
      tipsAndTricks: `1. So'z boyligingizni ko'rsatish uchun bir xil so'zni takrorlamang. Masalan, "important" o'rniga "crucial", "vital", "significant" so'zlarini navbat bilan ishlating.

2. Kollokatsiyalarni (so'z birikmalarini) to'g'ri ishlating. IELTS examinerlar kollokatsiyalarga alohida e'tibor beradi.

3. Topic-spesifik so'zlarni ishlating. Agar mavzu ta'lim haqida bo'lsa, "curriculum", "pedagogy", "literacy" kabi so'zlarni qo'llang.`,
      commonMistakes: `1. Noto'g'ri sinonim ishlatish. "Big" va "significant" sinonim, ammo "big" va "massive" har doim ham bir-birining o'rnida ishlatilavermaydi. Kontekstga e'tibor bering.

2. Juda murakkab so'zlarni majburlab ishlatish. Agar so'zning ma'nosiga to'liq ishonchingiz komil bo'lmasa, ishlatmagan ma'qul.

3. Idiomalarni noto'g'ri ishlatish. IELTS Writingda idiomlar juda kam ishlatiladi va ularni noto'g'ri qo'llash ballingizni pasaytiradi.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `The rapid advancement of technology has transformed many aspects of modern life, and education is no exception. While some individuals believe that technological innovations will ultimately replace human teachers, I strongly disagree with this view, as I believe that teachers play an irreplaceable role in the learning process.

Undoubtedly, technology has brought about significant improvements in education. Digital tools such as interactive whiteboards, educational software, and online learning platforms have enhanced the way students access and engage with information. During the recent global pandemic, for instance, millions of students worldwide continued their education through virtual classrooms, demonstrating the vital role that technology can play in ensuring continuity of learning. Furthermore, artificial intelligence-powered personalised learning systems can adapt to individual students' needs, providing targeted support that was previously impossible on a large scale.

However, there are compelling reasons why technology cannot replace teachers entirely. Firstly, education is not merely about the transmission of information; it involves inspiration, mentorship, and emotional support. Teachers motivate students, nurture their curiosity, and provide guidance that no algorithm can replicate. A machine cannot recognise when a student is struggling emotionally or offer the encouragement needed to overcome a challenge. Secondly, teachers foster critical thinking and creativity through dynamic classroom discussions and debates. These interactive experiences are essential for developing higher-order thinking skills and cannot be effectively replicated by a screen.

In conclusion, while technology will continue to play an increasingly prominent role in education as a supplementary tool, the notion that it will replace teachers is misguided. The human element in education remains indispensable, and the most effective learning environments are those that combine the best of both technological innovation and skilled teaching.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 9 created:", lesson21.title);

  // ─── Writing Lesson 10: Grammatical Range ────────────────────────
  const lesson22 = await prisma.lesson.create({
    data: {
      title: "Grammatical Range",
      category: "writing",
      durationMin: 25,
      isPremium: true,
      difficulty: "Hard",
      order: 22,
      prerequisiteLessonId: lesson21.id,
      theoryContent: `Grammatical Range and Accuracy — IELTS Writing baholash mezonlaridan biri bo'lib, sizning grammatik tuzilmalarni qanchalik xilma-xil va to'g'ri ishlatishingizni baholaydi.

Muhim grammatik tuzilmalar:

1. Complex sentences (murakkab jumlalar):
  - "Although technology has many benefits, it also presents certain challenges."
  - "The government, which is responsible for public welfare, should invest in healthcare."

2. Conditional sentences (shart gaplari):
  - First conditional: "If the government invests in education, literacy rates will improve."
  - Second conditional: "If more people used public transport, air pollution would decrease."
  - Third conditional: "If the policy had been implemented earlier, the crisis could have been avoided."

3. Passive voice (majhul nisbat):
  - "More money should be invested in renewable energy."
  - "It could be argued that..." / "It is widely believed that..."

4. Relative clauses (nisbiy gaplar):
  - "Students who study regularly tend to achieve higher scores."
  - "The policy, which was introduced in 2019, has proved successful."

5. Inversions (teskari tartib):
  - "Not only does exercise improve physical health, but it also enhances mental wellbeing."
  - "Seldom has a policy been so widely supported."

6. Participle clauses:
  - "Having completed their research, the scientists published their findings."
  - "Supported by evidence, the argument is convincing."`,
      passageText: `Some people believe that climate change is the most pressing issue facing humanity today, while others argue that there are more urgent problems that require immediate attention.

Discuss both these views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.`,
      tipsAndTricks: `1. Grammatik tuzilmalarni xilma-xil ishlating. Qisqa sodda jumlalar bilan murakkab qo'shma gaplarni aralashtirib yozing.

2. Passive voice akademik Writingda juda foydali: "It can be argued that...", "The problem should be addressed by..."

3. Conditional sentences yuqori ball olishga yordam beradi: "If governments failed to act, the consequences would be catastrophic."`,
      commonMistakes: `1. Bir turdagi grammatik tuzilmani haddan tashqari ko'p ishlatish. Faqat "if" bilan boshlanadigan jumlalar yozish ballingizni pasaytiradi.

2. Noto'g'ri zamon ishlatish. Umumiy haqiqatlar uchun Present Simple, o'tgan voqealar uchun Past Simple ishlating.

3. Complex sentence yozishga urinayotganda grammatik xatoga yo'l qo'yish. Agar murakkab tuzilmani to'g'ri yozishga ishonchingiz komil bo'lmasa, sodda qilib yozgan ma'qul.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `Climate change has become one of the most widely debated topics of our time. While many people consider it the greatest threat to humanity, others contend that more immediate issues, such as poverty and armed conflict, deserve greater attention. This essay will discuss both perspectives before presenting my own conclusion.

Those who argue that climate change is the most pressing issue point to its far-reaching and potentially irreversible consequences. Rising global temperatures are causing sea levels to rise, extreme weather events to become more frequent, and ecosystems to collapse. If left unchecked, climate change could displace hundreds of millions of people, trigger food and water shortages, and exacerbate existing conflicts. Furthermore, unlike many other problems, climate change is a truly global challenge that no single country can solve alone, requiring unprecedented international cooperation. The Intergovernmental Panel on Climate Change has warned that without immediate and substantial action, the damage will become catastrophic and irreversible within decades.

On the other hand, it could be argued that more immediate problems demand urgent attention. Millions of people around the world currently suffer from poverty, hunger, and lack of access to clean water and basic healthcare. For those living in extreme poverty, climate change may seem like a distant concern compared to the daily struggle for survival. Armed conflicts, which have intensified in several regions in recent years, cause immediate suffering, displacement, and loss of life. Addressing these pressing humanitarian crises is, for many, a more urgent priority than tackling long-term environmental challenges.

In my opinion, while both sets of concerns are valid, climate change should be regarded as the most critical issue because it exacerbates almost every other problem. Poverty, food insecurity, and conflict are all worsened by environmental degradation and climate instability. Therefore, by addressing climate change, we can simultaneously make progress on multiple other fronts. However, this does not mean that immediate humanitarian needs should be neglected; rather, the two agendas must be pursued in parallel.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Writing Lesson 10 created:", lesson22.title);

  // ═══════════════════════════════════════════════════════════════════
  // LISTENING LESSONS
  // ═══════════════════════════════════════════════════════════════════

  // ─── Listening Lesson 1: Section 1 - Social conversation ─────────
  const lesson23 = await prisma.lesson.create({
    data: {
      title: "Section 1 - Social conversation",
      category: "listening",
      durationMin: 20,
      isPremium: false,
      difficulty: "Easy",
      order: 23,
      prerequisiteLessonId: lesson22.id,
      theoryContent: `Section 1 — IELTS Listening imtihonining birinchi qismi bo'lib, unda ikki kishi o'rtasidagi kundalik mavzudagi suhbat tinglanadi. Bu qism odatda eng oson bo'lib, savollar asosan formani to'ldirish yoki ma'lum bir ma'lumotni yozib olishga qaratilgan.
      
Suhbat mavzulari odatda quyidagilardan iborat: mehmonxona bron qilish, tadbirga ro'yxatdan o'tish, transport so'rash, kinoteatr yoki restoran buyurtmasi. Suhbat sekin va aniq talaffuz bilan boshlanadi, lekin keyinchalik tezlashishi mumkin.

Section 1 da muvaffaqiyatli bo'lish uchun:
1) Savollarni oldindan o'qib chiqing va qanday ma'lumot kerakligini aniqlang (ism, sana, telefon raqam, narx va hokazo);
2) Harflar va raqamlarni to'g'ri eshitishga e'tibor bering (masalan, "B" va "P" harflari, "15" va "50" raqamlari);
3) Suhbatdagi ma'lumotni eshitgan zahotiyoq yozib oling, chunki suhbat orqaga qaytmaydi.`,
      passageText: "A conversation between a customer and a hotel receptionist about booking a conference room and overnight accommodation for a business event.",
      transcriptText: `RECEPTIONIST: Good morning, City Grand Hotel. How can I help you?
CUSTOMER: Good morning. I'd like to make a booking for a conference room and some overnight rooms for our staff.
RECEPTIONIST: Certainly, sir. Could I have your name, please?
CUSTOMER: Yes, it's David Thompson.
RECEPTIONIST: Thank you, Mr Thompson. And what date are you looking at?
CUSTOMER: We're planning for the fifteenth of September.
RECEPTIONIST: That's a Thursday. And how many people will be attending?
CUSTOMER: There will be twelve people in total.
RECEPTIONIST: Right. We have two conference rooms available on that date. The smaller one is the Willow Room, which holds up to ten people, and the larger one is the Oak Room, which can accommodate up to twenty.
CUSTOMER: The Oak Room sounds better since we have twelve. What's the rate?
RECEPTIONIST: The Oak Room is two hundred and fifty pounds for a full day booking, which includes use of the projector, whiteboard, and Wi-Fi. Tea and coffee are also provided.
CUSTOMER: That sounds reasonable. I'll take the Oak Room.
RECEPTIONIST: Excellent. Now, you mentioned you also need overnight accommodation. How many rooms will you require?
CUSTOMER: We'll need six single rooms, please.
RECEPTIONIST: Let me check availability. Yes, we have six single rooms on the third floor. They are priced at ninety-five pounds per night, including breakfast.
CUSTOMER: Is there a discount for booking multiple rooms?
RECEPTIONIST: For bookings of five or more rooms, we offer a ten percent discount, so each room would be eighty-five pounds fifty.
CUSTOMER: That works for me. I'll confirm the booking.
RECEPTIONIST: May I take your contact number, please?
CUSTOMER: Certainly. It's 07700 952 341.
RECEPTIONIST: Thank you. And your email address?
CUSTOMER: It's david.thompson@example.com.
RECEPTIONIST: Perfect. Let me confirm everything. You've booked the Oak Room on the fifteenth of September for a full day at two hundred and fifty pounds, and six single rooms on the third floor at eighty-five pounds fifty each per night. Is that correct?
CUSTOMER: Yes, that's correct.
RECEPTIONIST: Great. We look forward to welcoming you and your team on the fifteenth, Mr Thompson.
CUSTOMER: Thank you very much. Goodbye.
RECEPTIONIST: Goodbye.`,
      tipsAndTricks: `1. Section 1 da asosiy e'tibor formani to'ldirishga qaratilgan. Savollardagi bo'sh joylardan oldin kelgan so'zlarga e'tibor bering — ular qanday ma'lumot kerakligini ko'rsatadi (masalan, "Name: ______").
2. Raqamlarni eshitishda "teen" va "ty" farqiga e'tibor bering: "fifteen" (15) va "fifty" (50) ni adashtirmang. "13" — thirTEEN, "30" — THIRty.
3. Suhbatdagi ma'lumotlar ketma-ketligi odatda savollarning tartibiga mos keladi, shuning uchun birinchi savolga javobni suhbatning boshidan qidiring.`,
      commonMistakes: `1. Imlo xatolari — eshitilgan ma'lumotni noto'g'ri yozish. Ism va joy nomlarini eshitganda, ularni harflab berishadi (spelling), diqqat bilan tinglang.
2. Raqamlarni noto'g'ri yozish — telefon raqam, sana va narxlarni eshitishda xatolikka yo'l qo'yish. Telefon raqamlarini guruhlarga bo'lib yozib oling.
3. So'zlarning ko'plik yoki birlik shaklini noto'g'ri ishlatish — masalan, "room" va "rooms" farqiga e'tibor bering.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "form-completion",
          question: "What is the customer's full name?",
          options: ["David Thomson", "David Thompson", "Dave Thompson", "Daniel Thompson"],
          correctAnswer: 1,
          explanation: "The customer says 'Yes, it's David Thompson' when asked for his name.",
          quoteFromTranscript: "CUSTOMER: Yes, it's David Thompson.",
        },
        {
          id: 2,
          type: "form-completion",
          question: "On what date is the booking?",
          options: ["15th September", "5th September", "15th October", "5th October"],
          correctAnswer: 0,
          explanation: "The customer says 'We're planning for the fifteenth of September.'",
          quoteFromTranscript: "CUSTOMER: We're planning for the fifteenth of September.",
        },
        {
          id: 3,
          type: "form-completion",
          question: "How many people will attend?",
          options: ["10", "12", "20", "6"],
          correctAnswer: 1,
          explanation: "The customer says 'There will be twelve people in total.'",
          quoteFromTranscript: "CUSTOMER: There will be twelve people in total.",
        },
        {
          id: 4,
          type: "form-completion",
          question: "What is the price of the Oak Room for a full day?",
          options: ["£250", "£215", "£200", "£255"],
          correctAnswer: 0,
          explanation: "The receptionist says 'The Oak Room is two hundred and fifty pounds for a full day booking.'",
          quoteFromTranscript: "RECEPTIONIST: The Oak Room is two hundred and fifty pounds for a full day booking, which includes use of the projector, whiteboard, and Wi-Fi.",
        },
        {
          id: 5,
          type: "form-completion",
          question: "What is the customer's contact phone number?",
          options: ["07700 952 341", "07700 925 341", "07700 952 431", "07700 952 314"],
          correctAnswer: 0,
          explanation: "The customer gives his number as '07700 952 341'.",
          quoteFromTranscript: "CUSTOMER: Certainly. It's 07700 952 341.",
        },
        {
          id: 6,
          type: "form-completion",
          question: "What discount is offered for booking five or more rooms?",
          options: ["15 percent", "10 percent", "12 percent", "5 percent"],
          correctAnswer: 1,
          explanation: "The receptionist says 'For bookings of five or more rooms, we offer a ten percent discount.'",
          quoteFromTranscript: "RECEPTIONIST: For bookings of five or more rooms, we offer a ten percent discount, so each room would be eighty-five pounds fifty.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 1 created:", lesson23.title);

  // ─── Listening Lesson 2: Section 2 - Monologue ────────────────────
  const lesson24 = await prisma.lesson.create({
    data: {
      title: "Section 2 - Monologue",
      category: "listening",
      durationMin: 25,
      isPremium: false,
      difficulty: "Easy",
      order: 24,
      prerequisiteLessonId: lesson23.id,
      theoryContent: `Section 2 — IELTS Listening imtihonining ikkinchi qismi bo'lib, unda bitta kishining monologi yoki ma'lum bir mavzu bo'yicha taqdimoti tinglanadi. Bu qism odatda biror joy, tashkilot, xizmat yoki tadbir haqida ma'lumot beradi.

Monolog mavzulari: muzey yoki galereya haqida ma'lumot, sayyohlik agentligi tomonidan ekskursiya ta'rifi, kompaniya yoki tashkilotga kirish, bog' yoki park haqida ma'lumot. Bu qismda odatda map labeling, matching yoki form to'ldirish kabi savol turlari uchraydi.

Section 2 da muvaffaqiyatli bo'lish uchun:
1) Monologning umumiy mavzusini tushunib oling — kirish qismi odatda mavzuni aniqlaydi;
2) Savollardagi joy nomlari va yo'nalishlarga e'tibor bering, ayniqsa map labeling bo'lsa;
3) Monolog odatda mantiqiy ketma-ketlikda tuzilgan — kirish, asosiy qism, xulosa.`,
      passageText: "A recorded announcement from a museum guide describing the layout, exhibits, and facilities of the National History Museum, including opening hours and visitor information.",
      transcriptText: `Welcome to the National History Museum. My name is Sarah Jenkins, and I'll be your guide for today's tour. Before we begin, I'd like to give you some important information about the museum's layout and the exhibits you'll be able to explore.

The museum is divided into four main galleries, all located on the ground floor. As you enter the main hall, the first gallery on your left is the Earth Sciences Gallery. Here, you'll find an impressive collection of minerals and gemstones from around the world, including a display on volcanic activity and earthquake formation. Straight ahead from the main entrance is the Dinosaur Gallery, which is our most popular exhibit. It features full-size skeletons of several dinosaur species, including a Tyrannosaurus Rex and a Triceratops. The gallery also includes an interactive area where children can handle fossil replicas.

To the right of the main hall is the Mammals Gallery, which showcases the diversity of mammal species, from the smallest shrew to the largest whale. A particular highlight is the life-size model of a blue whale suspended from the ceiling. Behind the Mammals Gallery, at the far end of the building, you'll find the Human Biology Gallery. This exhibit explores the human body through interactive displays and models, covering topics such as the digestive system, the brain, and human evolution.

The museum also has several facilities for visitors. The café is located on the first floor, next to the main staircase. It serves hot and cold drinks, sandwiches, cakes, and light meals. The museum shop is situated just off the main hall, to the left of the reception desk. Here you can purchase souvenirs, books, and educational toys. Toilets are available on both floors, and there is a baby-changing facility on the ground floor near the Dinosaur Gallery.

The museum is open from ten in the morning until six in the evening, Tuesday through Sunday. Please note that the museum is closed on Mondays. Admission is free for all visitors, though some special exhibitions may require a ticket. Guided tours are available at eleven o'clock and two o'clock each day and last approximately one hour.

If you have any questions during your visit, please don't hesitate to approach a member of staff. We hope you enjoy your time at the National History Museum.`,
      tipsAndTricks: `1. Section 2 monologida joy va yo'nalishlar haqida ko'p ma'lumot beriladi. Agar map labeling bo'lsa, diagrammadagi mavjoylarni (entrance, left, right, behind, opposite) oldindan o'rganib chiqing.
2. Monologchi odatda ma'lumotni mantiqiy ketma-ketlikda beradi, shuning uchun birinchi savolga javobni monologning boshidan qidiring.
3. Raqamlar va vaqtlarga alohida e'tibor bering: ochilish va yopilish vaqtlari, ekskursiya vaqtlari, narxlar.`,
      commonMistakes: `1. Map labelingda noto'g'ri joyni belgilash — "left" va "right" so'zlarini adashtirish. Eshituvchi nuqtai nazaridan (sizning ko'zingiz bilan) emas, balki ma'ruzachi tasvirlagan yo'nalish bo'yicha o'ylang.
2. Ochilish va yopilish vaqtlarini noto'g'ri eshitish — "am" va "pm" farqiga e'tibor bering.
3. Bir nechta ma'lumot bir joyda berilganda chalkashib ketish — muhim ma'lumotlarni eshitgan zahotiyoq yozib oling.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "matching",
          question: "Where is the Dinosaur Gallery located?",
          options: ["To the left of the main entrance", "Straight ahead from the main entrance", "To the right of the main hall", "At the far end of the building"],
          correctAnswer: 1,
          explanation: "The guide says 'Straight ahead from the main entrance is the Dinosaur Gallery, which is our most popular exhibit.'",
          quoteFromTranscript: "Straight ahead from the main entrance is the Dinosaur Gallery, which is our most popular exhibit.",
        },
        {
          id: 2,
          type: "matching",
          question: "Where is the museum café located?",
          options: ["Ground floor, near the Dinosaur Gallery", "First floor, next to the main staircase", "Off the main hall, left of reception", "Far end of the Mammals Gallery"],
          correctAnswer: 1,
          explanation: "The guide states 'The café is located on the first floor, next to the main staircase.'",
          quoteFromTranscript: "The café is located on the first floor, next to the main staircase.",
        },
        {
          id: 3,
          type: "form-completion",
          question: "What are the museum's opening hours?",
          options: ["9 am to 5 pm", "10 am to 6 pm", "10 am to 5 pm", "9 am to 6 pm"],
          correctAnswer: 1,
          explanation: "The guide says 'The museum is open from ten in the morning until six in the evening.'",
          quoteFromTranscript: "The museum is open from ten in the morning until six in the evening, Tuesday through Sunday.",
        },
        {
          id: 4,
          type: "form-completion",
          question: "On which day is the museum closed?",
          options: ["Tuesday", "Sunday", "Monday", "Wednesday"],
          correctAnswer: 2,
          explanation: "The guide says 'Please note that the museum is closed on Mondays.'",
          quoteFromTranscript: "Please note that the museum is closed on Mondays.",
        },
        {
          id: 5,
          type: "form-completion",
          question: "At what times do guided tours start each day?",
          options: ["10 am and 3 pm", "11 am and 2 pm", "11 am and 3 pm", "10 am and 2 pm"],
          correctAnswer: 1,
          explanation: "The guide mentions 'Guided tours are available at eleven o'clock and two o'clock each day.'",
          quoteFromTranscript: "Guided tours are available at eleven o'clock and two o'clock each day and last approximately one hour.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 2 created:", lesson24.title);

  // ─── Listening Lesson 3: Section 3 - Academic conversation ────────
  const lesson25 = await prisma.lesson.create({
    data: {
      title: "Section 3 - Academic conversation",
      category: "listening",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 25,
      prerequisiteLessonId: lesson24.id,
      theoryContent: `Section 3 — IELTS Listening imtihonining uchinchi qismi bo'lib, unda 2-4 kishi o'rtasidagi akademik mavzudagi suhbat tinglanadi. Bu suhbat odatda talabalar va ularning o'qituvchisi o'rtasida bo'lib, ilmiy loyiha, tadqiqot, kurs ishi yoki taqdimot haqida muhokamani o'z ichiga oladi.

Section 3 ning asosiy xususiyatlari:
1) Akademik lug'at va murakkab tushunchalar ishlatiladi;
2) Suhbatda bir nechta ma'ruzachi ishtirok etadi, shuning uchun kim nima deyishini ajratish muhim;
3) Ko'pincha fikrlar, rejalar va takliflar muhokama qilinadi;
4) Savol turlari: multiple choice, matching, plans/diagrams labeling.

Section 3 da muvaffaqiyatli bo'lish uchun:
1) Har bir ma'ruzachining fikrini alohida tinglang va ularning pozitsiyasini aniqlang;
2) Muhokama qilinayotgan muammo va taklif qilinayotgan yechimlarni farqlang;
3) "Agree" va "disagree" iboralariga e'tibor bering.`,
      passageText: "Two university students, Emma and James, meet with their tutor, Dr Patel, to discuss their group research project on the impact of social media on teenage mental health.",
      transcriptText: `DR PATEL: Good morning, Emma, James. Thank you for coming in today. Let's discuss the progress on your research project about social media and teenage mental health. Where would you like to start?

EMMA: Well, Dr Patel, we've completed our literature review, and we've identified some really interesting patterns. Most studies agree that there's a correlation between heavy social media use and increased anxiety among teenagers, but the reasons are still debated.

JAMES: That's right. We found that one key factor is social comparison. Teenagers constantly compare their lives to the carefully curated images they see online, which can lead to feelings of inadequacy. However, some researchers argue that social media can also provide valuable peer support, particularly for marginalised groups.

DR PATEL: That's a nuanced perspective. So how are you planning to structure your primary research?

EMMA: We were thinking of using a mixed-methods approach. We'd like to distribute a questionnaire to approximately two hundred students aged thirteen to eighteen, asking about their social media habits and self-reported wellbeing. Then we'd follow up with focus groups of about ten to twelve students to explore the findings in more depth.

JAMES: The questionnaire would use established scales for measuring anxiety and depression, so we can compare our results with existing studies. We've already drafted the questions and we'd like your feedback on them.

DR PATEL: I'm pleased to see you're thinking about methodology carefully. However, I have a few concerns. First, gaining ethical approval for research involving minors is quite complex. You'll need parental consent for every participant under the age of sixteen. Have you considered that?

EMMA: We have, yes. We've prepared consent forms and information sheets. We're planning to distribute them through schools, which should make the process more manageable.

DR PATEL: Good. My second concern is about the focus groups. Discussing mental health can be sensitive, especially among teenagers. You'll need to have a clear protocol in place for supporting participants who may become distressed.

JAMES: That's an excellent point. We've been reading about best practices for handling sensitive topics. We plan to have a trained counsellor available during the focus groups and provide information about support services to all participants.

DR PATEL: That sounds appropriate. Now, what about your timeline? Your final submission is due in twelve weeks.

EMMA: We've created a schedule. We'll spend the first four weeks collecting questionnaire data, then two weeks analysing it. The focus groups will take place in weeks seven and eight, giving us four weeks to write up our findings. That should leave us enough time for revisions.

DR PATEL: That seems realistic. I'd like to see your questionnaire and consent forms by the end of this week. Send them to my email, and I'll review them before you submit the ethics application. Good work so far, both of you.`,
      tipsAndTricks: `1. Section 3 da "speaker identification" muhim: kim nima deyotganini aniqlang. Multiple choice savollari ko'pincha "What does Emma suggest?" yoki "What is Dr Patel's concern?" kabi bo'ladi.
2. Akademik muhokamada "agree" va "disagree" iboralariga e'tibor bering: "I agree", "That's a good point", "However", "I'm not sure about that".
3. Reja va vaqt haqidagi ma'lumotlar (timeline, deadlines) ko'pin所以 savollarda keladi, ularni eshitgan zahotiyoq yozib oling.`,
      commonMistakes: `1. Ma'ruzachilarni adashtirish — Emma, James va Dr Patelning fikrlarini chalkashtirish. Suhbat boshida kim kimligini aniqlab oling.
2. Muhokamadagi asosiy muammoni noto'g'ri tushunish — odatda section 3 da bir loyiha rejalashtiriladi va undagi muammolar muhokama qilinadi.
3. Multiple choice savollarida "distractor" variantlarga uchish — ma'ruzachilar bir nechta fikrni muhokama qilishadi, lekin faqat bittasi savolga javob bo'ladi.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "multiple-choice",
          question: "What research method are Emma and James planning to use first?",
          options: ["Focus groups", "Interviews", "A questionnaire", "Case studies"],
          correctAnswer: 2,
          explanation: "Emma says 'We'd like to distribute a questionnaire to approximately two hundred students.'",
          quoteFromTranscript: "EMMA: We'd like to distribute a questionnaire to approximately two hundred students aged thirteen to eighteen, asking about their social media habits and self-reported wellbeing.",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What is Dr Patel's first concern about the research?",
          options: ["The sample size is too small", "Gaining ethical approval for minors", "The questionnaire is too long", "Focus groups are inappropriate"],
          correctAnswer: 1,
          explanation: "Dr Patel says 'gaining ethical approval for research involving minors is quite complex. You'll need parental consent for every participant under the age of sixteen.'",
          quoteFromTranscript: "DR PATEL: I have a few concerns. First, gaining ethical approval for research involving minors is quite complex. You'll need parental consent for every participant under the age of sixteen.",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "How do James and Emma plan to handle potential distress during focus groups?",
          options: ["Exclude sensitive topics", "Have a counsellor available", "Cancel the focus groups", "Only interview adults"],
          correctAnswer: 1,
          explanation: "James says 'We plan to have a trained counsellor available during the focus groups and provide information about support services to all participants.'",
          quoteFromTranscript: "JAMES: We plan to have a trained counsellor available during the focus groups and provide information about support services to all participants.",
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "How many weeks do they have until their final submission?",
          options: ["8 weeks", "10 weeks", "12 weeks", "14 weeks"],
          correctAnswer: 2,
          explanation: "Dr Patel says 'Your final submission is due in twelve weeks.'",
          quoteFromTranscript: "DR PATEL: That sounds appropriate. Now, what about your timeline? Your final submission is due in twelve weeks.",
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "What does Dr Patel ask to see by the end of the week?",
          options: ["The literature review", "The questionnaire and consent forms", "The focus group questions", "The final report"],
          correctAnswer: 1,
          explanation: "Dr Patel says 'I'd like to see your questionnaire and consent forms by the end of this week.'",
          quoteFromTranscript: "DR PATEL: I'd like to see your questionnaire and consent forms by the end of this week. Send them to my email, and I'll review them before you submit the ethics application.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 3 created:", lesson25.title);

  // ─── Listening Lesson 4: Section 4 - Academic lecture ─────────────
  const lesson26 = await prisma.lesson.create({
    data: {
      title: "Section 4 - Academic lecture",
      category: "listening",
      durationMin: 35,
      isPremium: true,
      difficulty: "Hard",
      order: 26,
      prerequisiteLessonId: lesson25.id,
      theoryContent: `Section 4 — IELTS Listening imtihonining eng murakkab qismi bo'lib, unda bir kishi tomonidan akademik mavzudagi ma'ruza (lecture) tinglanadi. Bu qism odatda universitet ma'ruzasiga o'xshaydi va ilmiy, tarixiy yoki ijtimoiy mavzularni qamrab oladi.

Section 4 ning asosiy xususiyatlari:
1) Uzun monolog — odatda 5-6 daqiqa davom etadi;
2) Akademik lug'at va murakkab tuzilmalar ishlatiladi;
3) Ma'ruza odatda mantiqiy qismlarga bo'lingan (kirish, asosiy qism, xulosa);
4) Savol turlari: note completion, summary completion, sentence completion.

Section 4 da muvaffaqiyatli bo'lish uchun:
1) Ma'ruzaning mavzusini va asosiy strukturasini tushunib oling;
2) Note completion savollarida bo'sh joylardan oldin kelgan so'zlarga e'tibor bering;
3) Ma'ruza bir marta o'qiladi, shuning uchun muhim ma'lumotlarni tezda yozib olishni mashq qiling;
4) Ma'ruza oxirida berilgan xulosaga e'tibor bering — u ko'pincha asosiy fikrlarni takrorlaydi.`,
      passageText: "An academic lecture by Professor Helen Richardson on oceanography, focusing on ocean currents, marine ecosystems, the impact of climate change on oceans, and conservation efforts.",
      transcriptText: `Good morning everyone. Today's lecture is part of our series on oceanography, and I'll be discussing the role of ocean currents in regulating the Earth's climate and the impact of human activity on marine ecosystems.

Let me begin with the basics. Ocean currents are continuous, directed movements of seawater generated by several forces, including wind, temperature, salinity differences, and the Earth's rotation. These currents act like a massive conveyor belt, transporting warm water from the equator toward the poles and cold water from the poles back to the equator. This process, known as thermohaline circulation, is fundamental to the global climate system. Without it, the equator would be considerably hotter and the poles considerably colder than they currently are.

One of the most significant ocean current systems is the Gulf Stream, which originates in the Gulf of Mexico and flows across the Atlantic Ocean toward Western Europe. The Gulf Stream carries warm water at a rate of approximately 150 million cubic metres per second. To put that into perspective, that is more than one hundred times the flow of all the world's rivers combined. This current is responsible for the relatively mild climate enjoyed by countries such as the United Kingdom and Ireland, which would otherwise have a much colder climate given their northern latitude.

Now, let's turn to the impact of climate change on ocean systems. The ocean has absorbed approximately thirty percent of the carbon dioxide emitted by human activities since the Industrial Revolution. While this has slowed the rate of global warming, it has come at a significant cost: ocean acidification. As carbon dioxide dissolves in seawater, it forms carbonic acid, which lowers the pH of the ocean. Since the beginning of the Industrial Revolution, the pH of surface ocean waters has decreased by about 0.1 units, representing approximately a thirty percent increase in acidity. This change may seem small, but it has profound implications for marine organisms with calcium carbonate shells or skeletons, such as corals, oysters, and plankton.

The effects of ocean acidification are already visible. Coral reefs, often called the rainforests of the sea, are particularly vulnerable. When water becomes too acidic, corals cannot build their skeletons effectively, leading to coral bleaching and reef degradation. It is estimated that if current trends continue, more than ninety percent of coral reefs could be threatened by 2050.

Additionally, rising sea temperatures are causing fish populations to migrate towards the poles in search of cooler waters. This disrupts established fishing industries and threatens food security in regions that depend heavily on fish as a protein source.

However, there are reasons for hope. Marine protected areas, which restrict fishing and other extractive activities, have been shown to allow fish populations to recover and ecosystems to regenerate. The recent expansion of the Papahanaumokuakea Marine National Monument in Hawaii demonstrates the positive impact of large-scale protection. International agreements to reduce carbon emissions, such as the Paris Agreement, also play a crucial role, though many scientists argue that current commitments are insufficient.

To conclude, the ocean is not simply a vast, unchanging body of water. It is a dynamic system that regulates our climate and supports an extraordinary diversity of life. Understanding and protecting this system is not merely an environmental concern; it is essential for human wellbeing and economic prosperity. Thank you for your attention.`,
      tipsAndTricks: `1. Section 4 da note completion eng keng tarqalgan savol turidir. Bo'sh joylarni to'ldirishda so'z soni chekloviga e'tibor bering (masalan, "NO MORE THAN TWO WORDS").
2. Ma'ruza odatda aniq tuzilgan: kirish, birinchi asosiy mavzu, ikkinchi asosiy mavzu, xulosa. Har bir qismga mos keladigan savollarni aniqlang.
3. Ma'ruzadagi raqamlar, sanalar va foizlar ko'pincha savollarda keladi, ularni aniq yozib olishga harakat qiling.`,
      commonMistakes: `1. Ma'ruzaning asosiy g'oyasini tushunmasdan, faqat alohida so'zlarga e'tibor berish — bu savollarga noto'g'ri javob berishga olib keladi.
2. Nota olishda faqat eshitilgan so'zlarni yozish, lekin ularning kontekstini tushunmaslik.
3. So'z soni chekloviga rioya qilmaslik — masalan, "NO MORE THAN TWO WORDS" talab qilinganda uch so'z yozish.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "note-completion",
          question: "What is the process called that transports warm water from the equator to the poles?",
          options: ["Gulf Stream", "Thermohaline circulation", "Ocean acidification", "Carbon cycle"],
          correctAnswer: 1,
          explanation: "The professor says 'This process, known as thermohaline circulation, is fundamental to the global climate system.'",
          quoteFromTranscript: "This process, known as thermohaline circulation, is fundamental to the global climate system.",
        },
        {
          id: 2,
          type: "note-completion",
          question: "How much water does the Gulf Stream carry per second?",
          options: ["100 million cubic metres", "150 million cubic metres", "200 million cubic metres", "50 million cubic metres"],
          correctAnswer: 1,
          explanation: "The lecture states 'The Gulf Stream carries warm water at a rate of approximately 150 million cubic metres per second.'",
          quoteFromTranscript: "The Gulf Stream carries warm water at a rate of approximately 150 million cubic metres per second.",
        },
        {
          id: 3,
          type: "note-completion",
          question: "What percentage of carbon dioxide from human activities has the ocean absorbed?",
          options: ["20 percent", "30 percent", "40 percent", "50 percent"],
          correctAnswer: 1,
          explanation: "The professor says 'The ocean has absorbed approximately thirty percent of the carbon dioxide emitted by human activities since the Industrial Revolution.'",
          quoteFromTranscript: "The ocean has absorbed approximately thirty percent of the carbon dioxide emitted by human activities since the Industrial Revolution.",
        },
        {
          id: 4,
          type: "note-completion",
          question: "What percentage of coral reefs could be threatened by 2050?",
          options: ["70 percent", "80 percent", "90 percent", "100 percent"],
          correctAnswer: 2,
          explanation: "The lecture says 'It is estimated that if current trends continue, more than ninety percent of coral reefs could be threatened by 2050.'",
          quoteFromTranscript: "It is estimated that if current trends continue, more than ninety percent of coral reefs could be threatened by 2050.",
        },
        {
          id: 5,
          type: "note-completion",
          question: "What type of areas have been shown to help fish populations recover?",
          options: ["National parks", "Marine protected areas", "Fishing zones", "Coastal reserves"],
          correctAnswer: 1,
          explanation: "The professor says 'Marine protected areas, which restrict fishing and other extractive activities, have been shown to allow fish populations to recover and ecosystems to regenerate.'",
          quoteFromTranscript: "Marine protected areas, which restrict fishing and other extractive activities, have been shown to allow fish populations to recover and ecosystems to regenerate.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 4 created:", lesson26.title);

  // ─── Listening Lesson 5: Form completion ───────────────────────────
  const lesson27 = await prisma.lesson.create({
    data: {
      title: "Form completion",
      category: "listening",
      durationMin: 20,
      isPremium: true,
      difficulty: "Medium",
      order: 27,
      prerequisiteLessonId: lesson26.id,
      theoryContent: `Form completion — IELTS Listening bo'limida eng ko'p uchraydigan savol turlaridan biri. Bu savol turida sizga biror forma yoki ariza beriladi va suhbatni tinglab, undagi bo'sh joylarni to'ldirishingiz kerak.

Form completion odatda quyidagi ma'lumotlarni o'z ichiga oladi:
- Shaxsiy ma'lumotlar: ism, manzil, telefon raqam, email
- Raqamli ma'lumotlar: sana, vaqt, narx, miqdor
- Tanlov ma'lumotlari: xizmat turi, to'lov usuli, muddat

Form completion uchun muhim strategiyalar:
1) Formani oldindan ko'zdan kechirib, qanday ma'lumot kerakligini aniqlang;
2) Suhbatda ma'lumotlar ketma-ketligi formadagi tartibga mos keladi;
3) Ba'zida bir nechta ma'lumot beriladi, lekin faqat bittasi to'g'ri javob bo'ladi;
4) Imloga alohida e'tibor bering — ismlar va joy nomlari harflab beriladi.`,
      passageText: "A phone conversation between a customer and an insurance company representative about applying for car insurance, filling out personal details and coverage preferences.",
      transcriptText: `REPRESENTATIVE: Good afternoon, thank you for calling Shield Insurance. My name is Rachel. How can I help you today?
CUSTOMER: Hello, Rachel. I'd like to get a quote for car insurance, please.
REPRESENTATIVE: Certainly. I'll need to take down some details. Can I start with your full name?
CUSTOMER: Yes, it's Maria Gonzalez.
REPRESENTATIVE: Could you spell that for me, please?
CUSTOMER: Of course. M-A-R-I-A, G-O-N-Z-A-L-E-Z.
REPRESENTATIVE: Thank you. And your date of birth?
CUSTOMER: I was born on the third of June, 1988.
REPRESENTATIVE: So that's the third of the sixth, 1988. And your current address?
CUSTOMER: 42 Park Avenue, Manchester, postcode M1 3AB.
REPRESENTATIVE: Thank you. How long have you been living at this address?
CUSTOMER: About four years.
REPRESENTATIVE: Now, tell me about the vehicle. What is the make and model?
CUSTOMER: It's a Ford Focus, 2019 registration.
REPRESENTATIVE: And what is the vehicle registration number?
CUSTOMER: It's FG19 XYZ.
REPRESENTATIVE: Thank you. What type of coverage are you looking for? We offer third party only, third party fire and theft, and comprehensive cover.
CUSTOMER: I'd like comprehensive cover, please. I want full protection.
REPRESENTATIVE: A wise choice. Will you be the only named driver on the policy?
CUSTOMER: Yes, just myself.
REPRESENTATIVE: Do you have a no-claims bonus from your previous insurer?
CUSTOMER: Yes, I have five years of no-claims.
REPRESENTATIVE: Excellent, that will give you a significant discount. And how many miles do you drive annually, approximately?
CUSTOMER: I'd say around eight thousand miles.
REPRESENTATIVE: Is the vehicle kept on a driveway, in a garage, or on the street overnight?
CUSTOMER: It's parked on a driveway.
REPRESENTATIVE: Perfect. Let me calculate your quote. Based on the information you've provided, your annual premium would be four hundred and twenty pounds, or you can pay monthly at thirty-eight pounds per month.
CUSTOMER: I'll take the annual payment, please.
REPRESENTATIVE: Excellent. The policy will start tomorrow at midnight. You'll receive your documents by email within the next hour. Thank you for choosing Shield Insurance, Ms Gonzalez.`,
      tipsAndTricks: `1. Formani to'ldirishda har bir bo'sh joydan oldin kelgan yorliqni (label) diqqat bilan o'qing. Bu sizga qanday ma'lumot kerakligini ko'rsatadi (masalan, "Name:", "Date of birth:", "Postcode:").
2. Ism va manzillar harflab (spelling) beriladi. Eshitganingizdek yozing, o'zgartirmang.
3. Raqamli ma'lumotlarni (telefon, postcode) guruhlarga bo'lib yozib oling.`,
      commonMistakes: `1. Imlo xatolari — ism va manzillarni noto'g'ri yozish. Spelling berilganda, harflarni diqqat bilan tinglang.
2. Raqamlarni noto'g'ri eshitish — "14" va "40", "15" va "50" kabi raqamlarni adashtirish.
3. Formadagi bo'sh joy sonidan ko'p yoki kam so'z yozish — "ONE WORD ONLY" talabiga rioya qilmaslik.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "form-completion",
          question: "What is the customer's full name?",
          options: ["Maria Gonzales", "Maria Gonzalez", "Mario Gonzalez", "Maria Gomez"],
          correctAnswer: 1,
          explanation: "The customer spells her name as 'M-A-R-I-A, G-O-N-Z-A-L-E-Z'.",
          quoteFromTranscript: "CUSTOMER: Of course. M-A-R-I-A, G-O-N-Z-A-L-E-Z.",
        },
        {
          id: 2,
          type: "form-completion",
          question: "What is the customer's date of birth?",
          options: ["3rd June 1988", "3rd July 1988", "6th March 1988", "3rd June 1989"],
          correctAnswer: 0,
          explanation: "The customer says 'I was born on the third of June, 1988.'",
          quoteFromTranscript: "CUSTOMER: I was born on the third of June, 1988.",
        },
        {
          id: 3,
          type: "form-completion",
          question: "What is the postcode of the customer?",
          options: ["M1 3AB", "M1 3BA", "M3 1AB", "M1 4AB"],
          correctAnswer: 0,
          explanation: "The customer gives their address as '42 Park Avenue, Manchester, postcode M1 3AB.'",
          quoteFromTranscript: "CUSTOMER: 42 Park Avenue, Manchester, postcode M1 3AB.",
        },
        {
          id: 4,
          type: "form-completion",
          question: "What type of insurance coverage does the customer choose?",
          options: ["Third party only", "Third party fire and theft", "Comprehensive cover", "Basic cover"],
          correctAnswer: 2,
          explanation: "The customer says 'I'd like comprehensive cover, please. I want full protection.'",
          quoteFromTranscript: "CUSTOMER: I'd like comprehensive cover, please. I want full protection.",
        },
        {
          id: 5,
          type: "form-completion",
          question: "How many years of no-claims bonus does the customer have?",
          options: ["Three years", "Four years", "Five years", "Six years"],
          correctAnswer: 2,
          explanation: "The customer says 'Yes, I have five years of no-claims.'",
          quoteFromTranscript: "CUSTOMER: Yes, I have five years of no-claims.",
        },
        {
          id: 6,
          type: "form-completion",
          question: "What is the annual premium quoted?",
          options: ["£380", "£420", "£450", "£400"],
          correctAnswer: 1,
          explanation: "The representative says 'your annual premium would be four hundred and twenty pounds.'",
          quoteFromTranscript: "REPRESENTATIVE: your annual premium would be four hundred and twenty pounds, or you can pay monthly at thirty-eight pounds per month.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 5 created:", lesson27.title);

  // ─── Listening Lesson 6: Note completion ───────────────────────────
  const lesson28 = await prisma.lesson.create({
    data: {
      title: "Note completion",
      category: "listening",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 28,
      prerequisiteLessonId: lesson27.id,
      theoryContent: `Note completion — IELTS Listening bo'limida Section 4 da eng ko'p uchraydigan savol turidir. Bu savol turida sizga ma'ruza yoki monologning qisqacha xulosasi (note) beriladi va undagi bo'sh joylarni to'ldirishingiz kerak.

Note completionning xususiyatlari:
1) Xulosa matndagi ma'lumotlarning qisqartirilgan (parafraze qilingan) versiyasidir;
2) Bo'sh joylar odatda asosiy ma'lumotlarni o'z ichiga oladi;
3) So'z soni cheklovi mavjud (masalan, "NO MORE THAN TWO WORDS").

Note completion uchun strategiyalar:
1) Xulosani o'qib, unda qanday ma'lumot yetishmayotganini tushunib oling;
2) Ma'ruzani tinglashda xulosadagi kalit so'zlar va ularning sinonimlariga e'tibor bering;
3) Eshitilgan ma'lumotni xulosadagi bo'sh joyga moslashtiring;
4) Javobni xulosaga qo'yib, grammatik jihatdan to'g'ri ekanligini tekshiring.`,
      passageText: "An academic lecture by a history professor about the Industrial Revolution, covering its origins, key inventions, social impact, and long-term consequences on society and the economy.",
      transcriptText: `Good morning. Today I want to explore one of the most transformative periods in human history: the Industrial Revolution. This period, which began in Britain around 1760 and spread throughout Europe and North America over the following century, fundamentally changed the way people lived, worked, and interacted with one another.

Several factors explain why the Industrial Revolution began in Britain. First, Britain had abundant natural resources, particularly coal and iron ore, which were essential for powering machines and building infrastructure. Second, the country had a stable political system and a legal framework that protected property rights, encouraging investment in new technologies. Third, Britain's agricultural revolution had improved farming efficiency, meaning fewer workers were needed on farms, creating a surplus labour force that could work in factories. Finally, Britain's extensive colonial empire provided access to raw materials and markets for manufactured goods.

The most significant technological breakthroughs were in textile manufacturing. In 1733, John Kay invented the flying shuttle, which doubled the speed of weaving. This was followed by James Hargreaves' spinning jenny in 1764, which allowed one worker to spin multiple threads at once. However, the most important invention was the steam engine, improved by James Watt in 1769. The steam engine provided a reliable source of power that was not dependent on water mills or wind, allowing factories to be built anywhere. By 1800, there were over five hundred steam engines operating in Britain.

The social impact of industrialisation was profound. Cities grew rapidly as people moved from rural areas to work in factories. Manchester, for example, grew from a town of around ten thousand people in 1700 to a city of over three hundred thousand by 1850. Working conditions in factories were often harsh, with long hours, low wages, and dangerous machinery. Children as young as five years old were employed in factories and mines, a practice that continued until the Factory Acts of the 1830s and 1840s began to regulate child labour.

The Industrial Revolution also had significant economic consequences. It created a new middle class of factory owners and merchants, while also giving rise to an industrial working class. The gap between rich and poor widened considerably. In response, workers began to organise into trade unions to demand better conditions and higher wages. The writings of thinkers such as Karl Marx and Friedrich Engels, who published the Communist Manifesto in 1848, were directly influenced by the social conditions created by industrialisation.

To conclude, the Industrial Revolution was a period of extraordinary change that laid the foundations for the modern world. While it brought unprecedented economic growth and technological progress, it also created social problems that societies are still grappling with today. Understanding this period helps us appreciate both the achievements and the challenges of industrial development.`,
      tipsAndTricks: `1. Note completionda xulosadagi bo'sh joyga qo'yiladigan so'zni topish uchun ma'ruzadagi sinonim va parafrazalarga e'tibor bering. Xulosa matndan so'zma-so'z takrorlanmasligi mumkin.
2. Bo'sh joydan oldin va keyin kelgan so'zlar qanday turdagi so'z (ot, sifat, fe'l) kerakligini ko'rsatadi.
3. Javobni xulosaga qo'yib o'qing — agar grammatik jihatdan to'g'ri bo'lmasa, javob noto'g'ri.`,
      commonMistakes: `1. Xulosadagi bo'sh joyni matndan aynan bir xil so'z bilan to'ldirishga urinish. Xulosa odatda parafraze qilingan bo'ladi.
2. Faqat bitta so'z eshitib, uni darhol javob deb yozish. Kontekstni tekshirmasdan javob bermang.
3. So'z soni chekloviga rioya qilmaslik. "NO MORE THAN TWO WORDS" talab qilinsa, ikki so'zdan ko'p yozmang.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "note-completion",
          question: "What natural resource was essential for powering machines in the Industrial Revolution?",
          options: ["Iron ore", "Coal", "Steam", "Water"],
          correctAnswer: 1,
          explanation: "The professor says 'Britain had abundant natural resources, particularly coal and iron ore, which were essential for powering machines.' Coal specifically is mentioned for power.",
          quoteFromTranscript: "Britain had abundant natural resources, particularly coal and iron ore, which were essential for powering machines and building infrastructure.",
        },
        {
          id: 2,
          type: "note-completion",
          question: "What invention doubled the speed of weaving in 1733?",
          options: ["Spinning jenny", "Flying shuttle", "Steam engine", "Power loom"],
          correctAnswer: 1,
          explanation: "The lecture states 'In 1733, John Kay invented the flying shuttle, which doubled the speed of weaving.'",
          quoteFromTranscript: "In 1733, John Kay invented the flying shuttle, which doubled the speed of weaving.",
        },
        {
          id: 3,
          type: "note-completion",
          question: "How many steam engines were operating in Britain by 1800?",
          options: ["300", "400", "500", "600"],
          correctAnswer: 2,
          explanation: "The professor says 'By 1800, there were over five hundred steam engines operating in Britain.'",
          quoteFromTranscript: "By 1800, there were over five hundred steam engines operating in Britain.",
        },
        {
          id: 4,
          type: "note-completion",
          question: "What was the population of Manchester by 1850?",
          options: ["100,000", "200,000", "300,000", "400,000"],
          correctAnswer: 2,
          explanation: "The lecture says 'Manchester grew from a town of around ten thousand people in 1700 to a city of over three hundred thousand by 1850.'",
          quoteFromTranscript: "Manchester, for example, grew from a town of around ten thousand people in 1700 to a city of over three hundred thousand by 1850.",
        },
        {
          id: 5,
          type: "note-completion",
          question: "What document did Karl Marx and Friedrich Engels publish in 1848?",
          options: ["The Wealth of Nations", "The Communist Manifesto", "Das Kapital", "The Social Contract"],
          correctAnswer: 1,
          explanation: "The professor mentions 'the writings of thinkers such as Karl Marx and Friedrich Engels, who published the Communist Manifesto in 1848.'",
          quoteFromTranscript: "The writings of thinkers such as Karl Marx and Friedrich Engels, who published the Communist Manifesto in 1848, were directly influenced by the social conditions created by industrialisation.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 6 created:", lesson28.title);

  // ─── Listening Lesson 7: Multiple choice (listening) ───────────────
  const lesson29 = await prisma.lesson.create({
    data: {
      title: "Multiple choice (listening)",
      category: "listening",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 29,
      prerequisiteLessonId: lesson28.id,
      theoryContent: `Multiple choice — IELTS Listening bo'limining barcha sectionlarida uchraydigan savol turidir. Bu savol turida sizga savol va bir nechta javob variantlari beriladi, siz to'g'ri javobni tanlashingiz kerak.

Multiple choice savollarining turlari:
1) Standard multiple choice — bitta to'g'ri javob (A, B, C yoki D);
2) Multiple answer — ikki yoki undan ortiq to'g'ri javobni tanlash;
3) Pick from a list — berilgan ro'yxatdan bir nechta variantni tanlash.

Multiple choice uchun strategiyalar:
1) Savollarni oldindan o'qib chiqing va variantlardagi kalit so'zlarni aniqlang;
2) Suhbatda variantlarning barchasi tilga olinishi mumkin, lekin faqat bittasi to'g'ri javob;
3) "Distractor" (chalg'ituvchi) variantlarga e'tibor bering — ma'ruzachilar bir narsani aytib, keyin uni o'zgartirishlari mumkin;
4) Variantlardagi mutlaq so'zlarga ("always", "never", "all") e'tibor bering — ular ko'pincha noto'g'ri.`,
      passageText: "A discussion between three students — Sarah, Tom, and Aisha — and their tutor, Dr Williams, about environmental sustainability and government policies on plastic waste reduction.",
      transcriptText: `DR WILLIAMS: Good afternoon, everyone. Today, I'd like us to discuss environmental sustainability, specifically government policies aimed at reducing plastic waste. Sarah, would you like to start?

SARAH: Thank you, Dr Williams. I've been researching the plastic bag ban that was introduced in several countries. In my view, it's been largely successful. For example, in Kenya, the ban on plastic bags introduced in 2017 led to a significant reduction in plastic waste. However, I think the problem is that many countries only target plastic bags, while other single-use plastics, like packaging and bottles, continue to cause problems.

TOM: That's an interesting point, Sarah. But I'd argue that plastic bag bans are more of a symbolic gesture than a real solution. In my opinion, the real issue is the lack of proper waste management infrastructure. In many developing countries, even where plastic is banned, illegal manufacturing continues because there's no viable alternative. I think governments should focus more on investing in recycling facilities and waste collection systems rather than imposing bans.

AISHA: I see what you mean, Tom, but I disagree to some extent. I believe that bans and infrastructure investment should go hand in hand. Singapore is a great example. The government has both strict regulations on plastic use and world-class waste management systems. They've managed to reduce waste significantly. But what I find most interesting is the role of consumer behaviour. No matter how good the policies are, if people aren't willing to change their habits, progress will be limited.

DR WILLIAMS: Aisha raises an excellent point about consumer behaviour. Tom, what do you think about that?

TOM: I agree that consumer behaviour matters, but I think it's unrealistic to expect individual consumers to solve a problem that is largely caused by corporations. In the UK, for instance, just ten companies are responsible for over forty percent of all plastic packaging waste. I believe that governments should impose stricter regulations on manufacturers, requiring them to use recyclable materials and take responsibility for the entire lifecycle of their products.

SARAH: That's a fair point, Tom, but I also think education plays a crucial role. When people understand the impact of plastic pollution on marine life and human health, they're more likely to support environmental policies and change their own behaviour. In my country, public awareness campaigns have been quite effective in reducing plastic bottle usage.

AISHA: Perhaps the most effective approach is a combination of all these strategies: government regulation, corporate responsibility, infrastructure investment, and public education. No single solution will be sufficient on its own. This is a complex problem that requires a comprehensive response.

DR WILLIAMS: I think Aisha has captured the essence of the issue very well. Environmental problems require multi-faceted solutions. Your task for next week is to research one country's approach to plastic waste management and prepare a short presentation evaluating its effectiveness.`,
      tipsAndTricks: `1. Multiple choice savollarida variantlarning barchasi suhbatda tilga olinishi mumkin, lekin faqat bittasi savolga to'g'ri javob. Variantlarni eshitgan zahotiyoq belgilab qo'ymang.
2. Suhbatdagi "but", "however", "actually" kabi so'zlarga e'tibor bering — ma'ruzachi fikrini o'zgartirishi mumkin.
3. "Distractor" variantlar odatda ma'lumotni o'z ichiga oladi, ammo savolga to'g'ri javob bo'lmaydi. Savolni qayta o'qib, variantni tekshiring.`,
      commonMistakes: `1. Birinchi eshitilgan ma'lumotni darhol javob deb qabul qilish. Suhbatda ma'ruzachilar fikrlarini o'zgartirishlari mumkin.
2. Ma'ruzachilarning fikrlarini adashtirish — kim nima deganini aniq ajratish muhim.
3. Variantlarni to'liq o'qimasdan tanlash — ba'zi variantlar qisman to'g'ri bo'lishi mumkin, lekin to'liq javob boshqa variantda.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "multiple-choice",
          question: "What does Sarah think about plastic bag bans?",
          options: ["They are completely ineffective", "They are successful but limited in scope", "They should be the only policy used", "They harm developing countries"],
          correctAnswer: 1,
          explanation: "Sarah says 'I think the problem is that many countries only target plastic bags, while other single-use plastics... continue to cause problems.'",
          quoteFromTranscript: "SARAH: However, I think the problem is that many countries only target plastic bags, while other single-use plastics, like packaging and bottles, continue to cause problems.",
        },
        {
          id: 2,
          type: "multiple-choice",
          question: "What does Tom believe is the main issue?",
          options: ["Consumer behaviour", "Plastic bag bans", "Lack of waste management infrastructure", "Corporations are not the problem"],
          correctAnswer: 2,
          explanation: "Tom says 'the real issue is the lack of proper waste management infrastructure.'",
          quoteFromTranscript: "TOM: But I'd argue that plastic bag bans are more of a symbolic gesture than a real solution. In my opinion, the real issue is the lack of proper waste management infrastructure.",
        },
        {
          id: 3,
          type: "multiple-choice",
          question: "Which country does Aisha mention as a good example of combining regulations with infrastructure?",
          options: ["Kenya", "Singapore", "The UK", "India"],
          correctAnswer: 1,
          explanation: "Aisha says 'Singapore is a great example. The government has both strict regulations on plastic use and world-class waste management systems.'",
          quoteFromTranscript: "AISHA: Singapore is a great example. The government has both strict regulations on plastic use and world-class waste management systems.",
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "According to Tom, what percentage of plastic packaging waste in the UK is caused by ten companies?",
          options: ["Thirty percent", "Forty percent", "Fifty percent", "Sixty percent"],
          correctAnswer: 1,
          explanation: "Tom says 'in the UK, for instance, just ten companies are responsible for over forty percent of all plastic packaging waste.'",
          quoteFromTranscript: "TOM: In the UK, for instance, just ten companies are responsible for over forty percent of all plastic packaging waste.",
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "What approach does the group ultimately agree is most effective?",
          options: ["Only government regulation", "A combination of multiple strategies", "Focusing on consumer education alone", "Letting corporations self-regulate"],
          correctAnswer: 1,
          explanation: "Aisha says 'Perhaps the most effective approach is a combination of all these strategies' and Dr Williams agrees that 'Environmental problems require multi-faceted solutions.'",
          quoteFromTranscript: "AISHA: Perhaps the most effective approach is a combination of all these strategies: government regulation, corporate responsibility, infrastructure investment, and public education. No single solution will be sufficient on its own.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 7 created:", lesson29.title);

  // ─── Listening Lesson 8: Full listening test ───────────────────────
  const lesson30 = await prisma.lesson.create({
    data: {
      title: "Full listening test",
      category: "listening",
      durationMin: 40,
      isPremium: true,
      difficulty: "Hard",
      order: 30,
      prerequisiteLessonId: lesson29.id,
      theoryContent: `Full listening test — IELTS Listening bo'limining to'liq simulyatsiyasi bo'lib, unda siz 40 daqiqa ichida to'rt qismdan iborat testni bajarishingiz kerak. Har bir qismda 10 tadan savol mavjud bo'lib, jami 40 ta savolga javob berasiz.

IELTS Listening testining tuzilishi:
- Section 1: Ikki kishi o'rtasidagi kundalik mavzudagi suhbat (10 savol)
- Section 2: Bir kishining monologi (10 savol)
- Section 3: 2-4 kishi o'rtasidagi akademik suhbat (10 savol)
- Section 4: Bir kishining akademik ma'ruzasi (10 savol)

Full listening test uchun strategiyalar:
1) Har bir section boshlanishidan oldin savollarni o'qib chiqish uchun vaqt beriladi — bu vaqtdan unumli foydalaning;
2) Section 1 va 2 odatda Section 3 va 4 ga qaraganda osonroq;
3) Agar biror savolga javob topa olmasangiz, uni qoldirib, keyingi savolga o'ting;
4) Test oxirida javoblarni answer sheetga ko'chirish uchun 10 daqiqa beriladi.

Muhim: Imtihon paytida xotirjam bo'ling. Agar biror ma'lumotni eshitmasangiz, taxmin qiling — bo'sh qoldirishdan ko'ra javob yozish yaxshiroq.`,
      passageText: "A full IELTS listening practice test combining all four sections: a conversation about library membership, a museum tour announcement, an academic discussion about renewable energy, and a lecture on the history of astronomy.",
      transcriptText: `SECTION 1: Questions 1 to 10

LIBRARIAN: Good morning, City Central Library. How can I help you?
STUDENT: Hi, I'd like to apply for a library membership.
LIBRARIAN: Certainly. I'll just need to take some details. What's your name?
STUDENT: It's Priya Sharma.
LIBRARIAN: Could you spell that for me?
STUDENT: P-R-I-Y-A, S-H-A-R-M-A.
LIBRARIAN: Thank you. And your address?
STUDENT: 15 Oakwood Road, Bristol, BS8 2TY.
LIBRARIAN: How long have you lived at this address?
STUDENT: About two years.
LIBRARIAN: And what's your contact number?
STUDENT: 07984 562 113.
LIBRARIAN: Thank you. What type of membership would you like? We have standard membership which is free, and premium membership which costs thirty pounds per year and allows you to borrow up to fifteen items at a time.
STUDENT: I'll go with premium membership. I read a lot.
LIBRARIAN: Good choice. Here's your membership card. It's valid from today.

SECTION 2: Questions 11 to 20

Good afternoon and welcome to the Bristol Science Museum. I'm going to tell you about our main exhibitions and some housekeeping rules. On the ground floor, you'll find the Space Exploration Gallery, which includes a real rocket engine and interactive displays about the solar system. On the first floor is the Human Body exhibition, which features a walk-through heart model. Photography is allowed in all areas except the Space Gallery, where flash photography can damage sensitive equipment. The museum café is located on the ground floor, next to the main entrance. It serves light meals and refreshments until 4:30 PM. The museum is open from 9 AM to 6 PM daily.

SECTION 3: Questions 21 to 30

DR KHAN: Good morning, Mark and Lisa. Let's discuss your renewable energy project.
MARK: Thank you for meeting with us, Dr Khan. We've been comparing solar and wind energy for our case study.
LISA: We've found that solar energy is more suitable for residential areas because panels can be installed on rooftops. However, wind energy is more efficient in terms of energy output per unit of land.
DR KHAN: Those are good observations. Have you considered the cost factor?
MARK: Yes. The initial installation cost for solar panels has dropped significantly, but wind turbines still require substantial investment. We're planning to present both options with a cost-benefit analysis.
DR KHAN: Excellent. Remember to include data from at least three different countries in your analysis. Your presentation is in two weeks, correct?
LISA: Yes, we'll have everything ready by then.

SECTION 4: Questions 31 to 40

Today's lecture is about the history of astronomy, from ancient observations to modern space exploration. The earliest recorded astronomical observations date back to ancient Mesopotamia around 3500 BCE, where priests used the stars to predict seasonal changes. The Greeks made significant contributions, with Ptolemy proposing a geocentric model in the second century CE that placed Earth at the centre of the universe. This model was widely accepted for over fourteen hundred years, until Copernicus proposed his heliocentric model in 1543. The invention of the telescope by Galileo in 1609 revolutionised astronomy, allowing scientists to observe celestial bodies in unprecedented detail. Today, the Hubble Space Telescope, launched in 1990, has provided images of galaxies billions of light-years away, transforming our understanding of the universe. Modern telescopes, such as the James Webb Space Telescope, launched in 2021, continue to push the boundaries of human knowledge.`,
      tipsAndTricks: `1. To'liq testni bajarishda vaqtni to'g'ri taqsimlang. Har bir section uchun taxminan 10 daqiqa ajrating. Savollarni oldindan o'qib chiqish va javoblarni tekshirish uchun vaqt qoldiring.
2. Section 1 va 2 da ma'lumotlar to'g'ridan-to'g'ri beriladi, Section 3 va 4 da esa murakkabroq tuzilmalar va sinonimlar ishlatiladi.
3. Imtihon oxirida answer sheetga javoblarni ko'chirishda imlo xatolariga yo'l qo'ymang.`,
      commonMistakes: `1. Bir sectionga juda ko'p vaqt sarflash va boshqa sectionlarga vaqt yetmay qolish.
2. Answer sheetga javoblarni noto'g'ri ko'chirish — savol raqami va javobni to'g'ri joyga yozing.
3. Imtihon paytida stressga berilish va diqqatni yo'qotish. Chuqur nafas oling va davom eting.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "form-completion",
          question: "What is the student's surname in Section 1?",
          options: ["Sharma", "Shama", "Sharmar", "Sharma"],
          correctAnswer: 0,
          explanation: "The student spells her name 'P-R-I-Y-A, S-H-A-R-M-A'.",
          quoteFromTranscript: "STUDENT: It's Priya Sharma. ... STUDENT: P-R-I-Y-A, S-H-A-R-M-A.",
        },
        {
          id: 2,
          type: "form-completion",
          question: "What is the student's postcode in Section 1?",
          options: ["BS8 2TY", "BS8 2YT", "BS8 2YT", "BS8 2TY"],
          correctAnswer: 0,
          explanation: "The student gives her address as '15 Oakwood Road, Bristol, BS8 2TY.'",
          quoteFromTranscript: "STUDENT: 15 Oakwood Road, Bristol, BS8 2TY.",
        },
        {
          id: 3,
          type: "form-completion",
          question: "How much does premium membership cost per year?",
          options: ["£20", "£25", "£30", "£35"],
          correctAnswer: 2,
          explanation: "The librarian says 'premium membership costs thirty pounds per year.'",
          quoteFromTranscript: "LIBRARIAN: We have standard membership which is free, and premium membership which costs thirty pounds per year and allows you to borrow up to fifteen items at a time.",
        },
        {
          id: 4,
          type: "multiple-choice",
          question: "In which gallery is photography not allowed?",
          options: ["Human Body exhibition", "Space Exploration Gallery", "Main entrance area", "The café"],
          correctAnswer: 1,
          explanation: "The tour guide says 'Photography is allowed in all areas except the Space Gallery, where flash photography can damage sensitive equipment.'",
          quoteFromTranscript: "SECTION 2: Photography is allowed in all areas except the Space Gallery, where flash photography can damage sensitive equipment.",
        },
        {
          id: 5,
          type: "multiple-choice",
          question: "According to Lisa, which energy type is more suitable for residential areas?",
          options: ["Wind energy", "Solar energy", "Hydroelectric energy", "Nuclear energy"],
          correctAnswer: 1,
          explanation: "Lisa says 'We've found that solar energy is more suitable for residential areas because panels can be installed on rooftops.'",
          quoteFromTranscript: "LISA: We've found that solar energy is more suitable for residential areas because panels can be installed on rooftops.",
        },
        {
          id: 6,
          type: "multiple-choice",
          question: "When was the Hubble Space Telescope launched?",
          options: ["1986", "1990", "2001", "2021"],
          correctAnswer: 1,
          explanation: "The lecture says 'the Hubble Space Telescope, launched in 1990, has provided images of galaxies billions of light-years away.'",
          quoteFromTranscript: "SECTION 4: Today, the Hubble Space Telescope, launched in 1990, has provided images of galaxies billions of light-years away, transforming our understanding of the universe.",
        },
      ]),
    },
  });
  console.log("Listening Lesson 8 created:", lesson30.title);

  // ═══════════════════════════════════════════════════════════════════
  // SPEAKING LESSONS
  // ═══════════════════════════════════════════════════════════════════

  // ─── Speaking Lesson 1: Part 1 - Introduction ─────────────────────
  const lesson31 = await prisma.lesson.create({
    data: {
      title: "Part 1 - Introduction",
      category: "speaking",
      durationMin: 20,
      isPremium: false,
      difficulty: "Easy",
      order: 31,
      prerequisiteLessonId: lesson30.id,
      theoryContent: `IELTS Speaking imtihonining Part 1 qismi 4-5 daqiqa davom etadi va unda sizga o'zingiz, uyingiz, ishingiz, qiziqishlaringiz va kundalik hayotingiz haqida umumiy savollar beriladi. Bu qism imtihonning eng oson qismi hisoblanadi, chunki mavzular tanish va oldindan tayyorgarlik ko'rish mumkin.

Part 1 da muvaffaqiyatli bo'lish uchun quyidagi jihatlarga e'tibor bering:
1) To'liq jumlalar bilan javob bering — "Yes" yoki "No" degan qisqa javoblar yetarli emas;
2) Har bir savolga 2-3 jumla bilan javob bering;
3) Javoblaringizni misollar bilan boyiting;
4) Tabiiy va ravon gapiring, yodlab olingan javoblarni aytmang.

Part 1 da beriladigan savollar odatda quyidagi mavzularni o'z ichiga oladi: work/study, home/accommodation, hobbies/interests, food, travel, family, friends, weather, music, reading, television, sport. Har bir mavzuga oldindan tayyorgarlik ko'rish tavsiya etiladi.

Muhim: Part 1 da sizning shaxsiy ma'lumotlaringiz va fikrlaringiz so'raladi, shuning uchun haqiqiy hayotingiz haqida gapiring. Yolg'on ma'lumot berish eslab qolish qiyin va tabiiy bo'lmaydi.`,
      passageText: `Part 1 - Introduction Questions:
Questions: ["What is your name?", "Where are you from?", "Do you work or study?", "What do you like about your job/studies?", "Tell me about your hometown.", "What do you usually do in your free time?"]`,
      tipsAndTricks: `1. Har bir savolga to'liq jumla bilan javob bering. Masalan: "What is your name?" — "My name is Akhmed, but my friends usually call me Akhmed." Bu sizning grammatik range ballingizni oshiradi.
2. Javoblaringizni kengaytiring: sabab va misollar qo'shing. "I like reading because it helps me relax after a long day. For instance, I'm currently reading a book about history."
3. Tabiiy intonatsiya bilan gapiring. Yodlab olingan javoblar sun'iy eshitiladi. Agar biror so'zni unutib qo'ysangiz, "Let me think..." yoki "That's an interesting question" kabi iboralarni ishlating.`,
      commonMistakes: `1. Juda qisqa javob berish. "Yes" yoki "No" degan bir so'zli javoblar ballingizni pasaytiradi. Har doim javobingizni kengaytiring.
2. Yodlab olingan javoblarni aytish. Examinerlar yodlab olingan javoblarni darhol sezadi va bu Fluency ballingizga salbiy ta'sir qiladi.
3. Mavzudan chetga chiqish. Savolga to'g'ridan-to'g'ri javob bering va keraksiz detallarga berilmang.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `My full name is Akhmed Karimov, but most people simply call me Akhmed. I was born and raised in Tashkent, which is the capital city of Uzbekistan, and I have lived there for most of my life.

Currently, I am a third-year university student studying International Relations at the University of World Economy and Diplomacy. I chose this field because I have always been fascinated by how countries interact with each other and the complexities of global politics. What I enjoy most about my studies is the opportunity to analyse real-world situations and understand the historical context behind current events. For example, last semester we had a fascinating module on diplomatic negotiations, where we simulated United Nations sessions, which was both challenging and incredibly rewarding.

Regarding my hometown, Tashkent is a vibrant and modern city with a rich history. It is known for its wide tree-lined streets, beautiful architecture, and numerous parks. One of the things I love most about Tashkent is the blend of old and new — you can find ancient madrasas alongside modern shopping centres. The city has a population of over two and a half million people, and it is the cultural and economic hub of Uzbekistan.

In my free time, I enjoy reading books, particularly historical fiction and non-fiction. I also like playing football with my friends on weekends, as it helps me stay active and socialise at the same time. Additionally, I have recently taken up photography, and I enjoy capturing the beautiful architecture of my city.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 1 created:", lesson31.title);

  // ─── Speaking Lesson 2: Part 1 - Common topics ────────────────────
  const lesson32 = await prisma.lesson.create({
    data: {
      title: "Part 1 - Common topics",
      category: "speaking",
      durationMin: 25,
      isPremium: false,
      difficulty: "Easy",
      order: 32,
      prerequisiteLessonId: lesson31.id,
      theoryContent: `Part 1 da eng ko'p uchraydigan mavzularni oldindan o'rganish va ularga tayyorgarlik ko'rish sizning imtihondagi ishonchingizni oshiradi. Eng keng tarqalgan mavzular: work/study, home/accommodation, hobbies, food, travel, weather, music, reading, television, sport, family, friends, technology, environment, celebrations.

Har bir mavzu uchun quyidagi tayyorgarlikni bajarish tavsiya etiladi:
1) Mavzuga oid asosiy lug'at (vocabulary) o'rganing;
2) Har bir mavzu bo'yicha 3-4 ta savolga javob tayyorlang;
3) Javoblaringizda turli grammatik tuzilmalarni ishlating (Present Simple, Present Perfect, Past Simple, Future);
4) Fikrlaringizni sabab va misollar bilan boyiting.

Masalan, "food" mavzusi uchun: "I absolutely love Uzbek cuisine, particularly plov, which is our national dish. What I enjoy most about it is the combination of flavours and the fact that it brings families together during special occasions. I also enjoy trying different international cuisines — Italian and Japanese food are among my favourites."

Muhim: Part 1 imtihonning eng boshida bo'lgani uchun, bu qism sizning imtihon haqidagi birinchi taassurotingizni shakllantiradi. Agar Part 1 ni yaxshi boshlasangiz, keyingi qismlar uchun ishonchingiz ortadi.`,
      passageText: `Part 1 - Common Topics Questions:
Questions: ["What kind of food do you like?", "Do you like cooking?", "What is your favourite type of weather?", "Do you prefer hot or cold weather?", "What kind of music do you enjoy?", "Do you play any musical instruments?", "Do you like watching television?", "What is your favourite type of TV programme?"]`,
      tipsAndTricks: `1. Mavzu bo'yicha lug'at boyligingizni ko'rsating. "Food" mavzusida: delicious, flavourful, aromatic, savoury, spicy, nutritious, homemade, traditional, cuisine, dish.
2. Turli zamonlarni ishlating: "I usually eat..." (Present Simple), "I have recently tried..." (Present Perfect), "When I was a child, I used to eat..." (Past Simple).
3. Javoblaringizni shaxsiylashtiring — haqiqiy hayotingizdan misollar keltiring. Bu sizning javoblaringizni tabiiy va ishonarli qiladi.`,
      commonMistakes: `1. Bir xil so'zlarni takrorlash. "I like", "I like", "I like" o'rniga "I enjoy", "I am fond of", "I am passionate about" kabi turli iboralarni ishlating.
2. Faqat hozirgi zamonda gapirish. Turli zamonlarni ishlatish Grammatical Range ballingizni oshiradi.
3. Javoblarni juda uzun qilish. Part 1 da har bir javob 2-4 jumla bo'lishi kerak, 5 jumladan oshmasligi kerak.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `When it comes to food, I am particularly fond of Uzbek cuisine, especially plov, which is our traditional rice dish cooked with meat, carrots, and aromatic spices. What I love about it is the rich flavour and the way it brings families together during celebrations. My mother makes the best plov, and every time I visit home, she prepares it for me. I also enjoy exploring international cuisines — Italian pasta and Japanese sushi are among my favourites because they offer completely different taste experiences.

Regarding weather, I definitely prefer hot weather over cold. I find that warm, sunny days boost my mood and make me more productive. Summer is my favourite season because I can spend time outdoors, go swimming, and enjoy long evenings with friends. Although I appreciate the beauty of autumn leaves, I find cold winter days quite challenging, especially when the temperature drops below zero.

As for music, I enjoy a wide variety of genres, but my favourite is pop music. I find it upbeat and energetic, which helps me stay motivated while studying or working out. I also listen to traditional Uzbek music occasionally, as it connects me to my cultural roots. I do not play any musical instruments, although I have always wanted to learn the piano. Perhaps I will take lessons in the future when I have more free time.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 2 created:", lesson32.title);

  // ─── Speaking Lesson 3: Part 2 - Cue card tahlili ──────────────────
  const lesson33 = await prisma.lesson.create({
    data: {
      title: "Part 2 - Cue card tahlili",
      category: "speaking",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 33,
      prerequisiteLessonId: lesson32.id,
      theoryContent: `Part 2 — IELTS Speaking imtihonining "Long Turn" qismi bo'lib, unda sizga bir mavzu beriladi (cue card) va siz 1-2 daqiqa davomida shu mavzu haqida gapirishingiz kerak. Tayyorgarlik uchun 1 daqiqa vaqt beriladi.

Cue card odatda quyidagi tuzilishga ega:
Describe [a person/place/object/event/experience]
You should say:
- what it is/was
- where it is/was
- when it happened
- and explain why it is important to you or how you feel about it.

Cue card tahlili uchun strategiyalar:
1) 1 daqiqa tayyorgarlik vaqtidan unumli foydalaning — kalit so'zlarni yozib oling;
2) Javobingizni 4 qismga bo'ling: introduction, description, details, feelings/opinion;
3) Cue card dagi barcha nuqtalarga javob bering;
4) Agar cue card dagi barcha nuqtalarga javob berib bo'lsangiz va vaqt qolsa, qo'shimcha ma'lumot qo'shing — misol, sabab, natija.

Part 2 da muvaffaqiyatli bo'lish uchun:
- Structure: aniq tuzilma bilan gapiring;
- Fluency: ravon gapiring, pauzalarni kamaytiring;
- Vocabulary: mavzuga oid so'zlarni ishlating;
- Grammar: turli grammatik tuzilmalarni qo'llang.`,
      passageText: `Cue Card 1: Describe a book that you have read recently.
You should say:
- what the book was called
- what genre it was
- what it was about
- and explain why you enjoyed reading it.

Cue Card 2: Describe a memorable trip you have taken.
You should say:
- where you went
- who you went with
- what you did there
- and explain why this trip was memorable.

Cue Card 3: Describe a person who has influenced you.
You should say:
- who this person is
- how you know them
- what qualities they have
- and explain how they have influenced you.`,
      tipsAndTricks: `1. 1 daqiqa tayyorgarlik vaqtida cue card dagi har bir nuqta uchun 2-3 kalit so'z yozib oling. Bu sizga gapirish paytida yo'nalish beradi.
2. Javobingizni tabiiy ravishda tuzing: "I'd like to talk about..." bilan boshlang va "I chose this topic because..." bilan davom eting.
3. Vaqtingizni to'g'ri taqsimlang: introduction (15-20 soniya), asosiy qism (60-80 soniya), xulosa (15-20 soniya).`,
      commonMistakes: `1. Cue card dagi barcha nuqtalarni birma-bir sanab chiqish. Bu tabiiy eshitilmaydi. Nuqtalarni tabiiy ravishda hikoya ichida birlashtiring.
2. Vaqtni to'g'ri taqsimlamaslik — bir nuqtaga juda ko'p vaqt sarflash va boshqa nuqtalarni aytishga vaqt topolmaslik.
3. Javobni yodlab olish. Examinerlar yodlab olingan javoblarni darhol payqaydi. Tabiiy va spontan gapiring.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer - Cue Card 1: Book",
          correctAnswer: 0,
          explanation: `I would like to talk about a book that I have recently read, which is titled "Sapiens: A Brief History of Humankind" by Yuval Noah Harari. It is a non-fiction book that explores the history of human civilisation, from the Stone Age to the modern era.

The book covers three major revolutions that shaped our species: the Cognitive Revolution, which enabled humans to communicate and cooperate in large groups; the Agricultural Revolution, which transformed nomadic societies into settled communities; and the Scientific Revolution, which gave rise to modern technology and globalisation. What I found most fascinating was the author's ability to connect historical events and show how they have influenced the way we live today.

I thoroughly enjoyed reading this book for several reasons. Firstly, it challenged many assumptions I had about human history and made me see the world from a completely different perspective. For instance, Harari argues that the Agricultural Revolution was actually a trap for humanity rather than a progress, which was a mind-opening idea for me. Secondly, the book is written in a very engaging style — despite dealing with complex topics, the language is accessible and the narrative is compelling. I found myself unable to put it down and finished it within a week.

I would highly recommend this book to anyone who is curious about human history and wants to understand how we became the dominant species on the planet. It has definitely changed the way I think about the world.`,
          options: [""],
        },
        {
          id: 2,
          type: "model-answer",
          question: "Model Answer - Cue Card 2: Trip",
          correctAnswer: 0,
          explanation: `I would like to describe a memorable trip that I took to Samarkand last summer. Samarkand is one of the most historic cities in Uzbekistan, famous for its stunning Islamic architecture and rich cultural heritage. I went there with two of my close friends, and we spent three days exploring the city.

We visited several iconic landmarks, including the Registan Square, which is a magnificent ensemble of three madrasas with intricate blue tilework, and the Shah-i-Zinda necropolis, which is a stunning avenue of mausoleums. We also tried the local cuisine, and I must say that Samarkand's non (bread) and shashlik were absolutely delicious. One of the highlights of the trip was watching the sunset from the observatory of Ulugh Beg, the famous 15th-century astronomer.

This trip was particularly memorable for several reasons. Firstly, it was my first time visiting Samarkand, and the city exceeded all my expectations. The architecture was even more breathtaking in person than in photographs. Secondly, travelling with my friends made the experience much more enjoyable — we shared so many laughs and created memories that we still talk about. Finally, the trip gave me a deeper appreciation for my country's history and cultural heritage. I returned home feeling inspired and proud to be Uzbek.

I would definitely recommend visiting Samarkand to anyone who has the opportunity. It is a truly magical place.`,
          options: [""],
        },
        {
          id: 3,
          type: "model-answer",
          question: "Model Answer - Cue Card 3: Influential person",
          correctAnswer: 0,
          explanation: `The person who has had the greatest influence on my life is my father. He is a teacher by profession and has been working at a secondary school in our neighbourhood for over thirty years. I have known him my entire life, of course, but it is only in recent years that I have fully come to appreciate his impact on my character and values.

My father possesses several qualities that I deeply admire. He is incredibly patient and never raises his voice, even in difficult situations. He is also hardworking — I have seen him wake up early every morning to prepare for his classes, and he often spends his evenings grading papers and planning lessons. Despite his busy schedule, he always makes time for family. He taught me the importance of honesty, integrity, and treating everyone with respect, regardless of their background.

My father has influenced me in countless ways. He instilled in me a love for learning from a very young age — he would read to me every night and encourage me to ask questions about everything. It was because of him that I developed a curiosity about the world and a passion for education. He also taught me the value of hard work and perseverance. Whenever I face a challenge, I think about how my father would handle it, and that gives me strength. In many ways, I have chosen my career path in education because of his example. I hope that one day I can be as good a role model to others as he has been to me.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 3 created:", lesson33.title);

  // ─── Speaking Lesson 4: Part 2 - Time management ──────────────────
  const lesson34 = await prisma.lesson.create({
    data: {
      title: "Part 2 - Time management",
      category: "speaking",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 34,
      prerequisiteLessonId: lesson33.id,
      theoryContent: `Part 2 da vaqtni to'g'ri boshqarish juda muhim, chunki siz 1-2 daqiqa davomida to'xtovsiz gapirishingiz kerak. Agar juda tez gapirsangiz, vaqt yetmay qolishi mumkin; agar juda sekin gapirsangiz, examiner sizni to'xtatishi mumkin.

Vaqtni boshqarish strategiyalari:
1) Tayyorgarlik vaqti (1 daqiqa): Cue card dagi har bir nuqta uchun kalit so'zlar yozing. 4 nuqta bo'lsa, har biriga 15 soniya ajrating.
2) Introduction (15-20 soniya): "I'd like to talk about..." bilan boshlang va mavzuni tanishtiring.
3) Asosiy qism (60-80 soniya): Cue card dagi nuqtalarni batafsil tushuntiring. Har bir nuqta uchun 15-20 soniya.
4) Xulosa (15-20 soniya): Nima uchun bu mavzuni tanlaganingizni tushuntiring va umumiy xulosa bering.

Agar vaqt qolsa, qo'shimcha ma'lumot qo'shing:
- Misollar keltiring: "For instance...", "For example..."
- Sabablarni tushuntiring: "This is because..."
- Natijalarni ayting: "As a result..."
- Taqqoslash qiling: "Compared to..."

Muhim: 2 daqiqa gapirish ko'pchilik uchun qiyin, shuning uchun muntazam mashq qilish kerak. Uyda taymer bilan mashq qiling va har safar 1.5-2 daqiqa gapirishga harakat qiling.`,
      passageText: `Cue Card 1: Describe a skill you would like to learn.
You should say:
- what skill it is
- why you want to learn it
- how you plan to learn it
- and explain how this skill would benefit you.

Cue Card 2: Describe a festival that is important in your country.
You should say:
- when this festival is celebrated
- how people celebrate it
- what special food is eaten
- and explain why this festival is important.

Cue Card 3: Describe a piece of technology you use frequently.
You should say:
- what it is
- how often you use it
- what you use it for
- and explain why it is important to you.`,
      tipsAndTricks: `1. Agar fikringiz tugab qolsa va vaqt hali bor bo'lsa, "I'd also like to add that..." yoki "Another point worth mentioning is..." kabi iboralarni ishlating.
2. Javobingizni jonli qilish uchun his-tuyg'ularingizni qo'shing: "I was absolutely thrilled when...", "It was a truly unforgettable experience..."
3. Tayyorgarlik vaqtida faqat kalit so'zlar yozing, to'liq jumlalar yozishga vaqt sarflamang.`,
      commonMistakes: `1. Juda tez gapirish. Bu nafaqat vaqtni noto'g'ri boshqarishga, balki talaffuzning tushunarsiz bo'lishiga olib keladi. Normal sur'atda gapiring.
2. Juda sekin gapirish yoki uzoq pauzalar qilish. Agar fikr topa olmasangiz, "That's an interesting question, let me think..." kabi iboralardan foydalaning.
3. Tayyorgarlik vaqtida to'liq javob yozishga urinish. 1 daqiqa ichida to'liq javob yozish mumkin emas, faqat kalit so'zlar yozing.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer - Cue Card 1: Skill",
          correctAnswer: 0,
          explanation: `I would like to talk about a skill that I am very keen to learn, which is playing the guitar. I have always been fascinated by musical instruments, and the guitar, in particular, has captured my attention because of its versatility — it is used in almost every genre of music, from classical to rock to pop.

There are several reasons why I want to learn this skill. Firstly, I believe that learning to play a musical instrument is a wonderful way to express creativity and emotions. Whenever I listen to guitar music, I feel inspired and wish I could create such beautiful sounds myself. Secondly, playing the guitar would allow me to connect with other musicians and perhaps even perform in front of an audience, which is something I have always dreamed of doing. Finally, I think it is a practical skill that can bring joy to myself and others.

My plan to learn the guitar involves several steps. Initially, I intend to take online lessons through platforms such as YouTube and specialised apps like Yousician, which offer structured courses for beginners. I also plan to practice for at least thirty minutes every day to build muscle memory and develop my skills gradually. Once I have mastered the basics, I would like to take in-person lessons from a professional teacher to refine my technique.

This skill would benefit me in numerous ways. Musically, it would allow me to play my favourite songs and even compose my own music. Personally, it would give me a sense of accomplishment and a creative outlet for stress relief. Socially, it would help me connect with like-minded people and potentially join a band. Overall, I am very excited about this journey.`,
          options: [""],
        },
        {
          id: 2,
          type: "model-answer",
          question: "Model Answer - Cue Card 2: Festival",
          correctAnswer: 0,
          explanation: `I would like to talk about an important festival in my country, Uzbekistan, which is Navruz. Navruz, which means "New Day" in Persian, is celebrated on the twenty-first of March, marking the beginning of spring and the Persian New Year. It has been celebrated for over three thousand years and is recognised by UNESCO as an Intangible Cultural Heritage of Humanity.

During Navruz, people engage in various traditions and celebrations. One of the most important customs is visiting family and friends — people travel across the country to reunite with their loved ones. It is also common to forgive past grievances and start the new year with a clean slate. Communities organise public celebrations featuring music, dancing, and traditional sports such as kurash, which is Uzbek wrestling. Children often receive new clothes and small gifts.

The most iconic dish prepared during Navruz is sumalak, a sweet paste made from wheat sprouts that is cooked for over twenty-four hours. The preparation of sumalak is a communal activity — neighbours and relatives gather around a large cauldron, taking turns to stir the mixture while singing traditional songs. Other traditional dishes include plov, samsa, and various types of bread.

Navruz is extremely important to Uzbek people for several reasons. It represents renewal, hope, and the triumph of light over darkness. It is a time when families come together, strengthen their bonds, and celebrate their cultural heritage. For me personally, Navruz is the most anticipated holiday of the year because it brings back wonderful childhood memories of visiting my grandparents and enjoying delicious food with my extended family.`,
          options: [""],
        },
        {
          id: 3,
          type: "model-answer",
          question: "Model Answer - Cue Card 3: Technology",
          correctAnswer: 0,
          explanation: `I would like to talk about a piece of technology that I use frequently, which is my smartphone. It is an iPhone that I purchased about two years ago, and I honestly cannot imagine my life without it now. I use it practically every waking hour for a wide variety of purposes.

Firstly, I use my smartphone for communication. I make calls, send text messages, and use messaging apps like Telegram and WhatsApp to stay in touch with my family and friends. Since many of my relatives live in different cities, video calls have become an essential way for us to maintain close relationships. Secondly, I use it for studying and work. I have several educational apps installed, including dictionary apps, note-taking applications, and online course platforms that allow me to learn new skills on the go. I also check my email regularly and use calendar apps to manage my schedule. Thirdly, I use my smartphone for entertainment — I listen to music on Spotify, watch videos on YouTube, and play occasional games to relax.

My smartphone is important to me for many reasons. On a practical level, it serves as my camera, alarm clock, navigation system, and wallet all in one device. It saves me time and makes my daily life more convenient. On a deeper level, it connects me to the world — I can access news from anywhere, learn about different cultures, and stay updated on current events. Perhaps most importantly, it allows me to stay connected with the people I care about, regardless of distance. In today's fast-paced world, my smartphone is not just a device; it is an indispensable tool that enhances almost every aspect of my life.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 4 created:", lesson34.title);

  // ─── Speaking Lesson 5: Part 3 - Discussion ────────────────────────
  const lesson35 = await prisma.lesson.create({
    data: {
      title: "Part 3 - Discussion",
      category: "speaking",
      durationMin: 30,
      isPremium: true,
      difficulty: "Hard",
      order: 35,
      prerequisiteLessonId: lesson34.id,
      theoryContent: `Part 3 — IELTS Speaking imtihonining eng murakkab qismi bo'lib, 4-5 daqiqa davom etadi. Bu qismda examiner siz bilan Part 2 mavzusi bilan bog'liq abstrakt va murakkab savollarni muhokama qiladi. Bu yerda sizdan keng qamrovli fikrlash, tahlil qilish va o'z fikringizni himoya qilish qobiliyati talab qilinadi.

Part 3 da beriladigan savol turlari:
1) Opinion questions: "What do you think about...?"
2) Compare and contrast: "What are the differences between...?"
3) Cause and effect: "What are the causes of...?" / "What are the effects of...?"
4) Future predictions: "How do you think this will change in the future?"
5) Problem/Solution: "What problems does this cause?" / "How can this be solved?"
6) Evaluation: "Do you think this is a positive or negative development?"

Part 3 da yuqori ball olish uchun:
- Abstract fikrlash qobiliyatingizni ko'rsating;
- Javoblaringizni tahlil va misollar bilan boyiting;
- Turli nuqtai nazarlarni ko'rib chiqing;
- Agar kerak bo'lsa, o'z fikringizni himoya qiling.`,
      passageText: `Part 3 - Discussion Questions:
Discussion questions: ["What are the benefits of reading books compared to watching television?", "Do you think people read less nowadays than in the past? Why?", "How has technology changed the way people access information?", "What role do libraries play in modern society?", "Do you think traditional books will disappear in the future?", "How can parents encourage children to read more?"]`,
      tipsAndTricks: `1. Javoblaringizni tahlil bilan boyiting. "There are several reasons for this. Firstly..." strukturasi bilan javob bering.
2. Turli nuqtai nazarlarni muhokama qiling: "On the one hand... On the other hand..."
3. Misollar keltirishni unutmang: "For example, in my country..." yoki "Take the example of..."
4. Kelajak haqida prognozlar bering: "I believe that in the future..."`,
      commonMistakes: `1. Juda qisqa javob berish. Part 3 da har bir savolga 4-6 jumla bilan javob berish kerak. Faqat "Yes" yoki "No" deyish yetarli emas.
2. Shaxsiy fikrdan tashqariga chiqa olmaslik. Part 3 abstrakt fikrlashni talab qiladi — jamiyat, iqtisodiyot, madaniyat darajasida fikr yuriting.
3. Savolni noto'g'ri tushunish. Agar savolni tushunmasangiz, "Could you please rephrase the question?" deb so'rashingiz mumkin.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `There are several significant benefits of reading books compared to watching television, and I believe the differences are quite profound. Firstly, reading is a much more active mental process. When you read, your brain is actively engaged in decoding text, visualising scenes, and constructing meaning. This stimulates cognitive functions such as critical thinking, imagination, and concentration. Television, by contrast, is largely a passive activity — images and sounds are presented to you, requiring minimal mental effort. Research has shown that regular reading improves vocabulary, writing skills, and analytical thinking, whereas excessive television watching has been linked to reduced attention spans.

Secondly, reading allows for deeper engagement with content. A book can explore complex ideas, character development, and nuanced arguments over hundreds of pages, giving the reader time to reflect and absorb the material. Television programmes, even high-quality ones, are constrained by time limits and often simplify content to maintain viewer engagement. Furthermore, books offer a more personalised experience — the pace of reading is controlled by the reader, who can pause, re-read passages, and reflect on ideas. This depth of engagement is particularly valuable for educational purposes.

However, I should acknowledge that television has its own advantages. It can present information visually, which is helpful for understanding certain topics, and it can reach a wider audience, including people who may struggle with reading. In my opinion, the ideal approach is a balanced one — both reading and television can complement each other. For example, reading a book and then watching a documentary on the same topic can provide a richer understanding than either medium alone. Ultimately, I believe that reading offers more substantial cognitive benefits, but both forms of media have their place in modern society.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 5 created:", lesson35.title);

  // ─── Speaking Lesson 6: Fluency va Coherence ──────────────────────
  const lesson36 = await prisma.lesson.create({
    data: {
      title: "Fluency va Coherence",
      category: "speaking",
      durationMin: 25,
      isPremium: true,
      difficulty: "Hard",
      order: 36,
      prerequisiteLessonId: lesson35.id,
      theoryContent: `Fluency va Coherence — IELTS Speaking baholash mezonlaridan eng muhim ikkitasi. Fluency — bu sizning qanchalik ravon, tabiiy va to'xtovsiz gapirishingiz. Coherence — bu sizning fikrlaringiz qanchalik mantiqiy va tushunarli tarzda bog'langanligi.

Fluency ni oshirish uchun:
1) Pauzalarni kamaytiring — "ummm", "ahh", "err" kabi to'ldiruvchi so'zlarni ishlatmang;
2) Fikrlash vaqti kerak bo'lsa, "That's an interesting question", "Let me think about that for a moment" kabi iboralarni ishlating;
3) Javoblaringizni oldindan tayyorlangan struktura bilan bering;
4) Muntazam ravishda ingliz tilida gapirishni mashq qiling.

Coherence ni oshirish uchun:
1) Diskurs belgilaridan (discourse markers) foydalaning:
   - Fikr qo'shish: "Furthermore", "Moreover", "In addition"
   - Qarama-qarshilik: "However", "On the other hand", "Although"
   - Sabab-natija: "Therefore", "Consequently", "As a result"
   - Misol: "For instance", "For example", "Such as"
2) Javoblaringizni mantiqiy ketma-ketlikda tuzing;
3) Har bir javobda aniq bir asosiy fikrga e'tibor qarating.`,
      passageText: `Part 3 - Discussion Questions:
Discussion questions: ["How has education changed in your country over the past few decades?", "What are the advantages and disadvantages of online learning?", "Do you think traditional classroom education will disappear in the future?", "What makes a good teacher?", "How can technology be used to improve education?"]`,
      tipsAndTricks: `1. Discourse markers ni tabiiy ishlating. Har bir jumlada ishlatish shart emas — faqat kerakli joylarda qo'llang.
2. Agar fikringizni yo'qotib qo'ysangiz, vahima qilmang. "Where was I? Oh yes..." yoki "Coming back to the main point..." kabi iboralarni ishlating.
3. Javob berishdan oldin 1-2 soniya o'ylang. Bu sizga fikringizni tuzishga yordam beradi.`,
      commonMistakes: `1. Juda ko'p pauza qilish va "ummm", "err" kabi tovushlar chiqarish. Bu Fluency ballingizni sezilarli darajada pasaytiradi.
2. Discourse markers ni noto'g'ri ishlatish. Masalan, "on the contrary" ni "on the other hand" o'rnida ishlatish.
3. Javobni boshidan oxirigacha yodlab olish. Bu coherence ga zarar keltiradi, chunki yodlab olingan javoblar tabiiy eshitilmaydi.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `Education in my country, Uzbekistan, has undergone significant transformation over the past few decades, and I would say the changes have been largely positive. Firstly, there has been a major shift towards modernising the curriculum. When my parents were at school, the education system was heavily focused on rote memorisation and theoretical knowledge, with limited emphasis on critical thinking or practical skills. Nowadays, schools are increasingly adopting interactive teaching methods, encouraging students to ask questions, work in groups, and develop problem-solving abilities.

In addition, technology has played a transformative role in education. When I was in primary school, computers were a rarity and internet access was limited. Today, most schools are equipped with computer labs, interactive whiteboards, and high-speed internet connections. Students have access to online resources, educational videos, and digital libraries, which have made learning more engaging and accessible. Furthermore, the government has invested heavily in higher education, establishing new universities and offering scholarships for students to study abroad.

However, there are still challenges that need to be addressed. One significant issue is the disparity between urban and rural education. Schools in cities like Tashkent generally have better facilities, more qualified teachers, and greater access to resources compared to rural schools. Another concern is that the examination system still places too much emphasis on memorisation rather than critical thinking, which can limit students' creativity. Nevertheless, I believe the overall direction of change is positive, and with continued investment and reform, the education system will continue to improve. In conclusion, education in Uzbekistan has come a long way, and while challenges remain, the future looks promising.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 6 created:", lesson36.title);

  // ─── Speaking Lesson 7: Pronunciation ──────────────────────────────
  const lesson37 = await prisma.lesson.create({
    data: {
      title: "Pronunciation",
      category: "speaking",
      durationMin: 20,
      isPremium: true,
      difficulty: "Medium",
      order: 37,
      prerequisiteLessonId: lesson36.id,
      theoryContent: `Pronunciation — IELTS Speaking baholash mezonlaridan biri bo'lib, sizning talaffuz qobiliyatingizni baholaydi. Bu faqat tovushlarni to'g'ri talaffuz qilish emas, balki intonatsiya, stress va ritmni ham o'z ichiga oladi.

Pronunciation ning 4 komponenti:
1) Individual sounds (tovushlar): Ingliz tilidagi alohida tovushlarni to'g'ri talaffuz qilish. O'zbek tilida yo'q tovushlarga alohida e'tibor bering: /θ/ (think), /ð/ (this), /w/ (water), /ŋ/ (sing).
2) Word stress (so'z urg'usi): Ko'p bo'g'inli so'zlarda to'g'ri bo'g'inni urg'ulash. Masalan: PHOtograph, phoTOGraphy, photoGRAphic.
3) Sentence stress (jumla urg'usi): Jumlada muhim so'zlarni urg'ulash. "I DIDN'T say he stole the money" va "I didn't say HE stole the money" turli ma'nolarni anglatadi.
4) Intonation (intonatsiya): Ovozning ko'tarilishi va pasayishi. Savollarda ovoz ko'tariladi, gaplarda pasayadi.

Pronunciation ni oshirish uchun:
- Ingliz tilidagi video va audiolarni tinglang va takrorlang (shadowing);
- Ovoz yozib oling va o'zingizni tinglang;
- Og'zaki nutqni muntazam mashq qiling.`,
      passageText: `Part 1 - Pronunciation Practice Questions:
Questions: ["What is your favourite colour?", "Do you like art?", "What kind of art do you prefer?", "Have you ever visited an art gallery?", "Do you think art is important in education?", "Would you like to be an artist?"]`,
      tipsAndTricks: `1. Shadowing texnikasini qo'llang: Ingliz tilidagi audio yozuvni tinglang va bir vaqtning o'zida takrorlang. Bu sizning talaffuz, intonatsiya va ritmingizni yaxshilaydi.
2. Ovozingizni yozib oling va o'zingizni tinglang. Sizning talaffuz qilishingiz qanday eshitilishini bilib olishingiz muhim.
3. "Th" tovushlariga alohida e'tibor bering: "think" (θ) va "this" (ð) tovushlarini mashq qiling.`,
      commonMistakes: `1. O'zbek tilidagi tovushlarni ingliz tiliga ko'chirish. Masalan, "water" so'zidagi /w/ tovushini /v/ bilan almashtirish.
2. So'z urg'usini noto'g'ri qo'yish. Masalan, "deVELOP" o'rniga "DEvelop" deyish.
3. Intonatsiyani noto'g'ri ishlatish. O'zbek tilida intonatsiya ingliz tilidan farq qiladi, shuning uchun ingliz tilidagi intonatsiya naqshlarini o'rganish kerak.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer",
          correctAnswer: 0,
          explanation: `My favourite colour is blue, specifically a deep navy blue. I have always been drawn to this colour because it reminds me of the ocean and the night sky, both of which I find incredibly calming and beautiful. Blue is also associated with qualities such as trust, loyalty, and wisdom, which are values that I appreciate.

Regarding art, I would say that I am quite fond of it, although I would not consider myself an expert by any means. I particularly enjoy impressionist painting — artists like Claude Monet and Pierre-Auguste Renoir have created some of the most beautiful works I have ever seen. What I love about impressionism is the way artists use light and colour to capture a moment or a feeling, rather than focusing on precise, realistic details. I also appreciate traditional Uzbek art, particularly the intricate patterns found in our ceramics and textiles.

I have visited several art galleries, both in Uzbekistan and abroad. Last year, I had the opportunity to visit the Louvre Museum in Paris, which was an incredible experience. Seeing famous paintings like the Mona Lisa in person was breathtaking, but I was equally impressed by the lesser-known works that I discovered during my visit.

I firmly believe that art is essential in education. Art encourages creativity, self-expression, and critical thinking, which are skills that are valuable in all areas of life. It also helps students develop cultural awareness and appreciation for different perspectives. In my opinion, a well-rounded education should include both academic subjects and creative arts, as they complement each other and contribute to the development of the whole person.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 7 created:", lesson37.title);

  // ─── Speaking Lesson 8: Full speaking mock test ────────────────────
  const lesson38 = await prisma.lesson.create({
    data: {
      title: "Full speaking mock test",
      category: "speaking",
      durationMin: 30,
      isPremium: true,
      difficulty: "Hard",
      order: 38,
      prerequisiteLessonId: lesson37.id,
      theoryContent: `Full speaking mock test — IELTS Speaking imtihonining to'liq simulyatsiyasi bo'lib, unda siz 11-14 daqiqa ichida uchta qismni bajarishingiz kerak. Bu darsda siz barcha o'rgangan ko'nikmalaringizni — fluency, pronunciation, vocabulary, grammar, coherence — amalda qo'llaysiz.

IELTS Speaking imtihonining tuzilishi:
- Part 1 (4-5 daqiqa): Siz haqingizda umumiy savollar — ism, uy, ish, qiziqishlar.
- Part 2 (3-4 daqiqa): Cue card asosida 1-2 daqiqa gapirish (1 daqiqa tayyorgarlik).
- Part 3 (4-5 daqiqa): Part 2 mavzusi bilan bog'liq abstrakt savollar.

To'liq testni bajarishda muhim strategiyalar:
1) Xotirjam bo'ling va tabiiy gapiring — examiner sizni baholash uchun emas, balki suhbatlashish uchun u yerda;
2) Agar xato qilsangiz, tuzating va davom eting — "I mean..." yoki "Let me rephrase that..." deb xatoingizni tuzatishingiz mumkin;
3) Har bir savolga eng yaxshi javobingizni bering;
4) Imtihon oxirida examiner "That is the end of the speaking test" deguncha gapirishni to'xtatmang.

Mock testni o'tkazish uchun: taymer qo'ying, ovoz yozib oling va keyin o'zingizni IELTS baholash mezonlari bo'yicha baholang.`,
      passageText: `Full Speaking Mock Test:

PART 1 (4-5 minutes):
Questions: ["Let's talk about your hometown. What is special about it?", "What do you like most about living in your city?", "Do you prefer living in a city or a village?", "Let's talk about shopping. Do you enjoy shopping?", "How often do you go shopping?", "What kind of shops do you prefer?"]

PART 2 (3-4 minutes):
Cue Card: Describe a successful person you know.
You should say:
- who this person is
- how you know them
- what they have achieved
- and explain why you consider them successful.

PART 3 (4-5 minutes):
Discussion questions: ["What does success mean to different people?", "Do you think money is a good measure of success?", "What qualities do successful people commonly have?", "Can anyone become successful, or is success reserved for a few?", "How has the concept of success changed over the years?"]`,
      tipsAndTricks: `1. Mock testni o'tkazishda imtihon sharoitini yarating: tinch xona, taymer, hech qanday yordam. Bu real imtihonga tayyorgarlik ko'rishga yordam beradi.
2. Ovoz yozib oling va keyin tinglang. O'zingizni IELTS mezonlari bo'yicha baholang: Fluency, Lexical Resource, Grammatical Range, Pronunciation.
3. Har bir qismni alohida mashq qiling. Part 1 uchun 4-5 daqiqa, Part 2 uchun 3-4 daqiqa, Part 3 uchun 4-5 daqiqa.`,
      commonMistakes: `1. Imtihonda stressga berilish va odatdagidan yomonroq gapirish. Mock testlarni muntazam o'tkazish stressni kamaytirishga yordam beradi.
2. Part 2 da 1 daqiqa tayyorgarlik vaqtidan to'liq foydalanmaslik. Har doim kalit so'zlarni yozib oling.
3. Part 3 da shaxsiy darajada qolib ketish. Abstrakt darajada fikr yuritishga harakat qiling va jamiyat, iqtisodiyot, madaniyat nuqtai nazaridan javob bering.`,
      questions: JSON.stringify([
        {
          id: 1,
          type: "model-answer",
          question: "Model Answer - Part 2: Successful person",
          correctAnswer: 0,
          explanation: `I would like to talk about a person whom I consider highly successful, and that is my uncle, Bobur. He is my mother's younger brother, and I have known him my entire life. He is an entrepreneur who founded a technology start-up about ten years ago, and his journey to success has been truly inspiring.

My uncle grew up in a small village in the Fergana Valley, where access to quality education was limited. Despite these challenges, he worked incredibly hard, earned a scholarship to study computer science at a university in Tashkent, and later completed a master's degree abroad. After returning to Uzbekistan, he identified a gap in the market for local software solutions and founded his own company. Initially, the business struggled — he had very little capital and only two employees. However, through determination, innovation, and smart decision-making, his company gradually grew. Today, his firm employs over two hundred people and has clients in more than fifteen countries.

I consider my uncle successful for several reasons. Firstly, he has achieved remarkable professional success — his company is now one of the leading tech firms in Central Asia, and he has received numerous awards for innovation. However, what impresses me even more is his personal success. Despite his busy schedule, he always makes time for his family. He has also established a foundation that provides scholarships to underprivileged students from rural areas, helping them access the same opportunities that changed his own life.

For me, true success is not just about wealth or fame; it is about making a positive impact on others' lives. My uncle embodies this definition of success, and he continues to inspire me to work hard, stay humble, and give back to the community. I hope to follow in his footsteps one day.`,
          options: [""],
        },
      ]),
    },
  });
  console.log("Speaking Lesson 8 created:", lesson38.title);

  // --- Grammar Lesson 1: Tenses - Present ---
  const lesson39 = await prisma.lesson.create({
    data: {
      title: "Tenses - Present",
      category: "grammar",
      durationMin: 25,
      isPremium: false,
      difficulty: "Easy",
      order: 39,
      prerequisiteLessonId: null,
      theoryContent: `Present zamonlari ingliz tilida eng ko'p ishlatiladigan zamonlar bo'lib, ularni to'g'ri qo'llash IELTS imtihonining barcha bo'limlarida muhim ahamiyatga ega. Quyida to'rtta present zamon va ularning ishlatilishi ko'rib chiqiladi.

1. Present Simple Tense
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Doimiy haqiqat        | Water boils at 100 degrees Celsius.                   |
| Muntazam odat         | She goes to the gym every morning.                    |
| Jadval bo'yicha       | The train leaves at 6 PM daily.                       |
| Fikr/his-tuyg'u       | I believe education is important.                     |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + V1 (s/es) + Obj. Savol: Do/Does + Sub + V1? Inkor: Sub + don't/doesn't + V1.

2. Present Continuous Tense
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Hozirgi daqiqa        | She is reading a book right now.                      |
| Vaqtinchalik          | I am staying with my cousin this month.               |
| Kelajak rejasi        | We are flying to London next week.                    |
| O'zgarish             | The population is growing rapidly.                    |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + am/is/are + V-ing + Obj.

3. Present Perfect Tense
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Tajriba               | She has visited three different countries.            |
| Natija hozir          | I have lost my keys. (hali topilmadi)                 |
| Davom etmoqda         | He has worked here since 2015.                        |
| Yangilik              | The government has announced new policies.            |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + have/has + V3 + Obj.

4. Present Perfect Continuous
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Davomiy harakat       | It has been raining all day.                          |
| Natija ko'rinadi      | She is tired because she has been studying.           |
| Vaqtga urg'u          | I have been waiting for two hours.                    |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + have/has + been + V-ing + Obj.

Misol jumlalar:
1. Many people believe that technology improves our quality of life. (Present Simple)
2. The number of students studying abroad is increasing every year. (Present Continuous)
3. Scientists have discovered a new treatment for the disease. (Present Perfect)
4. She has been working on this project since January. (Present Perfect Continuous)
5. Water consists of hydrogen and oxygen. (Present Simple)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Present Simple bilan Present Perfectni adashtirmang. "I work here since 2010" noto'g'ri — to'g'risi "I have worked here since 2010". Since/for bilan Present Perfect ishlatiladi.
2. State verb (know, believe, like) bilan Present Continuous ishlatmang. "I am knowing the answer" noto'g'ri — to'g'risi "I know the answer".
3. Present Perfect Continuousni Present Perfect bilan aralashtirmang. "I have read this book" (tugallangan) vs "I have been reading this book" (hali o'qiyapman).`,
      commonMistakes: `1. Eng keng tarqalgan xato: uchinchi shaxs birlikda -s qo'shimchasini unutish. "He work in a bank" emas, "He works in a bank".
2. Present Perfectda "since" va "for" ni adashtirish: "since 2010" (nuqta) va "for two years" (davr).
3. "Already", "just", "yet" so'zlarini noto'g'ri joylashtirish: "I have already done it" (to'g'ri), "I already have done it" (xato — norasmiy).`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "She ____ (work) for this company since 2018.",
                    "options": [
                          "worked",
                          "has worked",
                          "is working",
                          "works"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Since\" vaqt nuqtasini bildiradi va Present Perfect bilan ishlatiladi: \"has worked\"."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Which sentence is grammatically correct?",
                    "options": [
                          "I am knowing the answer to your question.",
                          "I know the answer to your question.",
                          "I have been knowing the answer to your question.",
                          "I knew the answer since yesterday."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Know\" state verb bo'lib, Continuous formada ishlatilmaydi. To'g'risi Present Simple: \"I know\"."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "She go to the gym every morning.",
                    "options": [
                          "goes",
                          "is going",
                          "has gone",
                          "went"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Uchinchi shaxs birlikda Present Simpleda -s qo'shimchasi kerak: 'goes'."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"I have never visited Japan.\" Change to Present Simple expressing a general habit.",
                    "options": [
                          "I am never visiting Japan.",
                          "I do not usually visit Japan.",
                          "I never visit Japan.",
                          "I have not visited Japan."
                    ],
                    "correctAnswer": 2,
                    "explanation": "Present Simple odatni ifodalaydi: \"I never visit Japan\" — bu umumiy odatni bildiradi."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "Look! It ____ (rain) outside. Take an umbrella!",
                    "options": [
                          "rains",
                          "is raining",
                          "has rained",
                          "has been raining"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Look!\" — hozirgi daqiqada sodir bo'layotgan harakat. Present Continuous: \"is raining\"."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "The train ____ at 6 PM every evening from platform 3.",
                    "options": [
                          "is leaving",
                          "leaves",
                          "has left",
                          "has been leaving"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Jadval bo'yicha harakat Present Simple bilan ifodalanadi: 'leaves'."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "He has been knowing her for five years.",
                    "options": [
                          "He has known her for five years.",
                          "He knows her for five years.",
                          "He is knowing her for five years.",
                          "He knew her for five years."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Know\" state verb bo'lib, Perfect Continuousda ishlatilmaydi. To'g'risi Present Perfect: \"has known\"."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"They play football every weekend.\" Change to Present Continuous with \"now\".",
                    "options": [
                          "They play football now.",
                          "They are playing football now.",
                          "They have played football now.",
                          "They have been playing football now."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Now\" hozirgi daqiqani bildiradi, Present Continuous kerak: \"are playing\"."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "I ____ (read) this book for two hours, and I'm still not finished.",
                    "options": [
                          "read",
                          "am reading",
                          "have been reading",
                          "have read"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Harakat boshlangan va hali davom etmoqda — Present Perfect Continuous: 'have been reading'."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "By the time the meeting starts, I ____ my presentation.",
                    "options": [
                          "finish",
                          "am finishing",
                          "have finished",
                          "will have finished"
                    ],
                    "correctAnswer": 3,
                    "explanation": "\"By the time\" kelasi vaqtni bildiradi, Future Perfect kerak: \"will have finished\"."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 1 created:", lesson39.title);

  // --- Grammar Lesson 2: Tenses - Past ---
  const lesson40 = await prisma.lesson.create({
    data: {
      title: "Tenses - Past",
      category: "grammar",
      durationMin: 25,
      isPremium: false,
      difficulty: "Easy",
      order: 40,
      prerequisiteLessonId: lesson39.id,
      theoryContent: `Past zamonlari ingliz tilida o'tgan vaqtdagi harakat va holatlarni ifodalash uchun ishlatiladi. IELTS imtihonida, ayniqsa Writing Task 1 (tarixiy ma'lumot) va Task 2 (shaxsiy tajriba) da past zamonlarini to'g'ri qo'llash muhimdir.

1. Past Simple Tense
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Tugallangan           | She graduated from university in 2019.                |
| Ketma-ketlik          | He entered the room, sat down, and began.             |
| O'tgan odat           | I always walked to school when I was young.           |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + V2 (ed/irregular) + Obj. Savol: Did + Sub + V1? Inkor: Sub + didn't + V1.

2. Past Continuous Tense
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Aniq vaqtda           | I was studying at 8 PM last night.                    |
| Interrupted           | She was cooking when the phone rang.                  |
| Parallel              | While I was reading, he was watching TV.              |
| Atmosfera             | The sun was shining and birds were singing.           |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + was/were + V-ing + Obj.

3. Past Perfect Tense
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Oldinroq              | She had already left when I arrived.                  |
| Sabab                 | He was tired because he had worked all day.           |
| Duration              | They had known each other for years.                  |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + had + V3 + Obj.

4. Past Perfect Continuous
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Davom etgan           | They had been waiting for hours before help arrived.  |
| Sabab (ko'rinadi)     | Her eyes were red because she had been crying.        |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + had + been + V-ing + Obj.

Misol jumlalar:
1. The industrial revolution began in the 18th century. (Past Simple)
2. People were living in poor conditions before the reforms. (Past Continuous)
3. By 1900, many factories had already been built. (Past Perfect)
4. The workers had been demanding better wages for years before the strike. (Past Perfect Continuous)
5. She studied abroad, then returned to her home country. (Past Simple)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Past Simple va Present Perfectni adashtirmang. Agar vaqt aniq ko'rsatilgan bo'lsa (yesterday, last year, in 2010), Past Simple ishlatiladi.
2. Past Continuous va Past Simpleni birgalikda ishlatishda "when" va "while" farqiga e'tibor bering: "when" + Past Simple, "while" + Past Continuous.
3. Past Perfectni faqat boshqa o'tgan zamondan oldin sodir bo'lgan harakat uchun ishlating, keraksiz joyda ishlatmang.`,
      commonMistakes: `1. Irregular fe'llarni noto'g'ri ishlatish: "goed" emas, "went". Eng ko'p ishlatiladigan irregular fe'llarni yod oling.
2. "Used to" va "would" ni adashtirish: "used to" o'tgan odat va holatlar uchun, "would" faqat harakatlar uchun.
3. "Already" va "just" ni Past Simple bilan ishlatish: British Englishda "I just saw him" o'rniga "I have just seen him" (Present Perfect) to'g'riroq.`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "She ____ (graduate) from university in 2019.",
                    "options": [
                          "has graduated",
                          "graduated",
                          "was graduating",
                          "had graduated"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"In 2019\" aniq o'tgan vaqtni ko'rsatadi, Past Simple kerak: \"graduated\"."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct sentence:",
                    "options": [
                          "When I arrived, she already left.",
                          "When I arrived, she had already left.",
                          "When I arrived, she has already left.",
                          "When I arrived, she was already leaving."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Ketish (left) kelishdan (arrived) oldin sodir bo'lgan, shuning uchun Past Perfect kerak: 'had already left'."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "I was go to the market when I saw him.",
                    "options": [
                          "I went to the market when I saw him.",
                          "I was going to the market when I saw him.",
                          "I had gone to the market when I saw him.",
                          "I have gone to the market when I saw him."
                    ],
                    "correctAnswer": 1,
                    "explanation": "To'g'ri shakl: 'was going' (Past Continuous) — ketayotgan edim (davomiy) va ko'rdim (birdan)."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"She lived in London for five years.\" Change to Past Continuous expressing an action in progress at a specific time.",
                    "options": [
                          "She was living in London for five years.",
                          "She was lived in London for five years.",
                          "She has been living in London for five years.",
                          "She had been living in London for five years."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Past Continuous: 'She was living' — ma'lum bir davrda davom etgan harakat."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "While I ____ (read) the book, my brother was playing video games.",
                    "options": [
                          "read",
                          "was reading",
                          "had read",
                          "have read"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"While\" bilan bir vaqtda davom etgan harakatlar — Past Continuous: \"was reading\"."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "The children ____ outside when it started to rain.",
                    "options": [
                          "played",
                          "were playing",
                          "had played",
                          "have been playing"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Yomg'ir boshlanganda tashqarida o'ynayotgan edilar — Past Continuous: 'were playing'."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "She had went to the store before I called her.",
                    "options": [
                          "She went to the store before I called her.",
                          "She had gone to the store before I called her.",
                          "She has gone to the store before I called her.",
                          "She was going to the store before I called her."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Past Perfect: 'had gone' — 'gone' (V3) irregular fe'lning to'g'ri shakli."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"He worked at the company. Then he retired.\" Combine into one sentence using Past Perfect.",
                    "options": [
                          "He worked at the company before he retired.",
                          "He had worked at the company before he retired.",
                          "He was working at the company before he retired.",
                          "He has worked at the company before he retired."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Ishlagan (worked) nafaqaga chiqishdan (retired) oldin sodir bo'lgan: 'had worked'."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "They ____ (wait) for over an hour when the bus finally arrived.",
                    "options": [
                          "waited",
                          "were waiting",
                          "had been waiting",
                          "have waited"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Kutish avvalroq boshlanib, avtobus kelguniga qadar davom etgan: 'had been waiting'."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "I ____ my keys. I can't find them anywhere.",
                    "options": [
                          "lost",
                          "have lost",
                          "was losing",
                          "had lost"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Natija hozir ham mavjud (topa olmayapman) — Present Perfect: 'have lost'."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 2 created:", lesson40.title);

  // --- Grammar Lesson 3: Tenses - Future ---
  const lesson41 = await prisma.lesson.create({
    data: {
      title: "Tenses - Future",
      category: "grammar",
      durationMin: 20,
      isPremium: false,
      difficulty: "Easy",
      order: 41,
      prerequisiteLessonId: lesson40.id,
      theoryContent: `Kelasi zamonlari ingliz tilida turli xil ma'nolarni ifodalash uchun ishlatiladi. IELTS imtihonida, ayniqsa Speaking (rejalar va bashoratlar) va Writing Task 2 (kelajak prognozlari) da future zamonlarini to'g'ri qo'llash muhimdir.

1. Future Simple (will)
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Birdan qaror          | I'll answer the phone!                                |
| Bashorat              | The population will reach 9 billion by 2050.          |
| Vada/tahdid           | I will help you with your homework.                   |
| So'rov/taklif         | Will you open the window, please?                     |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + will + V1 + Obj.

2. Going to
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Reja/qaror            | She is going to study medicine at university.         |
| Dalil asosida         | Look at those clouds! It's going to rain.             |
+-----------------------+------------------------------------------------------+
Yasalishi: Sub + am/is/are + going to + V1 + Obj.

3. Present Continuous for Future
+-----------------------+------------------------------------------------------+
| Ishlatilishi          | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Aniq rejalar          | I am meeting my supervisor tomorrow morning.          |
| Kelishilgan           | They are getting married next June.                   |
+-----------------------+------------------------------------------------------+

4. Future Continuous: Sub + will + be + V-ing
5. Future Perfect: Sub + will + have + V3

Misol jumlalar:
1. Many experts believe that AI will transform healthcare. (will)
2. The government is going to introduce new environmental regulations. (going to)
3. I am taking my IELTS exam next month. (Present Continuous for future)
4. By 2050, the world population will have reached 10 billion. (Future Perfect)
5. This time next year, I will be studying at a university abroad. (Future Continuous)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. "Will" va "going to" farqini yodda tuting: bir zumda qaror (will) va oldindan rejalashtirilgan (going to).
2. Future Perfect va Future Continuousni farqlang: "will have done" (tugallangan) vs "will be doing" (davom etayotgan).
3. Present Continuous for Future faqat aniq kelishilgan rejalar uchun ishlatiladi, umumiy rejalar uchun "going to" ishlating.`,
      commonMistakes: `1. Kelasi zamonda "will" dan keyin V1 ishlatiladi, V2 emas: "I will go" (to'g'ri), "I will went" (xato).
2. "By the time" bilan Future Perfect ishlatiladi, Present Perfect emas: "By the time you arrive, I will have finished".
3. "Will" yoki "going to" o'rniga Present Simpleni noto'g'ri ishlatish: "I see you tomorrow" emas, "I will see you tomorrow".`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "Don't worry, I ____ (help) you with the luggage.",
                    "options": [
                          "help",
                          "will help",
                          "am going to help",
                          "am helping"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Birdan qilingan qaror — 'will help'. Vada berishda Future Simple ishlatiladi."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Which sentence expresses a pre-planned arrangement?",
                    "options": [
                          "I'll help you carry those bags.",
                          "I am meeting my dentist tomorrow at 10 AM.",
                          "I think it will rain later.",
                          "I'll get the phone!"
                    ],
                    "correctAnswer": 1,
                    "explanation": "'I am meeting' — Present Continuous aniq kelishilgan rejani ifodalaydi."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "By the time we arrive, she will has left.",
                    "options": [
                          "By the time we arrive, she will have left.",
                          "By the time we arrive, she will leave.",
                          "By the time we arrive, she has left.",
                          "By the time we arrive, she is leaving."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Future Perfect: 'will have left' (will + have + V3). 'Will has' noto'g'ri."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"I plan to study abroad next year.\" Use \"going to\".",
                    "options": [
                          "I will study abroad next year.",
                          "I am going to study abroad next year.",
                          "I am studying abroad next year.",
                          "I study abroad next year."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Going to\" oldindan rejalashtirilgan rejalar uchun: \"I am going to study abroad\"."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "Look at the sky! It ____ (rain) soon.",
                    "options": [
                          "will rain",
                          "is going to rain",
                          "is raining",
                          "rains"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Ko'rinadigan dalillar asosida bashorat — 'is going to rain'."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "This time next week, I ____ on a beach in Thailand.",
                    "options": [
                          "will lie",
                          "will be lying",
                          "will have lain",
                          "am lying"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"This time next week\" — aniq kelasi vaqtda davom etayotgan harakat: Future Continuous \"will be lying\"."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "I will going to visit my grandmother tomorrow.",
                    "options": [
                          "I will visit my grandmother tomorrow.",
                          "I am going to visit my grandmother tomorrow.",
                          "I will be going to visit my grandmother tomorrow.",
                          "I go to visit my grandmother tomorrow."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Going to\" allaqachon \"be\" fe'lini o'z ichiga oladi. \"Am going to\" to'g'ri shakl."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"I will finish the report. Then I will submit it.\" Use Future Perfect for the first action.",
                    "options": [
                          "I will have finished the report before I submit it.",
                          "I will be finishing the report before I submit it.",
                          "I finish the report before I submit it.",
                          "I am finishing the report before I submit it."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Hisobotni tugatish topshirishdan oldin sodir bo'ladi: 'will have finished'."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "By 2030, scientists ____ (discover) a cure for the disease.",
                    "options": [
                          "will discover",
                          "will have discovered",
                          "are going to discover",
                          "will be discovering"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"By 2030\" — ma'lum kelasi vaqtda tugallangan harakat: Future Perfect \"will have discovered\"."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Choose the correct sentence:",
                    "options": [
                          "I see you tomorrow morning.",
                          "I will see you tomorrow morning.",
                          "I am see you tomorrow morning.",
                          "I will seeing you tomorrow morning."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Kelasi zamonda \"will\" + V1: \"I will see you tomorrow morning\"."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 3 created:", lesson41.title);

  // --- Grammar Lesson 4: Conditionals ---
  const lesson42 = await prisma.lesson.create({
    data: {
      title: "Conditionals",
      category: "grammar",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 42,
      prerequisiteLessonId: lesson41.id,
      theoryContent: `Conditional (shart) gaplari ingliz tilida muhim grammatik tuzilma bo'lib, IELTS imtihonida Writing Task 2 va Speaking qismlarida ko'p qo'llaniladi.

1. Zero Conditional (100% haqiqat)
+-----------------------+------------------------------------------------------+
| Tuzilishi             | If + Present Simple, + Present Simple                 |
| Qachon                | Umumiy haqiqat, ilmiy faktlar                         |
| Misol                 | If you heat water to 100 degree C, it boils.         |
+-----------------------+------------------------------------------------------+

2. First Conditional (real, mumkin)
+-----------------------+------------------------------------------------------+
| Tuzilishi             | If + Present Simple, + will + V1                      |
| Qachon                | Kelajakda sodir bo'lishi mumkin bo'lgan               |
| Misol                 | If you study hard, you will pass the exam.            |
+-----------------------+------------------------------------------------------+

3. Second Conditional (unreal, faraziy)
+-----------------------+------------------------------------------------------+
| Tuzilishi             | If + Past Simple, + would + V1                        |
| Qachon                | Hozirgi/kelajakdagi faraziy vaziyatlar                |
| Misol                 | If I had more time, I would learn piano.              |
+-----------------------+------------------------------------------------------+

4. Third Conditional (kechgan, achinish)
+-----------------------+------------------------------------------------------+
| Tuzilishi             | If + Past Perfect, + would have + V3                  |
| Qachon                | O'tmishda sodir bo'lmagan, afsuslaniladigan           |
| Misol                 | If I had studied more, I would have passed.           |
+-----------------------+------------------------------------------------------+

5. Mixed Conditional: If + Past Perfect + would + V1 (hozirgi natija)

Misol jumlalar:
1. If you study consistently, you will improve your score. (First)
2. If I were the president, I would invest more in education. (Second)
3. If she had prepared better, she would have achieved a Band 7. (Third)
4. If he had accepted the offer, he would be working in London now. (Mixed)
5. If you freeze water, it turns into ice. (Zero)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Second Conditional (faraziy) da "were" barcha shaxslar uchun ishlatiladi: "If I were you" (not "If I was you").
2. Third Conditional — o'tmishdagi achinish uchun: "If I had known, I would have acted differently".
3. Mixed Conditional — o'tmish harakati hozirgi natijaga olib kelganda: "If I had studied engineering, I would be an engineer now".`,
      commonMistakes: `1. Second Conditionalda Past Simple ishlatilsa ham, kelajakka ishora qiladi: "If I won the lottery, I would travel the world" (kelajak).
2. First Conditional va Second Conditionalni adashtirish: haqiqiy (first) va faraziy (second) vaziyatlarni farqlang.
3. "Unless" so'zini noto'g'ri ishlatish: "unless" = "if not". "Unless you study, you will fail" = "If you do not study, you will fail".`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "If you ____ (study) hard, you will pass the IELTS exam.",
                    "options": [
                          "study",
                          "will study",
                          "studied",
                          "had studied"
                    ],
                    "correctAnswer": 0,
                    "explanation": "First Conditional: If + Present Simple + will. 'If you study' to'g'ri shakl."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Which sentence is a Second Conditional?",
                    "options": [
                          "If I see him, I will tell him.",
                          "If I saw him, I would tell him.",
                          "If I had seen him, I would have told him.",
                          "If I see him, I tell him."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Second Conditional: If + Past Simple + would + V1. 'If I saw him, I would tell him'."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "If I would have more time, I would travel more.",
                    "options": [
                          "If I had more time, I would travel more.",
                          "If I have more time, I would travel more.",
                          "If I would had more time, I would travel more.",
                          "If I will have more time, I would travel more."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Second Conditional: If + Past Simple (had), not 'would have'. 'If I had more time' to'g'ri."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"I didn't study, so I failed.\" Use Third Conditional.",
                    "options": [
                          "If I didn't study, I would fail.",
                          "If I hadn't studied, I would have failed.",
                          "If I had studied, I would not have failed.",
                          "If I studied, I wouldn't fail."
                    ],
                    "correctAnswer": 2,
                    "explanation": "Third Conditional: If + Past Perfect + would have + V3. 'If I had studied, I would not have failed'."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "If I ____ (be) you, I would accept the job offer.",
                    "options": [
                          "am",
                          "was",
                          "were",
                          "be"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Second Conditional faraziy vaziyat: 'If I were you' — 'were' barcha shaxslar uchun."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "Choose the correct Zero Conditional sentence:",
                    "options": [
                          "If you will heat ice, it melts.",
                          "If you heat ice, it melts.",
                          "If you heated ice, it would melt.",
                          "If you had heated ice, it would have melted."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Zero Conditional: If + Present Simple + Present Simple. Umumiy haqiqat: 'If you heat ice, it melts'."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "If I had known about the meeting, I attend it.",
                    "options": [
                          "If I had known about the meeting, I would have attended it.",
                          "If I knew about the meeting, I would attend it.",
                          "If I know about the meeting, I will attend it.",
                          "If I have known about the meeting, I attended it."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Third Conditional: If + Past Perfect (had known) + would have + V3 (would have attended)."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"He didn't take the medicine, so he is still sick.\" Use Mixed Conditional.",
                    "options": [
                          "If he didn't take the medicine, he would be still sick.",
                          "If he had taken the medicine, he wouldn't be sick now.",
                          "If he takes the medicine, he won't be sick.",
                          "If he took the medicine, he wouldn't be sick."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Mixed Conditional: If + Past Perfect (had taken) + would + V1 (wouldn't be). O'tmish harakati hozirgi natija."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "Unless you ____ (start) now, you will miss the deadline.",
                    "options": [
                          "start",
                          "will start",
                          "started",
                          "had started"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Unless\" = \"if not\". First Conditional: Unless + Present Simple + will. \"Unless you start now\"."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Which sentence expresses regret about the past?",
                    "options": [
                          "If I study, I will pass.",
                          "If I studied, I would pass.",
                          "If I had studied, I would have passed.",
                          "If I study, I pass."
                    ],
                    "correctAnswer": 2,
                    "explanation": "Third Conditional o'tmishdagi achinishni ifodalaydi: \"If I had studied, I would have passed\"."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 4 created:", lesson42.title);

  // --- Grammar Lesson 5: Passive voice ---
  const lesson43 = await prisma.lesson.create({
    data: {
      title: "Passive voice",
      category: "grammar",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 43,
      prerequisiteLessonId: lesson42.id,
      theoryContent: `Passive voice (majhul nisbat) ingliz tilida fe'lning harakatni bajaruvchidan ko'ra, harakatning o'ziga yoki ob'ektiga e'tibor qaratish uchun ishlatiladi.

Passive Voice yasalishi: Sub + be (zamonga qarab) + V3 + (by agent)

1. Passive zamonlar jadvali:
+-----------------------+------------------------------------------------------+
| Zamon                 | Active -> Passive                                     |
+-----------------------+------------------------------------------------------+
| Present Simple        | write -> is/are written                               |
| Present Continuous    | is writing -> is being written                        |
| Present Perfect       | has written -> has been written                       |
| Past Simple           | wrote -> was/were written                             |
| Past Continuous       | was writing -> was being written                      |
| Past Perfect          | had written -> had been written                       |
| Future Simple         | will write -> will be written                         |
| Modal                 | can write -> can be written                           |
+-----------------------+------------------------------------------------------+

2. Passive voice qachon ishlatiladi?
+-----------------------+------------------------------------------------------+
| Bajaruvchi noma'lum   | My phone was stolen.                                  |
| Bajaruvchi muhim emas | The test results will be published tomorrow.          |
| Rasmiy/ilmiy uslub    | The experiment was conducted in 2020.                 |
| Bajaruvchi aniq       | The law was passed by parliament.                     |
+-----------------------+------------------------------------------------------+

Misol jumlalar:
1. The tests are marked by certified examiners. (Present Simple Passive)
2. The new hospital is being built in the city centre. (Present Continuous Passive)
3. The decision has already been made by the committee. (Present Perfect Passive)
4. The experiment was conducted under strict conditions. (Past Simple Passive)
5. The report will be submitted by Friday. (Future Simple Passive)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Passive voice faqat transitive fe'llar (ob'ekt oladigan) bilan ishlatiladi. Intransitive fe'llar (arrive, sleep, die) passive bo'lmaydi.
2. Rasmiy writingda passive voice ko'proq ishlatiladi: "It is believed that...", "It can be argued that...".
3. By + agent faqat bajaruvchi muhim bo'lganda qo'shiladi. Aks holda tushirib qoldiring.`,
      commonMistakes: `1. Passive voice yasashda "be" fe'lini unutish: "The work done" emas, "The work is done".
2. Passive voice bilan Present Participle (V-ing) adashtirish: "The book is writing" (noto'g'ri) -> "The book is being written" (to'g'ri).
3. By agentni noto'g'ri joylashtirish yoki keraksiz ishlatish: "The cake was eaten by someone" keraksiz.`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "The IELTS exam ____ (administer) in over 140 countries every year.",
                    "options": [
                          "administers",
                          "is administered",
                          "is administering",
                          "has administered"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Present Simple Passive: 'is administered' — imtihon boshqariladi (bajaruvchi muhim emas)."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "The Mona Lisa ____ by Leonardo da Vinci.",
                    "options": [
                          "painted",
                          "was painted",
                          "has painted",
                          "is painting"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Past Simple Passive: 'was painted'. Kim tomonidan (by Leonardo) aniq ko'rsatilgan."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "The bridge is building right now.",
                    "options": [
                          "The bridge is built right now.",
                          "The bridge is being built right now.",
                          "The bridge builds right now.",
                          "The bridge has built right now."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Present Continuous Passive: 'is being built' (qurilmoqda, hozirgi vaqtda)."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform to Passive: \"The government will announce the results next week.\"",
                    "options": [
                          "The results will announce next week by the government.",
                          "The results will be announced next week.",
                          "The results are announced next week.",
                          "The results have been announced next week."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Future Simple Passive: 'will be announced'. By agent tushirilgan (keraksiz)."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "The letters ____ (send) yesterday morning.",
                    "options": [
                          "sent",
                          "were sent",
                          "are sent",
                          "have been sent"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Yesterday morning\" aniq o'tgan vaqt. Past Simple Passive: \"were sent\"."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "Which sentence is NOT possible in passive voice?",
                    "options": [
                          "Mistakes were made during the experiment.",
                          "The report has been written by Sarah.",
                          "The baby was slept peacefully.",
                          "The bridge is being repaired."
                    ],
                    "correctAnswer": 2,
                    "explanation": "\"Sleep\" intransitive fe'l — passive bo'lmaydi. \"The baby slept peacefully\" to'g'ri."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "A new hospital is been built in the area.",
                    "options": [
                          "A new hospital is built in the area.",
                          "A new hospital is being built in the area.",
                          "A new hospital has been built in the area.",
                          "A new hospital was built in the area."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Present Continuous Passive: 'is being built'. 'Is been built' noto'g'ri."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform to Active: \"The test results were announced by the teacher.\"",
                    "options": [
                          "The teacher announced the test results.",
                          "The teacher was announced the test results.",
                          "The teacher announces the test results.",
                          "The teacher has announced the test results."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Past Simple Active: 'The teacher announced the test results.'"
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "The problem ____ (discuss) at the meeting right now.",
                    "options": [
                          "discusses",
                          "is being discussed",
                          "is discussed",
                          "has been discussed"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Right now\" — hozirgi daqiqa. Present Continuous Passive: \"is being discussed\"."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Choosing the passive form: \"It is believed that the company ____ next year.\"",
                    "options": [
                          "will close",
                          "will be closed",
                          "is closing",
                          "has closed"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"It is believed\" + Future Simple Passive: \"will be closed\"."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 5 created:", lesson43.title);

  // --- Grammar Lesson 6: Relative clauses ---
  const lesson44 = await prisma.lesson.create({
    data: {
      title: "Relative clauses",
      category: "grammar",
      durationMin: 20,
      isPremium: true,
      difficulty: "Medium",
      order: 44,
      prerequisiteLessonId: lesson43.id,
      theoryContent: `Relative clauses (nisbiy gaplar) ingliz tilida otga qo'shimcha ma'lumot berish uchun ishlatiladi.

1. Defining (aniqlovchi) relative clauses
+-----------------------+------------------------------------------------------+
| Xususiyat             | Gapsiz gapning ma'nosi o'zgaradi                      |
| Vergul                | Vergul qo'yilmaydi                                     |
| Who/that              | Odamlar uchun                                          |
| Which/that            | Narsalar uchun                                         |
| Whose                 | Egalik uchun                                           |
| Where                 | Joy uchun                                              |
| When                  | Vaqt uchun                                             |
| Why                   | Sabab uchun                                            |
+-----------------------+------------------------------------------------------+
Misol: The student who studies hard will succeed.

2. Non-defining (qo'shimcha) relative clauses
+-----------------------+------------------------------------------------------+
| Xususiyat             | Qo'shimcha ma'lumot, gap ma'nosi saqlanadi             |
| Vergul                | Vergul bilan ajratiladi                                 |
| Who (odam)            | That ishlatilmaydi                                      |
| Which (narsa)         | That ishlatilmaydi                                      |
+-----------------------+------------------------------------------------------+
Misol: My brother, who lives in London, is a doctor.

3. Relative clauses with prepositions
   - Rasmiy: The person to whom you spoke is the manager.
   - Norasmiy: The person who you spoke to is the manager.

Misol jumlalar:
1. Students who practice regularly achieve higher scores. (defining)
2. My IELTS instructor, who is from the UK, has 10 years of experience. (non-defining)
3. The city where I grew up has changed dramatically. (defining - place)
4. The reason why many people fail is lack of preparation. (defining - reason)
5. The book, which was published in 2020, became a bestseller. (non-defining)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Defining relative clausesda "that" odam va narsalar uchun ishlatilishi mumkin. Non-definingda esa "that" ishlatilmaydi, faqat "who" yoki "which".
2. Non-defining relative clausedan oldin va keyin vergul qo'ying: "My mother, who is a teacher, lives in Tashkent."
3. Rasmiy writingda prepozitsiyani relative pronoundan oldin qo'ying: "the person to whom" (rasmiy) vs "the person who" (norasmiy).`,
      commonMistakes: `1. "Who" va "whom"ni adashtirish: subject uchun "who", object uchun "whom" (rasmiy).
2. Non-defining relative clausedan keyin vergul qo'ymaslik: "My brother who lives in London" — bu defining, farqli ma'no.
3. Relative pronounni noto'g'ri tanlash: joy uchun "which" (xato) → "where" (to'g'ri). "The house which I was born" → "The house where I was born".`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "The student ____ (who/which/whose) scores the highest will receive a scholarship.",
                    "options": [
                          "which",
                          "whose",
                          "who",
                          "whom"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Odam (student) + subject → 'who'. 'The student who scores the highest'."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct non-defining relative clause:",
                    "options": [
                          "My sister that lives in Paris is coming to visit.",
                          "My sister, who lives in Paris, is coming to visit.",
                          "My sister who lives in Paris is coming to visit.",
                          "My sister, which lives in Paris, is coming to visit."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Non-defining: vergul + 'who' + vergul. 'My sister, who lives in Paris,' to'g'ri."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "The house which I was born is now a museum.",
                    "options": [
                          "The house where I was born is now a museum.",
                          "The house that I was born is now a museum.",
                          "The house in which I was born is now a museum.",
                          "The house who I was born is now a museum."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Joy uchun 'where' kerak. 'which' + prepozitsiya ham mumkin: 'in which I was born'."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"I met a woman. Her son won the competition.\" Combine using \"whose\".",
                    "options": [
                          "I met a woman whose son won the competition.",
                          "I met a woman who son won the competition.",
                          "I met a woman her son won the competition.",
                          "I met a woman that son won the competition."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Egalik uchun \"whose\": \"a woman whose son won the competition\"."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "The reason ____ (why/which/where) many students fail is lack of preparation.",
                    "options": [
                          "which",
                          "where",
                          "why",
                          "that"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Sabab uchun \"why\": \"The reason why many students fail...\"."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "Which sentence contains a defining relative clause?",
                    "options": [
                          "My car, which is red, is parked outside.",
                          "Students who arrive late will not be admitted.",
                          "The Eiffel Tower, which is in Paris, is beautiful.",
                          "My father, who is retired, enjoys gardening."
                    ],
                    "correctAnswer": 1,
                    "explanation": "'Students who arrive late' — defining, chunki gapning ma'nosi o'zgaradi (kechikkanlar qabul qilinmaydi)."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "The teacher which taught me is very strict.",
                    "options": [
                          "The teacher who taught me is very strict.",
                          "The teacher whom taught me is very strict.",
                          "The teacher whose taught me is very strict.",
                          "The teacher that taught me is very strict."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Odamlar uchun \"who\" (yoki \"that\"), \"which\" narsalar uchun."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"The girl is from Uzbekistan. She won the competition.\" Combine into one sentence.",
                    "options": [
                          "The girl who won the competition is from Uzbekistan.",
                          "The girl is from Uzbekistan who won the competition.",
                          "The girl which won the competition is from Uzbekistan.",
                          "The girl whom won the competition is from Uzbekistan."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Defining relative clause: 'The girl who won the competition is from Uzbekistan.'"
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "The company ____ (who/which/where) I work has offices worldwide.",
                    "options": [
                          "who",
                          "which",
                          "where",
                          "when"
                    ],
                    "correctAnswer": 2,
                    "explanation": "'The company' — joy ma'nosida (work at the company). 'Where' to'g'ri."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Choose the correct formal sentence:",
                    "options": [
                          "The person who I spoke to is the director.",
                          "The person to whom I spoke is the director.",
                          "The person whom I spoke to is the director.",
                          "The person that I spoke to is the director."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Rasmiy writingda prepozitsiya relative pronoundan oldin: 'to whom I spoke'."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 6 created:", lesson44.title);

  // --- Grammar Lesson 7: Modal verbs ---
  const lesson45 = await prisma.lesson.create({
    data: {
      title: "Modal verbs",
      category: "grammar",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 45,
      prerequisiteLessonId: lesson44.id,
      theoryContent: `Modal fe'llar ingliz tilida imkoniyat, zaruriyat, ruxsat, majburiyat va ehtimollikni ifodalash uchun ishlatiladi.

1. Asosiy modal fe'llar:
+-----------------------+------------------------------------------------------+
| Modal                 | Ma'nosi                                              |
+-----------------------+------------------------------------------------------+
| can                   | qodirlik, ruxsat                                     |
| could                 | o'tmishdagi qodirlik, muloyim so'rov                 |
| may                   | ruxsat, ehtimollik                                   |
| might                 | kichik ehtimollik                                    |
| must                  | majburiyat                                           |
| should                | tavsiya                                              |
| ought to              | tavsiya                                              |
| have to               | tashqi majburiyat                                    |
| need to               | zaruriyat                                            |
+-----------------------+------------------------------------------------------+

2. Modal fe'llarning xususiyatlari:
   - Modaldan keyin to'siz infinitive (V1) keladi: can go, must study
   - Uchinchi shaxsda -s qo'shimchasi qo'yilmaydi: he can (not he cans)
   - Ikki modal ketma-ket kelmaydi: will can -> will be able to

3. Modal fe'llar bilan perfect infinitive:
   - must have + V3: She must have forgotten. (ishonch)
   - might have + V3: He might have missed the bus. (ehtimol)
   - could have + V3: I could have helped you. (mumkin edi)
   - should have + V3: You should have told me. (kerak edi)

Misol jumlalar:
1. Students must submit their assignments on time. (majburiyat)
2. The government should invest more in renewable energy. (tavsiya)
3. She might be late because of the traffic. (ehtimollik)
4. I could have achieved a higher score if I had practiced more. (afsus)
5. You need to register for the exam before the deadline. (zaruriyat)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. "Must" va "have to" farqi: "must" shaxsiy majburiyat, "have to" tashqi majburiyat.
2. "Could" o'tmishdagi qodirlik uchun, "was/were able to" muayyan vaziyatdagi muvaffaqiyat uchun.
3. "Should have + V3" o'tmishdagi tavsiya qilingan, ammo bajarilmagan harakat uchun: "I should have studied more".`,
      commonMistakes: `1. Modaldan keyin "to" qo'shish: "must to go" (xato) -> "must go" (to'g'ri). Faqat "ought to" va "need to" istisno.
2. "Can" va "be able to" ni adashtirish: "can" hozirgi qodirlik, "will be able to" kelasi zamon.
3. "Mustn't" va "don't have to" farqi: "mustn't" taqiq (mumkin emas), "don't have to" majburiy emas.`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "You ____ (should/must/can) submit your application before the deadline.",
                    "options": [
                          "should",
                          "must",
                          "can",
                          "might"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Before the deadline\" muddatni ko'rsatadi, majburiyat -> \"must\"."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the sentence expressing possibility:",
                    "options": [
                          "You must see a doctor immediately.",
                          "She might be at home right now.",
                          "I can swim very well.",
                          "You should try this restaurant."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Might\" ehtimollikni ifodalaydi: \"She might be at home\" (balki uydadir)."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "He can to speak three languages fluently.",
                    "options": [
                          "He can speak three languages fluently.",
                          "He cans speak three languages fluently.",
                          "He could to speak three languages fluently.",
                          "He can spoke three languages fluently."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Modaldan keyin 'to' qo'yilmaydi: 'can speak' (can + V1)."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"It is not necessary for you to attend the meeting.\" Use \"needn't\".",
                    "options": [
                          "You needn't attend the meeting.",
                          "You mustn't attend the meeting.",
                          "You don't need attend the meeting.",
                          "You shouldn't attend the meeting."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Needn't\" = \"don't have to\" (majburiy emas). \"Mustn't\" esa taqiq."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "When I was younger, I ____ (can/could/must) run very fast.",
                    "options": [
                          "can",
                          "could",
                          "must",
                          "should"
                    ],
                    "correctAnswer": 1,
                    "explanation": "O'tmishdagi qodirlik: 'could' (could + V1)."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "You ____ finish the project today; tomorrow is the deadline.",
                    "options": [
                          "mustn't",
                          "don't have to",
                          "must",
                          "could"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Deadline bor, shuning uchun majburiyat: 'must finish'."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "She musts finish her homework before watching TV.",
                    "options": [
                          "She must finish her homework before watching TV.",
                          "She must to finish her homework before watching TV.",
                          "She have to finish her homework before watching TV.",
                          "She can finish her homework before watching TV."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Modal fe'llarga -s qo'shilmaydi: 'must' (not 'musts')."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"I advise you to practice more.\" Use \"should\".",
                    "options": [
                          "You should practice more.",
                          "You must practice more.",
                          "You can practice more.",
                          "You might practice more."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Should\" tavsiya uchun: \"You should practice more.\""
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "You ____ (shouldn't/mustn't/needn't) park here; it's forbidden.",
                    "options": [
                          "shouldn't",
                          "mustn't",
                          "needn't",
                          "don't have to"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Forbidden\" — taqiq. \"Mustn't\" taqiqni ifodalaydi (mumkin emas)."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Which sentence expresses regret about the past?",
                    "options": [
                          "I should study more.",
                          "I should have studied more.",
                          "I must study more.",
                          "I can study more."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Should have + V3\" o'tmishdagi afsus: \"I should have studied more\" (ko'proq o'qishim kerak edi, lekin o'qimadim)."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 7 created:", lesson45.title);

  // --- Grammar Lesson 8: Articles va prepositions ---
  const lesson46 = await prisma.lesson.create({
    data: {
      title: "Articles va prepositions",
      category: "grammar",
      durationMin: 30,
      isPremium: true,
      difficulty: "Medium",
      order: 46,
      prerequisiteLessonId: lesson45.id,
      theoryContent: `Articles (a/an/the) va prepositions (in, on, at, to, for, etc.) ingliz tilining eng murakkab va ko'p xato qilinadigan qismlaridan biridir.

1. Articles:
+-----------------------+------------------------------------------------------+
| Article               | Qachon ishlatiladi                                    |
+-----------------------+------------------------------------------------------+
| a/an                  | Birinchi marta, umumiy, kasb: a teacher, an apple    |
| the                   | Aniq, oldin aytilgan, unikal: the sun, the govt.     |
| zero article          | Umumiy, ko'plik, mavhum: Life is beautiful.          |
+-----------------------+------------------------------------------------------+

2. Prepositions of time:
+-----------------------+------------------------------------------------------+
| in                    | oy/yil/asr/davr: in 2024, in January, in summer      |
| on                    | kun/sana: on Monday, on 5th May                       |
| at                    | soat/vaqt: at 6 PM, at midnight, at the weekend      |
| by                    | ...gacha: by Friday, by next week                     |
| since                 | ...dan beri: since 2018, since morning                |
| for                   | ...davomida: for two years, for an hour               |
+-----------------------+------------------------------------------------------+

3. Prepositions of place:
+-----------------------+------------------------------------------------------+
| in                    | ichida/shaharda: in Tashkent, in the room             |
| on                    | ustida/ko'chada: on the table, on Broadway            |
| at                    | manzilda/nuqtada: at the airport, at 123 Main St     |
| between               | orasida: between A and B                              |
| next to               | yonida: next to the bank                              |
+-----------------------+------------------------------------------------------+

4. Prepositions with adjectives/verbs:
   - interested IN, good AT, afraid OF, proud OF
   - depend ON, listen TO, belong TO, pay FOR
   - arrive IN (city), arrive AT (place)

Misol jumlalar:
1. The government should invest more in education. (the + aniq)
2. An apple a day keeps the doctor away. (a + an)
3. She arrived at the airport on time. (at + on)
4. I have been studying English for three years. (for + davr)
5. He is interested in learning new languages. (interested in)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Artikl qo'yishda "specific or general" testini qiling: specific -> "the", general/umumiy -> zero article yoki "a/an".
2. Prepositionlarni fe'l bilan birga yod oling: "depend on", "insist on", "succeed in", "believe in".
3. "The" talaffuzi: undosh tovushdan oldin "the" (thuh), unli tovushdan oldin "the" (thee).`,
      commonMistakes: `1. "In", "on", "at" vaqtni ifodalashda adashtirish: "in Monday" (xato) -> "on Monday" (to'g'ri). Kun uchun "on", oy uchun "in", soat uchun "at".
2. "The" ni noto'g'ri qo'yish yoki tushirish: "Life is beautiful" (umumiy, no article) vs "The life of a student is hard" (specific).
3. Prepositionni fe'ldan keyin unutish: "I listened music" (xato) -> "I listened to music" (to'g'ri). "Discuss about" (xato) -> "discuss" (to'g'ri).`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "She is ____ university student studying engineering.",
                    "options": [
                          "a",
                          "an",
                          "the",
                          "no article"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"University\" undosh tovush bilan boshlanadi (yu), shuning uchun \"a\"."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct sentence:",
                    "options": [
                          "I arrived in the airport at 6 PM.",
                          "I arrived at the airport at 6 PM.",
                          "I arrived on the airport at 6 PM.",
                          "I arrived to the airport at 6 PM."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Joy nuqtasi (airport) -> 'arrive at'. Shahar uchun 'arrive in'."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "I am interested for learning new languages.",
                    "options": [
                          "I am interested in learning new languages.",
                          "I am interested on learning new languages.",
                          "I am interested at learning new languages.",
                          "I am interested to learning new languages."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Interested in\" to'g'ri prepozitsiya: \"interested in learning\"."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"She goes to work by bus every day.\" Change to specific day using \"on\".",
                    "options": [
                          "She goes to work on bus every day.",
                          "She goes to work on the bus every day.",
                          "On Monday, she goes to work by bus.",
                          "She goes to work at bus every day."
                    ],
                    "correctAnswer": 2,
                    "explanation": "\"On Monday\" — aniq kunni ifodalash uchun \"on\" + kun."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "____ (The/A/No article) education is essential for personal development.",
                    "options": [
                          "The",
                          "An",
                          "A",
                          "No article"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Umumiy mavhum tushuncha -> zero article: 'Education is essential'."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "I have been working here ____ 2019.",
                    "options": [
                          "for",
                          "since",
                          "during",
                          "in"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"2019\" — vaqt nuqtasi. \"Since\" vaqt nuqtasi bilan ishlatiladi."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "We discussed about the problem during the meeting.",
                    "options": [
                          "We discussed the problem during the meeting.",
                          "We discussed on the problem during the meeting.",
                          "We discussed about problem during the meeting.",
                          "We have discussed about the problem during the meeting."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Discuss\" dan keyin prepozitsiya kerak emas: \"discussed the problem\" (not \"discussed about\")."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"The book is on the table.\" Change the position to \"between\".",
                    "options": [
                          "The book is between the table.",
                          "The book is between the two books on the table.",
                          "The book is between on the table.",
                          "The book is between at the table."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Between\" ikki narsa orasini bildiradi: \"between the two books\"."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "He depends ____ (on/in/at) his parents for financial support.",
                    "options": [
                          "on",
                          "in",
                          "at",
                          "for"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Depend on\" to'g'ri prepozitsiya: \"depends on his parents\"."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "The meeting is scheduled ____ 10 AM ____ Monday.",
                    "options": [
                          "at / on",
                          "in / at",
                          "on / in",
                          "at / in"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Soat uchun \"at\" (at 10 AM), kun uchun \"on\" (on Monday)."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 8 created:", lesson46.title);

  // --- Grammar Lesson 9: Conjunctions va linking words ---
  const lesson47 = await prisma.lesson.create({
    data: {
      title: "Conjunctions va linking words",
      category: "grammar",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 47,
      prerequisiteLessonId: lesson46.id,
      theoryContent: `Conjunctions (bog'lovchilar) va linking words matnni mantiqiy bog'lash va IELTS Writingda yuqori ball olish uchun muhimdir.

1. Coordinating conjunctions (teng bog'lovchilar):
+-----------------------+------------------------------------------------------+
| So'z                  | Ma'nosi                                              |
+-----------------------+------------------------------------------------------+
| and                   | qo'shimcha                                           |
| but                   | zidlik                                               |
| or                    | tanlov                                               |
| so                    | natija                                               |
| yet                   | zidlik                                               |
| for                   | sabab                                                |
| nor                   | inkor                                                |
+-----------------------+------------------------------------------------------+

2. Subordinating conjunctions:
+-----------------------+------------------------------------------------------+
| although              | garchi: Although it rained, we went.                  |
| because               | chunki: She passed because she studied.               |
| while                 | vaqtida/zid: While I agree, I have doubts.           |
| unless                | ...masa: Unless you try, you won't know.              |
| whereas               | holbuki                                               |
+-----------------------+------------------------------------------------------+

3. Linking words for IELTS Writing:
+-----------------------+------------------------------------------------------+
| Fikr qo'shish         | Furthermore, Moreover, In addition, Additionally      |
| Qarama-qarshilik      | However, Nevertheless, On the other hand, In contrast |
| Sabab-natija          | Therefore, Consequently, As a result, Thus            |
| Misol keltirish       | For example, For instance, Such as                    |
| Xulosa                | In conclusion, To sum up, Overall                     |
| Ketma-ketlik          | Firstly, Secondly, Finally, Subsequently             |
+-----------------------+------------------------------------------------------+

4. Correlative conjunctions:
   - Both...and, Either...or, Neither...nor, Not only...but also

Misol jumlalar:
1. Many people believe that technology improves lives; however, others argue it creates isolation.
2. Not only does exercise improve physical health, but it also enhances mental well-being.
3. Although the government has implemented new policies, the problem persists.
4. The experiment failed because the conditions were not controlled properly.
5. In conclusion, the benefits of renewable energy outweigh the drawbacks.`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. "However" va "but" farqi: "but" gap o'rtasida, "however" yangi gap boshlanadi.
2. Linking words ko'p ishlatish yomon, haddan tashqari ishlatmang. Har bir paragrafda 1-2 ta yetarli.
3. "Firstly... Secondly... Finally" ketma-ketligini Writing Task 2 da ishlating.`,
      commonMistakes: `1. "Although" va "because" ni bir gapda ishlatish: "Although because..." noto'g'ri. Bittasini tanlang.
2. "On the other hand" va "In contrast" ni adashtirish: "on the other hand" bir fikrning ikkinchi tomoni.
3. "For example" va "such as" farqi: "for example" to'liq gap, "such as" ro'yxat uchun.`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "____ (Although/Because/However) it was raining, we decided to go for a walk.",
                    "options": [
                          "Although",
                          "Because",
                          "However",
                          "Therefore"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Although\" zidlikni ifodalaydi: yomg'ir yog'ayotgan bo'lsa ham, sayr qilishga qaror qildik."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct sentence with a linking word:",
                    "options": [
                          "He studied hard. However, he didn't pass the exam.",
                          "He studied hard however he didn't pass the exam.",
                          "He studied hard, however, he didn't pass the exam.",
                          "He studied hard but however he didn't pass the exam."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"However\" yangi gap boshlaydi va undan keyin vergul qo'yiladi."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "Because she studied hard, so she passed the exam.",
                    "options": [
                          "Because she studied hard, she passed the exam.",
                          "She studied hard, so she passed the exam.",
                          "She studied hard because she passed the exam.",
                          "Because she studied hard, so passed the exam."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Because\" va \"so\" birga ishlatilmaydi. Bittasini tanlash kerak."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"He is intelligent. He is also hardworking.\" Use \"Not only...but also\".",
                    "options": [
                          "Not only he is intelligent but also hardworking.",
                          "He is not only intelligent but also hardworking.",
                          "Not only is he intelligent but also he is hardworking.",
                          "He not only is intelligent but also hardworking."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Not only...but also\" parallel tuzilma: \"not only intelligent but also hardworking\"."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "The company expanded rapidly; ____ (however/therefore/although), profits did not increase.",
                    "options": [
                          "however",
                          "therefore",
                          "although",
                          "moreover"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Zidlik: kompaniya tez kengaydi, ammo foyda oshmadi -> 'however'."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "____ the benefits of technology, there are also significant drawbacks.",
                    "options": [
                          "Because of",
                          "Despite",
                          "Although",
                          "Therefore"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Despite\" + noun: \"Despite the benefits, there are drawbacks.\""
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "Neither the manager nor his assistant were at the meeting.",
                    "options": [
                          "Neither the manager nor his assistant was at the meeting.",
                          "Either the manager or his assistant were at the meeting.",
                          "Neither the manager nor his assistant are at the meeting.",
                          "The manager nor his assistant was at the meeting."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Neither...nor\" bilan fe'l ikkinchi sub'ektga mos keladi: \"nor his assistant was\"."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"Technology can improve productivity. It can also cause distraction.\" Use \"On the one hand...on the other hand\".",
                    "options": [
                          "On the one hand, technology can improve productivity; on the other hand, it can cause distraction.",
                          "On the one hand technology improve productivity on the other hand cause distraction.",
                          "On the one hand technology can improve productivity on the other hand distraction.",
                          "Technology can improve productivity on the one hand and distraction on the other."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"On the one hand...on the other hand\" ikki tomonlama ko'rinishni ifodalaydi."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "____ (Moreover/In conclusion/However), the evidence clearly supports the need for reform.",
                    "options": [
                          "Moreover",
                          "In conclusion",
                          "However",
                          "For example"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"In conclusion\" xulosa qilish uchun: dalillar islohot zarurligini ko'rsatadi."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Choose the correct correlative conjunction pair:",
                    "options": [
                          "Both John and Mary was present.",
                          "Either John or Mary are responsible.",
                          "Neither John nor Mary is responsible.",
                          "Not only John but also Mary were responsible."
                    ],
                    "correctAnswer": 2,
                    "explanation": "\"Neither...nor\" bilan fe'l ikkinchi sub'ektga (Mary) mos keladi: \"is responsible\"."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 9 created:", lesson47.title);

  // --- Grammar Lesson 10: Reported speech ---
  const lesson48 = await prisma.lesson.create({
    data: {
      title: "Reported speech",
      category: "grammar",
      durationMin: 20,
      isPremium: true,
      difficulty: "Hard",
      order: 48,
      prerequisiteLessonId: lesson47.id,
      theoryContent: `Reported speech (o'zlashtirma gap) boshqa birovning gapini o'z so'zlaringiz bilan ifodalashdir.

1. Tense changes (zamon o'zgarishi):
+-----------------------+------------------------------------------------------+
| Direct Speech         | Reported Speech                                      |
+-----------------------+------------------------------------------------------+
| Present Simple        | Past Simple                                           |
| Present Continuous    | Past Continuous                                       |
| Present Perfect       | Past Perfect                                          |
| Past Simple           | Past Perfect (yoki o'zgarmasligi mumkin)             |
| will                  | would                                                 |
| can                   | could                                                 |
| must                  | had to                                                |
| may                   | might                                                 |
+-----------------------+------------------------------------------------------+

2. Time and place changes:
+-----------------------+------------------------------------------------------+
| now -> then           | today -> that day                                     |
| yesterday -> the day  | tomorrow -> the next day / the following day          |
| before                | here -> there                                         |
| this -> that          | these -> those                                        |
+-----------------------+------------------------------------------------------+

3. Questions in reported speech:
   - Yes/No questions: if/whether. "Are you ready?" -> He asked if I was ready.
   - Wh-questions: wh- saqlanadi, so'z tartibi o'zgaradi
   - "Where do you live?" -> She asked where I lived.

4. Commands and requests:
   - tell + to + infinitive: "Sit down" -> He told me to sit down.
   - Negative: "Don't run" -> He told me not to run.
   - ask + to + infinitive: "Please help" -> She asked me to help.

Misol jumlalar:
1. The researcher stated that the results had been significant.
2. She asked me whether I had completed the assignment.
3. He told us not to make so much noise.
4. The professor explained that the experiment would take two weeks.
5. They suggested that we apply for a scholarship.`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Reported speechda zamonni bir qadam orqaga suring (backshift). Agar reporting verb present bo'lsa (He says...), zamon o'zgarmaydi.
2. 'Say' va 'tell' farqi: 'say something' (without object), 'tell someone something' (with object).
3. Reported questionda so'z tartibini o'zgartiring (Sub + V): "He asked where I lived" (not "where did I live").`,
      commonMistakes: `1. Reported questionda so'roq belgisi (?) va yordamchi fe'l (do/does/did) qo'yilmaydi.
2. "Say" va "tell" ni adashtirish: "He said me" (xato) -> "He told me" (to'g'ri) yoki "He said to me".
3. Reported speechda "that" tushirib qoldirilishi mumkin: "He said (that) he was tired".`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "She said she ____ (works/was working/had worked) at the company since 2015.",
                    "options": [
                          "works",
                          "worked",
                          "had worked",
                          "has worked"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Direct: \"I have worked since 2015\". Reported: Past Perfect — \"had worked\"."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct reported speech: He said, \"I will call you tomorrow.\"",
                    "options": [
                          "He said he will call me tomorrow.",
                          "He said he would call me the next day.",
                          "He said he would call me tomorrow.",
                          "He said he will call me the next day."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Will\" -> \"would\", \"tomorrow\" -> \"the next day\". Zamon va vaqt o'zgaradi."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "He asked me where did I live.",
                    "options": [
                          "He asked me where I lived.",
                          "He asked me where I live.",
                          "He asked me where did I lived.",
                          "He asked me where I did live."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Reported questionda so'z tartibi Sub + V: 'where I lived' (not 'where did I live')."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"Don't touch the equipment,\" the instructor said. Use \"told\".",
                    "options": [
                          "The instructor told don't touch the equipment.",
                          "The instructor told me not to touch the equipment.",
                          "The instructor told not to touch the equipment.",
                          "The instructor told me to not touch the equipment."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Negative command: 'told + object + not to + V1': 'told me not to touch'."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "She asked if I ____ (can/could/will) help her with the project.",
                    "options": [
                          "can",
                          "could",
                          "will",
                          "would"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Direct: \"Can you help?\" -> Reported: \"if I could help\" (can -> could)."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "The manager said that the meeting ____ postponed.",
                    "options": [
                          "is",
                          "was",
                          "has been",
                          "will be"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Direct: \"The meeting is postponed.\" Reported: Past Simple — \"was postponed\"."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "She said me that she was tired.",
                    "options": [
                          "She told me that she was tired.",
                          "She said to me that she was tired.",
                          "She said that she was tired.",
                          "She told that she was tired."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Say\" object olmaydi (said me -> xato). \"Tell\" object oladi: \"told me\"."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"Do you enjoy studying English?\" She asked me.",
                    "options": [
                          "She asked me if I enjoyed studying English.",
                          "She asked me do I enjoy studying English.",
                          "She asked me whether did I enjoy studying English.",
                          "She asked me if I enjoy studying English."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Yes/No question -> 'if/whether' + Sub + V: 'if I enjoyed'."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "He recommended that we ____ (apply/applied/would apply) for the scholarship.",
                    "options": [
                          "apply",
                          "applied",
                          "would apply",
                          "had applied"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Recommend that + Sub + V1 (subjunctive)\": \"that we apply\"."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Choose the correct reported command: \"Please sit down,\" the teacher said.",
                    "options": [
                          "The teacher said me to sit down.",
                          "The teacher told me to sit down.",
                          "The teacher asked me sit down.",
                          "The teacher told to me sit down."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Told + object + to + V1\": \"told me to sit down\"."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 10 created:", lesson48.title);

  // --- Grammar Lesson 11: Comparatives va superlatives ---
  const lesson49 = await prisma.lesson.create({
    data: {
      title: "Comparatives va superlatives",
      category: "grammar",
      durationMin: 20,
      isPremium: true,
      difficulty: "Easy",
      order: 49,
      prerequisiteLessonId: lesson48.id,
      theoryContent: `Comparatives va superlatives ikki yoki undan ortiq narsalarni taqqoslash uchun ishlatiladi. IELTS Writing Task 1 (ma'lumot taqqoslash) da juda muhim.

1. Comparative forms:
+-----------------------+------------------------------------------------------+
| Sifat                 | Comparative                                          |
+-----------------------+------------------------------------------------------+
| short (1-2 bo'gin)   | -er: tall -> taller, fast -> faster                  |
| -y bilan tugasa       | -ier: happy -> happier, easy -> easier               |
| long (2+ bo'gin)     | more + adj: more beautiful, more expensive           |
| Irregular             | good -> better, bad -> worse, far -> further         |
+-----------------------+------------------------------------------------------+

2. Superlative forms:
+-----------------------+------------------------------------------------------+
| short                 | the + -est: the tallest, the fastest                  |
| -y bilan tugasa       | the + -iest: the happiest, the easiest                |
| long                  | the most + adj: the most beautiful                    |
| Irregular             | the best, the worst, the furthest                     |
+-----------------------+------------------------------------------------------+

3. Taqqoslash tuzilmalari:
   - as + adj + as: She is as tall as her brother.
   - not as + adj + as: This book is not as interesting as that one.
   - the same + noun + as: He is the same age as me.
   - less + adj + than: This option is less expensive.

4. Modifiers with comparatives:
   - much / far / a lot / significantly + comparative: much better
   - a bit / slightly / a little + comparative: slightly higher
   - even / still + comparative: even worse

5. Double comparatives: The more you practice, the better you become.

Misol jumlalar:
1. The second graph shows a slightly higher percentage than the first.
2. London is one of the most expensive cities in the world.
3. The more time you dedicate to preparation, the higher your score will be.
4. This solution is far more effective than the alternative.
5. She scored as well as her classmate on the test.`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Comparative va superlative qo'shimchalarini to'g'ri ishlating: short adj -> -er/-est, long adj -> more/most. "More bigger" (xato) -> "bigger" (to'g'ri).
2. "Than" qiyoslashda muhim: "She is taller than me" (to'g'ri).
3. "The" superlative bilan doim ishlatiladi: "She is the best student" (to'g'ri).`,
      commonMistakes: `1. Ikki bo'ginli sifatlarda xato: "more smart" (xato) -> "smarter" (to'g'ri — bir bo'gin).
2. "As...as" o'rnida "so...as" ishlatish: "not so good as" -> "not as good as" (to'g'ri, zamonaviy).
3. Double comparativeda "the" ni unutish: "More you practice, better you get" (xato) -> "The more you practice, the better you get" (to'g'ri).`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "This year's results are ____ (good/better/best) than last year's.",
                    "options": [
                          "good",
                          "better",
                          "best",
                          "more good"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Than\" bilan comparative: \"better than\"."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct sentence:",
                    "options": [
                          "She is the most tallest girl in the class.",
                          "She is the tallest girl in the class.",
                          "She is the more tall girl in the class.",
                          "She is the most tall girl in the class."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Tall\" bir bo'ginli sifat -> \"the tallest\" (not \"the most tallest\")."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "This is the more expensive dress in the store.",
                    "options": [
                          "This is the most expensive dress in the store.",
                          "This is the expensive dress in the store.",
                          "This is a more expensive dress in the store.",
                          "This is the expensivest dress in the store."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Uch yoki undan ortiq narsa taqqoslanganda superlative: 'the most expensive'."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"This book is interesting. That book is also interesting.\" Use \"as...as\".",
                    "options": [
                          "This book is as interesting as that book.",
                          "This book is as interesting than that book.",
                          "This book is so interesting as that book.",
                          "This book is interesting as that one."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"As + adjective + as\": \"as interesting as\"."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "The ____ (much/more/most) you read, the better your vocabulary becomes.",
                    "options": [
                          "much",
                          "more",
                          "most",
                          "many"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Double comparative: \"The more...the better\"."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "Living in the city is ____ than living in the countryside.",
                    "options": [
                          "more expensive",
                          "expensiver",
                          "most expensive",
                          "more expensiver"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Expensive\" uch bo'ginli -> \"more expensive than\"."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "Her score is more higher than mine.",
                    "options": [
                          "Her score is higher than mine.",
                          "Her score is more high than mine.",
                          "Her score is the higher than mine.",
                          "Her score is much more higher than mine."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"High\" bir bo'ginli -> \"higher\" (not \"more higher\"). Modifier: \"much higher\"."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"This solution is better than any other.\" Use superlative.",
                    "options": [
                          "This is the best solution.",
                          "This is better solution.",
                          "This is the most best solution.",
                          "This is the good solution."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Superlative: \"the best\" (irregular: good -> better -> the best)."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "She speaks English ____ (fluent/more fluently/most fluently) than her brother.",
                    "options": [
                          "fluent",
                          "more fluent",
                          "more fluently",
                          "most fluently"
                    ],
                    "correctAnswer": 2,
                    "explanation": "Ravish (adverb) bilan comparative: 'more fluently than'."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "The population of Tokyo is ____ than that of Osaka.",
                    "options": [
                          "significantly larger",
                          "significant larger",
                          "significantly more large",
                          "more significantly large"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Comparative modifier: 'significantly' + comparative 'larger'."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 11 created:", lesson49.title);

  // --- Grammar Lesson 12: Advanced grammar structures ---
  const lesson50 = await prisma.lesson.create({
    data: {
      title: "Advanced grammar structures",
      category: "grammar",
      durationMin: 35,
      isPremium: true,
      difficulty: "Hard",
      order: 50,
      prerequisiteLessonId: lesson49.id,
      theoryContent: `Advanced grammar structures IELTS imtihonida yuqori ball (Band 7+) olish uchun muhimdir.

1. Inversion (teskari so'z tartibi)
+-----------------------+------------------------------------------------------+
| Qachon                | Misol                                                 |
+-----------------------+------------------------------------------------------+
| Salbiy so'zlar        | Never have I seen such beauty.                        |
| (never, rarely)       | Rarely do we see such dedication.                     |
| Only + vaqt           | Only after the exam did he realize.                   |
| Not until             | Not until later did she understand.                   |
| So/Such               | So difficult was the test that many failed.           |
| No sooner             | No sooner had we left than it rained.                 |
+-----------------------+------------------------------------------------------+

2. Cleft sentences (ajratilgan gaplar)
+-----------------------+------------------------------------------------------+
| Tuzilma               | Misol                                                 |
+-----------------------+------------------------------------------------------+
| It + be + focus +     | It was the government that made the decision.         |
| that/who              |                                                       |
| What + Sub + V +      | What we need is more investment in education.         |
| be + focus            |                                                       |
+-----------------------+------------------------------------------------------+

3. Participle clauses
+-----------------------+------------------------------------------------------+
| Present Participle    | Having finished the project, she submitted it.        |
| Past Participle       | Built in 1900, the building is historic.              |
| Perfect Participle    | Having been rejected, he tried again.                 |
+-----------------------+------------------------------------------------------+

4. Subjunctive mood: It is essential that every student be present.

Misol jumlalar:
1. Not until she received the results did she believe she had passed.
2. What makes a great leader is the ability to inspire others.
3. Having studied extensively, she felt confident about the exam.
4. It was the lack of preparation that led to the poor results.
5. Never before have I encountered such a challenging task.`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Inversiyada yordamchi fe'l sub'ektdan oldin keladi: "Never have I seen" (not "Never I have seen").
2. Cleft sentences urg'u berish uchun: "It was John who won" (emphasis on John).
3. Participle clauses faqat bir xil sub'ekt bilan ishlatiladi: "Walking home, I saw a dog" (I = walking).`,
      commonMistakes: `1. Inversiyada yordamchi fe'lni unutish: "Never I have seen" (xato) -> "Never have I seen" (to'g'ri).
2. Cleft sentencelarni haddan tashqari ko'p ishlatish — writingni sun'iy qiladi.
3. Participle clause va asosiy gap sub'ekti bir xil bo'lishi kerak: "Walking home, the rain started" (xato — rain cannot walk).`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "____ (Never I have/Never have I/Never I) seen such a beautiful sunset.",
                    "options": [
                          "Never I have",
                          "Never have I",
                          "Never I had",
                          "Never did I"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Salbiy so'z bilan boshlangan gapda inversion: 'Never have I seen'."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct cleft sentence:",
                    "options": [
                          "It was the teacher who helped me.",
                          "It was the teacher whom helped me.",
                          "It was the teacher which helped me.",
                          "It was the teacher helped me."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Cleft: 'It + be + focus + who/that'. Odam uchun 'who'."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "Not until the results were announced we knew the truth.",
                    "options": [
                          "Not until the results were announced did we know the truth.",
                          "Not until the results were announced we know the truth.",
                          "Not until the results announced we knew the truth.",
                          "Not until the results were announced we had known the truth."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Not until\" -> inversion: \"did we know\"."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"Because she studied hard, she passed.\" Use a participle clause.",
                    "options": [
                          "Having studied hard, she passed.",
                          "Studied hard, she passed.",
                          "She studied hard passing.",
                          "Because studying hard, she passed."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Perfect Participle: 'Having studied hard' (sababni ifodalaydi)."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "What we need ____ (is/are/will be) more investment in education.",
                    "options": [
                          "is",
                          "are",
                          "will be",
                          "has been"
                    ],
                    "correctAnswer": 0,
                    "explanation": "What clause singular -> 'is': 'What we need is more investment'."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "It is essential that every student ____ present for the exam.",
                    "options": [
                          "is",
                          "be",
                          "will be",
                          "being"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Subjunctive: 'essential that + Sub + V1 (be)': 'that every student be present'."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "No sooner we had left than it started to rain.",
                    "options": [
                          "No sooner had we left than it started to rain.",
                          "No sooner we left than it started to rain.",
                          "No sooner we have left than it started to rain.",
                          "No sooner had we left then it started to rain."
                    ],
                    "correctAnswer": 0,
                    "explanation": "No sooner -> inversion: 'No sooner had we left than...'"
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"The manager made the decision.\" Use a cleft sentence focusing on \"the manager\".",
                    "options": [
                          "The decision was made by the manager.",
                          "It was the manager who made the decision.",
                          "What the manager did was the decision.",
                          "It was the decision the manager made."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Cleft: 'It was the manager who made the decision.'"
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "Only after the deadline ____ (did they realize/they realized/they did realize) their mistake.",
                    "options": [
                          "did they realize",
                          "they realized",
                          "they did realize",
                          "realized they"
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Only after\" -> inversion: \"did they realize\"."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "The conditions ____ the experiment was conducted were ideal.",
                    "options": [
                          "under which",
                          "which",
                          "that",
                          "where"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Relative clause with preposition: 'the conditions under which' (rasmiy)."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 12 created:", lesson50.title);

  // --- Grammar Lesson 13: Error correction practice ---
  const lesson51 = await prisma.lesson.create({
    data: {
      title: "Error correction practice",
      category: "grammar",
      durationMin: 30,
      isPremium: true,
      difficulty: "Hard",
      order: 51,
      prerequisiteLessonId: lesson50.id,
      theoryContent: `Error correction — bu sizning grammatik bilimingizni sinashning eng samarali usullaridan biridir.

Eng ko'p uchraydigan grammatik xatolar:

1. Subject-Verb Agreement (sub'ekt-fe'l mosligi)
+-----------------------+------------------------------------------------------+
| Xato                  | To'g'ri                                               |
+-----------------------+------------------------------------------------------+
| The team are playing  | The team is playing well. (collective noun -> sing.)  |
| Each of the students  | Each of the students has a book. (each -> singular)   |
| have a book.          |                                                       |
+-----------------------+------------------------------------------------------+

2. Tense errors:
   - Wrong: I have seen him yesterday. -> Correct: I saw him yesterday.
   - Wrong: She is working here since 2020. -> Correct: She has been working here since 2020.

3. Preposition errors:
   - Wrong: We discussed about the problem. -> Correct: We discussed the problem.
   - Wrong: She is married with a doctor. -> Correct: She is married to a doctor.

4. Article errors:
   - Wrong: I go to the school every day. (as a student) -> Correct: I go to school every day.
   - Wrong: The life is beautiful. -> Correct: Life is beautiful. (general)

5. Word order errors:
   - Wrong: She speaks very well English. -> Correct: She speaks English very well.

6. Double negative: Wrong: I don't have nothing. -> Correct: I don't have anything.

Misol jumlalar:
1. (Xato) The number of students are increasing. -> (To'g'ri) The number of students is increasing.
2. (Xato) She didn't went to the party. -> (To'g'ri) She didn't go to the party.
3. (Xato) I look forward to meet you. -> (To'g'ri) I look forward to meeting you.
4. (Xato) It is one of the most important thing. -> (To'g'ri) It is one of the most important things.
5. (Xato) If I will be late, I will call you. -> (To'g'ri) If I am late, I will call you.`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Yozganingizdan keyin har doim matnni tekshiring. Eng ko'p uchraydigan xatolar: -s qo'shimchasi, artikllar va predloglar.
2. Xatolarni topish uchun gapni ovoz chiqarib o'qing — ko'p xatolar quloqqa chalinadi.
3. O'zingizning "error pattern"ingizni bilib oling. Eng ko'p qaysi turdagi xatolarga yo'l qo'yasiz?`,
      commonMistakes: `1. "One of the + superlative + plural noun": "One of the best students" (ko'plik, birlik emas).
2. "Did" dan keyin V1 ishlatiladi, V2 emas: "didn't go" (not "didn't went").
3. "Look forward to" dan keyin gerund (V-ing): "look forward to meeting" (not "meet").`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "error-correction",
                    "question": "The number of students are increasing every year.",
                    "options": [
                          "The number of students is increasing every year.",
                          "The numbers of students are increasing every year.",
                          "A number of students are increasing every year.",
                          "The number of student are increasing every year."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"The number of\" singular -> \"is increasing\". \"A number of\" plural -> \"are\"."
              },
              {
                    "id": 2,
                    "type": "fill-blank",
                    "question": "She didn't ____ (went/go/gone) to the meeting yesterday.",
                    "options": [
                          "went",
                          "go",
                          "gone",
                          "going"
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Didn't\" dan keyin V1: \"didn't go\"."
              },
              {
                    "id": 3,
                    "type": "multiple-choice",
                    "question": "Which sentence is grammatically correct?",
                    "options": [
                          "I look forward to meet you.",
                          "I look forward to meeting you.",
                          "I look forward to met you.",
                          "I look forward for meeting you."
                    ],
                    "correctAnswer": 1,
                    "explanation": "\"Look forward to\" + gerund (V-ing): \"to meeting you\"."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform to correct: \"I have visited the museum yesterday.\"",
                    "options": [
                          "I visited the museum yesterday.",
                          "I have visited the museum yesterday.",
                          "I had visited the museum yesterday.",
                          "I was visiting the museum yesterday."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Yesterday\" aniq o'tgan vaqt -> Past Simple: \"visited\"."
              },
              {
                    "id": 5,
                    "type": "error-correction",
                    "question": "It is one of the most important decision of my life.",
                    "options": [
                          "It is one of the most important decisions of my life.",
                          "It is one of the most important decision in my life.",
                          "It is one of the more important decisions of my life.",
                          "It is a most important decision of my life."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"One of the + superlative + plural noun\": \"one of the most important decisions\"."
              },
              {
                    "id": 6,
                    "type": "fill-blank",
                    "question": "If I ____ (will be/am/would be) late, I will call you.",
                    "options": [
                          "will be",
                          "am",
                          "would be",
                          "was"
                    ],
                    "correctAnswer": 1,
                    "explanation": "First Conditional: If + Present Simple + will. 'If I am late'."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "She is married with a successful businessman.",
                    "options": [
                          "She is married to a successful businessman.",
                          "She is married by a successful businessman.",
                          "She married with a successful businessman.",
                          "She was married with a successful businessman."
                    ],
                    "correctAnswer": 0,
                    "explanation": "\"Married to\" (not \"married with\"): \"married to a businessman\"."
              },
              {
                    "id": 8,
                    "type": "multiple-choice",
                    "question": "Choose the correct word order:",
                    "options": [
                          "She speaks very well English.",
                          "She speaks English very well.",
                          "She very well speaks English.",
                          "She speaks English well very."
                    ],
                    "correctAnswer": 1,
                    "explanation": "To'g'ri so'z tartibi: Subject + Verb + Object + Adverb: 'speaks English very well'."
              },
              {
                    "id": 9,
                    "type": "transformation",
                    "question": "Transform to correct: \"I don't have nothing to say.\"",
                    "options": [
                          "I don't have anything to say.",
                          "I don't have nothing to say.",
                          "I have nothing to say.",
                          "I haven't nothing to say."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Double negative noto'g'ri. 'I don't have anything' yoki 'I have nothing'."
              },
              {
                    "id": 10,
                    "type": "error-correction",
                    "question": "The committee have made their decision. (British English context)",
                    "options": [
                          "The committee has made its decision.",
                          "The committee have made its decision.",
                          "The committee has made their decision.",
                          "The committee have made a decision."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Collective noun (committee) singular -> 'has' va 'its'."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 13 created:", lesson51.title);

  // --- Grammar Lesson 14: Grammar review test ---
  const lesson52 = await prisma.lesson.create({
    data: {
      title: "Grammar review test",
      category: "grammar",
      durationMin: 45,
      isPremium: true,
      difficulty: "Hard",
      order: 52,
      prerequisiteLessonId: lesson51.id,
      theoryContent: `Ushbu dars oldingi grammatika darslarida o'rganilgan barcha mavzular bo'yicha umumiy takrorlash testidir.

Asosiy mavzular qisqacha:

1. Zamonlar (Tenses):
+-----------------------+------------------------------------------------------+
| Zamon                 | Asosiy ishlatilishi                                   |
+-----------------------+------------------------------------------------------+
| Present Simple        | Odatlar, umumiy haqiqatlar                            |
| Present Continuous    | Hozirgi daqiqa, rejalar                               |
| Present Perfect       | Tajriba, natija, davom                                |
| Past Simple           | Tugallangan o'tgan harakat                            |
| Future Simple         | Bashorat, bir zumda qaror                            |
+-----------------------+------------------------------------------------------+

2. Conditionals: Zero (If + Present + Present), First (If + Present + will),
   Second (If + Past + would), Third (If + Past Perfect + would have + V3)

3. Passive Voice: be + V3. Zamon bo'yicha o'zgaradi.

4. Reported Speech: Backshift! Present -> Past, Past -> Past Perfect, will -> would

5. Articles: a/an (umumiy), the (aniq), zero article (umumiy ko'plik/mavhum)

6. Linking words: however (zid), moreover (qo'shimcha), therefore (natija)

7. Relative clauses: who (odam), which (narsa), where (joy), whose (egalik)

Misol jumlalar:
1. By the time we arrived, the meeting had already started. (Past Perfect)
2. The new policy was implemented last year. (Passive Voice)
3. If I had known earlier, I would have helped you. (Third Conditional)
4. She asked me where I was going. (Reported Speech)
5. The more you practice, the more confident you become. (Double Comparative)`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Test davomida vaqtni to'g'ri taqsimlang — har bir savolga 1-2 daqiqa ajrating.
2. Agar biror savolga ishonchingiz komil bo'lmasa, keyingi savolga o'tib, vaqtingiz qolsa qayting.
3. Xato qilgan savollaringizni belgilab qo'ying — ular sizning zaif tomonlaringizni ko'rsatadi.`,
      commonMistakes: `1. Past Perfectni ko'p ishlatish xatosi: faqat ikkita o'tgan harakatning ketma-ketligini ko'rsatishda kerak.
2. Passive voice va active voiceda zamonni bir xil saqlash: "is written" (Present), "was written" (Past).
3. Reported speechda "say" va "tell" ni adashtirish: "He told me that he was leaving" (to'g'ri).`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "By the time we arrived, the meeting ____ (start) already.",
                    "options": [
                          "started",
                          "had started",
                          "has started",
                          "was starting"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Yig'ilish kelishdan oldin boshlangan -> Past Perfect: 'had started'."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the correct passive sentence:",
                    "options": [
                          "The report was written by Sarah.",
                          "The report wrote by Sarah.",
                          "The report is wrote by Sarah.",
                          "The report was wrote by Sarah."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Past Simple Passive: 'was written' (V3, not V2)."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "If I would have more time, I would learn a new language.",
                    "options": [
                          "If I had more time, I would learn a new language.",
                          "If I have more time, I would learn a new language.",
                          "If I will have more time, I would learn a new language.",
                          "If I would had more time, I would learn a new language."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Second Conditional: If + Past Simple (had) + would + V1."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform to reported speech: \"I am studying for the exam,\" she said.",
                    "options": [
                          "She said she is studying for the exam.",
                          "She said she was studying for the exam.",
                          "She said she studied for the exam.",
                          "She said she has been studying for the exam."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Present Continuous -> Past Continuous: 'was studying'."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "____ (The/A/No article) education plays a vital role in personal development.",
                    "options": [
                          "The",
                          "An",
                          "A",
                          "No article"
                    ],
                    "correctAnswer": 3,
                    "explanation": "Umumiy mavhum tushuncha -> zero article: 'Education plays...'."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "Which linking word shows contrast?",
                    "options": [
                          "Furthermore",
                          "Moreover",
                          "However",
                          "Therefore"
                    ],
                    "correctAnswer": 2,
                    "explanation": "\"However\" qarama-qarshilikni ifodalaydi."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "The woman which lives next door is a doctor.",
                    "options": [
                          "The woman who lives next door is a doctor.",
                          "The woman whom lives next door is a doctor.",
                          "The woman that lives next door is a doctor.",
                          "The woman whose lives next door is a doctor."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Odamlar uchun \"who\" (subject). \"Which\" narsalar uchun."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform to passive: \"The company will launch a new product next month.\"",
                    "options": [
                          "A new product will be launched next month.",
                          "A new product will launch next month.",
                          "A new product is launched next month.",
                          "A new product was launched next month."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Future Simple Passive: 'will be launched'."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "If I ____ (know) about the meeting, I would have attended.",
                    "options": [
                          "knew",
                          "had known",
                          "have known",
                          "know"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Third Conditional: If + Past Perfect (had known)."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Choose the correct reported question:",
                    "options": [
                          "She asked when would the results be published.",
                          "She asked when the results would be published.",
                          "She asked when will the results be published.",
                          "She asked when the results will be published."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Reported question: wh + Sub + V. 'when the results would be published'."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 14 created:", lesson52.title);

  // --- Grammar Lesson 15: Full grammar workshop ---
  const lesson53 = await prisma.lesson.create({
    data: {
      title: "Full grammar workshop",
      category: "grammar",
      durationMin: 60,
      isPremium: true,
      difficulty: "Hard",
      order: 53,
      prerequisiteLessonId: lesson52.id,
      theoryContent: `Full grammar workshop — bu barcha grammatik mavzularni amaliyotda qo'llash uchun keng qamrovli darsdir.

Ushbu workshopda siz quyidagi ko'nikmalarni rivojlantirasiz:
- Barcha zamonlarni to'g'ri ishlatish
- Conditionals va passive voice ni qo'llash
- Reported speech va relative clauses ni ishlatish
- Modal fe'llar, artikllar va predloglarni to'g'ri qo'llash
- Murakkab gap tuzilmalarini yaratish
- Linking words bilan matnni bog'lash

IELTS imtihonida grammatik xilma-xillik va aniqlik Band 7+ olishning kalitidir. Quyidagi jadvalda har bir band darajasi uchun grammatik talablar ko'rsatilgan:

+-----------------------+------------------------------------------------------+
| Band                  | Grammatik talablar                                   |
+-----------------------+------------------------------------------------------+
| Band 5                | Simple tuzilmalar, ko'p xatolar, ma'no tushunarli    |
| Band 6                | Aralash tuzilmalar, ba'zi xatolar, yaxshi nazorat    |
| Band 7                | Murakkab tuzilmalar, kam xatolar, yaxshi nazorat     |
| Band 8                | Keng ko'lamli tuzilmalar, juda kam xatolar           |
| Band 9                | To'liq xilma-xillik, deyarli xatosiz                |
+-----------------------+------------------------------------------------------+

Misol jumlalar (Band 7+):
1. Having analysed the data, the researchers concluded that the hypothesis was correct.
2. What distinguishes successful students from others is their consistency in practicing.
3. Not until she reviewed her mistakes did she realise what she had been doing wrong.
4. The extent to which grammar affects your overall band score is often underestimated.
5. Were the government to invest more in education, the long-term benefits would be substantial.`,
      passageText: null,
      audioUrl: null,
      transcriptText: null,
      tipsAndTricks: `1. Murakkab tuzilmalarni majburan ishlatmang — faqat o'zingiz ishonchli ishlatadigan tuzilmalarni qo'llang.
2. IELTS Writingda grammatik xilma-xillik muhim: bir xil tuzilmani takrorlamang, turli zamon va tuzilmalarni aralashtiring.
3. Proofreading — writingning eng muhim qismi. Yozganingizdan keyin 2-3 daqiqa tekshirishga ajrating.`,
      commonMistakes: `1. Haddan tashqari murakkab tuzilmalarni ishlatish — xato qilish ehtimolini oshiradi. Simple va to'g'ri jumla murakkab va xatolidan yaxshiroq.
2. Bir xil linking words ni takrorlash: "Moreover... Moreover... Moreover" o'rniga "Furthermore", "In addition", "Additionally" ni navbat bilan ishlating.
3. Writingda faqat bitta zamonni ishlatish — xato. Vaziyatga qarab turli zamonlarni qo'llang.`,
      questions: JSON.stringify([
              {
                    "id": 1,
                    "type": "fill-blank",
                    "question": "Having ____ (analyse/analysed/analysing) the data, the team published their findings.",
                    "options": [
                          "analyse",
                          "analysed",
                          "analysing",
                          "been analysed"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Perfect Participle: Having + V3. 'Having analysed the data' -- ma'lumotni tahlil qilib bo'lgach."
              },
              {
                    "id": 2,
                    "type": "multiple-choice",
                    "question": "Choose the Band 7+ level sentence:",
                    "options": [
                          "The government should invest in education.",
                          "What the government should do is invest more in education.",
                          "Government invest education.",
                          "Government should to invest in education."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Cleft sentence: 'What the government should do is invest more' — Band 7+ tuzilma."
              },
              {
                    "id": 3,
                    "type": "error-correction",
                    "question": "Were the government to invests more, the benefits would be substantial.",
                    "options": [
                          "Were the government to invest more, the benefits would be substantial.",
                          "Were the government invests more, the benefits would be substantial.",
                          "Were the government to invested more, the benefits would be substantial.",
                          "Were the government investing more, the benefits would be substantial."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Inversion in conditional: 'Were + Sub + to + V1'. 'Were the government to invest'."
              },
              {
                    "id": 4,
                    "type": "transformation",
                    "question": "Transform: \"She didn't realize her mistake until later.\" Begin with \"Not until...\".",
                    "options": [
                          "Not until later did she realize her mistake.",
                          "Not until later she realized her mistake.",
                          "Not until later she did realize her mistake.",
                          "Not until later realized she her mistake."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Inversion: 'Not until later did she realize'."
              },
              {
                    "id": 5,
                    "type": "fill-blank",
                    "question": "The extent to ____ (which/that/whom) grammar affects your score is significant.",
                    "options": [
                          "which",
                          "that",
                          "whom",
                          "whose"
                    ],
                    "correctAnswer": 0,
                    "explanation": "Relative clause with preposition: 'the extent to which' (rasmiy tuzilma)."
              },
              {
                    "id": 6,
                    "type": "multiple-choice",
                    "question": "Which sentence uses mixed conditional correctly?",
                    "options": [
                          "If I would have taken that job, I will be rich now.",
                          "If I had taken that job, I would be rich now.",
                          "If I take that job, I would be rich now.",
                          "If I took that job, I will be rich now."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Mixed Conditional: If + Past Perfect (had taken) + would + V1 (would be). O'tmish + hozirgi natija."
              },
              {
                    "id": 7,
                    "type": "error-correction",
                    "question": "The degree which the economy has recovered is surprising.",
                    "options": [
                          "The degree to which the economy has recovered is surprising.",
                          "The degree that the economy has recovered is surprising.",
                          "The degree which the economy has recovered to is surprising.",
                          "The degree in which the economy has recovered is surprising."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Rasmiy tuzilma: 'the degree to which'."
              },
              {
                    "id": 8,
                    "type": "transformation",
                    "question": "Transform: \"People often underestimate the importance of grammar.\" Use passive voice.",
                    "options": [
                          "The importance of grammar is often underestimated.",
                          "The importance of grammar often underestimates.",
                          "Grammar importance is often underestimated by people.",
                          "People are often underestimated the importance of grammar."
                    ],
                    "correctAnswer": 0,
                    "explanation": "Passive: 'The importance of grammar is often underestimated'."
              },
              {
                    "id": 9,
                    "type": "fill-blank",
                    "question": "____ (Were/Had/Should) I known earlier, I would have acted differently.",
                    "options": [
                          "Were",
                          "Had",
                          "Should",
                          "Did"
                    ],
                    "correctAnswer": 1,
                    "explanation": "Inversion in Third Conditional: 'Had I known' = 'If I had known'."
              },
              {
                    "id": 10,
                    "type": "multiple-choice",
                    "question": "Choose the grammatically correct complex sentence:",
                    "options": [
                          "Not only the economy has recovered but also grown.",
                          "Not only has the economy recovered but also grown.",
                          "Not only the economy recovered but also it grown.",
                          "Not only the economy has been recovered but also grew."
                    ],
                    "correctAnswer": 1,
                    "explanation": "Inversion with 'Not only': 'Not only has the economy recovered but also grown'."
              }
      ]),
    },
  });
  console.log("Grammar Lesson 15 created:", lesson53.title);


  // --- Vocabulary Lesson 1: Academic Word List - 1 ---
  const lesson54 = await prisma.lesson.create({
    data: {
      title: "Academic Word List - 1",
      category: "vocabulary",
      durationMin: 25,
      isPremium: false,
      difficulty: "Easy",
      order: 54,
      prerequisiteLessonId: null,
      theoryContent: `<p>Academic Word List (AWL) — bu ilmiy matnlarda eng ko'p uchraydigan 570 ta so'zdan iborat ro'yxat bo'lib, ularni o'rganish IELTS imtihonida yuqori ball olishga yordam beradi. Ushbu darsda AWL Sublist 1 dan 20 ta so'z o'rganamiz.</p>

<p><strong>AWL ni o'rganishning afzalliklari:</strong></p>
<ul>
<li>Akademik matnlarni tushunish osonlashadi</li>
<li>Writing task 2 da yuqori sifatli lug'at ishlatish imkonini beradi</li>
<li>Reading bo'limidagi matnlarni tez va aniq tushunishga yordam beradi</li>
</ul>

<p>Quyidagi jadvalda Sublist 1 so'zlari keltirilgan:</p>

<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">So'z</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi (English)</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Tarjima (Uzbek)</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">analyze</td><td class="border border-gray-300 px-4 py-2">to examine in detail</td><td class="border border-gray-300 px-4 py-2">tahlil qilish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">approach</td><td class="border border-gray-300 px-4 py-2">a way of dealing with something</td><td class="border border-gray-300 px-4 py-2">yondashish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">area</td><td class="border border-gray-300 px-4 py-2">a subject or field of study</td><td class="border border-gray-300 px-4 py-2">soha, hudud</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">assess</td><td class="border border-gray-300 px-4 py-2">to evaluate or estimate</td><td class="border border-gray-300 px-4 py-2">baholash</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">assume</td><td class="border border-gray-300 px-4 py-2">to suppose without proof</td><td class="border border-gray-300 px-4 py-2">taxmin qilish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">authority</td><td class="border border-gray-300 px-4 py-2">the power to give orders</td><td class="border border-gray-300 px-4 py-2">hokimiyat, vakolat</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">available</td><td class="border border-gray-300 px-4 py-2">able to be used</td><td class="border border-gray-300 px-4 py-2">mavjud</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">benefit</td><td class="border border-gray-300 px-4 py-2">an advantage or profit</td><td class="border border-gray-300 px-4 py-2">foyda</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">concept</td><td class="border border-gray-300 px-4 py-2">an abstract idea</td><td class="border border-gray-300 px-4 py-2">tushuncha</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">consistent</td><td class="border border-gray-300 px-4 py-2">unchanging over time</td><td class="border border-gray-300 px-4 py-2">izchil</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">constitutional</td><td class="border border-gray-300 px-4 py-2">relating to a constitution</td><td class="border border-gray-300 px-4 py-2">konstitutsiyaviy</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">context</td><td class="border border-gray-300 px-4 py-2">circumstances of an event</td><td class="border border-gray-300 px-4 py-2">kontekst</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">contract</td><td class="border border-gray-300 px-4 py-2">a formal agreement</td><td class="border border-gray-300 px-4 py-2">shartnoma</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">create</td><td class="border border-gray-300 px-4 py-2">to bring into existence</td><td class="border border-gray-300 px-4 py-2">yaratish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">data</td><td class="border border-gray-300 px-4 py-2">information collected for analysis</td><td class="border border-gray-300 px-4 py-2">ma'lumotlar</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">definition</td><td class="border border-gray-300 px-4 py-2">a statement of meaning</td><td class="border border-gray-300 px-4 py-2">ta'rif</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">derived</td><td class="border border-gray-300 px-4 py-2">obtained from a source</td><td class="border border-gray-300 px-4 py-2">olingan, kelib chiqqan</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">distribution</td><td class="border border-gray-300 px-4 py-2">the act of spreading something</td><td class="border border-gray-300 px-4 py-2">taqsimot</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">economic</td><td class="border border-gray-300 px-4 py-2">relating to the economy</td><td class="border border-gray-300 px-4 py-2">iqtisodiy</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">environment</td><td class="border border-gray-300 px-4 py-2">the surroundings or conditions</td><td class="border border-gray-300 px-4 py-2">atrof-muhit</td></tr>
</tbody>
</table>

<p>Ushbu so'zlarni eslab qolish uchun ularni kontekstda o'rganish eng samarali usul hisoblanadi. Har bir so'z bilan kamida 3 tadan jumla tuzib ko'ring.</p>`,
      tipsAndTricks: `1. Yangi so'zlarni o'rganishda "spaced repetition" usulidan foydalaning — so'zlarni 1 kun, 3 kun, 7 kun va 30 kundan keyin takrorlang.
2. Har bir so'z uchun assotsiatsiya yarating: masalan, "analyze" so'zini "analiz" (o'zbekcha) bilan bog'lang.
3. AWL so'zlarini IELTS Writingda faol ishlatishga harakat qiling — har kuni 5 ta yangi so'z bilan jumla tuzing.`,
      commonMistakes: `1. So'zlarni faqat tarjimasini yodlab, kontekstda ishlata olmaslik — har bir so'zni kamida 3 xil kontekstda qo'llang.
2. Bir so'zning faqat bitta ma'nosini bilish — ko'p so'zlarning bir necha ma'nosi bor (masalan, "area" — soha va hudud).
3. Academic so'zlarni kundalik so'zlar bilan aralashtirish — AWL so'zlari rasmiy uslubga tegishli, informal matnlarda ishlatmang.`,
      passageText: `Academic Word List 1 (AWL Sublist 1)

This lesson covers the first 20 words from the Academic Word List, which are essential for IELTS preparation.

Words: analyze, approach, area, assess, assume, authority, available, benefit, concept, consistent, constitutional, context, contract, create, data, definition, derived, distribution, economic, environment`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "analyze", options: ["a) tahlil qilish", "b) yondashish", "c) yaratish", "d) baholash"], correctAnswer: 0, explanation: "Analyze — tahlil qilish, batafsil o'rganish ma'nosini bildiradi." },
        { id: 2, type: "fill-blank", question: "The researchers will ____ the data to find patterns.", options: ["analyze", "create", "assess", "assume"], correctAnswer: 0, explanation: "Ma'lumotlarni tahlil qilish — 'analyze the data' deyiladi." },
        { id: 3, type: "matching", question: "approach", options: ["a) baholash", "b) yondashish", "c) mavjud", "d) ta'rif"], correctAnswer: 1, explanation: "Approach — yondashish yoki muammoga yechim topish usuli." },
        { id: 4, type: "multiple-choice", question: "Which word means 'to suppose without proof'?", options: ["assess", "assume", "create", "derive"], correctAnswer: 1, explanation: "Assume — taxmin qilish, isbotsiz faraz qilish." },
        { id: 5, type: "fill-blank", question: "The ____ shows that the economy is growing.", options: ["data", "concept", "contract", "context"], correctAnswer: 0, explanation: "Data — ma'lumotlar, statistik axborot." },
        { id: 6, type: "matching", question: "benefit", options: ["a) kontekst", "b) foyda", "c) shartnoma", "d) izchil"], correctAnswer: 1, explanation: "Benefit — foyda, naf." },
        { id: 7, type: "multiple-choice", question: "What is the meaning of 'consistent'?", options: ["konstitutsiyaviy", "izchil", "mavjud", "iqtisodiy"], correctAnswer: 1, explanation: "Consistent — izchil, o'zgarmas." },
        { id: 8, type: "fill-blank", question: "The government must ____ the situation before making a decision.", options: ["assess", "assume", "analyze", "create"], correctAnswer: 0, explanation: "Assess — baholash, vaziyatni tahlil qilish." },
        { id: 9, type: "matching", question: "context", options: ["a) shartnoma", "b) kontekst", "c) ta'rif", "d) taqsimot"], correctAnswer: 1, explanation: "Context — kontekst, vaziyat yoki sharoit." },
        { id: 10, type: "multiple-choice", question: "Which word relates to 'the economy'?", options: ["constitutional", "economic", "consistent", "available"], correctAnswer: 1, explanation: "Economic — iqtisodiy, iqtisodiyotga oid." },
        { id: 11, type: "fill-blank", question: "A ____ is a formal agreement between two parties.", options: ["contract", "concept", "context", "definition"], correctAnswer: 0, explanation: "Contract — shartnoma, ikki tomon o'rtasidagi kelishuv." },
        { id: 12, type: "matching", question: "environment", options: ["a) atrof-muhit", "b) iqtisodiy", "c) taqsimot", "d) yaratish"], correctAnswer: 0, explanation: "Environment — atrof-muhit, muhit." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson54.id, word: "analyze", meaning: "to examine something in detail", translation: "tahlil qilish", exampleSentence: "Scientists analyze data to draw conclusions.", audioUrl: null },
      { lessonId: lesson54.id, word: "approach", meaning: "a way of dealing with something", translation: "yondashish", exampleSentence: "We need a new approach to solving this problem.", audioUrl: null },
      { lessonId: lesson54.id, word: "area", meaning: "a subject or field of study", translation: "soha, hudud", exampleSentence: "She specializes in the area of environmental science.", audioUrl: null },
      { lessonId: lesson54.id, word: "assess", meaning: "to evaluate or estimate", translation: "baholash", exampleSentence: "Teachers assess students' progress regularly.", audioUrl: null },
      { lessonId: lesson54.id, word: "assume", meaning: "to suppose without proof", translation: "taxmin qilish", exampleSentence: "I assume you have completed the assignment.", audioUrl: null },
      { lessonId: lesson54.id, word: "authority", meaning: "the power to give orders", translation: "hokimiyat, vakolat", exampleSentence: "The local authority is responsible for education.", audioUrl: null },
      { lessonId: lesson54.id, word: "available", meaning: "able to be used or obtained", translation: "mavjud", exampleSentence: "The report is available on the website.", audioUrl: null },
      { lessonId: lesson54.id, word: "benefit", meaning: "an advantage or profit", translation: "foyda", exampleSentence: "Regular exercise has many health benefits.", audioUrl: null },
      { lessonId: lesson54.id, word: "concept", meaning: "an abstract idea", translation: "tushuncha", exampleSentence: "The concept of democracy is fundamental to modern society.", audioUrl: null },
      { lessonId: lesson54.id, word: "consistent", meaning: "unchanging over time", translation: "izchil", exampleSentence: "Her performance has been consistent throughout the year.", audioUrl: null },
      { lessonId: lesson54.id, word: "constitutional", meaning: "relating to a constitution", translation: "konstitutsiyaviy", exampleSentence: "The new law is constitutional and does not violate any rights.", audioUrl: null },
      { lessonId: lesson54.id, word: "context", meaning: "circumstances of an event", translation: "kontekst", exampleSentence: "You need to understand the historical context of the issue.", audioUrl: null },
      { lessonId: lesson54.id, word: "contract", meaning: "a formal agreement", translation: "shartnoma", exampleSentence: "Both parties signed the contract yesterday.", audioUrl: null },
      { lessonId: lesson54.id, word: "create", meaning: "to bring into existence", translation: "yaratish", exampleSentence: "The government plans to create more job opportunities.", audioUrl: null },
      { lessonId: lesson54.id, word: "data", meaning: "information collected for analysis", translation: "ma'lumotlar", exampleSentence: "The data was collected from 500 participants.", audioUrl: null },
      { lessonId: lesson54.id, word: "definition", meaning: "a statement of meaning", translation: "ta'rif", exampleSentence: "Can you give me a definition of this term?", audioUrl: null },
      { lessonId: lesson54.id, word: "derived", meaning: "obtained from a source", translation: "olingan", exampleSentence: "This word is derived from Latin.", audioUrl: null },
      { lessonId: lesson54.id, word: "distribution", meaning: "the act of spreading something", translation: "taqsimot", exampleSentence: "The distribution of wealth is unequal in many countries.", audioUrl: null },
      { lessonId: lesson54.id, word: "economic", meaning: "relating to the economy", translation: "iqtisodiy", exampleSentence: "The country is facing economic challenges.", audioUrl: null },
      { lessonId: lesson54.id, word: "environment", meaning: "the surroundings or conditions", translation: "atrof-muhit", exampleSentence: "We must protect the environment for future generations.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 1 created:", lesson54.title);

  // --- Vocabulary Lesson 2: Academic Word List - 2 ---
  const lesson55 = await prisma.lesson.create({
    data: {
      title: "Academic Word List - 2",
      category: "vocabulary",
      durationMin: 25,
      isPremium: false,
      difficulty: "Medium",
      order: 55,
      prerequisiteLessonId: lesson54.id,
      theoryContent: `<p>Academic Word List Sublist 2 navbatdagi 20 ta muhim akademik so'zni o'z ichiga oladi. Ushbu so'zlar IELTS Reading va Writing bo'limlarida tez-tez uchraydi.</p>

<p><strong>AWL Sublist 2 so'zlari akademik matnlarda muhim rol o'ynaydi:</strong></p>

<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">So'z</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi (English)</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Tarjima (Uzbek)</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">establish</td><td class="border border-gray-300 px-4 py-2">to set up or create</td><td class="border border-gray-300 px-4 py-2">tashkil etish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">estimate</td><td class="border border-gray-300 px-4 py-2">to roughly calculate</td><td class="border border-gray-300 px-4 py-2">taxmin qilish, baholash</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">evidence</td><td class="border border-gray-300 px-4 py-2">proof or facts</td><td class="border border-gray-300 px-4 py-2">dalil</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">export</td><td class="border border-gray-300 px-4 py-2">to send goods abroad</td><td class="border border-gray-300 px-4 py-2">eksport qilish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">factor</td><td class="border border-gray-300 px-4 py-2">a contributing element</td><td class="border border-gray-300 px-4 py-2">omil</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">finance</td><td class="border border-gray-300 px-4 py-2">management of money</td><td class="border border-gray-300 px-4 py-2">moliya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">formula</td><td class="border border-gray-300 px-4 py-2">a method or rule</td><td class="border border-gray-300 px-4 py-2">formula</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">function</td><td class="border border-gray-300 px-4 py-2">a purpose or role</td><td class="border border-gray-300 px-4 py-2">funksiya, vazifa</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">identified</td><td class="border border-gray-300 px-4 py-2">recognized or discovered</td><td class="border border-gray-300 px-4 py-2">aniqlangan</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">income</td><td class="border border-gray-300 px-4 py-2">money received</td><td class="border border-gray-300 px-4 py-2">daromad</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">indicate</td><td class="border border-gray-300 px-4 py-2">to show or point out</td><td class="border border-gray-300 px-4 py-2">ko'rsatish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">individual</td><td class="border border-gray-300 px-4 py-2">a single person</td><td class="border border-gray-300 px-4 py-2">shaxs, individual</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">interpretation</td><td class="border border-gray-300 px-4 py-2">explanation of meaning</td><td class="border border-gray-300 px-4 py-2">talqin, izoh</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">involved</td><td class="border border-gray-300 px-4 py-2">connected or included</td><td class="border border-gray-300 px-4 py-2">jalb qilingan</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">issues</td><td class="border border-gray-300 px-4 py-2">important topics or problems</td><td class="border border-gray-300 px-4 py-2">masalalar</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">labor</td><td class="border border-gray-300 px-4 py-2">work or workers</td><td class="border border-gray-300 px-4 py-2">mehnat</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">legal</td><td class="border border-gray-300 px-4 py-2">relating to law</td><td class="border border-gray-300 px-4 py-2">qonuniy</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">legislation</td><td class="border border-gray-300 px-4 py-2">laws collectively</td><td class="border border-gray-300 px-4 py-2">qonunchilik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">major</td><td class="border border-gray-300 px-4 py-2">important or serious</td><td class="border border-gray-300 px-4 py-2">asosiy, muhim</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">method</td><td class="border border-gray-300 px-4 py-2">a way of doing something</td><td class="border border-gray-300 px-4 py-2">usul</td></tr>
</tbody>
</table>

<p>Ushbu so'zlarni o'rganishda ularning sinonim va antonimlarini ham birga o'rganish samarali hisoblanadi.</p>`,
      tipsAndTricks: `1. So'zlarni guruhlarga bo'lib o'rganing: masalan, "finance", "income", "labor" — iqtisodiy so'zlar guruhi.
2. Har bir so'zning qaysi turdosh so'zlar bilan ishlatilishini o'rganing (collocations).
3. Yangi so'zlarni o'z ichiga olgan qisqa matn yozish orqali mustahkamlang.`,
      commonMistakes: `1. "Evidence" so'zini ko'plikda ishlatish — "evidences" noto'g'ri, "evidence" sanalmaydigan ot.
2. "Issue" va "problem" ni aralashtirish — "issue" kengroq ma'noda, masala yoki mavzu.
3. "Major" so'zini faqat "asosiy" ma'nosida bilish — u "mutaxassislik" ma'nosida ham ishlatiladi.`,
      passageText: `Academic Word List 2 (AWL Sublist 2)

This lesson covers 20 words from Academic Word List Sublist 2.

Words: establish, estimate, evidence, export, factor, finance, formula, function, identified, income, indicate, individual, interpretation, involved, issues, labor, legal, legislation, major, method`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "establish", options: ["a) tashkil etish", "b) baholash", "c) ko'rsatish", "d) aniqlash"], correctAnswer: 0, explanation: "Establish — tashkil etish, yaratish." },
        { id: 2, type: "fill-blank", question: "The scientist will ____ the results of the experiment.", options: ["establish", "estimate", "indicate", "identify"], correctAnswer: 2, explanation: "Indicate — ko'rsatish, natijalarni bildirish." },
        { id: 3, type: "matching", question: "evidence", options: ["a) omil", "b) dalil", "c) daromad", "d) formula"], correctAnswer: 1, explanation: "Evidence — dalil, isbot." },
        { id: 4, type: "multiple-choice", question: "Which word means 'a contributing element'?", options: ["factor", "finance", "formula", "function"], correctAnswer: 0, explanation: "Factor — omil, ta'sir ko'rsatuvchi element." },
        { id: 5, type: "fill-blank", question: "The company's main source of ____ is from exports.", options: ["income", "labor", "finance", "method"], correctAnswer: 0, explanation: "Income — daromad, tushum." },
        { id: 6, type: "matching", question: "legislation", options: ["a) qonunchilik", "b) qonuniy", "c) mehnat", "d) masalalar"], correctAnswer: 0, explanation: "Legislation — qonunchilik, qonunlar majmui." },
        { id: 7, type: "multiple-choice", question: "What is the meaning of 'interpretation'?", options: ["aniqlash", "talqin qilish", "ko'rsatish", "baholash"], correctAnswer: 1, explanation: "Interpretation — talqin, izohlash." },
        { id: 8, type: "fill-blank", question: "The ____ of the machine is to process data.", options: ["function", "formula", "factor", "finance"], correctAnswer: 0, explanation: "Function — vazifa, funksiya." },
        { id: 9, type: "matching", question: "method", options: ["a) usul", "b) formula", "c) omil", "d) mehnat"], correctAnswer: 0, explanation: "Method — usul, yo'l." },
        { id: 10, type: "multiple-choice", question: "Which word relates to 'law'?", options: ["labor", "legal", "major", "method"], correctAnswer: 1, explanation: "Legal — qonuniy, huquqiy." },
        { id: 11, type: "fill-blank", question: "Several ____ were discussed during the meeting.", options: ["issues", "incomes", "factors", "methods"], correctAnswer: 0, explanation: "Issues — masalalar, muhokama qilinadigan mavzular." },
        { id: 12, type: "matching", question: "export", options: ["a) import qilish", "b) eksport qilish", "c) tashkil etish", "d) baholash"], correctAnswer: 1, explanation: "Export — chet elga mahsulot jo'natish." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson55.id, word: "establish", meaning: "to set up or create", translation: "tashkil etish", exampleSentence: "The company was established in 2010.", audioUrl: null },
      { lessonId: lesson55.id, word: "estimate", meaning: "to roughly calculate", translation: "taxmin qilish", exampleSentence: "The cost is estimated at around $5000.", audioUrl: null },
      { lessonId: lesson55.id, word: "evidence", meaning: "proof or facts", translation: "dalil", exampleSentence: "There is strong evidence supporting the theory.", audioUrl: null },
      { lessonId: lesson55.id, word: "export", meaning: "to send goods abroad", translation: "eksport qilish", exampleSentence: "The country exports oil to many nations.", audioUrl: null },
      { lessonId: lesson55.id, word: "factor", meaning: "a contributing element", translation: "omil", exampleSentence: "Education is a key factor in economic growth.", audioUrl: null },
      { lessonId: lesson55.id, word: "finance", meaning: "management of money", translation: "moliya", exampleSentence: "She works in the finance department.", audioUrl: null },
      { lessonId: lesson55.id, word: "formula", meaning: "a method or rule", translation: "formula", exampleSentence: "There is no simple formula for success.", audioUrl: null },
      { lessonId: lesson55.id, word: "function", meaning: "a purpose or role", translation: "funksiya", exampleSentence: "The main function of the heart is to pump blood.", audioUrl: null },
      { lessonId: lesson55.id, word: "identified", meaning: "recognized or discovered", translation: "aniqlangan", exampleSentence: "The problem was identified early enough.", audioUrl: null },
      { lessonId: lesson55.id, word: "income", meaning: "money received", translation: "daromad", exampleSentence: "Her annual income is above the national average.", audioUrl: null },
      { lessonId: lesson55.id, word: "indicate", meaning: "to show or point out", translation: "ko'rsatish", exampleSentence: "The results indicate a significant improvement.", audioUrl: null },
      { lessonId: lesson55.id, word: "individual", meaning: "a single person", translation: "shaxs", exampleSentence: "Each individual has the right to education.", audioUrl: null },
      { lessonId: lesson55.id, word: "interpretation", meaning: "explanation of meaning", translation: "talqin", exampleSentence: "His interpretation of the poem was unique.", audioUrl: null },
      { lessonId: lesson55.id, word: "involved", meaning: "connected or included", translation: "jalb qilingan", exampleSentence: "Several organizations are involved in the project.", audioUrl: null },
      { lessonId: lesson55.id, word: "issues", meaning: "important topics or problems", translation: "masalalar", exampleSentence: "Environmental issues are a global concern.", audioUrl: null },
      { lessonId: lesson55.id, word: "labor", meaning: "work or workers", translation: "mehnat", exampleSentence: "The cost of labor has increased significantly.", audioUrl: null },
      { lessonId: lesson55.id, word: "legal", meaning: "relating to law", translation: "qonuniy", exampleSentence: "The company has a legal obligation to its employees.", audioUrl: null },
      { lessonId: lesson55.id, word: "legislation", meaning: "laws collectively", translation: "qonunchilik", exampleSentence: "New legislation on data protection was introduced.", audioUrl: null },
      { lessonId: lesson55.id, word: "major", meaning: "important or serious", translation: "asosiy", exampleSentence: "Pollution is a major problem in urban areas.", audioUrl: null },
      { lessonId: lesson55.id, word: "method", meaning: "a way of doing something", translation: "usul", exampleSentence: "This method of teaching is very effective.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 2 created:", lesson55.title);

  // --- Vocabulary Lesson 3: Topic: Education ---
  const lesson56 = await prisma.lesson.create({
    data: {
      title: "Topic: Education",
      category: "vocabulary",
      durationMin: 20,
      isPremium: false,
      difficulty: "Easy",
      order: 56,
      prerequisiteLessonId: lesson55.id,
      theoryContent: `<p>Education mavzusi IELTS imtihonida eng ko'p uchraydigan mavzulardan biridir. Quyida educationga oid muhim so'zlar keltirilgan:</p>
<p>Education mavzusida Writing va Speaking da yuqori ball olish uchun ushbu so'zlarni kontekstda ishlata olish muhimdir.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">So'z</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi (English)</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Tarjima (Uzbek)</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">curriculum</td><td class="border border-gray-300 px-4 py-2 font-mono">subjects in a course</td><td class="border border-gray-300 px-4 py-2 font-mono">o'quv dasturi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">syllabus</td><td class="border border-gray-300 px-4 py-2 font-mono">topics in a subject</td><td class="border border-gray-300 px-4 py-2 font-mono">fan dasturi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">qualification</td><td class="border border-gray-300 px-4 py-2 font-mono">official recognition</td><td class="border border-gray-300 px-4 py-2 font-mono">malaka</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">degree</td><td class="border border-gray-300 px-4 py-2 font-mono">university award</td><td class="border border-gray-300 px-4 py-2 font-mono">daraja, diplom</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">diploma</td><td class="border border-gray-300 px-4 py-2 font-mono">certificate of education</td><td class="border border-gray-300 px-4 py-2 font-mono">diplom</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">undergraduate</td><td class="border border-gray-300 px-4 py-2 font-mono">bachelor's level student</td><td class="border border-gray-300 px-4 py-2 font-mono">bakalavr</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">postgraduate</td><td class="border border-gray-300 px-4 py-2 font-mono">master's/PhD level student</td><td class="border border-gray-300 px-4 py-2 font-mono">magistratura</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">scholarship</td><td class="border border-gray-300 px-4 py-2 font-mono">financial award for study</td><td class="border border-gray-300 px-4 py-2 font-mono">stipendiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">tuition</td><td class="border border-gray-300 px-4 py-2 font-mono">teaching fees</td><td class="border border-gray-300 px-4 py-2 font-mono">o'qish to'lovi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">lecture</td><td class="border border-gray-300 px-4 py-2 font-mono">university lesson</td><td class="border border-gray-300 px-4 py-2 font-mono">ma'ruza</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">seminar</td><td class="border border-gray-300 px-4 py-2 font-mono">discussion group</td><td class="border border-gray-300 px-4 py-2 font-mono">seminar</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">tutorial</td><td class="border border-gray-300 px-4 py-2 font-mono">small teaching group</td><td class="border border-gray-300 px-4 py-2 font-mono">individual dars</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">assignment</td><td class="border border-gray-300 px-4 py-2 font-mono">a piece of coursework</td><td class="border border-gray-300 px-4 py-2 font-mono">topshiriq</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">assessment</td><td class="border border-gray-300 px-4 py-2 font-mono">evaluation of learning</td><td class="border border-gray-300 px-4 py-2 font-mono">baholash</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">academic</td><td class="border border-gray-300 px-4 py-2 font-mono">relating to education</td><td class="border border-gray-300 px-4 py-2 font-mono">akademik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">vocational</td><td class="border border-gray-300 px-4 py-2 font-mono">career-oriented training</td><td class="border border-gray-300 px-4 py-2 font-mono">kasbiy ta'lim</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">literacy</td><td class="border border-gray-300 px-4 py-2 font-mono">ability to read and write</td><td class="border border-gray-300 px-4 py-2 font-mono">savodxonlik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">numeracy</td><td class="border border-gray-300 px-4 py-2 font-mono">ability with numbers</td><td class="border border-gray-300 px-4 py-2 font-mono">hisoblash malakasi</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. Education so'zlari ko'pincha "formal" va "informal" ta'lim turlariga bo'linadi — ularni alohida guruhlarda o'rganing.
2. "Academic" va "vocational" ta'lim o'rtasidagi farqni tushunish Writing task 2 da muhim.
3. Education mavzusidagi maqolalarni o'qish orqali so'zlarni kontekstda o'rganing.`,
      commonMistakes: `1. "Curriculum" va "syllabus" ni aralashtirish — curriculum butun o'quv dasturi, syllabus bir fanning dasturi.
2. "Degree" va "diploma" farqini bilmaslik — degree universitet darajasi, diploma ko'pincha kollej sertifikati.
3. "Tuition" so'zini "tution" deb yozish — to'g'ri yozilishi "tuition".`,
      passageText: `Topic: Education — IELTS Vocabulary

Words: curriculum, syllabus, qualification, degree, diploma, undergraduate, postgraduate, scholarship, tuition, lecture, seminar, tutorial, assignment, assessment, academic, vocational, literacy, numeracy`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "curriculum", options: ["a) o'quv dasturi", "b) fan dasturi", "c) malaka", "d) daraja"], correctAnswer: 0, explanation: "Curriculum — o'quv dasturi, barcha fanlar majmui." },
        { id: 2, type: "fill-blank", question: "She received a ____ to study at Harvard University.", options: ["scholarship", "tuition", "degree", "diploma"], correctAnswer: 0, explanation: "Scholarship — stipendiya, o'qish uchun moliyaviy yordam." },
        { id: 3, type: "matching", question: "syllabus", options: ["a) o'quv dasturi", "b) fan dasturi", "c) baholash", "d) topshiriq"], correctAnswer: 1, explanation: "Syllabus — bir fanning mavzular ro'yxati." },
        { id: 4, type: "multiple-choice", question: "What does 'undergraduate' mean?", options: ["Magistratura talabasi", "Bakalavr talabasi", "Doktorant", "Maktab o'quvchisi"], correctAnswer: 1, explanation: "Undergraduate — bakalavr darajasidagi talaba." },
        { id: 5, type: "fill-blank", question: "The ____ at this university includes mathematics and science.", options: ["curriculum", "syllabus", "tutorial", "seminar"], correctAnswer: 0, explanation: "Curriculum — universitetning o'quv dasturi." },
        { id: 6, type: "matching", question: "vocational", options: ["a) akademik", "b) kasbiy", "c) savodxonlik", "d) malaka"], correctAnswer: 1, explanation: "Vocational — kasbiy ta'lim, amaliy ko'nikmalarga yo'naltirilgan." },
        { id: 7, type: "multiple-choice", question: "Which word means 'ability to read and write'?", options: ["numeracy", "literacy", "qualification", "assessment"], correctAnswer: 1, explanation: "Literacy — savodxonlik, o'qish va yozish qobiliyati." },
        { id: 8, type: "fill-blank", question: "Students must submit their ____ by Friday.", options: ["assignment", "lecture", "seminar", "tutorial"], correctAnswer: 0, explanation: "Assignment — topshiriq, kurs ishi." },
        { id: 9, type: "matching", question: "assessment", options: ["a) topshiriq", "b) baholash", "c) ma'ruza", "d) seminar"], correctAnswer: 1, explanation: "Assessment — baholash, bilimni tekshirish." },
        { id: 10, type: "multiple-choice", question: "What is 'tuition'?", options: ["o'qish to'lovi", "stipendiya", "daraja", "malaka"], correctAnswer: 0, explanation: "Tuition — o'qish uchun to'lanadigan pul." },
        { id: 11, type: "fill-blank", question: "A ____ is a small teaching group for discussion.", options: ["tutorial", "lecture", "seminar", "degree"], correctAnswer: 0, explanation: "Tutorial — kichik guruhda individual yondashuv bilan o'tiladigan dars." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson56.id, word: "curriculum", meaning: "subjects in a course of study", translation: "o'quv dasturi", exampleSentence: "The curriculum includes both theory and practical work.", audioUrl: null },
      { lessonId: lesson56.id, word: "syllabus", meaning: "topics covered in a subject", translation: "fan dasturi", exampleSentence: "The syllabus for this course is very comprehensive.", audioUrl: null },
      { lessonId: lesson56.id, word: "qualification", meaning: "official recognition of skills", translation: "malaka", exampleSentence: "This qualification is recognized internationally.", audioUrl: null },
      { lessonId: lesson56.id, word: "degree", meaning: "a university award", translation: "daraja", exampleSentence: "She earned a degree in economics from Cambridge.", audioUrl: null },
      { lessonId: lesson56.id, word: "diploma", meaning: "a certificate of education", translation: "diplom", exampleSentence: "He completed a diploma in graphic design.", audioUrl: null },
      { lessonId: lesson56.id, word: "undergraduate", meaning: "a student studying for a bachelor's degree", translation: "bakalavr", exampleSentence: "Undergraduate students must complete 120 credits.", audioUrl: null },
      { lessonId: lesson56.id, word: "postgraduate", meaning: "a student studying for a master's or PhD", translation: "magistratura", exampleSentence: "Postgraduate research requires original contribution to knowledge.", audioUrl: null },
      { lessonId: lesson56.id, word: "scholarship", meaning: "financial award for study", translation: "stipendiya", exampleSentence: "She won a scholarship to study abroad.", audioUrl: null },
      { lessonId: lesson56.id, word: "tuition", meaning: "teaching fees", translation: "o'qish to'lovi", exampleSentence: "Tuition fees have risen significantly in recent years.", audioUrl: null },
      { lessonId: lesson56.id, word: "lecture", meaning: "a university lesson", translation: "ma'ruza", exampleSentence: "The lecture on climate change was very informative.", audioUrl: null },
      { lessonId: lesson56.id, word: "seminar", meaning: "a discussion group", translation: "seminar", exampleSentence: "We discussed the topic in detail during the seminar.", audioUrl: null },
      { lessonId: lesson56.id, word: "tutorial", meaning: "a small teaching group", translation: "individual dars", exampleSentence: "The tutorial system allows for personalized attention.", audioUrl: null },
      { lessonId: lesson56.id, word: "assignment", meaning: "a piece of coursework", translation: "topshiriq", exampleSentence: "The assignment must be submitted before the deadline.", audioUrl: null },
      { lessonId: lesson56.id, word: "assessment", meaning: "evaluation of learning", translation: "baholash", exampleSentence: "Continuous assessment is used throughout the course.", audioUrl: null },
      { lessonId: lesson56.id, word: "academic", meaning: "relating to education and scholarship", translation: "akademik", exampleSentence: "She has a strong academic background in physics.", audioUrl: null },
      { lessonId: lesson56.id, word: "vocational", meaning: "career-oriented training", translation: "kasbiy ta'lim", exampleSentence: "Vocational training prepares students for specific careers.", audioUrl: null },
      { lessonId: lesson56.id, word: "literacy", meaning: "ability to read and write", translation: "savodxonlik", exampleSentence: "Literacy rates have improved dramatically in the last decade.", audioUrl: null },
      { lessonId: lesson56.id, word: "numeracy", meaning: "ability with numbers", translation: "hisoblash malakasi", exampleSentence: "Basic numeracy skills are essential in everyday life.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 3 created:", lesson56.title);

  // --- Vocabulary Lesson 4: Topic: Environment ---
  const lesson57 = await prisma.lesson.create({
    data: {
      title: "Topic: Environment",
      category: "vocabulary",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 57,
      prerequisiteLessonId: lesson56.id,
      theoryContent: `<p>Environment mavzusi IELTS imtihonida tez-tez uchraydigan muhim mavzulardan biridir. Quyida ekologiyaga oid asosiy so'zlar keltirilgan:</p>
<p>Environment mavzusidagi so'zlarni bilish IELTS Writing Task 2 va Speaking da yuqori ball olishga yordam beradi.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">So'z</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi (English)</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Tarjima (Uzbek)</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">climate</td><td class="border border-gray-300 px-4 py-2 font-mono">weather conditions over time</td><td class="border border-gray-300 px-4 py-2 font-mono">iqlim</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">pollution</td><td class="border border-gray-300 px-4 py-2 font-mono">harmful substances in environment</td><td class="border border-gray-300 px-4 py-2 font-mono">ifloslanish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">conservation</td><td class="border border-gray-300 px-4 py-2 font-mono">protection of environment</td><td class="border border-gray-300 px-4 py-2 font-mono">muhofaza</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">ecosystem</td><td class="border border-gray-300 px-4 py-2 font-mono">community of living organisms</td><td class="border border-gray-300 px-4 py-2 font-mono">ekotizim</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">biodiversity</td><td class="border border-gray-300 px-4 py-2 font-mono">variety of life forms</td><td class="border border-gray-300 px-4 py-2 font-mono">biologik xilma-xillik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">sustainability</td><td class="border border-gray-300 px-4 py-2 font-mono">ability to maintain over time</td><td class="border border-gray-300 px-4 py-2 font-mono">barqarorlik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">renewable</td><td class="border border-gray-300 px-4 py-2 font-mono">naturally replenished</td><td class="border border-gray-300 px-4 py-2 font-mono">qayta tiklanadigan</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">emission</td><td class="border border-gray-300 px-4 py-2 font-mono">release of gases</td><td class="border border-gray-300 px-4 py-2 font-mono">chiqindi gaz</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">deforestation</td><td class="border border-gray-300 px-4 py-2 font-mono">clearing of forests</td><td class="border border-gray-300 px-4 py-2 font-mono">o'rmonlarni kesish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">global warming</td><td class="border border-gray-300 px-4 py-2 font-mono">rise in earth's temperature</td><td class="border border-gray-300 px-4 py-2 font-mono">global isish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">fossil fuel</td><td class="border border-gray-300 px-4 py-2 font-mono">coal, oil, natural gas</td><td class="border border-gray-300 px-4 py-2 font-mono">qazilma yoqilg'i</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">greenhouse</td><td class="border border-gray-300 px-4 py-2 font-mono">gas trapping heat</td><td class="border border-gray-300 px-4 py-2 font-mono">issiqxona gazi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">ozone</td><td class="border border-gray-300 px-4 py-2 font-mono">protective atmospheric layer</td><td class="border border-gray-300 px-4 py-2 font-mono">ozon</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">biodegradable</td><td class="border border-gray-300 px-4 py-2 font-mono">decomposable naturally</td><td class="border border-gray-300 px-4 py-2 font-mono">biologik parchalanadigan</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">habitat</td><td class="border border-gray-300 px-4 py-2 font-mono">natural home of organisms</td><td class="border border-gray-300 px-4 py-2 font-mono">yashash muhiti</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">species</td><td class="border border-gray-300 px-4 py-2 font-mono">group of living organisms</td><td class="border border-gray-300 px-4 py-2 font-mono">tur (organizm)</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">pesticide</td><td class="border border-gray-300 px-4 py-2 font-mono">chemical to kill pests</td><td class="border border-gray-300 px-4 py-2 font-mono">pestitsid</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">fertilizer</td><td class="border border-gray-300 px-4 py-2 font-mono">substance for plant growth</td><td class="border border-gray-300 px-4 py-2 font-mono">o'g'it</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. Environment mavzusidagi maqolalarni ingliz tilida o'qing va yangi so'zlarni yozib boring.
2. "Global warming" va "climate change" o'rtasidagi farqni tushunib oling.
3. Writingda environment so'zlarini ishlatganda, ularni kontekstga mos qo'llang — masalan, "reduce pollution" emas, "reduce carbon emissions".`,
      commonMistakes: `1. "Climate" va "weather" ni aralashtirish — climate uzoq muddatli, weather qisqa muddatli.
2. "Renewable" va "recyclable" farqini bilmaslik — renewable qayta tiklanadigan, recyclable qayta ishlanadigan.
3. "Emission" va "pollution" ni bir xil ma'noda ishlatish — emission gaz chiqindisi, pollution umumiy ifloslanish.`,
      passageText: `Topic: Environment — IELTS Vocabulary

Words: climate, pollution, conservation, ecosystem, biodiversity, sustainability, renewable, emission, deforestation, global warming, fossil fuel, greenhouse, ozone, biodegradable, habitat, species, pesticide, fertilizer`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "climate", options: ["a) iqlim", "b) ob-havo", "c) ifloslanish", "d) muhofaza"], correctAnswer: 0, explanation: "Climate — iqlim, uzoq muddatli ob-havo sharoiti." },
        { id: 2, type: "fill-blank", question: "The government must reduce carbon ____ to protect the environment.", options: ["emissions", "pollution", "waste", "deforestation"], correctAnswer: 0, explanation: "Carbon emissions — uglerod chiqindilari." },
        { id: 3, type: "matching", question: "biodiversity", options: ["a) ekotizim", "b) biologik xilma-xillik", "c) barqarorlik", "d) yashash muhiti"], correctAnswer: 1, explanation: "Biodiversity — biologik xilma-xillik." },
        { id: 4, type: "multiple-choice", question: "Which of these is a renewable energy source?", options: ["coal", "natural gas", "solar power", "oil"], correctAnswer: 2, explanation: "Solar power — quyosh energiyasi, qayta tiklanadigan manba." },
        { id: 5, type: "fill-blank", question: "____ is the clearing of forests on a large scale.", options: ["Deforestation", "Pollution", "Emission", "Conservation"], correctAnswer: 0, explanation: "Deforestation — o'rmonlarni kesish." },
        { id: 6, type: "matching", question: "sustainability", options: ["a) barqarorlik", "b) muhofaza", "c) ifloslanish", "d) ekotizim"], correctAnswer: 0, explanation: "Sustainability — barqarorlik, uzoq muddat saqlanish." },
        { id: 7, type: "multiple-choice", question: "What are fossil fuels?", options: ["Qayta tiklanadigan energiya", "Qazilma yoqilg'ilar (ko'mir, neft, gaz)", "Quyosh va shamol energiyasi", "Biologik yoqilg'ilar"], correctAnswer: 1, explanation: "Fossil fuels — qazilma yoqilg'ilar: ko'mir, neft va tabiiy gaz." },
        { id: 8, type: "fill-blank", question: "Many animal ____ are being destroyed by human activity.", options: ["habitats", "species", "ecosystems", "climates"], correctAnswer: 0, explanation: "Habitat — yashash muhiti." },
        { id: 9, type: "matching", question: "ozone", options: ["a) issiqxona", "b) ozon", "c) iqlim", "d) ifloslanish"], correctAnswer: 1, explanation: "Ozone — ozon qatlami, atmosferani himoya qiladi." },
        { id: 10, type: "multiple-choice", question: "What does 'biodegradable' mean?", options: ["biologik parchalanadigan", "qayta tiklanadigan", "qayta ishlanadigan", "zararsiz"], correctAnswer: 0, explanation: "Biodegradable — biologik parchalanadigan, tabiatda o'z-o'zidan parchalanadi." },
        { id: 11, type: "fill-blank", question: "Farmers use ____ and pesticides to increase crop yields.", options: ["fertilizers", "emissions", "fossil fuels", "conservation"], correctAnswer: 0, explanation: "Fertilizer — o'g'it, o'simliklarni o'stirish uchun ishlatiladi." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson57.id, word: "climate", meaning: "weather conditions over a long period", translation: "iqlim", exampleSentence: "The climate in this region is very dry.", audioUrl: null },
      { lessonId: lesson57.id, word: "pollution", meaning: "harmful substances in the environment", translation: "ifloslanish", exampleSentence: "Air pollution in major cities is a serious health concern.", audioUrl: null },
      { lessonId: lesson57.id, word: "conservation", meaning: "protection of the environment", translation: "muhofaza", exampleSentence: "Wildlife conservation is essential for biodiversity.", audioUrl: null },
      { lessonId: lesson57.id, word: "ecosystem", meaning: "a community of living organisms and their environment", translation: "ekotizim", exampleSentence: "Coral reefs are among the most diverse ecosystems on Earth.", audioUrl: null },
      { lessonId: lesson57.id, word: "biodiversity", meaning: "variety of plant and animal life", translation: "biologik xilma-xillik", exampleSentence: "Rainforests have the highest biodiversity of any ecosystem.", audioUrl: null },
      { lessonId: lesson57.id, word: "sustainability", meaning: "ability to be maintained over time", translation: "barqarorlik", exampleSentence: "The company is committed to sustainability and green practices.", audioUrl: null },
      { lessonId: lesson57.id, word: "renewable", meaning: "naturally replenished resource", translation: "qayta tiklanadigan", exampleSentence: "Solar and wind are examples of renewable energy sources.", audioUrl: null },
      { lessonId: lesson57.id, word: "emission", meaning: "release of gases into the atmosphere", translation: "chiqindi gaz", exampleSentence: "The government plans to reduce carbon emissions by 50%.", audioUrl: null },
      { lessonId: lesson57.id, word: "deforestation", meaning: "clearing of forests on a large scale", translation: "o'rmonlarni kesish", exampleSentence: "Deforestation leads to loss of habitat for many species.", audioUrl: null },
      { lessonId: lesson57.id, word: "global warming", meaning: "rise in earth's average temperature", translation: "global isish", exampleSentence: "Global warming is causing polar ice caps to melt.", audioUrl: null },
      { lessonId: lesson57.id, word: "fossil fuel", meaning: "natural fuel from ancient organic matter", translation: "qazilma yoqilg'i", exampleSentence: "Burning fossil fuels releases large amounts of carbon dioxide.", audioUrl: null },
      { lessonId: lesson57.id, word: "greenhouse", meaning: "gas that traps heat in the atmosphere", translation: "issiqxona gazi", exampleSentence: "Greenhouse gases contribute to the greenhouse effect.", audioUrl: null },
      { lessonId: lesson57.id, word: "ozone", meaning: "a protective atmospheric layer", translation: "ozon", exampleSentence: "The ozone layer protects us from harmful UV radiation.", audioUrl: null },
      { lessonId: lesson57.id, word: "biodegradable", meaning: "able to decompose naturally", translation: "biologik parchalanadigan", exampleSentence: "Biodegradable packaging is better for the environment.", audioUrl: null },
      { lessonId: lesson57.id, word: "habitat", meaning: "natural home of an organism", translation: "yashash muhiti", exampleSentence: "The destruction of natural habitats threatens wildlife.", audioUrl: null },
      { lessonId: lesson57.id, word: "species", meaning: "a group of similar organisms", translation: "tur", exampleSentence: "Many species are at risk of extinction due to human activity.", audioUrl: null },
      { lessonId: lesson57.id, word: "pesticide", meaning: "chemical used to kill pests", translation: "pestitsid", exampleSentence: "Excessive use of pesticides can harm beneficial insects.", audioUrl: null },
      { lessonId: lesson57.id, word: "fertilizer", meaning: "substance added to soil for plant growth", translation: "o'g'it", exampleSentence: "Fertilizers increase crop yields but can pollute waterways.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 4 created:", lesson57.title);

  // --- Vocabulary Lesson 5: Topic: Technology ---
  const lesson58 = await prisma.lesson.create({
    data: {
      title: "Topic: Technology",
      category: "vocabulary",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 58,
      prerequisiteLessonId: lesson57.id,
      theoryContent: `<p>Technology mavzusi zamonaviy IELTS imtihonida tobora ko'proq uchramoqda. Quyida texnologiyaga oid muhim so'zlar keltirilgan:</p>
<p>Texnologiya mavzusidagi so'zlarni bilish IELTS imtihonining barcha bo'limlarida foydali bo'ladi.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">So'z</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi (English)</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Tarjima (Uzbek)</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">innovation</td><td class="border border-gray-300 px-4 py-2 font-mono">a new method or idea</td><td class="border border-gray-300 px-4 py-2 font-mono">innovatsiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">digital</td><td class="border border-gray-300 px-4 py-2 font-mono">relating to technology</td><td class="border border-gray-300 px-4 py-2 font-mono">raqamli</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">automation</td><td class="border border-gray-300 px-4 py-2 font-mono">automatic processes</td><td class="border border-gray-300 px-4 py-2 font-mono">avtomatlashtirish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">artificial intelligence</td><td class="border border-gray-300 px-4 py-2 font-mono">machine intelligence</td><td class="border border-gray-300 px-4 py-2 font-mono">sun'iy intellekt</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">algorithm</td><td class="border border-gray-300 px-4 py-2 font-mono">set of rules for computing</td><td class="border border-gray-300 px-4 py-2 font-mono">algoritm</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">software</td><td class="border border-gray-300 px-4 py-2 font-mono">programs for computers</td><td class="border border-gray-300 px-4 py-2 font-mono">dasturiy ta'minot</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">hardware</td><td class="border border-gray-300 px-4 py-2 font-mono">physical computer components</td><td class="border border-gray-300 px-4 py-2 font-mono">apparat ta'minot</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">cybersecurity</td><td class="border border-gray-300 px-4 py-2 font-mono">protection of computer systems</td><td class="border border-gray-300 px-4 py-2 font-mono">kiberxavfsizlik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">encryption</td><td class="border border-gray-300 px-4 py-2 font-mono">encoding information</td><td class="border border-gray-300 px-4 py-2 font-mono">shifrlash</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">bandwidth</td><td class="border border-gray-300 px-4 py-2 font-mono">data transmission capacity</td><td class="border border-gray-300 px-4 py-2 font-mono">tarmoq o'tkazuvchanligi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">cloud computing</td><td class="border border-gray-300 px-4 py-2 font-mono">internet-based computing</td><td class="border border-gray-300 px-4 py-2 font-mono">bulutli hisoblash</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">robotics</td><td class="border border-gray-300 px-4 py-2 font-mono">design and use of robots</td><td class="border border-gray-300 px-4 py-2 font-mono">robototexnika</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">virtual reality</td><td class="border border-gray-300 px-4 py-2 font-mono">simulated experience</td><td class="border border-gray-300 px-4 py-2 font-mono">virtual haqiqat</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">nanotechnology</td><td class="border border-gray-300 px-4 py-2 font-mono">science at molecular level</td><td class="border border-gray-300 px-4 py-2 font-mono">nanotexnologiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">biotechnology</td><td class="border border-gray-300 px-4 py-2 font-mono">using living organisms in technology</td><td class="border border-gray-300 px-4 py-2 font-mono">biotexnologiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">database</td><td class="border border-gray-300 px-4 py-2 font-mono">organized collection of data</td><td class="border border-gray-300 px-4 py-2 font-mono">ma'lumotlar bazasi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">interface</td><td class="border border-gray-300 px-4 py-2 font-mono">point of interaction with a system</td><td class="border border-gray-300 px-4 py-2 font-mono">interfeys</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">network</td><td class="border border-gray-300 px-4 py-2 font-mono">connected computer system</td><td class="border border-gray-300 px-4 py-2 font-mono">tarmoq</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. Technology so'zlarini zamonaviy kontekstda o'rganing — yangi texnologiyalar haqidagi maqolalarni o'qing.
2. "AI" va "automation" o'rtasidagi farqni tushunib oling — AI intellekt, automation jarayon.
3. Texnologiya so'zlarini Writingda ishlatganda, ularning to'g'ri talaffuzi va yozilishiga e'tibor bering.`,
      commonMistakes: `1. "Software" va "hardware" ni aralashtirish — software dastur, hardware qurilma.
2. "Internet" va "world wide web" ni bir xil ma'noda ishlatish — internet tarmoq, web ma'lumotlar tizimi.
3. "Technology" so'zini "technologies" deb ko'plikda noto'g'ri ishlatish — technology odatda sanalmaydigan ot.`,
      passageText: `Topic: Technology — IELTS Vocabulary

Words: innovation, digital, automation, artificial intelligence, algorithm, software, hardware, cybersecurity, encryption, bandwidth, cloud computing, robotics, virtual reality, nanotechnology, biotechnology, database, interface, network`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "innovation", options: ["a) innovatsiya", "b) avtomatlashtirish", "c) algoritm", "d) interfeys"], correctAnswer: 0, explanation: "Innovation — innovatsiya, yangi g'oya yoki usul." },
        { id: 2, type: "fill-blank", question: "____ is used to protect data from unauthorized access.", options: ["Encryption", "Bandwidth", "Interface", "Hardware"], correctAnswer: 0, explanation: "Encryption — shifrlash, ma'lumotlarni himoyalash." },
        { id: 3, type: "matching", question: "algorithm", options: ["a) algoritm", "b) dastur", "c) tarmoq", "d) interfeys"], correctAnswer: 0, explanation: "Algorithm — algoritm, hisoblash qoidalari majmui." },
        { id: 4, type: "multiple-choice", question: "What does 'AI' stand for?", options: ["Automated Input", "Artificial Intelligence", "Advanced Internet", "Automated Interface"], correctAnswer: 1, explanation: "AI — Artificial Intelligence, sun'iy intellekt." },
        { id: 5, type: "fill-blank", question: "The company uses ____ computing to store data online.", options: ["cloud", "digital", "virtual", "network"], correctAnswer: 0, explanation: "Cloud computing — bulutli hisoblash, ma'lumotlarni internet orqali saqlash." },
        { id: 6, type: "matching", question: "cybersecurity", options: ["a) kiberxavfsizlik", "b) shifrlash", "c) tarmoq", "d) dasturiy ta'minot"], correctAnswer: 0, explanation: "Cybersecurity — kiberxavfsizlik, kompyuter tizimlarini himoya qilish." },
        { id: 7, type: "multiple-choice", question: "What does 'bandwidth' measure?", options: ["data transmission capacity", "storage space", "processing speed", "screen resolution"], correctAnswer: 0, explanation: "Bandwidth — tarmoq o'tkazuvchanligi, ma'lumot uzatish tezligi." },
        { id: 8, type: "fill-blank", question: "A ____ is a collection of organized data stored electronically.", options: ["database", "network", "interface", "software"], correctAnswer: 0, explanation: "Database — ma'lumotlar bazasi." },
        { id: 9, type: "matching", question: "virtual reality", options: ["a) virtual haqiqat", "b) sun'iy intellekt", "c) robototexnika", "d) bulutli hisoblash"], correctAnswer: 0, explanation: "Virtual reality — virtual haqiqat, simulyatsiya qilingan muhit." },
        { id: 10, type: "multiple-choice", question: "What is the difference between software and hardware?", options: ["Software is physical, hardware is digital", "Software is programs, hardware is physical components", "They are the same", "Software is for computers, hardware is for phones"], correctAnswer: 1, explanation: "Software — dasturiy ta'minot, hardware — apparat ta'minot (fizik qismlar)." },
        { id: 11, type: "fill-blank", question: "____ is used in manufacturing to automate repetitive tasks.", options: ["Robotics", "Nanotechnology", "Biotechnology", "Encryption"], correctAnswer: 0, explanation: "Robotics — robototexnika, ishlab chiqarishda avtomatlashtirish." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson58.id, word: "innovation", meaning: "a new method, idea, or product", translation: "innovatsiya", exampleSentence: "Technological innovation drives economic growth.", audioUrl: null },
      { lessonId: lesson58.id, word: "digital", meaning: "relating to computer technology", translation: "raqamli", exampleSentence: "The digital revolution has transformed every industry.", audioUrl: null },
      { lessonId: lesson58.id, word: "automation", meaning: "use of automatic processes", translation: "avtomatlashtirish", exampleSentence: "Automation has increased efficiency in manufacturing.", audioUrl: null },
      { lessonId: lesson58.id, word: "artificial intelligence", meaning: "machine-based intelligence", translation: "sun'iy intellekt", exampleSentence: "Artificial intelligence is used in medical diagnosis.", audioUrl: null },
      { lessonId: lesson58.id, word: "algorithm", meaning: "a set of rules for problem-solving", translation: "algoritm", exampleSentence: "Search engines use complex algorithms to rank results.", audioUrl: null },
      { lessonId: lesson58.id, word: "software", meaning: "programs and operating systems", translation: "dasturiy ta'minot", exampleSentence: "New software is being developed to improve security.", audioUrl: null },
      { lessonId: lesson58.id, word: "hardware", meaning: "physical computer components", translation: "apparat ta'minot", exampleSentence: "The hardware includes the processor, memory, and hard drive.", audioUrl: null },
      { lessonId: lesson58.id, word: "cybersecurity", meaning: "protection of computer systems from attack", translation: "kiberxavfsizlik", exampleSentence: "Cybersecurity is a growing concern for businesses worldwide.", audioUrl: null },
      { lessonId: lesson58.id, word: "encryption", meaning: "encoding information to prevent unauthorized access", translation: "shifrlash", exampleSentence: "End-to-end encryption ensures that messages remain private.", audioUrl: null },
      { lessonId: lesson58.id, word: "bandwidth", meaning: "data transmission capacity", translation: "tarmoq o'tkazuvchanligi", exampleSentence: "Streaming video requires high bandwidth internet connection.", audioUrl: null },
      { lessonId: lesson58.id, word: "cloud computing", meaning: "internet-based computing services", translation: "bulutli hisoblash", exampleSentence: "Cloud computing allows businesses to store data remotely.", audioUrl: null },
      { lessonId: lesson58.id, word: "robotics", meaning: "design and use of robots", translation: "robototexnika", exampleSentence: "Robotics has revolutionized the automotive industry.", audioUrl: null },
      { lessonId: lesson58.id, word: "virtual reality", meaning: "simulated experience using technology", translation: "virtual haqiqat", exampleSentence: "Virtual reality is used for training in various fields.", audioUrl: null },
      { lessonId: lesson58.id, word: "nanotechnology", meaning: "science at the molecular level", translation: "nanotexnologiya", exampleSentence: "Nanotechnology has applications in medicine and electronics.", audioUrl: null },
      { lessonId: lesson58.id, word: "biotechnology", meaning: "using organisms for technological purposes", translation: "biotexnologiya", exampleSentence: "Biotechnology has led to breakthroughs in medicine and agriculture.", audioUrl: null },
      { lessonId: lesson58.id, word: "database", meaning: "organized collection of data", translation: "ma'lumotlar bazasi", exampleSentence: "The company stores customer information in a database.", audioUrl: null },
      { lessonId: lesson58.id, word: "interface", meaning: "point of interaction with a system", translation: "interfeys", exampleSentence: "The user interface should be intuitive and easy to navigate.", audioUrl: null },
      { lessonId: lesson58.id, word: "network", meaning: "interconnected computer system", translation: "tarmoq", exampleSentence: "The office network connects all computers to the internet.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 5 created:", lesson58.title);

  // --- Vocabulary Lesson 6: Topic: Health ---
  const lesson59 = await prisma.lesson.create({
    data: {
      title: "Topic: Health",
      category: "vocabulary",
      durationMin: 20,
      isPremium: true,
      difficulty: "Medium",
      order: 59,
      prerequisiteLessonId: lesson58.id,
      theoryContent: `<p>Health mavzusi IELTS imtihonida tez-tez uchraydi, ayniqsa Writing Task 2 va Speaking bo'limlarida. Quyida sog'liqni saqlashga oid muhim so'zlar keltirilgan:</p>
<p>Sog'liqni saqlash mavzusidagi so'zlarni bilish IELTS imtihonida murakkab mavzularni muhokama qilish imkonini beradi.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">So'z</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi (English)</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Tarjima (Uzbek)</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">nutrition</td><td class="border border-gray-300 px-4 py-2 font-mono">food and diet</td><td class="border border-gray-300 px-4 py-2 font-mono">ovqatlanish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">obesity</td><td class="border border-gray-300 px-4 py-2 font-mono">excessive body weight</td><td class="border border-gray-300 px-4 py-2 font-mono">semizlik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">epidemic</td><td class="border border-gray-300 px-4 py-2 font-mono">widespread disease</td><td class="border border-gray-300 px-4 py-2 font-mono">epidemiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">pandemic</td><td class="border border-gray-300 px-4 py-2 font-mono">global disease outbreak</td><td class="border border-gray-300 px-4 py-2 font-mono">pandemiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">diagnosis</td><td class="border border-gray-300 px-4 py-2 font-mono">identification of illness</td><td class="border border-gray-300 px-4 py-2 font-mono">tashxis</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">prescription</td><td class="border border-gray-300 px-4 py-2 font-mono">doctor's order for medicine</td><td class="border border-gray-300 px-4 py-2 font-mono">retsept</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">vaccination</td><td class="border border-gray-300 px-4 py-2 font-mono">immunization against disease</td><td class="border border-gray-300 px-4 py-2 font-mono">emlash</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">immunity</td><td class="border border-gray-300 px-4 py-2 font-mono">resistance to disease</td><td class="border border-gray-300 px-4 py-2 font-mono">immunitet</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">chronic</td><td class="border border-gray-300 px-4 py-2 font-mono">long-lasting condition</td><td class="border border-gray-300 px-4 py-2 font-mono">surunkali</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">acute</td><td class="border border-gray-300 px-4 py-2 font-mono">severe but short-term</td><td class="border border-gray-300 px-4 py-2 font-mono">o'tkir</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">therapy</td><td class="border border-gray-300 px-4 py-2 font-mono">treatment for illness</td><td class="border border-gray-300 px-4 py-2 font-mono">terapiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">rehabilitation</td><td class="border border-gray-300 px-4 py-2 font-mono">recovery process</td><td class="border border-gray-300 px-4 py-2 font-mono">reabilitatsiya</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">mental health</td><td class="border border-gray-300 px-4 py-2 font-mono">psychological well-being</td><td class="border border-gray-300 px-4 py-2 font-mono">ruhiy salomatlik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">wellness</td><td class="border border-gray-300 px-4 py-2 font-mono">overall state of health</td><td class="border border-gray-300 px-4 py-2 font-mono">sog'lomlik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">hygiene</td><td class="border border-gray-300 px-4 py-2 font-mono">cleanliness practices</td><td class="border border-gray-300 px-4 py-2 font-mono">gigiena</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">surgery</td><td class="border border-gray-300 px-4 py-2 font-mono">medical operation</td><td class="border border-gray-300 px-4 py-2 font-mono">jarrohlik</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">medication</td><td class="border border-gray-300 px-4 py-2 font-mono">drugs for treatment</td><td class="border border-gray-300 px-4 py-2 font-mono">dori-darmon</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">prevention</td><td class="border border-gray-300 px-4 py-2 font-mono">stopping disease before it starts</td><td class="border border-gray-300 px-4 py-2 font-mono">oldini olish</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. "Epidemic" va "pandemic" o'rtasidagi farqni tushunib oling — pandemic global miqyosdagi epidemiya.
2. Health so'zlarini ishlatganda, ularni to'g'ri kontekstda qo'llang — masalan, "chronic disease" surunkali kasallik.
3. Speakingda health mavzusida gapirganda, shaxsiy tajribalaringiz bilan bog'lab gapiring.`,
      commonMistakes: `1. "Acute" va "chronic" ni aralashtirish — acute qisqa muddatli va og'ir, chronic uzoq muddatli.
2. "Treatment" va "cure" ni bir xil ma'noda ishlatish — treatment davolash, cure to'liq tuzalish.
3. "Symptom" va "sign" farqini bilmaslik — symptom bemor sezadigan, sign shifokor kuzatadigan belgi.`,
      passageText: `Topic: Health — IELTS Vocabulary

Words: nutrition, obesity, epidemic, pandemic, diagnosis, prescription, vaccination, immunity, chronic, acute, therapy, rehabilitation, mental health, wellness, hygiene, surgery, medication, prevention`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "nutrition", options: ["a) ovqatlanish", "b) semizlik", "c) immunitet", "d) gigiena"], correctAnswer: 0, explanation: "Nutrition — ovqatlanish, to'g'ri va sog'lom ovqat iste'mol qilish." },
        { id: 2, type: "fill-blank", question: "The doctor gave me a ____ for antibiotics.", options: ["prescription", "diagnosis", "vaccination", "therapy"], correctAnswer: 0, explanation: "Prescription — retsept, shifokorning dori buyurtmasi." },
        { id: 3, type: "matching", question: "obesity", options: ["a) semizlik", "b) ovqatlanish", "c) surunkali", "d) o'tkir"], correctAnswer: 0, explanation: "Obesity — semizlik, ortiqcha vazn." },
        { id: 4, type: "multiple-choice", question: "What is the difference between epidemic and pandemic?", options: ["Epidemic is global, pandemic is local", "Pandemic is a global epidemic", "They are the same", "Epidemic is more serious"], correctAnswer: 1, explanation: "Pandemic — global miqyosda tarqalgan epidemiya." },
        { id: 5, type: "fill-blank", question: "____ is important for preventing the spread of diseases.", options: ["Hygiene", "Surgery", "Therapy", "Medication"], correctAnswer: 0, explanation: "Hygiene — gigiena, tozalik va shaxsiy parvarish." },
        { id: 6, type: "matching", question: "chronic", options: ["a) surunkali", "b) o'tkir", "c) yuqumli", "d) davolovchi"], correctAnswer: 0, explanation: "Chronic — surunkali, uzoq davom etadigan kasallik." },
        { id: 7, type: "multiple-choice", question: "What does 'vaccination' do?", options: ["Davolaydi", "Immunitet hosil qiladi", "Tashxis qo'yadi", "Operatsiya qiladi"], correctAnswer: 1, explanation: "Vaccination — emlash, organizmda immunitet hosil qiladi." },
        { id: 8, type: "fill-blank", question: "The patient is undergoing ____ after the accident.", options: ["rehabilitation", "surgery", "diagnosis", "medication"], correctAnswer: 0, explanation: "Rehabilitation — reabilitatsiya, tiklanish jarayoni." },
        { id: 9, type: "matching", question: "diagnosis", options: ["a) tashxis", "b) retsept", "c) terapiya", "d) emlash"], correctAnswer: 0, explanation: "Diagnosis — tashxis, kasallikni aniqlash." },
        { id: 10, type: "multiple-choice", question: "What is 'mental health' about?", options: ["Jismoniy sog'lik", "Ruhiy salomatlik", "Ovqatlanish", "Jarrohlik"], correctAnswer: 1, explanation: "Mental health — ruhiy salomatlik, psixologik holat." },
        { id: 11, type: "fill-blank", question: "Regular exercise is important for disease ____.", options: ["prevention", "diagnosis", "surgery", "medication"], correctAnswer: 0, explanation: "Prevention — oldini olish, kasallikni bartaraf etish." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson59.id, word: "nutrition", meaning: "the process of providing food for health", translation: "ovqatlanish", exampleSentence: "Good nutrition is essential for a healthy lifestyle.", audioUrl: null },
      { lessonId: lesson59.id, word: "obesity", meaning: "excessive body weight", translation: "semizlik", exampleSentence: "Obesity is a growing health problem worldwide.", audioUrl: null },
      { lessonId: lesson59.id, word: "epidemic", meaning: "widespread occurrence of a disease", translation: "epidemiya", exampleSentence: "The cholera epidemic affected thousands of people.", audioUrl: null },
      { lessonId: lesson59.id, word: "pandemic", meaning: "global disease outbreak", translation: "pandemiya", exampleSentence: "The COVID-19 pandemic changed the world dramatically.", audioUrl: null },
      { lessonId: lesson59.id, word: "diagnosis", meaning: "identification of a disease", translation: "tashxis", exampleSentence: "Early diagnosis of cancer improves survival rates.", audioUrl: null },
      { lessonId: lesson59.id, word: "prescription", meaning: "doctor's instruction for medicine", translation: "retsept", exampleSentence: "You need a prescription to buy this medication.", audioUrl: null },
      { lessonId: lesson59.id, word: "vaccination", meaning: "administration of a vaccine", translation: "emlash", exampleSentence: "Vaccination has eradicated many deadly diseases.", audioUrl: null },
      { lessonId: lesson59.id, word: "immunity", meaning: "resistance to infection", translation: "immunitet", exampleSentence: "The body builds immunity after recovering from an illness.", audioUrl: null },
      { lessonId: lesson59.id, word: "chronic", meaning: "long-lasting or persistent", translation: "surunkali", exampleSentence: "She has been living with chronic back pain for years.", audioUrl: null },
      { lessonId: lesson59.id, word: "acute", meaning: "severe but short-term", translation: "o'tkir", exampleSentence: "The patient was admitted with acute abdominal pain.", audioUrl: null },
      { lessonId: lesson59.id, word: "therapy", meaning: "treatment for illness or disability", translation: "terapiya", exampleSentence: "Physical therapy helped him recover after the injury.", audioUrl: null },
      { lessonId: lesson59.id, word: "rehabilitation", meaning: "recovery process after illness or injury", translation: "reabilitatsiya", exampleSentence: "The rehabilitation program includes exercise and counseling.", audioUrl: null },
      { lessonId: lesson59.id, word: "mental health", meaning: "psychological and emotional well-being", translation: "ruhiy salomatlik", exampleSentence: "Mental health is just as important as physical health.", audioUrl: null },
      { lessonId: lesson59.id, word: "wellness", meaning: "overall state of good health", translation: "sog'lomlik", exampleSentence: "The company promotes employee wellness through fitness programs.", audioUrl: null },
      { lessonId: lesson59.id, word: "hygiene", meaning: "practices to maintain health and cleanliness", translation: "gigiena", exampleSentence: "Poor hygiene can lead to the spread of infectious diseases.", audioUrl: null },
      { lessonId: lesson59.id, word: "surgery", meaning: "medical operation", translation: "jarrohlik", exampleSentence: "The surgery was successful and the patient is recovering well.", audioUrl: null },
      { lessonId: lesson59.id, word: "medication", meaning: "drugs used for treatment", translation: "dori-darmon", exampleSentence: "She takes medication daily to control her blood pressure.", audioUrl: null },
      { lessonId: lesson59.id, word: "prevention", meaning: "stopping disease before it occurs", translation: "oldini olish", exampleSentence: "Prevention is better than cure, as the saying goes.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 6 created:", lesson59.title);

  // --- Vocabulary Lesson 7: Collocations ---
  const lesson60 = await prisma.lesson.create({
    data: {
      title: "Collocations",
      category: "vocabulary",
      durationMin: 30,
      isPremium: true,
      difficulty: "Hard",
      order: 60,
      prerequisiteLessonId: lesson59.id,
      theoryContent: `<p>Collocations — bu so'zlarning bir-biri bilan tez-tez ishlatiladigan birikmalaridir. IELTS imtihonida collocations ni to'g'ri ishlatish yuqori ball olishning kalitidir.</p>
<p>Quyida eng muhim akademik collocations keltirilgan:</p>
<p>Collocations ni o'rganish Speaking va Writing da tabiiy va ravon gapirishga yordam beradi.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Collocation</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Misol</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">make a decision</td><td class="border border-gray-300 px-4 py-2 font-mono">qaror qabul qilish</td><td class="border border-gray-300 px-4 py-2 font-mono">We need to make a decision soon.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">take into account</td><td class="border border-gray-300 px-4 py-2 font-mono">hisobga olmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Take into account all factors.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">come to a conclusion</td><td class="border border-gray-300 px-4 py-2 font-mono">xulosaga kelmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">They came to a conclusion.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">draw attention to</td><td class="border border-gray-300 px-4 py-2 font-mono">e'tibor qaratmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">I draw your attention to...</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">pay attention to</td><td class="border border-gray-300 px-4 py-2 font-mono">e'tibor bermoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Pay attention to details.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">set a goal</td><td class="border border-gray-300 px-4 py-2 font-mono">maqsad qo'ymoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Set realistic goals for yourself.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">reach an agreement</td><td class="border border-gray-300 px-4 py-2 font-mono">kelishuvga erishmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The parties reached an agreement.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">conduct research</td><td class="border border-gray-300 px-4 py-2 font-mono">tadqiqot o'tkazmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Scientists conduct research.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">make an effort</td><td class="border border-gray-300 px-4 py-2 font-mono">harakat qilmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Make an effort to improve.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">play a role</td><td class="border border-gray-300 px-4 py-2 font-mono">rol o'ynamoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Education plays a key role.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">take responsibility</td><td class="border border-gray-300 px-4 py-2 font-mono">mas'uliyatni o'z zimmasiga olmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Take responsibility for your work.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">have an impact</td><td class="border border-gray-300 px-4 py-2 font-mono">ta'sir ko'rsatmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">This will have an impact on...</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">make progress</td><td class="border border-gray-300 px-4 py-2 font-mono">taraqqiyot qilmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">She is making good progress.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">hold a meeting</td><td class="border border-gray-300 px-4 py-2 font-mono">uchrashuv o'tkazmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">We will hold a meeting tomorrow.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">give a presentation</td><td class="border border-gray-300 px-4 py-2 font-mono">taqdimot qilmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">He gave an excellent presentation.</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. Collocations ni guruhlab o'rganing: "make" bilan ishlatiladiganlar, "take" bilan ishlatiladiganlar va hokazo.
2. Har bir collocation bilan kamida 3 tadan jumla tuzib ko'ring.
3. IELTS Writingda collocations ni ishlatish Band 7+ olishga yordam beradi.`,
      commonMistakes: `1. "Make" va "do" ni aralashtirish: "make a decision" (to'g'ri), "do a decision" (noto'g'ri).
2. "Pay attention" va "draw attention" farqini bilmaslik — pay attention o'zi qaratish, draw attention boshqalarnikini qaratish.
3. Collocations ni so'zma-so'z tarjima qilish — ingliz tilidagi collocations o'zbek tilidagidan farq qiladi.`,
      passageText: `Common Academic Collocations for IELTS

Collocations: make a decision, take into account, come to a conclusion, draw attention to, pay attention to, set a goal, reach an agreement, conduct research, make an effort, play a role, take responsibility, have an impact, make progress, hold a meeting, give a presentation`,
      questions: JSON.stringify([
        { id: 1, type: "fill-blank", question: "We need to ____ a decision by Friday.", options: ["make", "do", "take", "give"], correctAnswer: 0, explanation: "Make a decision — qaror qabul qilish." },
        { id: 2, type: "matching", question: "take into account", options: ["a) hisobga olmoq", "b) e'tibor bermoq", "c) qaror qilmoq", "d) xulosaga kelmoq"], correctAnswer: 0, explanation: "Take into account — hisobga olmoq, e'tiborga olmoq." },
        { id: 3, type: "fill-blank", question: "Scientists ____ research on climate change.", options: ["conduct", "make", "do", "take"], correctAnswer: 0, explanation: "Conduct research — tadqiqot o'tkazish." },
        { id: 4, type: "multiple-choice", question: "Which is correct?", options: ["make progress", "do progress", "take progress", "give progress"], correctAnswer: 0, explanation: "Make progress — taraqqiyot qilish." },
        { id: 5, type: "fill-blank", question: "The manager will ____ a meeting on Monday.", options: ["hold", "make", "do", "take"], correctAnswer: 0, explanation: "Hold a meeting — uchrashuv o'tkazish." },
        { id: 6, type: "matching", question: "play a role", options: ["a) rol o'ynamoq", "b) maqsad qo'ymoq", "c) e'tibor qaratmoq", "d) ta'sir ko'rsatmoq"], correctAnswer: 0, explanation: "Play a role — rol o'ynamoq, muhim ahamiyatga ega bo'lmoq." },
        { id: 7, type: "fill-blank", question: "You should ____ responsibility for your mistakes.", options: ["take", "make", "do", "have"], correctAnswer: 0, explanation: "Take responsibility — mas'uliyatni o'z zimmasiga olish." },
        { id: 8, type: "multiple-choice", question: "What does 'come to a conclusion' mean?", options: ["boshlash", "xulosaga kelish", "tugatish", "muhokama qilish"], correctAnswer: 1, explanation: "Come to a conclusion — xulosaga kelmoq." },
        { id: 9, type: "fill-blank", question: "The new policy will ____ an impact on the economy.", options: ["have", "make", "do", "take"], correctAnswer: 0, explanation: "Have an impact — ta'sir ko'rsatish." },
        { id: 10, type: "matching", question: "set a goal", options: ["a) maqsad qo'ymoq", "b) kelishuvga erishmoq", "c) harakat qilmoq", "d) taqdimot qilmoq"], correctAnswer: 0, explanation: "Set a goal — maqsad qo'yish." },
        { id: 11, type: "fill-blank", question: "I want to ____ your attention to an important issue.", options: ["draw", "pay", "make", "take"], correctAnswer: 0, explanation: "Draw attention to — e'tibor qaratmoq." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson60.id, word: "make a decision", meaning: "to choose after consideration", translation: "qaror qabul qilish", exampleSentence: "We need to make a decision by the end of the week.", audioUrl: null },
      { lessonId: lesson60.id, word: "take into account", meaning: "to consider or include", translation: "hisobga olmoq", exampleSentence: "You must take into account all the relevant factors.", audioUrl: null },
      { lessonId: lesson60.id, word: "come to a conclusion", meaning: "to reach a judgment", translation: "xulosaga kelmoq", exampleSentence: "After much discussion, we came to a conclusion.", audioUrl: null },
      { lessonId: lesson60.id, word: "draw attention to", meaning: "to make someone notice", translation: "e'tibor qaratmoq", exampleSentence: "I would like to draw attention to this problem.", audioUrl: null },
      { lessonId: lesson60.id, word: "pay attention to", meaning: "to focus on something", translation: "e'tibor bermoq", exampleSentence: "Pay attention to the details in the instructions.", audioUrl: null },
      { lessonId: lesson60.id, word: "set a goal", meaning: "to establish an objective", translation: "maqsad qo'ymoq", exampleSentence: "It is important to set a goal and work towards it.", audioUrl: null },
      { lessonId: lesson60.id, word: "reach an agreement", meaning: "to come to a mutual understanding", translation: "kelishuvga erishmoq", exampleSentence: "The two sides finally reached an agreement.", audioUrl: null },
      { lessonId: lesson60.id, word: "conduct research", meaning: "to carry out a study", translation: "tadqiqot o'tkazmoq", exampleSentence: "The university conducts research in various fields.", audioUrl: null },
      { lessonId: lesson60.id, word: "make an effort", meaning: "to try hard", translation: "harakat qilmoq", exampleSentence: "She made an effort to improve her English.", audioUrl: null },
      { lessonId: lesson60.id, word: "play a role", meaning: "to have a function or part", translation: "rol o'ynamoq", exampleSentence: "Technology plays a crucial role in education.", audioUrl: null },
      { lessonId: lesson60.id, word: "take responsibility", meaning: "to accept accountability", translation: "mas'uliyatni olish", exampleSentence: "You must take responsibility for your actions.", audioUrl: null },
      { lessonId: lesson60.id, word: "have an impact", meaning: "to produce an effect", translation: "ta'sir ko'rsatmoq", exampleSentence: "Globalization has had a significant impact on culture.", audioUrl: null },
      { lessonId: lesson60.id, word: "make progress", meaning: "to advance or improve", translation: "taraqqiyot qilmoq", exampleSentence: "She is making good progress in her studies.", audioUrl: null },
      { lessonId: lesson60.id, word: "hold a meeting", meaning: "to organize a gathering", translation: "uchrashuv o'tkazmoq", exampleSentence: "We will hold a meeting to discuss the project.", audioUrl: null },
      { lessonId: lesson60.id, word: "give a presentation", meaning: "to present information to an audience", translation: "taqdimot qilmoq", exampleSentence: "He gave an excellent presentation on global warming.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 7 created:", lesson60.title);

  // --- Vocabulary Lesson 8: Phrasal verbs ---
  const lesson61 = await prisma.lesson.create({
    data: {
      title: "Phrasal verbs",
      category: "vocabulary",
      durationMin: 25,
      isPremium: true,
      difficulty: "Medium",
      order: 61,
      prerequisiteLessonId: lesson60.id,
      theoryContent: `<p>Phrasal verbs — fe'l va predlog yoki adverb birikmasidan tashkil topgan so'z birikmalari bo'lib, ularning ma'nosi odatda fe'lning o'z ma'nosidan farq qiladi. IELTS imtihonida phrasal verbs ni to'g'ri ishlatish Speaking va Writing da tabiiy va ravon gapirishga yordam beradi.</p>
<p>Quyida eng muhim IELTS phrasal verbs keltirilgan:</p>
<p>Phrasal verbs ni o'rganishda ularning sinonimlarini ham bilish muhim, chunki Writing Task 2 da formal sinonimlarni ishlatish tavsiya etiladi.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Phrasal verb</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Misol</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">carry out</td><td class="border border-gray-300 px-4 py-2 font-mono">amalga oshirmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The researchers carried out an experiment.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">bring about</td><td class="border border-gray-300 px-4 py-2 font-mono">sabab bo'lmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The policy brought about significant changes.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">come up with</td><td class="border border-gray-300 px-4 py-2 font-mono">o'ylab topmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">She came up with a brilliant idea.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">look into</td><td class="border border-gray-300 px-4 py-2 font-mono">tekshirmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The police are looking into the matter.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">point out</td><td class="border border-gray-300 px-4 py-2 font-mono">ta'kidlamoq, ko'rsatmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">He pointed out several mistakes in the report.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">put forward</td><td class="border border-gray-300 px-4 py-2 font-mono">taklif qilmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">They put forward a new proposal.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">set up</td><td class="border border-gray-300 px-4 py-2 font-mono">tashkil etmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The government set up a new committee.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">take over</td><td class="border border-gray-300 px-4 py-2 font-mono">egallamoq, qabul qilib olmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The company was taken over by a competitor.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">turn out</td><td class="border border-gray-300 px-4 py-2 font-mono">natijalanmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The experiment turned out to be successful.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">work out</td><td class="border border-gray-300 px-4 py-2 font-mono">hal qilmoq, ishlab chiqmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">We need to work out a solution.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">break down</td><td class="border border-gray-300 px-4 py-2 font-mono">buzilmoq, tahlil qilmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">Let me break down the problem into smaller parts.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">go through</td><td class="border border-gray-300 px-4 py-2 font-mono">boshdan kechirmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">The country went through a difficult period.</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. Phrasal verbs ni kontekstda o'rganing — ularni alohida emas, balki jumla ichida yodlang.
2. Har bir phrasal verbning formal sinonimini biling: "carry out" = "conduct", "look into" = "investigate".
3. IELTS Speakingda phrasal verbs ishlatish nutqingizni tabiiy qiladi, lekin Writing Task 2 da formal so'zlarni ishlating.`,
      commonMistakes: `1. Phrasal verb ni noto'g'ri ajratish: "carry out" ni "carry it out" (to'g'ri), "carry out it" (noto'g'ri).
2. Phrasal verb ma'nosini fe'l va predlog ma'nosidan kelib chiqib topishga urinish — ko'p phrasal verbs idiomatik ma'noga ega.
3. Formal va informal phrasal verbs ni aralashtirish — "put up with" informal, "tolerate" formal.`,
      passageText: `Common IELTS Phrasal Verbs

Phrasal verbs: carry out, bring about, come up with, look into, point out, put forward, set up, take over, turn out, work out, break down, go through`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "carry out", options: ["a) amalga oshirmoq", "b) tekshirmoq", "c) taklif qilmoq", "d) tashkil etmoq"], correctAnswer: 0, explanation: "Carry out — amalga oshirmoq, bajarmoq." },
        { id: 2, type: "fill-blank", question: "The scientists ____ out an important experiment.", options: ["carried", "brought", "came", "looked"], correctAnswer: 0, explanation: "Carry out — amalga oshirish, tadqiqot o'tkazish." },
        { id: 3, type: "matching", question: "look into", options: ["a) tekshirmoq", "b) taklif qilmoq", "c) egallamoq", "d) hal qilmoq"], correctAnswer: 0, explanation: "Look into — tekshirmoq, o'rganmoq." },
        { id: 4, type: "multiple-choice", question: "What does 'come up with' mean?", options: ["o'ylab topmoq", "kelishmoq", "yig'ilmoq", "qaytmoq"], correctAnswer: 0, explanation: "Come up with — o'ylab topmoq, g'oya taklif qilmoq." },
        { id: 5, type: "fill-blank", question: "The government ____ up a new healthcare system.", options: ["set", "took", "put", "brought"], correctAnswer: 0, explanation: "Set up — tashkil etmoq, yo'lga qo'ymoq." },
        { id: 6, type: "matching", question: "point out", options: ["a) ta'kidlamoq", "b) tekshirmoq", "c) taklif qilmoq", "d) buzilmoq"], correctAnswer: 0, explanation: "Point out — ta'kidlamoq, ko'rsatmoq." },
        { id: 7, type: "fill-blank", question: "Everything ____ out well in the end.", options: ["turned", "worked", "broke", "went"], correctAnswer: 0, explanation: "Turn out — natijalanmoq, oxir-oqibat bo'lmoq." },
        { id: 8, type: "multiple-choice", question: "Which phrasal verb means 'to assume control of a company'?", options: ["take over", "set up", "carry out", "break down"], correctAnswer: 0, explanation: "Take over — egallamoq, kompaniyani sotib olmoq." },
        { id: 9, type: "fill-blank", question: "We need to ____ out a solution to this problem.", options: ["work", "carry", "turn", "break"], correctAnswer: 0, explanation: "Work out — hal qilmoq, yechim topmoq." },
        { id: 10, type: "matching", question: "break down", options: ["a) buzilmoq", "b) tashkil etmoq", "c) egallamoq", "d) taklif qilmoq"], correctAnswer: 0, explanation: "Break down — buzilmoq yoki tahlil qilmoq (ma'noga qarab)." },
        { id: 11, type: "multiple-choice", question: "What is the formal synonym of 'carry out'?", options: ["conduct", "break", "start", "finish"], correctAnswer: 0, explanation: "Carry out = conduct (formal synonym)." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson61.id, word: "carry out", meaning: "to perform or conduct", translation: "amalga oshirmoq", exampleSentence: "The research was carried out by a team of experts.", audioUrl: null },
      { lessonId: lesson61.id, word: "bring about", meaning: "to cause something to happen", translation: "sabab bo'lmoq", exampleSentence: "The reforms brought about positive changes in the system.", audioUrl: null },
      { lessonId: lesson61.id, word: "come up with", meaning: "to think of or produce", translation: "o'ylab topmoq", exampleSentence: "She came up with an innovative solution to the problem.", audioUrl: null },
      { lessonId: lesson61.id, word: "look into", meaning: "to investigate or examine", translation: "tekshirmoq", exampleSentence: "The committee will look into the matter thoroughly.", audioUrl: null },
      { lessonId: lesson61.id, word: "point out", meaning: "to indicate or highlight", translation: "ta'kidlamoq", exampleSentence: "He pointed out the flaws in the argument.", audioUrl: null },
      { lessonId: lesson61.id, word: "put forward", meaning: "to propose or suggest", translation: "taklif qilmoq", exampleSentence: "The minister put forward a new economic plan.", audioUrl: null },
      { lessonId: lesson61.id, word: "set up", meaning: "to establish or create", translation: "tashkil etmoq", exampleSentence: "They set up a charity to help the homeless.", audioUrl: null },
      { lessonId: lesson61.id, word: "take over", meaning: "to assume control", translation: "egallamoq", exampleSentence: "The new manager took over the department last month.", audioUrl: null },
      { lessonId: lesson61.id, word: "turn out", meaning: "to result or end up", translation: "natijalanmoq", exampleSentence: "The event turned out to be a great success.", audioUrl: null },
      { lessonId: lesson61.id, word: "work out", meaning: "to solve or resolve", translation: "hal qilmoq", exampleSentence: "We need to work out the details of the agreement.", audioUrl: null },
      { lessonId: lesson61.id, word: "break down", meaning: "to stop functioning or to analyze", translation: "buzilmoq / tahlil qilmoq", exampleSentence: "Let me break down the costs for you.", audioUrl: null },
      { lessonId: lesson61.id, word: "go through", meaning: "to experience or endure", translation: "boshdan kechirmoq", exampleSentence: "The country went through a period of economic hardship.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 8 created:", lesson61.title);

  // --- Vocabulary Lesson 9: Synonyms va antonyms ---
  const lesson62 = await prisma.lesson.create({
    data: {
      title: "Synonyms va antonyms",
      category: "vocabulary",
      durationMin: 20,
      isPremium: true,
      difficulty: "Easy",
      order: 62,
      prerequisiteLessonId: lesson61.id,
      theoryContent: `<p>Synonyms (sinonimlar) va antonyms (antonimlar) ni bilish IELTS imtihonida lug'at boyligingizni oshirishning eng samarali usulidir. Quyida eng muhim sinonim va antonim juftliklari keltirilgan:</p>
<p>IELTS Writing va Speaking da bir xil so'zlarni takrorlamaslik uchun sinonimlardan foydalanish muhimdir.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">So'z</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Sinonim</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Antonim</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Tarjima</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">important</td><td class="border border-gray-300 px-4 py-2 font-mono">significant</td><td class="border border-gray-300 px-4 py-2 font-mono">trivial</td><td class="border border-gray-300 px-4 py-2 font-mono">muhim</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">increase</td><td class="border border-gray-300 px-4 py-2 font-mono">rise</td><td class="border border-gray-300 px-4 py-2 font-mono">decrease</td><td class="border border-gray-300 px-4 py-2 font-mono">oshirish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">difficult</td><td class="border border-gray-300 px-4 py-2 font-mono">challenging</td><td class="border border-gray-300 px-4 py-2 font-mono">easy</td><td class="border border-gray-300 px-4 py-2 font-mono">qiyin</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">benefit</td><td class="border border-gray-300 px-4 py-2 font-mono">advantage</td><td class="border border-gray-300 px-4 py-2 font-mono">disadvantage</td><td class="border border-gray-300 px-4 py-2 font-mono">foyda</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">problem</td><td class="border border-gray-300 px-4 py-2 font-mono">issue</td><td class="border border-gray-300 px-4 py-2 font-mono">solution</td><td class="border border-gray-300 px-4 py-2 font-mono">muammo</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">show</td><td class="border border-gray-300 px-4 py-2 font-mono">demonstrate</td><td class="border border-gray-300 px-4 py-2 font-mono">conceal</td><td class="border border-gray-300 px-4 py-2 font-mono">ko'rsatish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">help</td><td class="border border-gray-300 px-4 py-2 font-mono">assist</td><td class="border border-gray-300 px-4 py-2 font-mono">hinder</td><td class="border border-gray-300 px-4 py-2 font-mono">yordam</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">big</td><td class="border border-gray-300 px-4 py-2 font-mono">large</td><td class="border border-gray-300 px-4 py-2 font-mono">small</td><td class="border border-gray-300 px-4 py-2 font-mono">katta</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">good</td><td class="border border-gray-300 px-4 py-2 font-mono">positive</td><td class="border border-gray-300 px-4 py-2 font-mono">negative</td><td class="border border-gray-300 px-4 py-2 font-mono">yaxshi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">change</td><td class="border border-gray-300 px-4 py-2 font-mono">alter</td><td class="border border-gray-300 px-4 py-2 font-mono">remain</td><td class="border border-gray-300 px-4 py-2 font-mono">o'zgartirish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">need</td><td class="border border-gray-300 px-4 py-2 font-mono">require</td><td class="border border-gray-300 px-4 py-2 font-mono">avoid</td><td class="border border-gray-300 px-4 py-2 font-mono">kerak</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">use</td><td class="border border-gray-300 px-4 py-2 font-mono">utilize</td><td class="border border-gray-300 px-4 py-2 font-mono">waste</td><td class="border border-gray-300 px-4 py-2 font-mono">ishlatish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">get</td><td class="border border-gray-300 px-4 py-2 font-mono">obtain</td><td class="border border-gray-300 px-4 py-2 font-mono">lose</td><td class="border border-gray-300 px-4 py-2 font-mono">olish</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">old</td><td class="border border-gray-300 px-4 py-2 font-mono">ancient</td><td class="border border-gray-300 px-4 py-2 font-mono">modern</td><td class="border border-gray-300 px-4 py-2 font-mono">eski</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">new</td><td class="border border-gray-300 px-4 py-2 font-mono">novel</td><td class="border border-gray-300 px-4 py-2 font-mono">outdated</td><td class="border border-gray-300 px-4 py-2 font-mono">yangi</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">strong</td><td class="border border-gray-300 px-4 py-2 font-mono">powerful</td><td class="border border-gray-300 px-4 py-2 font-mono">weak</td><td class="border border-gray-300 px-4 py-2 font-mono">kuchli</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">clear</td><td class="border border-gray-300 px-4 py-2 font-mono">obvious</td><td class="border border-gray-300 px-4 py-2 font-mono">unclear</td><td class="border border-gray-300 px-4 py-2 font-mono">aniq</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">enough</td><td class="border border-gray-300 px-4 py-2 font-mono">sufficient</td><td class="border border-gray-300 px-4 py-2 font-mono">insufficient</td><td class="border border-gray-300 px-4 py-2 font-mono">yetarli</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">often</td><td class="border border-gray-300 px-4 py-2 font-mono">frequently</td><td class="border border-gray-300 px-4 py-2 font-mono">rarely</td><td class="border border-gray-300 px-4 py-2 font-mono">tez-tez</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">therefore</td><td class="border border-gray-300 px-4 py-2 font-mono">consequently</td><td class="border border-gray-300 px-4 py-2 font-mono">nevertheless</td><td class="border border-gray-300 px-4 py-2 font-mono">shuning uchun</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. Yangi so'z o'rganganda, uning sinonim va antonimini ham birga o'rganing.
2. Writingda so'z takrorlanmasligi uchun sinonimlardan foydalaning.
3. Antonimlarni bilish Speakingda qarama-qarshi fikrlarni ifodalashga yordam beradi.`,
      commonMistakes: `1. Sinonimlarning kontekstga mos kelishini tekshirmasdan ishlatish — "big" va "large" ko'pincha almashinadi, lekin "big" informal.
2. Antonimlarni noto'g'ri tanlash — "increase" ning antonimi "decrease", "reduce" emas.
3. Formal va informal sinonimlarni aralashtirish — "get" informal, "obtain" formal.`,
      passageText: `Synonyms and Antonyms for IELTS

Word pairs: important/significant/trivial, increase/rise/decrease, difficult/challenging/easy, benefit/advantage/disadvantage, problem/issue/solution, show/demonstrate/conceal, help/assist/hinder, big/large/small, good/positive/negative, change/alter/remain, need/require/avoid, use/utilize/waste, get/obtain/lose, old/ancient/modern, new/novel/outdated, strong/powerful/weak, clear/obvious/unclear, enough/sufficient/insufficient, often/frequently/rarely, therefore/consequently/nevertheless`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "important", options: ["a) significant (synonym)", "b) trivial (synonym)", "c) weak (synonym)", "d) small (synonym)"], correctAnswer: 0, explanation: "Important — significant (muhim). Trivial esa antonim." },
        { id: 2, type: "fill-blank", question: "The opposite of 'increase' is ____.", options: ["decrease", "rise", "expand", "grow"], correctAnswer: 0, explanation: "Increase — oshirish. Antonimi: decrease — kamaytirish." },
        { id: 3, type: "matching", question: "difficult", options: ["a) challenging (synonym)", "b) easy (synonym)", "c) trivial (synonym)", "d) small (synonym)"], correctAnswer: 0, explanation: "Difficult — challenging (qiyin). Easy esa antonim." },
        { id: 4, type: "multiple-choice", question: "What is a synonym for 'benefit'?", options: ["advantage", "problem", "disadvantage", "issue"], correctAnswer: 0, explanation: "Benefit — advantage (foyda). Disadvantage esa antonim." },
        { id: 5, type: "fill-blank", question: "The word 'show' can be replaced with ____ in formal writing.", options: ["demonstrate", "conceal", "hide", "lose"], correctAnswer: 0, explanation: "Demonstrate — ko'rsatish, namoyish qilish (formal synonym)." },
        { id: 6, type: "matching", question: "old", options: ["a) ancient (synonym)", "b) modern (synonym)", "c) novel (synonym)", "d) weak (synonym)"], correctAnswer: 0, explanation: "Old — ancient (qadimiy). Modern esa antonim." },
        { id: 7, type: "multiple-choice", question: "Which word is the antonym of 'strong'?", options: ["powerful", "weak", "clear", "obvious"], correctAnswer: 1, explanation: "Strong — powerful (sinonim). Antonimi: weak (kuchsiz)." },
        { id: 8, type: "fill-blank", question: "The word 'use' has the formal synonym ____.", options: ["utilize", "waste", "lose", "avoid"], correctAnswer: 0, explanation: "Utilize — ishlatish, foydalanish (formal)." },
        { id: 9, type: "matching", question: "enough", options: ["a) sufficient (synonym)", "b) insufficient (synonym)", "c) rarely (synonym)", "d) frequently (synonym)"], correctAnswer: 0, explanation: "Enough — sufficient (yetarli)." },
        { id: 10, type: "multiple-choice", question: "What is a synonym for 'therefore'?", options: ["consequently", "nevertheless", "however", "rarely"], correctAnswer: 0, explanation: "Therefore — consequently (shuning uchun, natijada)." },
        { id: 11, type: "fill-blank", question: "'New' is to 'novel' as 'old' is to ____.", options: ["ancient", "modern", "outdated", "weak"], correctAnswer: 0, explanation: "Old — ancient (eski, qadimiy). Modern esa antonim." },
        { id: 12, type: "matching", question: "good", options: ["a) positive (synonym)", "b) negative (synonym)", "c) trivial (synonym)", "d) unclear (synonym)"], correctAnswer: 0, explanation: "Good — positive (yaxshi, ijobiy). Negative esa antonim." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson62.id, word: "important", meaning: "of great significance", translation: "muhim", exampleSentence: "Education is important for personal development.", audioUrl: null },
      { lessonId: lesson62.id, word: "significant", meaning: "sufficiently great or important (synonym)", translation: "ahamiyatli", exampleSentence: "There has been a significant increase in sales.", audioUrl: null },
      { lessonId: lesson62.id, word: "trivial", meaning: "of little value or importance (antonym)", translation: "ahamiyatsiz", exampleSentence: "Don't focus on trivial details.", audioUrl: null },
      { lessonId: lesson62.id, word: "increase", meaning: "to become greater", translation: "oshirish", exampleSentence: "The population continues to increase rapidly.", audioUrl: null },
      { lessonId: lesson62.id, word: "decrease", meaning: "to become smaller (antonym)", translation: "kamaytirish", exampleSentence: "The government aims to decrease unemployment.", audioUrl: null },
      { lessonId: lesson62.id, word: "difficult", meaning: "needing much effort", translation: "qiyin", exampleSentence: "The exam was very difficult.", audioUrl: null },
      { lessonId: lesson62.id, word: "challenging", meaning: "testing one's abilities (synonym)", translation: "qiyin, sinov", exampleSentence: "Starting a new business is challenging.", audioUrl: null },
      { lessonId: lesson62.id, word: "benefit", meaning: "an advantage", translation: "foyda", exampleSentence: "Regular exercise has many benefits.", audioUrl: null },
      { lessonId: lesson62.id, word: "advantage", meaning: "a condition giving a greater chance of success (synonym)", translation: "afzallik", exampleSentence: "Being bilingual is a clear advantage.", audioUrl: null },
      { lessonId: lesson62.id, word: "show", meaning: "to make visible", translation: "ko'rsatish", exampleSentence: "The results show a clear improvement.", audioUrl: null },
      { lessonId: lesson62.id, word: "demonstrate", meaning: "to clearly show (formal synonym)", translation: "namoyish qilish", exampleSentence: "The experiment demonstrates the theory.", audioUrl: null },
      { lessonId: lesson62.id, word: "change", meaning: "to make different", translation: "o'zgartirish", exampleSentence: "We need to change our approach.", audioUrl: null },
      { lessonId: lesson62.id, word: "alter", meaning: "to change in character (synonym)", translation: "o'zgartirmoq", exampleSentence: "The policy was altered to meet new demands.", audioUrl: null },
      { lessonId: lesson62.id, word: "use", meaning: "to employ for a purpose", translation: "ishlatish", exampleSentence: "We use technology in everyday life.", audioUrl: null },
      { lessonId: lesson62.id, word: "utilize", meaning: "to make practical use of (formal synonym)", translation: "foydalanmoq", exampleSentence: "The company utilizes advanced technology.", audioUrl: null },
      { lessonId: lesson62.id, word: "strong", meaning: "having power or strength", translation: "kuchli", exampleSentence: "She has a strong personality.", audioUrl: null },
      { lessonId: lesson62.id, word: "powerful", meaning: "having great power (synonym)", translation: "kuchli, qudratli", exampleSentence: "The country has a powerful economy.", audioUrl: null },
      { lessonId: lesson62.id, word: "clear", meaning: "easy to perceive", translation: "aniq", exampleSentence: "The instructions were clear and easy to follow.", audioUrl: null },
      { lessonId: lesson62.id, word: "obvious", meaning: "easily perceived (synonym)", translation: "aniq, ravshan", exampleSentence: "It was obvious that she had prepared well.", audioUrl: null },
      { lessonId: lesson62.id, word: "therefore", meaning: "for that reason", translation: "shuning uchun", exampleSentence: "He was late; therefore, he missed the beginning.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 9 created:", lesson62.title);

  // --- Vocabulary Lesson 10: Word formation ---
  const lesson63 = await prisma.lesson.create({
    data: {
      title: "Word formation",
      category: "vocabulary",
      durationMin: 25,
      isPremium: true,
      difficulty: "Hard",
      order: 63,
      prerequisiteLessonId: lesson62.id,
      theoryContent: `<p>Word formation — so'z yasash qoidalarini bilish IELTS imtihonida lug'at boyligingizni kengaytirishning eng samarali usulidir. Quyida eng muhim so'z oilalari (word families) keltirilgan:</p>
<p>Word formation qoidalarini bilish sizga nafaqat yangi so'zlarni tez o'rganish, balki imtihonda notanish so'zlarning ma'nosini topishga ham yordam beradi.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Verb</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Noun</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Adjective</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Adverb</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">analyze</td><td class="border border-gray-300 px-4 py-2 font-mono">analysis</td><td class="border border-gray-300 px-4 py-2 font-mono">analytical</td><td class="border border-gray-300 px-4 py-2 font-mono">analytically</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">create</td><td class="border border-gray-300 px-4 py-2 font-mono">creation</td><td class="border border-gray-300 px-4 py-2 font-mono">creative</td><td class="border border-gray-300 px-4 py-2 font-mono">creatively</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">economy</td><td class="border border-gray-300 px-4 py-2 font-mono">economy</td><td class="border border-gray-300 px-4 py-2 font-mono">economic</td><td class="border border-gray-300 px-4 py-2 font-mono">economically</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">educate</td><td class="border border-gray-300 px-4 py-2 font-mono">education</td><td class="border border-gray-300 px-4 py-2 font-mono">educational</td><td class="border border-gray-300 px-4 py-2 font-mono">educationally</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">environment</td><td class="border border-gray-300 px-4 py-2 font-mono">environment</td><td class="border border-gray-300 px-4 py-2 font-mono">environmental</td><td class="border border-gray-300 px-4 py-2 font-mono">environmentally</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">differ</td><td class="border border-gray-300 px-4 py-2 font-mono">difference</td><td class="border border-gray-300 px-4 py-2 font-mono">different</td><td class="border border-gray-300 px-4 py-2 font-mono">differently</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">achieve</td><td class="border border-gray-300 px-4 py-2 font-mono">achievement</td><td class="border border-gray-300 px-4 py-2 font-mono">achievable</td><td class="border border-gray-300 px-4 py-2 font-mono">—</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">develop</td><td class="border border-gray-300 px-4 py-2 font-mono">development</td><td class="border border-gray-300 px-4 py-2 font-mono">developmental</td><td class="border border-gray-300 px-4 py-2 font-mono">developmentally</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">improve</td><td class="border border-gray-300 px-4 py-2 font-mono">improvement</td><td class="border border-gray-300 px-4 py-2 font-mono">improved</td><td class="border border-gray-300 px-4 py-2 font-mono">—</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">invest</td><td class="border border-gray-300 px-4 py-2 font-mono">investment</td><td class="border border-gray-300 px-4 py-2 font-mono">investment</td><td class="border border-gray-300 px-4 py-2 font-mono">—</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">contribute</td><td class="border border-gray-300 px-4 py-2 font-mono">contribution</td><td class="border border-gray-300 px-4 py-2 font-mono">contributory</td><td class="border border-gray-300 px-4 py-2 font-mono">—</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">demonstrate</td><td class="border border-gray-300 px-4 py-2 font-mono">demonstration</td><td class="border border-gray-300 px-4 py-2 font-mono">demonstrative</td><td class="border border-gray-300 px-4 py-2 font-mono">demonstrably</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">identify</td><td class="border border-gray-300 px-4 py-2 font-mono">identification</td><td class="border border-gray-300 px-4 py-2 font-mono">identifiable</td><td class="border border-gray-300 px-4 py-2 font-mono">identifiably</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">participate</td><td class="border border-gray-300 px-4 py-2 font-mono">participation</td><td class="border border-gray-300 px-4 py-2 font-mono">participatory</td><td class="border border-gray-300 px-4 py-2 font-mono">—</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">significant</td><td class="border border-gray-300 px-4 py-2 font-mono">significance</td><td class="border border-gray-300 px-4 py-2 font-mono">significant</td><td class="border border-gray-300 px-4 py-2 font-mono">significantly</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. So'z yasashda eng ko'p ishlatiladigan prefiks va suffikslarni o'rganing: un-, re-, -tion, -able, -ment, -ly.
2. Har bir so'zning barcha shakllarini birga o'rganing va ular bilan jumla tuzing.
3. IELTS Writingda turli so'z shakllarini ishlatish grammatik xilma-xillikni ko'rsatadi va ballni oshiradi.`,
      commonMistakes: `1. "Economy" va "economics" ni aralashtirish — economy iqtisodiy tizim, economics iqtisodiyot fani.
2. "Economic" va "economical" farqini bilmaslik — economic iqtisodiy, economical tejamkor.
3. "Environment" so'zining adjective shakli "environmental" (not "environmetal") va adverb "environmentally".`,
      passageText: `Word Formation for IELTS

Word families: analyze/analysis/analytical/analytically, create/creation/creative/creatively, economy/economic/economically, educate/education/educational/educationally, environment/environmental/environmentally, differ/difference/different/differently, achieve/achievement/achievable, develop/development/developmental, improve/improvement/improved, invest/investment, contribute/contribution, demonstrate/demonstration/demonstrative, identify/identification/identifiable, participate/participation/participatory, significant/significance/significantly`,
      questions: JSON.stringify([
        { id: 1, type: "fill-blank", question: "The ____ of the new policy was widely discussed.", options: ["create", "creation", "creative", "creatively"], correctAnswer: 1, explanation: "Creation (noun) — yaratish, yaratilish." },
        { id: 2, type: "matching", question: "analyze", options: ["a) analysis (noun)", "b) analytical (noun)", "c) analytically (noun)", "d) analytic (noun)"], correctAnswer: 0, explanation: "Analyze (verb) -> analysis (noun) — tahlil." },
        { id: 3, type: "fill-blank", question: "The country experienced rapid ____ growth.", options: ["economy", "economic", "economical", "economically"], correctAnswer: 1, explanation: "Economic — iqtisodiy (adjective). 'Economic growth' — iqtisodiy o'sish." },
        { id: 4, type: "multiple-choice", question: "What is the noun form of 'achieve'?", options: ["achievement", "achievable", "achieving", "achieved"], correctAnswer: 0, explanation: "Achieve -> achievement (noun) — yutuq, muvaffaqiyat." },
        { id: 5, type: "fill-blank", question: "She has made significant ____ in her studies.", options: ["improvement", "improve", "improved", "improving"], correctAnswer: 0, explanation: "Improvement (noun) — yaxshilanish, taraqqiyot." },
        { id: 6, type: "matching", question: "educate", options: ["a) education (noun)", "b) educational (verb)", "c) educationally (adjective)", "d) educator (verb)"], correctAnswer: 0, explanation: "Educate (verb) -> education (noun) — ta'lim." },
        { id: 7, type: "multiple-choice", question: "Choose the correct form: 'The ____ impact of pollution is severe.'", options: ["environment", "environmental", "environmentally", "environmentalist"], correctAnswer: 1, explanation: "Environmental — ekologik, atrof-muhitga oid (adjective)." },
        { id: 8, type: "fill-blank", question: "There is a significant ____ between the two theories.", options: ["difference", "differ", "different", "differently"], correctAnswer: 0, explanation: "Difference (noun) — farq. 'A difference between A and B'." },
        { id: 9, type: "matching", question: "invest", options: ["a) investment (noun)", "b) investor (verb)", "c) investing (noun)", "d) invested (noun)"], correctAnswer: 0, explanation: "Invest (verb) -> investment (noun) — investitsiya." },
        { id: 10, type: "fill-blank", question: "The ____ of the project took three years.", options: ["development", "develop", "developing", "developed"], correctAnswer: 0, explanation: "Development (noun) — rivojlanish, ishlab chiqish." },
        { id: 11, type: "multiple-choice", question: "Which is the adverb form of 'significant'?", options: ["significant", "significance", "significantly", "signify"], correctAnswer: 2, explanation: "Significantly (adverb) — sezilarli darajada." },
        { id: 12, type: "fill-blank", question: "She ____ in the research project.", options: ["participated", "participation", "participatory", "participant"], correctAnswer: 0, explanation: "Participated (verb, past tense) — qatnashdi." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson63.id, word: "analyze (verb)", meaning: "to examine in detail", translation: "tahlil qilish", exampleSentence: "We need to analyze the data carefully.", audioUrl: null },
      { lessonId: lesson63.id, word: "analysis (noun)", meaning: "detailed examination", translation: "tahlil", exampleSentence: "The analysis revealed several key trends.", audioUrl: null },
      { lessonId: lesson63.id, word: "create (verb)", meaning: "to bring into existence", translation: "yaratish", exampleSentence: "The government plans to create more jobs.", audioUrl: null },
      { lessonId: lesson63.id, word: "creation (noun)", meaning: "the act of creating", translation: "yaratish, yaratilish", exampleSentence: "The creation of new policies is necessary.", audioUrl: null },
      { lessonId: lesson63.id, word: "creative (adj)", meaning: "involving imagination", translation: "ijodiy", exampleSentence: "She has a creative approach to problem-solving.", audioUrl: null },
      { lessonId: lesson63.id, word: "economy (noun)", meaning: "the system of production and trade", translation: "iqtisodiyot", exampleSentence: "The economy is growing at a steady rate.", audioUrl: null },
      { lessonId: lesson63.id, word: "economic (adj)", meaning: "relating to the economy", translation: "iqtisodiy", exampleSentence: "The country faces economic challenges.", audioUrl: null },
      { lessonId: lesson63.id, word: "educate (verb)", meaning: "to teach or instruct", translation: "ta'lim bermoq", exampleSentence: "Schools educate children for the future.", audioUrl: null },
      { lessonId: lesson63.id, word: "education (noun)", meaning: "the process of teaching and learning", translation: "ta'lim", exampleSentence: "Education is a fundamental human right.", audioUrl: null },
      { lessonId: lesson63.id, word: "educational (adj)", meaning: "relating to education", translation: "ta'limiy", exampleSentence: "This is an educational program for young people.", audioUrl: null },
      { lessonId: lesson63.id, word: "develop (verb)", meaning: "to grow or improve", translation: "rivojlantirmoq", exampleSentence: "The company plans to develop new products.", audioUrl: null },
      { lessonId: lesson63.id, word: "development (noun)", meaning: "the process of developing", translation: "rivojlanish", exampleSentence: "Economic development is a priority.", audioUrl: null },
      { lessonId: lesson63.id, word: "achieve (verb)", meaning: "to reach a goal", translation: "erishmoq", exampleSentence: "She worked hard to achieve her goals.", audioUrl: null },
      { lessonId: lesson63.id, word: "achievement (noun)", meaning: "something accomplished", translation: "yutuq", exampleSentence: "Graduating was a major achievement.", audioUrl: null },
      { lessonId: lesson63.id, word: "improve (verb)", meaning: "to make better", translation: "yaxshilamoq", exampleSentence: "We need to improve our services.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 10 created:", lesson63.title);

  // --- Vocabulary Lesson 11: Idioms for IELTS ---
  const lesson64 = await prisma.lesson.create({
    data: {
      title: "Idioms for IELTS",
      category: "vocabulary",
      durationMin: 30,
      isPremium: true,
      difficulty: "Hard",
      order: 64,
      prerequisiteLessonId: lesson63.id,
      theoryContent: `<p>Idioms — bu so'zma-so'z tarjima qilib bo'lmaydigan, o'ziga xos ma'noga ega bo'lgan iboralardir. IELTS imtihonida idioms ni to'g'ri o'rinda ishlatish Speaking bo'limida yuqori ball olishga yordam beradi.</p>
<p>Quyida eng muhim IELTS idioms keltirilgan:</p>
<p>IELTS Speakingda idioms ni tabiiy ishlatish sizning ingliz tilini chuqur bilishingizni ko'rsatadi.</p>
<table class="min-w-full border-collapse border border-gray-300 my-4 text-sm">
<thead>
<tr class="bg-gray-100">
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Idiom</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Ma'nosi</th>
<th class="border border-gray-300 px-4 py-2 text-left font-semibold">Misol</th>
</tr>
</thead>
<tbody>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">piece of cake</td><td class="border border-gray-300 px-4 py-2 font-mono">juda oson</td><td class="border border-gray-300 px-4 py-2 font-mono">The exam was a piece of cake.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">break the ice</td><td class="border border-gray-300 px-4 py-2 font-mono">suhbatni boshlash</td><td class="border border-gray-300 px-4 py-2 font-mono">She told a joke to break the ice.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">hit the nail on the head</td><td class="border border-gray-300 px-4 py-2 font-mono">ayni muddao</td><td class="border border-gray-300 px-4 py-2 font-mono">You hit the nail on the head with that comment.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">once in a blue moon</td><td class="border border-gray-300 px-4 py-2 font-mono">juda kamdan-kam</td><td class="border border-gray-300 px-4 py-2 font-mono">I visit my hometown once in a blue moon.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">under the weather</td><td class="border border-gray-300 px-4 py-2 font-mono">kasal, o'zini yomon his qilish</td><td class="border border-gray-300 px-4 py-2 font-mono">I'm feeling under the weather today.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">cost an arm and a leg</td><td class="border border-gray-300 px-4 py-2 font-mono">juda qimmat</td><td class="border border-gray-300 px-4 py-2 font-mono">The renovation cost an arm and a leg.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">let the cat out of the bag</td><td class="border border-gray-300 px-4 py-2 font-mono">sirni ochmoq</td><td class="border border-gray-300 px-4 py-2 font-mono">She let the cat out of the bag about the party.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">pull someone's leg</td><td class="border border-gray-300 px-4 py-2 font-mono">birovni hazillashib aldash</td><td class="border border-gray-300 px-4 py-2 font-mono">Don't worry, I'm just pulling your leg.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">sit on the fence</td><td class="border border-gray-300 px-4 py-2 font-mono">ikkilanmoq, qaror qila olmaslik</td><td class="border border-gray-300 px-4 py-2 font-mono">Stop sitting on the fence and make a decision.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">burn the midnight oil</td><td class="border border-gray-300 px-4 py-2 font-mono">kechgacha ishlash/o'qish</td><td class="border border-gray-300 px-4 py-2 font-mono">She burned the midnight oil to finish the essay.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">a blessing in disguise</td><td class="border border-gray-300 px-4 py-2 font-mono">yomon ko'ringan yaxshi narsa</td><td class="border border-gray-300 px-4 py-2 font-mono">Losing that job was a blessing in disguise.</td></tr>
<tr><td class="border border-gray-300 px-4 py-2 font-mono">go the extra mile</td><td class="border border-gray-300 px-4 py-2 font-mono">qo'shimcha harakat qilish</td><td class="border border-gray-300 px-4 py-2 font-mono">He always goes the extra mile for his clients.</td></tr>
</tbody>
</table>`,
      tipsAndTricks: `1. Idioms ni Speakingda ishlating, Writing Task 2 da juda ehtiyotkorlik bilan qo'llang (faqat informal insholar uchun).
2. Har bir idiom bilan o'zingizning hayotingizdan misol tuzib ko'ring.
3. Bir darsda 2-3 tadan ko'p idiom o'rganmang — ularni asta-sekin o'zlashtiring.`,
      commonMistakes: `1. Idioms ni noto'g'ri kontekstda ishlatish — "piece of cake" faqat vazifa osonligini bildiradi, ovqatni emas.
2. Idioms ni Writing Task 2 da ishlatish — Task 2 rasmiy bo'lishi kerak, idioms informal hisoblanadi.
3. Idioms ni so'zma-so'z tarjima qilish — "break the ice" muzni sindirish emas, suhbatni boshlash.`,
      passageText: `Common Idioms for IELTS

Idioms: piece of cake, break the ice, hit the nail on the head, once in a blue moon, under the weather, cost an arm and a leg, let the cat out of the bag, pull someone's leg, sit on the fence, burn the midnight oil, a blessing in disguise, go the extra mile`,
      questions: JSON.stringify([
        { id: 1, type: "matching", question: "piece of cake", options: ["a) juda oson", "b) juda qiyin", "c) juda qimmat", "d) juda tez"], correctAnswer: 0, explanation: "Piece of cake — juda oson, hech qanday qiyinchiliksiz." },
        { id: 2, type: "fill-blank", question: "She told a funny story to ____ the ice at the meeting.", options: ["break", "hit", "cost", "pull"], correctAnswer: 0, explanation: "Break the ice — suhbatni boshlash, muhitni yumshatish." },
        { id: 3, type: "matching", question: "under the weather", options: ["a) kasal", "b) baxtli", "c) g'azablangan", "d) hayajonlangan"], correctAnswer: 0, explanation: "Under the weather — o'zini yomon his qilish, kasal bo'lish." },
        { id: 4, type: "multiple-choice", question: "What does 'cost an arm and a leg' mean?", options: ["juda arzon", "juda qimmat", "juda tez", "juda sekin"], correctAnswer: 1, explanation: "Cost an arm and a leg — juda qimmat, qimmatga tushmoq." },
        { id: 5, type: "fill-blank", question: "He ____ the nail on the head with his analysis.", options: ["hit", "broke", "cost", "pulled"], correctAnswer: 0, explanation: "Hit the nail on the head — ayni muddao, to'g'ri aytmoq." },
        { id: 6, type: "matching", question: "let the cat out of the bag", options: ["a) sirni ochmoq", "b) mushukni olib kelmoq", "c) yashirinmoq", "d) qochmoq"], correctAnswer: 0, explanation: "Let the cat out of the bag — sirni oshkor qilmoq, sirdan og'iz ochmoq." },
        { id: 7, type: "multiple-choice", question: "What does 'once in a blue moon' mean?", options: ["har kuni", "juda kamdan-kam", "har doim", "hech qachon"], correctAnswer: 1, explanation: "Once in a blue moon — juda kamdan-kam, siyrak." },
        { id: 8, type: "fill-blank", question: "Stop ____ on the fence and tell us your decision.", options: ["sitting", "breaking", "hitting", "pulling"], correctAnswer: 0, explanation: "Sit on the fence — ikkilanmoq, qaror qila olmaslik." },
        { id: 9, type: "matching", question: "go the extra mile", options: ["a) qo'shimcha harakat qilish", "b) uzoq yo'l bosish", "c) vaqtni boy bermoq", "d) tez yurmoq"], correctAnswer: 0, explanation: "Go the extra mile — qo'shimcha harakat qilish, ko'proq urinish." },
        { id: 10, type: "multiple-choice", question: "What does 'a blessing in disguise' mean?", options: ["Yomon ko'ringan yaxshi narsa", "Yaxshi ko'ringan yomon narsa", "Tasodifiy voqea", "Rejalashtirilgan uchrashuv"], correctAnswer: 0, explanation: "A blessing in disguise — yomon ko'ringan, lekin aslida foydali bo'lgan narsa." },
        { id: 11, type: "fill-blank", question: "She ____ the midnight oil to prepare for the test.", options: ["burned", "broke", "cost", "hit"], correctAnswer: 0, explanation: "Burn the midnight oil — kechgacha ishlash yoki o'qish." },
        { id: 12, type: "matching", question: "pull someone's leg", options: ["a) hazillashib aldash", "b) yordam berish", "c) tanqid qilish", "d) maqtash"], correctAnswer: 0, explanation: "Pull someone's leg — birovni hazillashib aldash, masxara qilish." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson64.id, word: "piece of cake", meaning: "very easy", translation: "juda oson", exampleSentence: "The IELTS Speaking test was a piece of cake for her.", audioUrl: null },
      { lessonId: lesson64.id, word: "break the ice", meaning: "to initiate conversation in a social setting", translation: "suhbatni boshlash", exampleSentence: "He told a joke to break the ice at the party.", audioUrl: null },
      { lessonId: lesson64.id, word: "hit the nail on the head", meaning: "to be exactly right", translation: "ayni muddao", exampleSentence: "You hit the nail on the head with your analysis.", audioUrl: null },
      { lessonId: lesson64.id, word: "once in a blue moon", meaning: "very rarely", translation: "juda kamdan-kam", exampleSentence: "I go to the cinema once in a blue moon.", audioUrl: null },
      { lessonId: lesson64.id, word: "under the weather", meaning: "feeling ill", translation: "kasal, o'zini yomon his qilish", exampleSentence: "I'm feeling a bit under the weather today.", audioUrl: null },
      { lessonId: lesson64.id, word: "cost an arm and a leg", meaning: "very expensive", translation: "juda qimmat", exampleSentence: "The tuition fees cost an arm and a leg.", audioUrl: null },
      { lessonId: lesson64.id, word: "let the cat out of the bag", meaning: "to reveal a secret", translation: "sirni ochmoq", exampleSentence: "She let the cat out of the bag about the surprise party.", audioUrl: null },
      { lessonId: lesson64.id, word: "pull someone's leg", meaning: "to tease or joke with someone", translation: "hazillashib aldash", exampleSentence: "Don't worry, I'm just pulling your leg.", audioUrl: null },
      { lessonId: lesson64.id, word: "sit on the fence", meaning: "to avoid making a decision", translation: "ikkilanmoq", exampleSentence: "You can't sit on the fence forever; choose a side.", audioUrl: null },
      { lessonId: lesson64.id, word: "burn the midnight oil", meaning: "to work late into the night", translation: "kechgacha ishlash", exampleSentence: "She burned the midnight oil to finish her thesis.", audioUrl: null },
      { lessonId: lesson64.id, word: "a blessing in disguise", meaning: "something that seems bad but turns out good", translation: "yomon ko'ringan yaxshi narsa", exampleSentence: "Losing my job was a blessing in disguise.", audioUrl: null },
      { lessonId: lesson64.id, word: "go the extra mile", meaning: "to make extra effort", translation: "qo'shimcha harakat qilish", exampleSentence: "She always goes the extra mile for her students.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 11 created:", lesson64.title);

  // --- Vocabulary Lesson 12: Vocabulary review test ---
  const lesson65 = await prisma.lesson.create({
    data: {
      title: "Vocabulary review test",
      category: "vocabulary",
      durationMin: 30,
      isPremium: true,
      difficulty: "Hard",
      order: 65,
      prerequisiteLessonId: lesson64.id,
      theoryContent: `Ushbu dars barcha oldingi vocabulary darslarida o'rganilgan so'zlarni takrorlash va mustahkamlash uchun mo'ljallangan. Quyida barcha mavzulardan eng muhim so'zlar keltirilgan.

AWL Sublist 1: analyze, approach, area, assess, assume, authority, available, benefit, concept, consistent, context, contract, create, data, definition, derived, distribution, economic, environment

AWL Sublist 2: establish, estimate, evidence, export, factor, finance, formula, function, identified, income, indicate, individual, interpretation, involved, issues, labor, legal, legislation, major, method

Education: curriculum, syllabus, qualification, degree, diploma, undergraduate, postgraduate, scholarship, tuition, lecture, seminar, tutorial, assignment, assessment, academic, vocational, literacy, numeracy

Environment: climate, pollution, conservation, ecosystem, biodiversity, sustainability, renewable, emission, deforestation, global warming, fossil fuel, greenhouse, ozone, biodegradable, habitat, species, pesticide, fertilizer

Technology: innovation, digital, automation, artificial intelligence, algorithm, software, hardware, cybersecurity, encryption, bandwidth, cloud computing, robotics, virtual reality, nanotechnology, biotechnology, database, interface, network

Health: nutrition, obesity, epidemic, pandemic, diagnosis, prescription, vaccination, immunity, chronic, acute, therapy, rehabilitation, mental health, wellness, hygiene, surgery, medication, prevention

Ushbu so'zlarning barchasini takrorlang va ular bilan jumla tuzishni mashq qiling.`,
      tipsAndTricks: `1. Review test oldidan barcha oldingi darslarni qayta ko'rib chiqing.
2. Eng qiyin so'zlarni alohida ro'yxatga olib, ularga ko'proq vaqt ajrating.
3. So'zlarni kartochkalarga yozib, ularni takrorlash uchun foydalaning.`,
      commonMistakes: `1. So'zlarni faqat tarjimasini bilish, lekin ularni gap ichida ishlata olmaslik.
2. Sinonimlarni kontekstga mos kelishini tekshirmasdan ishlatish.
3. Formal va informal so'zlarni aralashtirish — IELTS Writingda formal lug'at ishlatish muhim.`,
      passageText: `Vocabulary Review Test

This lesson reviews all vocabulary covered in previous lessons: Academic Word List 1 & 2, Education, Environment, Technology, Health, Collocations, Phrasal Verbs, Synonyms & Antonyms, Word Formation, and Idioms.`,
      questions: JSON.stringify([
        { id: 1, type: "fill-blank", question: "Scientists ____ experiments to test their hypotheses.", options: ["carry out", "come up with", "look into", "set up"], correctAnswer: 0, explanation: "Carry out experiments — tajriba o'tkazish." },
        { id: 2, type: "matching", question: "biodiversity", options: ["a) biologik xilma-xillik", "b) barqarorlik", "c) ifloslanish", "d) iqlim"], correctAnswer: 0, explanation: "Biodiversity — biologik xilma-xillik." },
        { id: 3, type: "multiple-choice", question: "What does 'make a decision' mean?", options: ["qaror qabul qilish", "xatolik qilish", "tayyorgarlik ko'rish", "taklif berish"], correctAnswer: 0, explanation: "Make a decision — qaror qabul qilish." },
        { id: 4, type: "fill-blank", question: "The ____ of the new product took two years.", options: ["development", "difference", "demonstration", "definition"], correctAnswer: 0, explanation: "Development — rivojlanish, ishlab chiqish (word formation)." },
        { id: 5, type: "matching", question: "under the weather", options: ["a) kasal", "b) baxtli", "c) g'azablangan", "d) charchagan"], correctAnswer: 0, explanation: "Under the weather — o'zini yomon his qilish." },
        { id: 6, type: "multiple-choice", question: "Which is a synonym for 'important'?", options: ["trivial", "significant", "small", "weak"], correctAnswer: 1, explanation: "Significant — muhim, ahamiyatli (synonym of important)." },
        { id: 7, type: "fill-blank", question: "She ____ research on climate change.", options: ["conducts", "creates", "develops", "establishes"], correctAnswer: 0, explanation: "Conduct research — tadqiqot o'tkazish." },
        { id: 8, type: "matching", question: "curriculum", options: ["a) o'quv dasturi", "b) fan dasturi", "c) malaka", "d) daraja"], correctAnswer: 0, explanation: "Curriculum — o'quv dasturi (Education)." },
        { id: 9, type: "multiple-choice", question: "What does 'global warming' refer to?", options: ["Iqlim o'zgarishi", "Yer haroratining ko'tarilishi", "Havo ifloslanishi", "O'rmonlarning kesilishi"], correctAnswer: 1, explanation: "Global warming — global isish, yer haroratining ko'tarilishi." },
        { id: 10, type: "fill-blank", question: "The government must ____ carbon emissions.", options: ["reduce", "increase", "create", "establish"], correctAnswer: 0, explanation: "Reduce emissions — chiqindilarni kamaytirish." },
        { id: 11, type: "matching", question: "innovation", options: ["a) innovatsiya", "b) avtomatlashtirish", "c) interfeys", "d) tarmoq"], correctAnswer: 0, explanation: "Innovation — innovatsiya, yangilik (Technology)." },
        { id: 12, type: "fill-blank", question: "The exam was a ____ of cake.", options: ["piece", "slice", "bit", "part"], correctAnswer: 0, explanation: "Piece of cake — juda oson (idiom)." },
      ]),
    },
  });

  await prisma.vocabularyWord.createMany({
    data: [
      { lessonId: lesson65.id, word: "conduct research", meaning: "to carry out a study", translation: "tadqiqot o'tkazish", exampleSentence: "Scientists conduct research to find new treatments.", audioUrl: null },
      { lessonId: lesson65.id, word: "biodiversity", meaning: "variety of life forms", translation: "biologik xilma-xillik", exampleSentence: "Rainforests have rich biodiversity.", audioUrl: null },
      { lessonId: lesson65.id, word: "global warming", meaning: "rise in earth's temperature", translation: "global isish", exampleSentence: "Global warming is causing extreme weather events.", audioUrl: null },
      { lessonId: lesson65.id, word: "innovation", meaning: "a new method or idea", translation: "innovatsiya", exampleSentence: "Innovation drives economic progress.", audioUrl: null },
      { lessonId: lesson65.id, word: "curriculum", meaning: "subjects in a course", translation: "o'quv dasturi", exampleSentence: "The curriculum includes practical training.", audioUrl: null },
      { lessonId: lesson65.id, word: "significant", meaning: "sufficiently great or important", translation: "ahamiyatli", exampleSentence: "There has been a significant improvement in her grades.", audioUrl: null },
      { lessonId: lesson65.id, word: "chronic", meaning: "long-lasting condition", translation: "surunkali", exampleSentence: "She suffers from chronic back pain.", audioUrl: null },
      { lessonId: lesson65.id, word: "encryption", meaning: "encoding information", translation: "shifrlash", exampleSentence: "Encryption protects sensitive data.", audioUrl: null },
      { lessonId: lesson65.id, word: "make a decision", meaning: "to choose after consideration", translation: "qaror qabul qilish", exampleSentence: "We need to make a decision soon.", audioUrl: null },
      { lessonId: lesson65.id, word: "piece of cake", meaning: "very easy", translation: "juda oson", exampleSentence: "The test was a piece of cake.", audioUrl: null },
    ],
  });

  console.log("Vocabulary Lesson 12 created:", lesson65.title);


  console.log("All 12 reading lessons, 10 writing lessons, 8 listening lessons, 8 speaking lessons, 15 grammar lessons, and 12 vocabulary lessons have been seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
