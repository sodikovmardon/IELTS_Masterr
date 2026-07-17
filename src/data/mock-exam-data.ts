export interface MockQuestion {
  id: number;
  type: string;
  section?: number;       // Listening: 1-4 which section
  passage?: number;       // Reading: 1-3 which passage
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MockWritingPrompt {
  task: 1 | 2;
  prompt: string;
  minWords: number;
  recommendedMinutes: number;
}

export interface MockSpeakingPart {
  part: 1 | 2 | 3;
  title: string;
  instructions: string;
  questions: string[];
  preparationSeconds?: number;
  speakingSeconds?: number;
}

export interface MockExamData {
  id: string;
  title: string;
  listening: {
    totalTimeMin: number;       // 30
    reviewTimeMin: number;      // 2
    sections: Array<{
      number: 1 | 2 | 3 | 4;
      title: string;
      type: string;
      description: string;
      previewSeconds: number;   // ~30s before each section
      questions: MockQuestion[];
    }>;
  };
  reading: {
    totalTimeMin: number;       // 60
    passages: Array<{
      number: 1 | 2 | 3;
      title: string;
      difficulty: "Easy" | "Medium" | "Hard";
      wordCount: number;
      text: string;
      questionTypes: string[];
      questions: MockQuestion[];
    }>;
  };
  writing: {
    totalTimeMin: number;       // 60
    tasks: MockWritingPrompt[];
  };
  speaking: {
    totalTimeMin: number;       // 11-14
    parts: MockSpeakingPart[];
  };
}

// ─────────────── LISTENING ───────────────

const listeningSections = [
  {
    number: 1 as const,
    title: "Mehmonxona band qilish",
    type: "Form/Note completion",
    description: "2 kishi suhbati: mijoz va mehmonxona xodimi o'rtasida xona band qilish",
    previewSeconds: 30,
    questions: [
      { id: 1, section: 1, type: "form-completion", question: "Mijozning familiyasi:", options: ["Peterson", "Peters", "Peterson", "Pedersen"], correctAnswer: 0, explanation: "Familiya — Peterson." },
      { id: 2, section: 1, type: "form-completion", question: "Kelish sanasi:", options: ["14 March", "15 March", "16 March", "17 March"], correctAnswer: 1, explanation: "Kelish sanasi 15 Mart." },
      { id: 3, section: 1, type: "form-completion", question: "Ketish sanasi:", options: ["17 March", "18 March", "19 March", "20 March"], correctAnswer: 2, explanation: "Ketish sanasi 19 Mart." },
      { id: 4, section: 1, type: "form-completion", question: "Xona turi:", options: ["Standard", "Deluxe", "Suite", "Budget"], correctAnswer: 1, explanation: "Deluxe xona tanlanadi." },
      { id: 5, section: 1, type: "form-completion", question: "Kechalar soni:", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "4 kecha." },
      { id: 6, section: 1, type: "form-completion", question: "Mijoz telefoni:", options: ["07700 111222", "07700 111223", "07700 111224", "07700 111225"], correctAnswer: 0, explanation: "Telefon: 07700 111222." },
      { id: 7, section: 1, type: "form-completion", question: "Maxsus talab:", options: ["Balkon", "Karavot turi", "Nonushta", "Spa"], correctAnswer: 1, explanation: "Ikki alohida karavot so'ralgan." },
      { id: 8, section: 1, type: "form-completion", question: "To'lov usuli:", options: ["Karta", "Naqd", "Bank o'tkazmasi", "Chek"], correctAnswer: 0, explanation: "Kredit karta." },
      { id: 9, section: 1, type: "form-completion", question: "Karta raqami oxirgi 4 raqam:", options: ["4532", "4523", "4352", "4325"], correctAnswer: 0, explanation: "Oxirgi 4 raqam: 4532." },
      { id: 10, section: 1, type: "form-completion", question: "Bron raqami:", options: ["BR-8842", "BR-8843", "BR-8844", "BR-8845"], correctAnswer: 2, explanation: "Bron raqami BR-8844." },
    ],
  },
  {
    number: 2 as const,
    title: "Mahalliy sport markazi",
    type: "Map/Plan labeling",
    description: "Monolog: sport markazi xodimi markaz imkoniyatlari haqida ma'lumot beradi",
    previewSeconds: 30,
    questions: [
      { id: 11, section: 2, type: "map-labeling", question: "Kirish eshigi qayerda?", options: ["Shimoliy devor", "Sharqiy devor", "Janubiy devor", "G'arbiy devor"], correctAnswer: 0, explanation: "Kirish shimol tomonda." },
      { id: 12, section: 2, type: "multiple-choice", question: "Basseyn qaysi qavatda?", options: ["1-qavat", "2-qavat", "Yerto'la", "Tom"], correctAnswer: 2, explanation: "Basseyn yerto'la qavatda." },
      { id: 13, section: 2, type: "multiple-choice", question: "Trenajyor zali qachon eng gavjum?", options: ["Ertalab 6-8", "Tushlik 12-14", "Kechqurun 17-20", "Kechasi 22-24"], correctAnswer: 2, explanation: "Eng gavjum vaqt 17:00 dan 20:00 gacha." },
      { id: 14, section: 2, type: "multiple-choice", question: "Yoga xonasi sig'imi:", options: ["15 kishi", "20 kishi", "25 kishi", "30 kishi"], correctAnswer: 1, explanation: "Yoga xonasi 20 kishiga mo'ljallangan." },
      { id: 15, section: 2, type: "multiple-choice", question: "Sauna necha gradus?", options: ["70°C", "80°C", "90°C", "100°C"], correctAnswer: 1, explanation: "Sauna 80°C." },
      { id: 16, section: 2, type: "map-labeling", question: "Squash korti qaysi yo'nalishda?", options: ["Shimoliy-sharqiy", "Shimoliy-g'arbiy", "Janubiy-sharqiy", "Janubiy-g'arbiy"], correctAnswer: 0, explanation: "Squash korti shimoliy-sharqiy burchakda." },
      { id: 17, section: 2, type: "multiple-choice", question: "Kafe qaysi qavat?", options: ["1-qavat", "2-qavat", "3-qavat", "Yerto'la"], correctAnswer: 0, explanation: "Kafe 1-qavatda, kirish yonida." },
      { id: 18, section: 2, type: "multiple-choice", question: "Ochilish vaqti:", options: ["6:00", "6:30", "7:00", "7:30"], correctAnswer: 2, explanation: "Markaz 7:00 da ochiladi." },
      { id: 19, section: 2, type: "map-labeling", question: "Velosiped ijarasi qayerda joylashgan?", options: ["Kirish yonida", "Basseyn yonida", "Tashqarida", "2-qavatda"], correctAnswer: 2, explanation: "Velosiped ijarasi tashqarida, asosiy kirish yonida." },
      { id: 20, section: 2, type: "multiple-choice", question: "Yillik a'zolik narxi:", options: ["£299", "£349", "£399", "£449"], correctAnswer: 2, explanation: "Yillik a'zolik £399." },
    ],
  },
  {
    number: 3 as const,
    title: "Universitet topshiriq muhokamasi",
    type: "Matching / Multiple choice",
    description: "Talaba va professor o'rtasida tadqiqot loyihasi muhokamasi",
    previewSeconds: 45,
    questions: [
      { id: 21, section: 3, type: "multiple-choice", question: "Talabaning asosiy mavzusi:", options: ["History", "Economics", "Environmental Science", "Sociology"], correctAnswer: 2, explanation: "Atrof-muhit fanlari." },
      { id: 22, section: 3, type: "matching", question: "Professor tadqiqot usuli sifatida nima taklif qiladi?", options: ["Survey", "Case study", "Experiment", "Literature review"], correctAnswer: 1, explanation: "Case study usuli." },
      { id: 23, section: 3, type: "multiple-choice", question: "Tadqiqot qaysi hududda o'tkaziladi?", options: ["City centre", "Suburbs", "Rural area", "Coastal region"], correctAnswer: 3, explanation: "Sohil bo'yi hududi." },
      { id: 24, section: 3, type: "matching", question: "Ma'lumot to'plash muddati:", options: ["2 weeks", "3 weeks", "4 weeks", "6 weeks"], correctAnswer: 1, explanation: "3 hafta." },
      { id: 25, section: 3, type: "multiple-choice", question: "Professor qanday qo'llab-quvvatlashni taklif qiladi?", options: ["Co-author", "Supervisor", "Research assistant", "Funding"], correctAnswer: 1, explanation: "Professor supervisor sifatida." },
      { id: 26, section: 3, type: "matching", question: "Talabaning eng katta qiyinchiligi:", options: ["Vaqt boshqaruvi", "Ma'lumot to'plash", "Statistika", "Yozish"], correctAnswer: 2, explanation: "Statistik tahlil." },
      { id: 27, section: 3, type: "multiple-choice", question: "Professor qaysi dasturni tavsiya qiladi?", options: ["Excel", "SPSS", "Python", "R"], correctAnswer: 1, explanation: "SPSS dasturi." },
      { id: 28, section: 3, type: "matching", question: "Topshiriq topshirish muddati:", options: ["1 May", "15 May", "1 June", "15 June"], correctAnswer: 2, explanation: "1 Iyun." },
      { id: 29, section: 3, type: "multiple-choice", question: "Yana bir uchrashuv qachon rejalashtiriladi?", options: ["Keyingi hafta", "2 haftadan keyin", "1 oydan keyin", "Kerak bo'lmaydi"], correctAnswer: 0, explanation: "Keyingi hafta." },
      { id: 30, section: 3, type: "matching", question: "Professor talabaga qo'shimcha nima o'qishni tavsiya qiladi?", options: ["Kitob", "Maqola", "Blog", "Podcast"], correctAnswer: 1, explanation: "Maxsus maqola." },
    ],
  },
  {
    number: 4 as const,
    title: "Iqlim o'zgarishi bo'yicha ma'ruza",
    type: "Summary/Note completion",
    description: "Universitet ma'ruzasi: global isishning iqtisodiy ta'siri",
    previewSeconds: 45,
    questions: [
      { id: 31, section: 4, type: "summary-completion", question: "Global harorat ____ yil ichida 1.5°C ga oshishi kutilmoqda.", options: ["10", "20", "30", "40"], correctAnswer: 2, explanation: "30 yil." },
      { id: 32, section: 4, type: "summary-completion", question: "Iqlim o'zgarishi yillik global YaIMni ____ ga kamaytirishi mumkin.", options: ["1-2%", "2-3%", "3-5%", "5-10%"], correctAnswer: 1, explanation: "2-3% kamayish." },
      { id: 33, section: 4, type: "summary-completion", question: "Eng ko'p zarar ko'radigan sektor: ____.", options: ["Qishloq xo'jaligi", "Turizm", "Energiya", "Transport"], correctAnswer: 0, explanation: "Qishloq xo'jaligi eng zaif sektor." },
      { id: 34, section: 4, type: "summary-completion", question: "Dengiz sathi ____ metrga ko'tarilishi kutilmoqda.", options: ["0.3m", "0.5m", "1.0m", "1.5m"], correctAnswer: 2, explanation: "1 metr." },
      { id: 35, section: 4, type: "summary-completion", question: "____ million kishi suv toshqini xavfi ostida.", options: ["100", "200", "300", "400"], correctAnswer: 1, explanation: "200 million kishi." },
      { id: 36, section: 4, type: "summary-completion", question: "Yashil energiyaga o'tish ____ million ish o'rni yaratadi.", options: ["10", "15", "24", "30"], correctAnswer: 2, explanation: "24 million ish o'rni." },
      { id: 37, section: 4, type: "summary-completion", question: "Karbonat angidrid miqdori ____ ppm ga yetdi.", options: ["380", "400", "420", "450"], correctAnswer: 2, explanation: "420 ppm." },
      { id: 38, section: 4, type: "summary-completion", question: "Eng samarali yechim: ____.", options: ["Uglerod solig'i", "Qayta tiklanuvchi energiya", "O'rmonlarni tiklash", "Energiya samaradorligi"], correctAnswer: 2, explanation: "O'rmonlarni tiklash eng samarali." },
      { id: 39, section: 4, type: "summary-completion", question: "Parij kelishuvi maqsadi: isishni ____°C da cheklash.", options: ["1.0", "1.5", "2.0", "2.5"], correctAnswer: 1, explanation: "1.5°C." },
      { id: 40, section: 4, type: "summary-completion", question: "Ma'ruzachining xulosasi: ____ optimistik.", options: ["Ehtiyotkor", "Juda", "Umuman", "Shartli"], correctAnswer: 0, explanation: "Ehtiyotkor optimistik." },
    ],
  },
];

// ─────────────── READING ───────────────

const readingPassage1Text = `The History of Timekeeping

For most of human history, people relied on the sun to tell time. The earliest known timekeeping devices were sundials, used by the ancient Egyptians and Babylonians as early as 1500 BCE. These devices cast a shadow that moved throughout the day, allowing people to divide daylight into segments. However, sundials had a significant limitation: they were useless at night and on cloudy days.

The invention of the water clock, or clepsydra, represented a major advancement. These devices measured time by regulating the flow of water from one container to another. The ancient Greeks and Romans developed increasingly sophisticated water clocks, some of which included complex gearing systems. By 270 BCE, the Greek engineer Ctesibius had created a water clock that could ring bells and move mechanical figures at specific intervals.

The mechanical clock, which emerged in Europe during the 13th century, transformed timekeeping forever. These early clocks used a verge-and-foliot escapement mechanism and were powered by falling weights. Initially installed in church towers and public buildings, they helped regulate daily life in ways that had never been possible before.

The pendulum clock, invented by Christiaan Huygens in 1656, dramatically improved accuracy. Huygens' design reduced timekeeping errors from about 15 minutes per day to less than 10 seconds per day. This breakthrough was crucial for scientific research, navigation, and the growing demands of industry.

The 20th century brought quartz clocks, which used the vibration of quartz crystals to keep time with astonishing accuracy — losing only a few seconds per year. Today, atomic clocks, which measure vibrations of cesium atoms, are accurate to within one second every 100 million years. These remarkable instruments underpin modern technologies including GPS, telecommunications, and the global financial system.

Despite these advances, the basic human need to measure and organize time has remained constant. From ancient sundials to atomic clocks, each innovation reflects our enduring desire to understand and control the passage of time itself.`;

const readingPassage2Text = `The Psychology of Decision Making

Every day, humans make thousands of decisions, from trivial choices about what to eat to life-altering decisions about careers and relationships. The study of how people make decisions has revealed fascinating insights about the human mind.

In the 1970s, psychologists Daniel Kahneman and Amos Tversky developed prospect theory, which demonstrated that people do not always make rational decisions. Their research showed that individuals are more sensitive to potential losses than to equivalent gains — a phenomenon known as loss aversion. For example, the pain of losing $100 is psychologically about twice as powerful as the pleasure of gaining $100.

Further research identified numerous cognitive biases that affect decision making. Confirmation bias leads people to seek out information that confirms their existing beliefs while ignoring contradictory evidence. The anchoring effect causes individuals to rely too heavily on the first piece of information they receive. Availability heuristic makes people overestimate the likelihood of events that are easily recalled, such as plane crashes versus car accidents.

The concept of bounded rationality, introduced by Herbert Simon, suggests that human decision-making is limited by available information, cognitive limitations, and time constraints. Rather than seeking optimal solutions, people often satisfice — choosing options that are good enough rather than perfect.

Recent studies have explored the role of emotion in decision-making. Neuroscientist Antonio Damasio found that patients with damage to the emotional centers of their brains had difficulty making even simple decisions, suggesting that emotions are essential for rational choice. This challenges the traditional view that emotion and reason are opposing forces.

Cultural factors also influence decision-making styles. Research indicates that people from individualistic cultures, such as the United States, tend to make decisions based on personal preferences and goals. In contrast, those from collectivist cultures, such as Japan and China, often prioritize group harmony and social obligations when making choices.

Understanding these psychological factors can help individuals make better decisions. Strategies such as considering alternative perspectives, delaying important decisions when possible, and being aware of cognitive biases can improve decision-making outcomes in both personal and professional contexts.`;

const readingPassage3Text = `The Economics of Climate Change

Climate change represents one of the most complex challenges ever faced by economic policymakers. Unlike conventional economic problems, climate change involves unprecedented timescales, global coordination requirements, and fundamental uncertainties about future impacts.

The Stern Review, published in 2006 by economist Nicholas Stern for the UK government, was one of the first comprehensive analyses of the economics of climate change. The report concluded that the benefits of early, strong action to reduce greenhouse gas emissions substantially outweigh the costs. Stern estimated that failing to act could reduce global GDP by 5-20% annually, while the cost of effective action would be around 1% of global GDP per year.

However, the economics of climate change is complicated by what economists call the 'tragedy of the commons'. Since the atmosphere is a shared global resource, individual countries have incentives to free-ride on the emissions reductions of others. This creates a collective action problem that requires international cooperation to resolve. The Kyoto Protocol and the Paris Agreement represent attempts to address this challenge, though their effectiveness remains debated.

Carbon pricing has emerged as a key policy tool. By putting a price on carbon emissions through either a carbon tax or a cap-and-trade system, policymakers aim to make polluters pay for the external costs of their activities. As of 2024, over 70 carbon pricing initiatives have been implemented worldwide, covering approximately 23% of global greenhouse gas emissions. The European Union's Emissions Trading System is the largest such scheme.

The transition to a low-carbon economy also presents significant economic opportunities. The renewable energy sector has grown dramatically, with solar and wind power now cheaper than fossil fuels in many markets. The International Renewable Energy Agency estimates that the renewable energy sector employed over 12 million people globally in 2023, a number that continues to grow.

One of the most contentious issues is discounting — how to weigh the costs of action today against the benefits received by future generations. A high discount rate makes future benefits seem less valuable, reducing the case for immediate action. A low or zero discount rate implies that future generations' welfare should be valued equally with our own, strengthening the case for aggressive action now. This seemingly technical question involves profound ethical considerations about intergenerational justice.

Climate economists increasingly emphasize the importance of adaptation alongside mitigation. Even with aggressive emissions reductions, some climate change is already unavoidable. Investments in coastal defenses, drought-resistant crops, and heat-resilient infrastructure are essential to manage the impacts that are already locked in.

The most recent scientific evidence from the IPCC suggests that the window for avoiding the most catastrophic impacts is closing rapidly. This has led to growing calls for more ambitious policies, including net-zero emissions targets, which over 140 countries have now adopted. The economic debate is no longer about whether to act, but about how to act most effectively and equitably.`;

const readingSections = [
  {
    number: 1 as const,
    title: "The History of Timekeeping",
    difficulty: "Easy" as const,
    wordCount: 2150,
    text: readingPassage1Text,
    questionTypes: ["True/False/Not Given", "Multiple Choice", "Sentence Completion"],
    questions: [
      { id: 1, type: "true-false-not-given", passage: 1, question: "Sundials were first used by the ancient Greeks.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1, explanation: "Egyptians and Babylonians, not Greeks." },
      { id: 2, type: "true-false-not-given", passage: 1, question: "Water clocks could function during nighttime.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0, explanation: "Yes, they didn't rely on sunlight." },
      { id: 3, type: "true-false-not-given", passage: 1, question: "Ctesibius was a Roman engineer.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1, explanation: "He was Greek." },
      { id: 4, type: "multiple-choice", passage: 1, question: "Mechanical clocks were initially placed in:", options: ["Private homes", "Church towers", "Schools", "Markets"], correctAnswer: 1, explanation: "Church towers and public buildings." },
      { id: 5, type: "multiple-choice", passage: 1, question: "The pendulum clock reduced daily error to:", options: ["10 seconds", "30 seconds", "1 minute", "5 minutes"], correctAnswer: 0, explanation: "Less than 10 seconds per day." },
      { id: 6, type: "sentence-completion", passage: 1, question: "Quartz clocks lose only a few ____ per year.", options: ["Hours", "Minutes", "Seconds", "Milliseconds"], correctAnswer: 2, explanation: "A few seconds per year." },
      { id: 7, type: "true-false-not-given", passage: 1, question: "Atomic clocks are used in GPS technology.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0, explanation: "GPS relies on atomic clock timing." },
      { id: 8, type: "sentence-completion", passage: 1, question: "Huygens invented the pendulum clock in ____.", options: ["1656", "1660", "1670", "1700"], correctAnswer: 0, explanation: "Invented in 1656." },
      { id: 9, type: "multiple-choice", passage: 1, question: "The verge-and-foliot mechanism was used in:", options: ["Water clocks", "Mechanical clocks", "Pendulum clocks", "Sundials"], correctAnswer: 1, explanation: "Early mechanical clocks." },
      { id: 10, type: "true-false-not-given", passage: 1, question: "Atomic clocks were developed in the 21st century.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 1, explanation: "The passage doesn't specify when." },
      { id: 11, type: "matching-features", passage: 1, question: "Which timekeeping device was most accurate before atomic clocks?", options: ["Sundial", "Water clock", "Pendulum clock", "Quartz clock"], correctAnswer: 3, explanation: "Quartz lost only seconds per year." },
      { id: 12, type: "sentence-completion", passage: 1, question: "Ancient Egyptians used sundials as early as ____ BCE.", options: ["1000", "1500", "2000", "2500"], correctAnswer: 1, explanation: "1500 BCE." },
      { id: 13, type: "true-false-not-given", passage: 1, question: "The basic human need to measure time has remained constant.", options: ["TRUE", "FALSE", "NOT GIVEN"], correctAnswer: 0, explanation: "The passage states this explicitly." },
    ],
  },
  {
    number: 2 as const,
    title: "The Psychology of Decision Making",
    difficulty: "Medium" as const,
    wordCount: 2400,
    text: readingPassage2Text,
    questionTypes: ["Matching Headings", "Multiple Choice", "Yes/No/Not Given"],
    questions: [
      { id: 14, type: "matching-headings", passage: 2, question: "Choose the best heading for paragraph 1.", options: ["Daily Decision Making", "The Origins of Psychology", "Kahneman's Legacy", "Research Methods"], correctAnswer: 0, explanation: "Paragraph introduces daily decision-making." },
      { id: 15, type: "multiple-choice", passage: 2, question: "Loss aversion means people:", options: ["Prefer losses over gains", "Feel losses more than gains", "Avoid all risks", "Make rational choices"], correctAnswer: 1, explanation: "Losses feel about twice as powerful as equivalent gains." },
      { id: 16, type: "yes-no-not-given", passage: 2, question: "Confirmation bias helps people make better decisions.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1, explanation: "It leads to ignoring contradictory evidence." },
      { id: 17, type: "matching-headings", passage: 2, question: "Choose the best heading for paragraph 3.", options: ["Cognitive Biases", "Research Findings", "The Brain", "Social Influence"], correctAnswer: 0, explanation: "Paragraph discusses cognitive biases." },
      { id: 18, type: "multiple-choice", passage: 2, question: "The anchoring effect causes reliance on:", options: ["Recent information", "First information received", "Expert opinions", "Social norms"], correctAnswer: 1, explanation: "Anchoring = over-reliance on first information." },
      { id: 19, type: "yes-no-not-given", passage: 2, question: "Herbert Simon believed humans seek perfect solutions.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1, explanation: "Simon said humans 'satisfice' rather than optimize." },
      { id: 20, type: "message:choice", passage: 2, question: "Antonio Damasio found that emotions are:", options: ["Obstacles to decisions", "Essential for decisions", "Unrelated to decisions", "Harmful to thinking"], correctAnswer: 1, explanation: "Emotions are essential for rational choice." },
      { id: 21, type: "yes-no-not-given", passage: 2, question: "Collectivist cultures prioritize group harmony in decisions.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0, explanation: "Yes, they prioritize group harmony." },
      { id: 22, type: "matching-headings", passage: 2, question: "Choose the best heading for paragraph 6.", options: ["Emotions and Decisions", "Cultural Differences", "Individualism", "Social Psychology"], correctAnswer: 1, explanation: "Paragraph discusses cultural differences." },
      { id: 23, type: "multiple-choice", passage: 2, question: "Availability heuristic makes people:", options: ["Think clearly", "Overestimate recallable events", "Underestimate risks", "Make perfect choices"], correctAnswer: 1, explanation: "Overestimate likelihood of easily recalled events." },
      { id: 24, type: "yes-no-not-given", passage: 2, question: "Delaying decisions always improves outcomes.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2, explanation: "The passage suggests it 'can help' but doesn't say always." },
      { id: 25, type: "matching-headings", passage: 2, question: "Choose the best heading for the final paragraph.", options: ["Improving Decisions", "Future Research", "Professional Contexts", "Conclusion"], correctAnswer: 0, explanation: "Strategies for better decisions." },
      { id: 26, type: "multiple-choice", passage: 2, question: "Prospect theory was developed in the:", options: ["1960s", "1970s", "1980s", "1990s"], correctAnswer: 1, explanation: "Developed in the 1970s." },
    ],
  },
  {
    number: 3 as const,
    title: "The Economics of Climate Change",
    difficulty: "Hard" as const,
    wordCount: 2750,
    text: readingPassage3Text,
    questionTypes: ["Summary Completion", "Matching Information", "Multiple Choice", "Yes/No/Not Given"],
    questions: [
      { id: 27, type: "summary-completion", passage: 3, question: "The Stern Review estimated that inaction could reduce global GDP by ____ annually.", options: ["1%", "5-20%", "20-30%", "50%"], correctAnswer: 1, explanation: "5-20% reduction." },
      { id: 28, type: "summary-completion", passage: 3, question: "The cost of effective action would be around ____ of global GDP per year.", options: ["0.5%", "1%", "2%", "5%"], correctAnswer: 1, explanation: "1% of GDP." },
      { id: 29, type: "matching-information", passage: 3, question: "Which paragraph discusses carbon pricing mechanisms?", options: ["Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F"], correctAnswer: 1, explanation: "Paragraph D discusses carbon pricing." },
      { id: 30, type: "multiple-choice", passage: 3, question: "The 'tragedy of the commons' refers to:", options: ["Overuse of shared resources", "Individual property rights", "Market competition", "Government regulation"], correctAnswer: 0, explanation: "Shared resource overuse." },
      { id: 31, type: "multiple-choice", passage: 3, question: "As of 2024, carbon pricing covers about ____ of global emissions.", options: ["12%", "23%", "35%", "50%"], correctAnswer: 1, explanation: "23% covered." },
      { id: 32, type: "yes-no-not-given", passage: 3, question: "The Paris Agreement has been universally effective.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 2, explanation: "Its effectiveness remains debated." },
      { id: 33, type: "matching-information", passage: 3, question: "Which paragraph mentions renewable energy employment figures?", options: ["Paragraph E", "Paragraph F", "Paragraph G", "Paragraph H"], correctAnswer: 0, explanation: "Paragraph E has employment data." },
      { id: 34, type: "summary-completion", passage: 3, question: "The renewable energy sector employed over ____ million people globally in 2023.", options: ["8", "10", "12", "15"], correctAnswer: 2, explanation: "12 million." },
      { id: 35, type: "multiple-choice", passage: 3, question: "Discounting involves weighing:", options: ["Present costs vs future benefits", "Rich vs poor countries", "Industry vs environment", "Local vs global effects"], correctAnswer: 0, explanation: "Present costs vs future benefits." },
      { id: 36, type: "yes-no-not-given", passage: 3, question: "A high discount rate strengthens the case for immediate climate action.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 1, explanation: "High rate reduces the case." },
      { id: 37, type: "yes-no-not-given", passage: 3, question: "Over 140 countries have adopted net-zero emissions targets.", options: ["YES", "NO", "NOT GIVEN"], correctAnswer: 0, explanation: "Explicitly stated." },
      { id: 38, type: "matching-information", passage: 3, question: "Which paragraph discusses adaptation alongside mitigation?", options: ["Paragraph E", "Paragraph F", "Paragraph G", "Paragraph H"], correctAnswer: 2, explanation: "Paragraph G discusses adaptation." },
      { id: 39, type: "multiple-choice", passage: 3, question: "The author's attitude toward the climate challenge is:", options: ["Optimistic", "Pessimistic", "Cautious and urgent", "Indifferent"], correctAnswer: 2, explanation: "Tone is cautious but emphasizes urgency." },
      { id: 40, type: "summary-completion", passage: 3, question: "The EU's ____ is the largest carbon pricing scheme.", options: ["Carbon tax", "Emissions Trading System", "Green Deal", "Paris Agreement"], correctAnswer: 1, explanation: "EU ETS is the largest." },
    ],
  },
];

// ─────────────── WRITING ───────────────

const writingTasks: MockWritingPrompt[] = [
  {
    task: 1,
    prompt: `The chart below shows the average monthly rainfall in three cities (London, Sydney, and Mumbai) over a calendar year.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
    minWords: 150,
    recommendedMinutes: 20,
  },
  {
    task: 2,
    prompt: `Some people believe that climate change is the biggest threat facing humanity today. Others argue that there are more pressing issues such as poverty, healthcare, and education.

Discuss both these views and give your own opinion.

Write at least 250 words.`,
    minWords: 250,
    recommendedMinutes: 40,
  },
];

// ─────────────── SPEAKING ───────────────

const speakingParts: MockSpeakingPart[] = [
  {
    part: 1,
    title: "Kirish va intervyu",
    instructions: "Sizga tanish mavzular bo'yicha savollar beriladi. Har bir savolga 2-3 gap bilan javob bering.",
    questions: [
      "Where do you live currently?",
      "What do you like most about your home city?",
      "Do you work or are you a student?",
      "What subject are you studying / What is your job?",
      "Do you enjoy your studies/work? Why?",
      "What are your hobbies or interests?",
      "How often do you spend time with your family?",
      "What kind of music do you enjoy?",
    ],
  },
  {
    part: 2,
    title: "Individual uzoq javob (Cue Card)",
    instructions: "Quyidagi mavzuda 1 daqiqa tayyorgarlik ko'ring, so'ng 1-2 daqiqa gapiring.",
    preparationSeconds: 60,
    speakingSeconds: 120,
    questions: [
      "Describe a place you have visited that you found particularly beautiful.\n\nYou should say:\n- where this place is\n- when you went there\n- what you saw and did there\n- and explain why you found it so beautiful.",
      "Describe a skill you would like to learn in the future.\n\nYou should say:\n- what the skill is\n- why you want to learn it\n- how you plan to learn it\n- and explain how this skill would benefit you.",
    ],
  },
  {
    part: 3,
    title: "Ikki tomonlama muhokama",
    instructions: "Part 2 mavzusi bilan bog'liq mavhum savollarga batafsil javob bering.",
    questions: [
      "Why do some natural landscapes inspire people more than others?",
      "How has tourism affected beautiful natural places in your country?",
      "Do you think governments do enough to protect natural beauty?",
      "What role should individuals play in preserving natural environments?",
      "How important is it for children to experience nature and beautiful places?",
      "In what ways can technology help protect natural landscapes?",
      "Compare the importance of protecting natural beauty versus developing infrastructure.",
    ],
  },
];

// ─────────────── EXPORT ───────────────

export function getMockExamData(): MockExamData {
  return {
    id: "mock-academic-001",
    title: "IELTS Academic Mock Exam",
    listening: {
      totalTimeMin: 30,
      reviewTimeMin: 2,
      sections: listeningSections,
    },
    reading: {
      totalTimeMin: 60,
      passages: readingSections,
    },
    writing: {
      totalTimeMin: 60,
      tasks: writingTasks,
    },
    speaking: {
      totalTimeMin: 14,
      parts: speakingParts,
    },
  };
}
