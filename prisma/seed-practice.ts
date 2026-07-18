import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const speedVocabData = {
  questions: [
    { word: "Abandon", options: ["Tark etish", "Qabul qilish", "Yaxshilash", "Oshirish"], correct: 0 },
    { word: "Beneficial", options: ["Zararli", "Foydali", "Tezkor", "Qiyin"], correct: 1 },
    { word: "Consequence", options: ["Sabab", "Natija", "Boshlanish", "Davom"], correct: 1 },
    { word: "Diverse", options: ["Bir xil", "Xilma-xil", "Cheklangan", "Oddiy"], correct: 1 },
    { word: "Eliminate", options: ["Qo'shish", "Ko'paytirish", "Yo'q qilish", "Saqlash"], correct: 2 },
    { word: "Fluctuate", options: ["Barqarorlashmoq", "O'zgarib turmoq", "Ko'tarilmoq", "Tushmoq"], correct: 1 },
    { word: "Generate", options: ["To'xtatish", "Ishlab chiqarmoq", "Yo'q qilmoq", "Saqlab qolmoq"], correct: 1 },
    { word: "Hypothesis", options: ["Natija", "Taxmin", "Xulosa", "Dalil"], correct: 1 },
    { word: "Inevitable", options: ["Muqarrar", "Ixtiyoriy", "Mumkin", "Kutilmagan"], correct: 0 },
    { word: "Justify", options: ["Rad etish", "Oqlamoq", "Tanqid qilmoq", "Yashirmoq"], correct: 1 },
    { word: "Lucid", options: ["Murakkab", "Tushunarli", "Qorong'i", "Shubhali"], correct: 1 },
    { word: "Mitigate", options: ["Kuchaytirmoq", "Yumshatmoq", "Tezlashtirmoq", "Murakkablashtirmoq"], correct: 1 },
    { word: "Notorious", options: ["Mashhur (salbiy)", "Noma'lum", "Ijobiy", "Oddiy"], correct: 0 },
    { word: "Obsolete", options: ["Zamonaviy", "Eskirgan", "Yangi", "Foydali"], correct: 1 },
    { word: "Plausible", options: ["Ishonarli", "Aql bovar qilmas", "Qiyin", "Murakkab"], correct: 0 },
    { word: "Reciprocal", options: ["Bir tomonlama", "O'zaro", "Bevosita", "Uzoq muddatli"], correct: 1 },
    { word: "Resilient", options: ["Zaif", "Chidamli", "Tez sinadigan", "Nozik"], correct: 1 },
    { word: "Scrutinize", options: ["E'tiborsiz qoldirmoq", "Sinchiklab tekshirmoq", "Taxmin qilmoq", "Rad etmoq"], correct: 1 },
    { word: "Synthesize", options: ["Ajratmoq", "Birlashtirmoq", "Yo'q qilmoq", "Soddalashtirmoq"], correct: 1 },
    { word: "Tangible", options: ["Mavhum", "Aniq, moddiy", "Ko'rinmas", "Hayoliy"], correct: 1 },
    { word: "Ubiquitous", options: ["Kam uchraydigan", "Hamma joyda mavjud", "Mahalliy", "Yo'qolgan"], correct: 1 },
    { word: "Versatile", options: ["Ko'p qirrali", "Bir funksiyali", "Oddiy", "Cheklangan"], correct: 0 },
    { word: "Warrant", options: ["Taqiqlash", "Kafolat bermoq", "Rad etmoq", "Shubha qilmoq"], correct: 1 },
    { word: "Yield", options: ["Qarshilik ko'rsatmoq", "Natija bermoq, hosil", "Yo'qotmoq", "To'xtatmoq"], correct: 1 },
    { word: "Ambiguous", options: ["Aniq", "Noaniq, ikki ma'noli", "Oddiy", "Tushunarli"], correct: 1 },
    { word: "Comprehensive", options: ["Cheklangan", "To'liq, keng qamrovli", "Qisqa", "Yuzaki"], correct: 1 },
    { word: "Deteriorate", options: ["Yaxshilanmoq", "Yomonlashmoq", "Barqarorlashmoq", "Tezlashmoq"], correct: 1 },
    { word: "Elaborate", options: ["Soddalashtirmoq", "Batafsil tushuntirmoq", "Qisqartirmoq", "Yashirmoq"], correct: 1 },
    { word: "Feasible", options: ["Mumkin emas", "Amalga oshirish mumkin", "Qiyin", "Xavfli"], correct: 1 },
    { word: "Germane", options: ["Tegishli, aloqador", "Begona", "Qarshi", "Foydasiz"], correct: 0 },
  ],
  timeLimitSec: 60,
  lives: 3,
};

