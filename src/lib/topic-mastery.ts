import { prisma } from "./prisma";

export interface MasteryUpdate {
  userId: string;
  skill: string;
  subtopic: string;
  correct: boolean;
}

const SUBTOPIC_MAP: Record<string, string[]> = {
  grammar: ["Tenses - Present", "Tenses - Past", "Tenses - Future", "Conditionals", "Passive Voice",
            "Modal Verbs", "Relative Clauses", "Reported Speech", "Articles", "Prepositions",
            "Phrasal Verbs", "Comparatives"],
  reading: ["Skimming", "Scanning", "Detailed Reading", "True/False/Not Given", "Matching Headings",
            "Matching Information", "Sentence Completion", "Summary Completion", "Multiple Choice",
            "Labeling Diagram", "Short Answer"],
  listening: ["Form Completion", "Multiple Choice Listening", "Map Labeling", "Table Completion",
              "Sentence Completion Listening", "Short Answer Listening", "Matching Listening"],
  writing: ["Task 1 Analysis", "Task 1 Trend Comparison", "Task 1 Process Diagram",
            "Task 2 Essay Structure", "Task 2 Opinion Essay", "Task 2 Discussion Essay",
            "Coherence & Cohesion", "Lexical Resource Writing"],
  speaking: ["Part 1 Introduction", "Part 1 Common Topics", "Part 2 Cue Card",
             "Part 2 Time Management", "Part 3 Discussion", "Fluency & Coherence",
             "Pronunciation", "Lexical Resource Speaking"],
  vocabulary: ["Academic Word List", "Topic Education", "Topic Environment", "Topic Technology",
               "Topic Health", "Collocations", "Synonyms & Antonyms", "Word Formation"],
};

const SKILL_CATEGORY_MAP: Record<string, string> = {
  grammar: "grammar",
  reading: "reading",
  listening: "listening",
  writing: "writing",
  speaking: "speaking",
  vocabulary: "vocabulary",
};

export function getSubtopics(skill: string): string[] {
  return SUBTOPIC_MAP[skill] || [];
}

export function skillFromLessonCategory(category: string): string {
  return SKILL_CATEGORY_MAP[category] || category;
}

export function detectSubtopicFromTitle(lessonTitle: string): string {
  const lower = lessonTitle.toLowerCase();

  // Grammar
  if (lower.includes("present")) return "Tenses - Present";
  if (lower.includes("past")) return "Tenses - Past";
  if (lower.includes("future")) return "Tenses - Future";
  if (lower.includes("condition")) return "Conditionals";
  if (lower.includes("passive")) return "Passive Voice";
  if (lower.includes("modal")) return "Modal Verbs";
  if (lower.includes("relative")) return "Relative Clauses";
  if (lower.includes("reported")) return "Reported Speech";
  if (lower.includes("article")) return "Articles";
  if (lower.includes("preposition")) return "Prepositions";
  if (lower.includes("phrasal")) return "Phrasal Verbs";
  if (lower.includes("comparative") || lower.includes("superlative")) return "Comparatives";

  // Reading
  if (lower.includes("skimming")) return "Skimming";
  if (lower.includes("scanning")) return "Scanning";
  if (lower.includes("detailed")) return "Detailed Reading";
  if (lower.includes("true/false") || lower.includes("true false")) return "True/False/Not Given";
  if (lower.includes("matching heading") || lower.includes("match heading")) return "Matching Headings";
  if (lower.includes("matching info")) return "Matching Information";
  if (lower.includes("sentence completion")) return "Sentence Completion";
  if (lower.includes("summary completion")) return "Summary Completion";
  if (lower.includes("multiple choice")) return "Multiple Choice";
  if (lower.includes("label")) return "Labeling Diagram";
  if (lower.includes("short answer")) return "Short Answer";

  // Listening
  if (lower.includes("form completion")) return "Form Completion";
  if (lower.includes("map label")) return "Map Labeling";
  if (lower.includes("table completion")) return "Table Completion";
  if (lower.includes("matching")) return "Matching Listening";

  // Writing
  if (lower.includes("task 1") && (lower.includes("trend") || lower.includes("comparison"))) return "Task 1 Trend Comparison";
  if (lower.includes("task 1") && lower.includes("process")) return "Task 1 Process Diagram";
  if (lower.includes("task 1") || lower.includes("ma'lumot")) return "Task 1 Analysis";
  if (lower.includes("task 2") && lower.includes("opinion")) return "Task 2 Opinion Essay";
  if (lower.includes("task 2") && lower.includes("discussion")) return "Task 2 Discussion Essay";
  if (lower.includes("task 2") || lower.includes("essay")) return "Task 2 Essay Structure";
  if (lower.includes("coherence") || lower.includes("cohesion")) return "Coherence & Cohesion";
  if (lower.includes("lexical")) return "Lexical Resource Writing";

  // Speaking
  if (lower.includes("part 1") || lower.includes("introduction")) return "Part 1 Introduction";
  if (lower.includes("part 2") && lower.includes("cue")) return "Part 2 Cue Card";
  if (lower.includes("part 2") && lower.includes("time")) return "Part 2 Time Management";
  if (lower.includes("part 3") || lower.includes("discussion")) return "Part 3 Discussion";
  if (lower.includes("fluency")) return "Fluency & Coherence";
  if (lower.includes("pronunciation")) return "Pronunciation";

  // Vocabulary
  if (lower.includes("academic word") || lower.includes("awl")) return "Academic Word List";
  if (lower.includes("education")) return "Topic Education";
  if (lower.includes("environment")) return "Topic Environment";
  if (lower.includes("technology")) return "Topic Technology";
  if (lower.includes("health")) return "Topic Health";
  if (lower.includes("collocation")) return "Collocations";
  if (lower.includes("synonym") || lower.includes("antonym")) return "Synonyms & Antonyms";
  if (lower.includes("word formation")) return "Word Formation";

  return lower.replace(/^[^a-zA-Z]+/, "").slice(0, 40) || "General";
}

