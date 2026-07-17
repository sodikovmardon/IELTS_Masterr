export function getLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    beginner: "Boshlang'ich (Beginner)",
    intermediate: "O'rta (Intermediate)",
    advanced: "Yuqori (Advanced)",
    unknown: "Aniqlanmagan",
  };
  return labels[level] || level;
}

export function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-yellow-100 text-yellow-800",
    advanced: "bg-red-100 text-red-800",
    unknown: "bg-gray-100 text-gray-800",
  };
  return colors[level] || colors.unknown;
}

export function calculateLevel(score: number, total: number): string {
  const percentage = (score / total) * 100;
  if (percentage < 40) return "beginner";
  if (percentage < 70) return "intermediate";
  return "advanced";
}

export function generateStudyPlan(
  currentLevel: string,
  targetScore: number,
  hoursPerWeek: number,
  durationWeeks: number,
  weakAreas?: { subtopic: string; skill: string; errorRate: number }[]
) {
  const levelOrder = ["beginner", "intermediate", "advanced"];
  const currentIdx = levelOrder.indexOf(currentLevel);
  const targetIdx = targetScore >= 7 ? 2 : targetScore >= 5 ? 1 : 0;

  const weeksToAdvance = Math.abs(targetIdx - currentIdx) * 4;
  const actualWeeks = durationWeeks || weeksToAdvance || 4;

  // Integrate weak areas into the plan
  const weakSkillTypes: string[] = [];
  const weakTopicNames: string[] = [];
  if (weakAreas && weakAreas.length > 0) {
    const sorted = [...weakAreas].sort((a, b) => b.errorRate - a.errorRate);
    for (const w of sorted.slice(0, 5)) {
      weakSkillTypes.push(w.skill);
      weakTopicNames.push(w.subtopic);
    }
  }

  const topicsByLevel: Record<string, string[]> = {
    beginner: [
      "Basic Grammar (Tenses, Articles)",
      "Vocabulary Building (1000 common words)",
      "Simple Reading Comprehension",
      "Basic Sentence Structure",
      "IELTS Task 1 Introduction",
    ],
    intermediate: [
      "Complex Grammar (Conditionals, Passive)",
      "Academic Vocabulary (2000 words)",
      "Reading: Skimming & Scanning",
      "Essay Writing Structure",
      "Speaking: Fluency & Coherence",
    ],
    advanced: [
      "Advanced Grammar & Idioms",
      "Lexical Resource (4000+ words)",
      "Critical Reading & Analysis",
      "Cohesion & Coherence in Writing",
      "Full Mock Tests & Review",
    ],
  };

  const plan: {
    week: number;
    days: { day: number; topic: string; type: string; duration: number }[];
  }[] = [];

  const hoursPerDay = Math.round((hoursPerWeek / 7) * 10) / 10;

  for (let week = 1; week <= actualWeeks; week++) {
    const weekPlan: {
      day: number;
      topic: string;
      type: string;
      duration: number;
    }[] = [];

    const weekTopics = [...topicsByLevel[currentLevel]];
    if (week > actualWeeks / 2 && currentIdx < targetIdx) {
      const nextLevel = levelOrder[Math.min(currentIdx + 1, 2)];
      weekTopics.push(...topicsByLevel[nextLevel].slice(0, 2));
    }

    // Inject weak area topics into every week
    if (weakTopicNames.length > 0) {
      const weakIdx = (week - 1) % weakTopicNames.length;
      weekTopics.unshift(`[Zaif] ${weakTopicNames[weakIdx]}`);
    }

    const types = ["reading", "grammar", "vocabulary", "writing", "listening", "speaking", "mock-test"];
    // Prioritize weak skill types
    const prioritizedTypes = [...types];
    if (weakSkillTypes.length > 0) {
      const firstWeak = weakSkillTypes[(week - 1) % weakSkillTypes.length];
      const idx = prioritizedTypes.indexOf(firstWeak);
      if (idx > 0) {
        prioritizedTypes.splice(idx, 1);
        prioritizedTypes.unshift(firstWeak);
      }
    }

    for (let day = 1; day <= 7; day++) {
      if (day <= Math.ceil(hoursPerWeek / 1)) {
        const topic =
          weekTopics[(day - 1 + (week - 1) * 2) % weekTopics.length];
        weekPlan.push({
          day,
          topic,
          type: prioritizedTypes[(day - 1 + week - 1) % prioritizedTypes.length],
          duration: Math.max(1, Math.floor(hoursPerDay)),
        });
      }
    }

    plan.push({ week, days: weekPlan });
  }

  return plan;
}

export function generateDailyChallenge(): {
  title: string;
  description: string;
  xpReward: number;
} {
  const challenges = [
    {
      title: "30 daqiqa reading",
      description: "Bugun 30 daqiqa davomida IELTS reading mashqi qiling",
      xpReward: 50,
    },
    {
      title: "10 ta yangi so'z",
      description: "10 ta yangi IELTS so'zini o'rganing va flashcardsga qo'shing",
      xpReward: 30,
    },
    {
      title: "Grammar testi",
      description: "Grammar bo'yicha mini-testni ishlang",
      xpReward: 40,
    },
    {
      title: "Writing practice",
      description: "IELTS Task 2 essay yozing (250+ so'z)",
      xpReward: 60,
    },
    {
      title: "Speaking practice",
      description: "IELTS Speaking 2-qismiga tayyorlaning va o'zingizni yozib oling",
      xpReward: 45,
    },
  ];
  return challenges[Math.floor(Math.random() * challenges.length)];
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("uz-UZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