const grammarSprintData = {
  questions: [
    { question: "She ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: 1 },
    { question: "They ___ playing football when it started to rain.", options: ["are", "were", "was", "have"], correct: 1 },
    { question: "I have ___ lived in Tashkent since 2010.", options: ["been", "being", "be", "was"], correct: 0 },
    { question: "The book ___ by Mark Twain.", options: ["wrote", "was written", "is writing", "has written"], correct: 1 },
    { question: "If I ___ you, I would accept the offer.", options: ["am", "was", "were", "be"], correct: 2 },
    { question: "She is the girl ___ won the competition.", options: ["which", "whom", "who", "whose"], correct: 2 },
    { question: "We ___ finished our homework yet.", options: ["haven't", "hasn't", "didn't", "won't"], correct: 0 },
    { question: "He said that he ___ coming to the party.", options: ["is", "was", "will be", "has been"], correct: 1 },
    { question: "The more you practice, ___ you become.", options: ["good", "better", "the better", "best"], correct: 2 },
    { question: "I wish I ___ how to swim.", options: ["know", "knew", "have known", "would know"], correct: 1 },
    { question: "She has been working here ___ 2018.", options: ["for", "since", "from", "in"], correct: 1 },
    { question: "Neither the teacher nor the students ___ present.", options: ["was", "were", "is", "has"], correct: 1 },
    { question: "This is the ___ movie I have ever seen.", options: ["good", "better", "best", "most good"], correct: 2 },
    { question: "By next year, I ___ here for five years.", options: ["work", "will work", "will have worked", "worked"], correct: 2 },
    { question: "The window was broken ___ the boy.", options: ["by", "with", "from", "of"], correct: 0 },
    { question: "___ you like some coffee?", options: ["Do", "Would", "Are", "Have"], correct: 1 },
    { question: "She speaks English ___.", options: ["good", "well", "better", "best"], correct: 1 },
    { question: "It is important that every student ___ on time.", options: ["arrive", "arrives", "arriving", "arrived"], correct: 0 },
    { question: "He was tired ___ he had worked all night.", options: ["so", "because", "although", "but"], correct: 1 },
    { question: "The meeting ___ postponed until next week.", options: ["has", "is", "was", "will"], correct: 2 },
    { question: "___ the rain, we went for a walk.", options: ["Despite", "Although", "Because", "Since"], correct: 0 },
    { question: "She asked me where I ___.", options: ["live", "lived", "am living", "will live"], correct: 1 },
    { question: "I have never ___ such a beautiful sunset.", options: ["see", "saw", "seen", "seeing"], correct: 2 },
    { question: "He is looking forward ___ his friends.", options: ["to meet", "meeting", "to meeting", "meet"], correct: 2 },
    { question: "The exam was ___ difficult that few passed.", options: ["such", "so", "too", "very"], correct: 1 },
  ],
  timeLimitSec: 60,
};

const errorSpottingData = {
  questions: [
    { sentence: "He don't like coffee.", error: "don't", correction: "doesn't", options: ["don't", "like", "coffee", "He"] },
    { sentence: "She go to school yesterday.", error: "go", correction: "went", options: ["She", "go", "school", "yesterday"] },
    { sentence: "They has finished their homework.", error: "has", correction: "have", options: ["They", "has", "finished", "homework"] },
    { sentence: "I am agree with your opinion.", error: "am agree", correction: "agree", options: ["I", "am agree", "with", "opinion"] },
    { sentence: "The informations is correct.", error: "informations", correction: "information", options: ["The", "informations", "correct", "is"] },
    { sentence: "He is more taller than his brother.", error: "more taller", correction: "taller", options: ["He", "more taller", "than", "brother"] },
    { sentence: "She didn't went to the party.", error: "went", correction: "go", options: ["She", "didn't", "went", "party"] },
    { sentence: "Can you give me an advice?", error: "an advice", correction: "some advice", options: ["Can", "give", "an advice", "me"] },
    { sentence: "I have been to Paris last year.", error: "have been", correction: "went", options: ["I", "have been", "Paris", "last year"] },
    { sentence: "The equipments are very expensive.", error: "equipments", correction: "equipment", options: ["The", "equipments", "expensive", "very"] },
    { sentence: "She is looking forward to meet you.", error: "meet", correction: "meeting", options: ["She", "looking", "forward", "meet"] },
    { sentence: "Neither John nor Mary are coming.", error: "are", correction: "is", options: ["Neither", "nor", "are", "coming"] },
    { sentence: "I enjoyed from the concert.", error: "from", correction: "of", options: ["enjoyed", "from", "the", "concert"] },
    { sentence: "She told that she was tired.", error: "told", correction: "said", options: ["She", "told", "that", "tired"] },
    { sentence: "One of my friend lives in London.", error: "friend", correction: "friends", options: ["One", "friend", "lives", "London"] },
    { sentence: "He needs to improve his knowledges.", error: "knowledges", correction: "knowledge", options: ["He", "knowledges", "improve", "his"] },
    { sentence: "I prefer tea than coffee.", error: "than", correction: "to", options: ["prefer", "tea", "than", "coffee"] },
    { sentence: "The house who is on the hill is old.", error: "who", correction: "which", options: ["house", "who", "hill", "old"] },
    { sentence: "She has born in 1995.", error: "has born", correction: "was born", options: ["She", "has born", "1995", "born"] },
    { sentence: "There is less people here today.", error: "less", correction: "fewer", options: ["There", "less", "people", "today"] },
  ],
  timeLimitSec: 90,
};

const wordAssociationData = {
  questions: [
    { word: "Happy", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1, type: "synonym" },
    { word: "Big", options: ["Tiny", "Huge", "Slow", "Dark"], correct: 1, type: "synonym" },
    { word: "Fast", options: ["Slow", "Quick", "Heavy", "Thin"], correct: 1, type: "synonym" },
    { word: "Hot", options: ["Warm", "Cold", "Cool", "Freezing"], correct: 2, type: "antonym" },
    { word: "Begin", options: ["Finish", "Start", "Stop", "Pause"], correct: 1, type: "synonym" },
    { word: "Interesting", options: ["Boring", "Engaging", "Dull", "Tiring"], correct: 1, type: "synonym" },
    { word: "Difficult", options: ["Easy", "Hard", "Simple", "Light"], correct: 1, type: "synonym" },
    { word: "Rich", options: ["Wealthy", "Poor", "Broke", "Needy"], correct: 0, type: "synonym" },
    { word: "Ancient", options: ["Modern", "Old", "New", "Young"], correct: 2, type: "antonym" },
    { word: "Brave", options: ["Cowardly", "Fearless", "Timid", "Weak"], correct: 1, type: "synonym" },
    { word: "Destroy", options: ["Build", "Create", "Construct", "Repair"], correct: 3, type: "synonym" },
    { word: "Generous", options: ["Stingy", "Selfish", "Greedy", "Kind"], correct: 3, type: "synonym" },
    { word: "Permanent", options: ["Temporary", "Forever", "Constant", "Stable"], correct: 1, type: "antonym" },
    { word: "Necessary", options: ["Optional", "Essential", "Unimportant", "Extra"], correct: 1, type: "synonym" },
    { word: "Expand", options: ["Shrink", "Grow", "Reduce", "Decrease"], correct: 1, type: "synonym" },
    { word: "Abundant", options: ["Scarce", "Plentiful", "Rare", "Limited"], correct: 1, type: "synonym" },
    { word: "Cautious", options: ["Careful", "Reckless", "Careless", "Rash"], correct: 0, type: "synonym" },
    { word: "Famous", options: ["Unknown", "Well-known", "Obscure", "Ordinary"], correct: 1, type: "synonym" },
    { word: "Artificial", options: ["Natural", "Synthetic", "Fake", "Real"], correct: 1, type: "synonym" },
    { word: "Fluctuate", options: ["Stabilize", "Vary", "Constant", "Fixed"], correct: 1, type: "synonym" },
  ],
  timeLimitSec: 60,
  lives: 3,
};

const sentenceBuilderData = {
  questions: [
    { scrambled: ["goes", "to", "school", "She", "every", "day"], correct: ["She", "goes", "to", "school", "every", "day"] },
    { scrambled: ["playing", "They", "in", "are", "the", "park", "football"], correct: ["They", "are", "playing", "football", "in", "the", "park"] },
    { scrambled: ["already", "finished", "I", "have", "my", "homework"], correct: ["I", "have", "already", "finished", "my", "homework"] },
    { scrambled: ["written", "was", "by", "book", "This", "Tolstoy"], correct: ["This", "book", "was", "written", "by", "Tolstoy"] },
    { scrambled: ["if", "would", "I", "you", "accept", "were", "I", "the", "offer"], correct: ["I", "would", "accept", "the", "offer", "if", "I", "were", "you"] },
    { scrambled: ["the", "girl", "won", "who", "competition", "is", "She", "the"], correct: ["She", "is", "the", "girl", "who", "won", "the", "competition"] },
    { scrambled: ["since", "here", "working", "has", "She", "2018", "been"], correct: ["She", "has", "been", "working", "here", "since", "2018"] },
    { scrambled: ["never", "such", "beautiful", "I", "a", "have", "seen", "sunset"], correct: ["I", "have", "never", "seen", "such", "a", "beautiful", "sunset"] },
    { scrambled: ["important", "on", "is", "that", "students", "time", "It", "arrive"], correct: ["It", "is", "important", "that", "students", "arrive", "on", "time"] },
    { scrambled: ["despite", "went", "rain", "walk", "for", "a", "We", "the"], correct: ["We", "went", "for", "a", "walk", "despite", "the", "rain"] },
  ],
  timeLimitSec: 90,
};

const miniReadingData = {
  questions: [
    {
      title: "Global Warming",
      text: "Global warming refers to the long-term rise in Earth's average temperature. Since the Industrial Revolution, human activities such as burning fossil fuels have increased greenhouse gas levels significantly. Scientists warn that if temperatures continue to rise, we will face more extreme weather events and rising sea levels.",
      questions: [
        { question: "What is the main cause of global warming mentioned?", options: ["Volcanic eruptions", "Human activities", "Solar radiation", "Ocean currents"], correct: 1 },
        { question: "What has increased since the Industrial Revolution?", options: ["Forest areas", "Greenhouse gas levels", "Oxygen levels", "Fresh water supply"], correct: 1 },
        { question: "What is predicted if temperatures keep rising?", options: ["More forests", "Cooler weather", "Extreme weather events", "Less pollution"], correct: 2 },
      ],
    },
    {
      title: "Social Media Impact",
      text: "Social media has transformed how people communicate. While it helps people stay connected globally, studies show excessive use can lead to anxiety and reduced face-to-face interaction. Finding a healthy balance is key to benefiting from these platforms.",
      questions: [
        { question: "What is a positive effect of social media?", options: ["Reduces screen time", "Keeps people connected globally", "Increases isolation", "Improves physical health"], correct: 1 },
        { question: "What can excessive social media use cause?", options: ["Better sleep", "More exercise", "Anxiety", "Improved memory"], correct: 2 },
        { question: "What does the text suggest is important?", options: ["Quitting social media", "Finding a healthy balance", "Using more platforms", "Spending all day online"], correct: 1 },
      ],
    },
    {
      title: "Renewable Energy",
      text: "Solar and wind power are becoming increasingly important sources of renewable energy. Many countries are investing heavily in these technologies to reduce carbon emissions. Solar panels convert sunlight into electricity, while wind turbines harness the power of the wind to generate power.",
      questions: [
        { question: "What are solar and wind examples of?", options: ["Fossil fuels", "Renewable energy", "Nuclear power", "Natural gas"], correct: 1 },
        { question: "Why are countries investing in these technologies?", options: ["To increase costs", "To reduce carbon emissions", "To use more coal", "To slow down progress"], correct: 1 },
        { question: "What do solar panels do?", options: ["Generate wind", "Convert sunlight to electricity", "Produce fossil fuels", "Store water"], correct: 1 },
      ],
    },
    {
      title: "Sleep and Health",
      text: "Sleep plays a vital role in maintaining good health. Adults need 7-9 hours of quality sleep per night. Lack of sleep can weaken the immune system, affect memory, and increase the risk of heart disease. Creating a consistent sleep schedule helps improve sleep quality.",
      questions: [
        { question: "How many hours of sleep do adults need?", options: ["5-6 hours", "7-9 hours", "10-12 hours", "3-4 hours"], correct: 1 },
        { question: "What can lack of sleep affect?", options: ["Hair color", "Memory", "Height", "Eye color"], correct: 1 },
        { question: "What helps improve sleep quality?", options: ["Irregular schedule", "Consistent sleep schedule", "Less sleep", "Late-night eating"], correct: 1 },
      ],
    },
    {
      title: "The Internet",
      text: "The Internet began as a military project in the 1960s called ARPANET. The World Wide Web was invented by Tim Berners-Lee in 1989, making the Internet accessible to everyone. Today, over 5 billion people use the Internet for communication, education, and entertainment.",
      questions: [
        { question: "What was the original name of the Internet project?", options: ["World Wide Web", "ARPANET", "TCP/IP", "Stanford Net"], correct: 1 },
        { question: "Who invented the World Wide Web?", options: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Vint Cerf"], correct: 2 },
        { question: "How many people use the Internet today?", options: ["1 billion", "3 billion", "Over 5 billion", "10 billion"], correct: 2 },
      ],
    },
  ],
};

const pronunciationData = {
  questions: [
    { word: "Comfortable", options: ["/ˈkʌmfətəbəl/", "/kəmˈfɔːtəbəl/", "/ˈkɒmfɔːtəbəl/"], correct: 0 },
    { word: "Vegetable", options: ["/ˈvedʒtəbəl/", "/ˈveɡətəbəl/", "/vəˈdʒetəbəl/"], correct: 0 },
    { word: "Clothes", options: ["/kloʊðz/", "/kloʊðɪz/", "/klɒθs/"], correct: 0 },
    { word: "Develop", options: ["/dɪˈveləp/", "/ˈdevələp/", "/diːˈveləp/"], correct: 0 },
    { word: "Environment", options: ["/ɪnˈvaɪrənmənt/", "/enˈvaɪərnmənt/", "/ɪnˈvaɪərnmənt/"], correct: 0 },
    { word: "February", options: ["/ˈfebruːeri/", "/ˈfebjʊəri/", "/febˈruːeri/"], correct: 1 },
    { word: "Library", options: ["/ˈlaɪbrəri/", "/ˈlaɪbəri/", "/lɪˈbrɑːri/"], correct: 0 },
    { word: "Probably", options: ["/ˈprɒbəbli/", "/ˈprɒbəli/", "/prəˈbæbli/"], correct: 0 },
    { word: "Pronunciation", options: ["/prəˌnʌnsiˈeɪʃən/", "/prəˌnaʊnsiˈeɪʃən/", "/prɒnʌnsiˈeɪʃən/"], correct: 0 },
    { word: "Temperature", options: ["/ˈtemprətʃər/", "/temˈperətʃur/", "/ˈtempərətʃər/"], correct: 0 },
    { word: "Wednesday", options: ["/wɛdˈnzdeɪ/", "/ˈwɛnzdeɪ/", "/ˈwɛdnəsdeɪ/"], correct: 1 },
    { word: "Determine", options: ["/dɪˈtɜːrmɪn/", "/ˈdiːtɜːrmɪn/", "/dɪˈtɜːrmɪn/"], correct: 2 },
    { word: "Interesting", options: ["/ɪnˈtrestɪŋ/", "/ˈɪntrəstɪŋ/", "/ˈɪntərɛstɪŋ/"], correct: 0 },
    { word: "Chocolate", options: ["/ˈtʃɒkəlɪt/", "/ˈtʃɒkəleɪt/", "/ˈtʃɒkɒlət/"], correct: 0 },
    { word: "Different", options: ["/dɪˈferənt/", "/ˈdɪfərənt/", "/ˈdaɪfərənt/"], correct: 1 },
  ],
  timeLimitSec: 90,
};

const listeningSnippetData = {
  questions: [
    { audio: "What time does the meeting start?", text: "The meeting starts at 10 o'clock in the morning.", options: ["9:00", "10:00", "11:00", "12:00"], correct: 1, duration: 3 },
    { audio: "How much does the ticket cost?", text: "A one-way ticket costs twenty-five dollars.", options: ["$15", "$20", "$25", "$30"], correct: 2, duration: 3 },
    { audio: "Where is the library located?", text: "The library is on Main Street, next to the post office.", options: ["Next to the bank", "Next to the post office", "Across from the school", "Behind the hospital"], correct: 1, duration: 3 },
    { audio: "What is the weather forecast?", text: "Tomorrow will be sunny with a high of 30 degrees Celsius.", options: ["Rainy and cold", "Sunny and warm", "Cloudy and cool", "Snowy and windy"], correct: 1, duration: 3 },
    { audio: "When is the deadline?", text: "You need to submit your assignment by Friday at 5 PM.", options: ["Thursday 5 PM", "Friday 5 PM", "Saturday 5 PM", "Monday 5 PM"], correct: 1, duration: 3 },
  ],
};

const mixedReviewData = {
  questions: [
    { type: "vocab", question: "What does 'abundant' mean?", options: ["Kam", "Ko'p, mo'l", "Tez", "Sekin"], correct: 1 },
    { type: "grammar", question: "Choose correct: I ___ to school every day.", options: ["go", "goes", "going", "gone"], correct: 0 },
    { type: "error", question: "Find the error: She has went to market.", options: ["She", "has went", "market", "to"], correct: 1 },
    { type: "association", question: "'Difficult' - find synonym:", options: ["Easy", "Hard", "Simple", "Light"], correct: 1 },
    { type: "reading", question: "What does 'mitigate' mean?", options: ["Kuchaytirmoq", "Yumshatmoq", "Tezlashtirmoq", "Murakkablashtirmoq"], correct: 1 },
    { type: "vocab", question: "What does 'comprehensive' mean?", options: ["Cheklangan", "To'liq, keng qamrovli", "Qisqa", "Yuzaki"], correct: 1 },
    { type: "grammar", question: "Choose correct: They ___ playing when it rained.", options: ["are", "were", "was", "have"], correct: 1 },
    { type: "error", question: "Find the error: He don't like coffee.", options: ["He", "don't", "like", "coffee"], correct: 1 },
    { type: "association", question: "'Fast' - find synonym:", options: ["Slow", "Quick", "Heavy", "Thin"], correct: 1 },
    { type: "vocab", question: "What does 'inevitable' mean?", options: ["Muqarrar", "Ixtiyoriy", "Mumkin", "Kutilmagan"], correct: 0 },
  ],
  timeLimitSec: 120,
};

const activities = [
  {
    id: "speed-vocab-1",
    type: "speed_vocab",
    title: "Speed Vocabulary",
    icon: "⚡",
    category: "quick",
    data: JSON.stringify(speedVocabData),
    estimatedMin: 3,
  },
  {
    id: "grammar-sprint-1",
    type: "grammar_sprint",
    title: "Grammar Sprint",
    icon: "🏃",
    category: "quick",
    data: JSON.stringify(grammarSprintData),
    estimatedMin: 2,
  },
  {
    id: "error-spotting-1",
    type: "error_spotting",
    title: "Error Spotting",
    icon: "🔍",
    category: "quick",
    data: JSON.stringify(errorSpottingData),
    estimatedMin: 4,
  },
  {
    id: "word-association-1",
    type: "word_association",
    title: "Word Association",
    icon: "🔗",
    category: "quick",
    data: JSON.stringify(wordAssociationData),
    estimatedMin: 3,
  },
  {
    id: "sentence-builder-1",
    type: "sentence_builder",
    title: "Sentence Builder",
    icon: "🧩",
    category: "quick",
    data: JSON.stringify(sentenceBuilderData),
    estimatedMin: 4,
  },
  {
    id: "mini-reading-1",
    type: "mini_reading",
    title: "Mini Reading Quiz",
    icon: "📖",
    category: "quick",
    data: JSON.stringify(miniReadingData),
    estimatedMin: 5,
  },
  {
    id: "pronunciation-1",
    type: "pronunciation",
    title: "Pronunciation Challenge",
    icon: "🎙️",
    category: "quick",
    data: JSON.stringify(pronunciationData),
    estimatedMin: 4,
  },
  {
    id: "listening-snippet-1",
    type: "listening_snippet",
    title: "Listening Snippets",
    icon: "🎧",
    category: "quick",
    data: JSON.stringify(listeningSnippetData),
    estimatedMin: 3,
  },
  {
    id: "mixed-review-1",
    type: "mixed_review",
    title: "Mixed Review",
    icon: "🎯",
    category: "recommended",
    data: JSON.stringify(mixedReviewData),
    estimatedMin: 5,
  },
];

async function seed() {
  for (const activity of activities) {
    await prisma.practiceActivity.upsert({
      where: { id: activity.id },
      update: activity,
      create: activity as any,
    });
  }
  console.log(`✓ Seeded ${activities.length} practice activities`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