export async function updateTopicMastery(data: MasteryUpdate) {
  const existing = await prisma.topicMastery.findUnique({
    where: {
      userId_skill_subtopic: {
        userId: data.userId,
        skill: data.skill,
        subtopic: data.subtopic,
      },
    },
  });

  const newCorrectCount = (existing?.correctCount ?? 0) + (data.correct ? 1 : 0);
  const newTotalCount = (existing?.totalCount ?? 0) + 1;
  const newMastery = newTotalCount > 0 ? newCorrectCount / newTotalCount : 0;

  await prisma.topicMastery.upsert({
    where: {
      userId_skill_subtopic: {
        userId: data.userId,
        skill: data.skill,
        subtopic: data.subtopic,
      },
    },
    update: {
      correctCount: newCorrectCount,
      totalCount: newTotalCount,
      masteryLevel: newMastery,
    },
    create: {
      userId: data.userId,
      skill: data.skill,
      subtopic: data.subtopic,
      correctCount: data.correct ? 1 : 0,
      totalCount: 1,
      masteryLevel: data.correct ? 1 : 0,
    },
  });
}

export interface WeaknessResult {
  subtopic: string;
  skill: string;
  errorRate: number;
  attemptsCount: number;
  masteryLevel: number;
  status: "weak" | "average" | "strong";
  recommendedLessons: { id: string; title: string; difficulty: string }[];
}

export async function getWeaknesses(userId: string, minAttempts = 3): Promise<WeaknessResult[]> {
  const masteries = await prisma.topicMastery.findMany({
    where: { userId },
    orderBy: [{ skill: "asc" }, { subtopic: "asc" }],
  });

  const results: WeaknessResult[] = [];

  for (const m of masteries) {
    const errorRate = m.totalCount > 0 ? 1 - m.masteryLevel : 1;
    const status = m.masteryLevel >= 0.8 ? "strong" : m.masteryLevel >= 0.6 ? "average" : "weak";

    // Find relevant lessons for this skill + subtopic
    const lessons = await prisma.lesson.findMany({
      where: {
        category: m.skill,
        title: { contains: m.subtopic.split(" - ")[0] || m.subtopic.split(" ")[0] },
      },
      select: { id: true, title: true, difficulty: true },
      take: 3,
    });

    // Fallback: if no lessons found, get any from that skill
    const recommendedLessons = lessons.length > 0 ? lessons : await prisma.lesson.findMany({
      where: { category: m.skill },
      select: { id: true, title: true, difficulty: true },
      take: 3,
    });

    results.push({
      subtopic: m.subtopic,
      skill: m.skill,
      errorRate,
      attemptsCount: m.totalCount,
      masteryLevel: m.masteryLevel,
      status,
      recommendedLessons,
    });
  }

  return results.sort((a, b) => b.errorRate - a.errorRate);
}

export interface Recommendation {
  subtopic: string;
  skill: string;
  errorRate: number;
  attemptsCount: number;
  recommendedLessons: { id: string; title: string; difficulty: string }[];
  message: string;
}

export async function getRecommendations(userId: string): Promise<Recommendation[]> {
  const weaknesses = await getWeaknesses(userId);

  return weaknesses
    .filter((w) => w.status === "weak" && w.attemptsCount >= 3)
    .slice(0, 5)
    .map((w) => ({
      subtopic: w.subtopic,
      skill: w.skill,
      errorRate: w.errorRate,
      attemptsCount: w.attemptsCount,
      recommendedLessons: w.recommendedLessons,
      message: `${w.subtopic} bo'limida ${Math.round(w.errorRate * 100)}% xato qilyapsiz — shu mavzuni qayta ko'rib chiqing`,
    }));
}

export async function getRadarData(userId: string) {
  const masteries = await prisma.topicMastery.findMany({
    where: { userId },
  });

  // Aggregate per skill
  const skillMap: Record<string, { total: number; count: number }> = {};
  for (const m of masteries) {
    if (!skillMap[m.skill]) skillMap[m.skill] = { total: 0, count: 0 };
    skillMap[m.skill].total += m.masteryLevel;
    skillMap[m.skill].count += 1;
  }

  return Object.entries(skillMap).map(([skill, data]) => ({
    skill: skill.charAt(0).toUpperCase() + skill.slice(1),
    value: data.count > 0 ? Math.round((data.total / data.count) * 100) : 0,
    fullMark: 100,
  }));
}

export async function getDynamicDifficulty(userId: string, skill: string, subtopic: string): Promise<"Easy" | "Medium" | "Hard"> {
  const mastery = await prisma.topicMastery.findUnique({
    where: {
      userId_skill_subtopic: { userId, skill, subtopic },
    },
  });

  if (!mastery || mastery.totalCount < 3) return "Medium";

  // Check recent trend: last few attempts
  // We use the ratio: if mastery > 0.7 and enough attempts -> harder
  if (mastery.masteryLevel >= 0.75 && mastery.totalCount >= 5) return "Hard";
  if (mastery.masteryLevel >= 0.6) return "Medium";
  return "Easy";
}
