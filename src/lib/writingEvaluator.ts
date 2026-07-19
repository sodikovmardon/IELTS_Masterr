export interface CriterionResult {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface EvaluationResult {
  taskAchievement: CriterionResult;
  coherenceCohesion: CriterionResult;
  lexicalResource: CriterionResult;
  grammaticalRange: CriterionResult;
  overallBand: number;
  generalFeedback: string;
  wordCount: number;
  estimatedBand: string;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function analyzeSentenceLengths(text: string): { avg: number; long: number; short: number } {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  if (sentences.length === 0) return { avg: 0, long: 0, short: 0 };
  const lengths = sentences.map((s) => s.split(/\s+/).filter(Boolean).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const long = lengths.filter((l) => l > 20).length;
  const short = lengths.filter((l) => l < 5).length;
  return { avg, long, short };
}

function detectGrammarIssues(text: string): string[] {
  const issues: string[] = [];
  const patterns: [RegExp, string][] = [
    [/\b(he|she|it) don't\b/gi, "Subject-verb agreement: use 'doesn't' instead of 'don't'"],
    [/\b(they|we|you|i) doesn't\b/gi, "Subject-verb agreement: use 'don't' instead of 'doesn't'"],
    [/\bmore better\b/gi, "Double comparative: use 'better' instead of 'more better'"],
    [/\bmore worse\b/gi, "Double comparative: use 'worse' instead of 'more worse'"],
    [/\bmost best\b/gi, "Double superlative: use 'best' instead of 'most best'"],
    [/\bmost worst\b/gi, "Double superlative: use 'worst' instead of 'most worst'"],
    [/\bcan able\b/gi, "Redundant: use 'can' or 'is able to', not both"],
    [/\bwould of\b/gi, "Incorrect: use 'would have' instead of 'would of'"],
    [/\bcould of\b/gi, "Incorrect: use 'could have' instead of 'could of'"],
    [/\bshould of\b/gi, "Incorrect: use 'should have' instead of 'should of'"],
    [/\bthese is\b/gi, "Subject-verb agreement: 'these' requires 'are'"],
    [/\bthis are\b/gi, "Subject-verb agreement: 'this' requires 'is'"],
    [/\btheir is\b/gi, "Incorrect: use 'there is' instead of 'their is'"],
    [/\byour is\b/gi, "Incorrect: use 'you're' or 'yours' instead"],
    [/\bits a\b/gi, "Incorrect: use 'it's a' instead of 'its a' when meaning 'it is'"],
    [/\bliteratures\b/gi, "'Literature' is uncountable - do not add 's'"],
    [/\binformations\b/gi, "'Information' is uncountable - do not add 's'"],
    [/\bknowledges\b/gi, "'Knowledge' is uncountable - do not add 's'"],
    [/\bequipments\b/gi, "'Equipment' is uncountable - do not add 's'"],
    [/\bresearches\b/gi, "'Research' is uncountable - do not add 's'"],
    [/\bfeedbacks\b/gi, "'Feedback' is uncountable - do not add 's'"],
    [/\badvices\b/gi, "'Advice' is uncountable - do not add 's'"],
  ];
  for (const [regex, msg] of patterns) {
    if (regex.test(text)) issues.push(msg);
  }
  return issues;
}

function detectComplexGrammar(text: string): string[] {
  const found: string[] = [];
  if (/although|even though|while|whereas/i.test(text)) found.push("Concessive clauses (although/even though)");
  if (/which|that|who|whom|whose/i.test(text)) found.push("Relative clauses");
  if (/if|unless|provided that|as long as/i.test(text)) found.push("Conditional structures");
  if (/would have|could have|should have|might have/i.test(text)) found.push("Perfect conditional (would have + past participle)");
  if (/having been|having|being|been/i.test(text)) found.push("Passive / perfect participle structures");
  if (/not only|but also|neither|nor/i.test(text)) found.push("Inversion / correlative conjunctions");
  if (/it is [\w\s]+ that/i.test(text)) found.push("Cleft sentences (It is... that)");
  if (/the more|the less|the better/i.test(text)) found.push("Comparative structures (the more... the more)");
  if (/despite|in spite of regardless of/i.test(text)) found.push("Prepositional concession (despite/in spite of)");
  return found;
}

function detectAcademicVocab(text: string): { found: string[]; count: number } {
  const academic = [
    "significant", "substantial", "consequently", "inevitable", "ultimately",
    "predominantly", "notably", "remarkable", "fundamental", "underlying",
    "underpins", "constitutes", "manifests", "illustrates", "demonstrates",
    "highlights", "emphasizes", "underscores", "facilitates", "promotes",
    "exacerbates", "mitigates", "alleviates", "diminishes", "enhances",
    "adequate", "optimal", "viable", "feasible", "coherent", "consistent",
    "comprehensive", "explicit", "implicit", "intrinsic", "inherent",
    "profound", "robust", "complex", "diverse", "extensive",
    "accordingly", "subsequently", "thereafter", "thereby", "hitherto",
    "nonetheless", "notwithstanding", "furthermore", "moreover", "likewise",
    "contemporary", "widespread", "prevalent", "inevitable", "unprecedented",
    "paradigm", "phenomenon", "perspective", "notion", "concept",
    "disparity", "discrepancy", "divergence", "correlation", "causation",
    "implication", "ramification", "constraint", "limitation", "trade-off",
  ];
  const found = academic.filter((w) => new RegExp(`\\b${w}\\b`, "gi").test(text));
  return { found: [...new Set(found)], count: found.length };
}

function detectLinkingWords(text: string): string[] {
  const links = [
    "however", "therefore", "moreover", "furthermore", "in addition",
    "on the other hand", "nevertheless", "nonetheless", "consequently",
    "as a result", "for instance", "for example", "in contrast",
    "by contrast", "in comparison", "similarly", "likewise",
    "in conclusion", "to summarise", "overall", "firstly", "secondly",
    "finally", "subsequently", "whereas", "while", "although",
  ];
  return links.filter((w) => new RegExp(`\\b${w}\\b`, "gi").test(text));
}

function analyzeStructure(text: string): {
  hasIntro: boolean; hasConclusion: boolean; hasExamples: boolean;
  hasOverview: boolean; paragraphCount: number;
  structureScore: number;
} {
  const hasIntro = /^[\s]*(in|the|this|overall|there|it|from|the|a|an)/i.test(text.trim()) &&
    text.length > 50;
  const hasConclusion = /in conclusion|to conclude|to summarise|overall|in summary|all things considered/i.test(text);
  const hasExamples = /for example|for instance|such as|specifically|as an illustration|to illustrate/i.test(text);
  const hasOverview = /overall|in general|generally speaking|as a whole/i.test(text);

  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 20);
  const paragraphCount = Math.min(paragraphs.length, 6);

  let structureScore = 4;
  if (paragraphCount >= 3) structureScore += 1;
  if (paragraphCount >= 4) structureScore += 0.5;
  if (hasIntro && hasConclusion) structureScore += 1;
  if (hasExamples) structureScore += 0.5;
  if (hasOverview) structureScore += 0.5;

  return { hasIntro, hasConclusion, hasExamples, hasOverview, paragraphCount, structureScore };
}

function evaluateTaskAchievement(text: string, wordCount: number, topic: string): CriterionResult {
  const structure = analyzeStructure(text);
  const topicWords = topic.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const topicRelevance = topicWords.filter((w) => text.toLowerCase().includes(w)).length /
    Math.max(topicWords.length, 1);

  let score = 4;
  if (wordCount >= 150) score += 0.5;
  if (wordCount >= 250) score += 1;
  if (structure.hasIntro) score += 0.5;
  if (structure.hasConclusion) score += 0.5;
  if (structure.hasExamples) score += 0.5;
  if (topicRelevance > 0.3) score += 0.5;
  if (topicRelevance > 0.6) score += 0.5;
  if (structure.paragraphCount >= 4) score += 0.5;
  score = Math.min(9, Math.max(1, score));

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (wordCount >= 250) strengths.push("Maqola uzunligi yetarli (250+ so'z)");
  if (structure.hasIntro) strengths.push("Introduction mavjud");
  if (structure.hasConclusion) strengths.push("Conclusion mavjud");
  if (structure.hasExamples) strengths.push("Misol va dalillar keltirilgan");
  if (topicRelevance > 0.6) strengths.push("Mavzuga oid kalit so'zlar yaxshi qo'llanilgan");

  if (wordCount < 150) improvements.push(`Maqola juda qisqa (${wordCount} so'z). Kamida 150 so'z yozing`);
  if (wordCount < 250 && wordCount >= 150) improvements.push("Maqola uzunligini oshirish tavsiya etiladi (250+ so'z)");
  if (!structure.hasIntro) improvements.push("Introduction paragrafi qo'shing (mavzuni parafraze qiling)");
  if (!structure.hasConclusion) improvements.push("Xulosa paragrafi qo'shing");
  if (!structure.hasExamples) improvements.push("Fikrlaringizni misollar bilan qo'llab-quvvatlang");
  if (structure.paragraphCount < 3) improvements.push("Matnni paragraflarga ajrating (kamida 3-4 paragraf)");
  if (topicRelevance < 0.3) improvements.push("Mavzudan chetga chiqmang, asosiy mavzuga rioya qiling");

  const feedback = score >= 7
    ? "Vazifani to'liq bajargan. Asosiy fikrlar aniq ifodalangan va yaxshi rivojlantirilgan."
    : score >= 5
    ? "Vazifa bajarilgan, ammo ba'zi jihatlarni chuqurroq yoritish kerak. Fikrlarni yanada rivojlantirish va aniq misollar bilan qo'llab-quvvatlash tavsiya etiladi."
    : "Vazifa to'liq bajarilmagan. Asosiy fikrlarni aniqlashtirish, maqolani to'g'ri tuzilishda yozish va mavzudan chetga chiqmaslik kerak.";

  return { score: Math.round(score * 2) / 2, feedback, strengths, improvements };
}

function evaluateCoherenceCohesion(text: string): CriterionResult {
  const links = detectLinkingWords(text);
  const structure = analyzeStructure(text);
  const { paragraphCount } = structure;

  let score = 4;
  if (paragraphCount >= 3) score += 0.5;
  if (paragraphCount >= 4) score += 0.5;
  if (links.length >= 3) score += 0.5;
  if (links.length >= 5) score += 0.5;
  if (links.length >= 8) score += 0.5;
  if (structure.hasIntro && structure.hasConclusion) score += 1;
  const hasVariety = new Set(links.map((l) => l.toLowerCase().split(" ")[0])).size >= 3;
  if (hasVariety) score += 0.5;
  score = Math.min(9, Math.max(1, score));

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (links.length >= 5) strengths.push(`${links.length} xil bog'lovchi vositalar qo'llanilgan`);
  if (paragraphCount >= 4) strengths.push("Matn to'g'ri paragraflarga ajratilgan");
  if (hasVariety) strengths.push("Bog'lovchi vositalar xilma-xil");
  if (structure.hasIntro && structure.hasConclusion) strengths.push("Introduction va conclusion mavjud");

  if (paragraphCount < 3) improvements.push("Matnni paragraflarga ajrating (kamida 3-4)");
  if (links.length < 3) improvements.push("Ko'proq bog'lovchi vositalardan foydalaning (however, therefore, moreover va h.k.)");
  if (links.length >= 3 && !hasVariety) improvements.push("Bog'lovchi vositalarni xilma-xillashtiring (faqat 'firstly, secondly' emas)");
  if (!structure.hasConclusion) improvements.push("Xulosa paragrafi qo'shing va uni 'in conclusion' kabi vositalar bilan boshlang");

  const feedback = score >= 7
    ? "Matn tuzilishi yaxshi, paragraflar mantiqiy bog'langan va bog'lovchi vositalar samarali qo'llanilgan."
    : score >= 5
    ? "Matn tuzilishi va bog'lovchi vositalarni yaxshilash kerak. Paragraflar va linking words dan samaraliroq foydalaning."
    : "Matn tuzilishi zaif. Paragraflarga ajratish va bog'lovchi vositalardan foydalanishni o'rganish kerak.";

  return { score: Math.round(score * 2) / 2, feedback, strengths, improvements };
}

function evaluateLexicalResource(text: string): CriterionResult {
  const academic = detectAcademicVocab(text);
  const wordCount = countWords(text);
  const uniqueWords = new Set(text.toLowerCase().match(/\b[a-z]+\b/g) || []).size;
  const lexicalDiversity = wordCount > 0 ? uniqueWords / wordCount : 0;

  let score = 4;
  if (academic.count >= 2) score += 0.5;
  if (academic.count >= 5) score += 0.5;
  if (academic.count >= 8) score += 0.5;
  if (lexicalDiversity > 0.5) score += 0.5;
  if (lexicalDiversity > 0.6) score += 0.5;
  if (wordCount >= 200) score += 0.5;
  if (wordCount >= 300) score += 0.5;
  score = Math.min(9, Math.max(1, score));

  const strengths: string[] = [];
  const improvements: string[] = [];
  const bandLabels = ["Band 4", "Band 5", "Band 6", "Band 7", "Band 8", "Band 9"];

  if (academic.count >= 5) strengths.push(`${academic.count} ta akademik so'z qo'llanilgan`);
  if (lexicalDiversity > 0.55) strengths.push(`So'z boyligi xilma-xil (diversity: ${(lexicalDiversity * 100).toFixed(0)}%)`);
  if (wordCount >= 250) strengths.push("Maqola uzunligi yetarli");

  if (academic.count < 3) improvements.push("Akademik so'zlarni ko'proq qo'llang (significant, consequently, demonstrates va h.k.)");
  if (lexicalDiversity < 0.5) improvements.push("So'zlarni takrorlamang, sinonimlardan foydalaning");
  if (academic.count >= 3 && academic.count < 6) improvements.push("Akademik so'z boyligini yanada kengaytiring");

  const feedback = score >= 7
    ? "So'z boyligi yaxshi, akademik so'zlar va sinonimlardan samarali foydalanilgan."
    : score >= 5
    ? "So'z boyligini oshirish va sinonimlardan ko'proq foydalanish tavsiya etiladi. Akademik so'zlar qo'llashga harakat qiling."
    : "So'z boyligi cheklangan. Yangi so'zlarni o'rganish va ularni kontekstda qo'llash ustida ishlang.";

  return { score: Math.round(score * 2) / 2, feedback, strengths, improvements };
}

function evaluateGrammaticalRange(text: string): CriterionResult {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const sentenceAnalysis = analyzeSentenceLengths(text);
  const complexStructures = detectComplexGrammar(text);
  const issues = detectGrammarIssues(text);

  let score = 4;
  if (sentenceAnalysis.avg > 10) score += 0.5;
  if (sentenceAnalysis.avg > 15) score += 0.5;
  if (complexStructures.length >= 2) score += 0.5;
  if (complexStructures.length >= 4) score += 0.5;
  if (complexStructures.length >= 6) score += 0.5;
  if (issues.length === 0) score += 0.5;
  if (sentences.length >= 10) score += 0.5;
  if (sentenceAnalysis.long >= 3) score += 0.5;
  score = Math.min(9, Math.max(1, score));

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (complexStructures.length >= 3) strengths.push(`${complexStructures.length} xil murakkab grammatik tuzilma qo'llanilgan`);
  if (sentenceAnalysis.avg > 12) strengths.push(`Gaplar o'rtacha uzunligi mos (${sentenceAnalysis.avg.toFixed(1)} so'z)`);
  if (issues.length === 0) strengths.push("Grammatik xatolar deyarli yo'q");

  if (issues.length > 0) improvements.push(...issues.slice(0, 3));
  if (complexStructures.length < 2) improvements.push("Murakkab gap tuzilmalarini ko'proq qo'llang (relative clauses, conditionals, passive voice)");
  if (sentenceAnalysis.avg < 10) improvements.push("Gaplarni uzunroq va murakkabroq tuzing (qo'shma gaplardan foydalaning)");

  const feedback = score >= 7
    ? "Grammatik tuzilmalar xilma-xil va xatolar kam. Murakkab gap tuzilmalaridan samarali foydalanilgan."
    : score >= 5
    ? "Grammatik tuzilmalarni xilma-xillashtirish kerak. Qo'shma va murakkab gaplardan ko'proq foydalaning."
    : "Grammatik tuzilmalar cheklangan va xatolar mavjud. Asosiy grammatik qoidalarni takrorlash tavsiya etiladi.";

  return { score: Math.round(score * 2) / 2, feedback, strengths, improvements };
}

function generateGeneralFeedback(
  ta: CriterionResult, cc: CriterionResult, lr: CriterionResult, gr: CriterionResult,
  overall: number, wordCount: number
): string {
  const avg = (ta.score + cc.score + lr.score + gr.score) / 4;
  const allImprovements = [...ta.improvements, ...cc.improvements, ...lr.improvements, ...gr.improvements];
  const topThree = allImprovements.slice(0, 3);

  let advice = "";
  if (avg >= 7) {
    advice = "Yaxshi natija! Sizning Writing ko'nikmalaringiz yuqori darajada. ";
  } else if (avg >= 5) {
    advice = "Yaxshilanishga joy bor. Quyidagi tavsiyalarga e'tibor bering: ";
  } else {
    advice = "Asosiy ko'nikmalarni mustahkamlash kerak. Quyidagi yo'nalishlarda ishlang: ";
  }

  if (topThree.length > 0) {
    advice += "\n\n✅ Muhim tavsiyalar:\n";
    topThree.forEach((t, i) => {
      advice += `${i + 1}. ${t}\n`;
    });
  }

  const bandRanges: Record<string, string> = {
    "1": "Band 1 — Juda past",
    "1.5": "Band 1.5",
    "2": "Band 2",
    "2.5": "Band 2.5",
    "3": "Band 3 — Past",
    "3.5": "Band 3.5",
    "4": "Band 4 — Cheklangan",
    "4.5": "Band 4.5",
    "5": "Band 5 — O'rtacha",
    "5.5": "Band 5.5",
    "6": "Band 6 — Qoniqarli",
    "6.5": "Band 6.5",
    "7": "Band 7 — Yaxshi",
    "7.5": "Band 7.5",
    "8": "Band 8 — Juda yaxshi",
    "8.5": "Band 8.5",
    "9": "Band 9 — A'lo",
  };

  const bandKey = overall.toFixed(1);
  const bandLabel = bandRanges[bandKey] || `Band ${bandKey}`;

  return `${advice}\n\n📊 ${bandLabel} | ${wordCount} so'z | ${allImprovements.length} ta yaxshilanish imkoniyati`;
}

function estimateOverallBand(ta: number, cc: number, lr: number, gr: number, wordCount: number): number {
  let avg = (ta + cc + lr + gr) / 4;
  if (wordCount < 100) avg = Math.min(avg, 4);
  else if (wordCount < 150) avg = Math.min(avg, 5);
  return Math.round(avg * 2) / 2;
}

function getBandDescription(band: number): string {
  if (band >= 8) return "Ekspert foydalanuvchi";
  if (band >= 7) return "Yaxshi foydalanuvchi";
  if (band >= 6) return "Qoniqarli foydalanuvchi";
  if (band >= 5) return "O'rtacha foydalanuvchi";
  return "Cheklangan foydalanuvchi";
}

export async function evaluateWriting(
  essayText: string,
  topic: string
): Promise<EvaluationResult> {
  const wordCount = countWords(essayText);

  const taskAchievement = evaluateTaskAchievement(essayText, wordCount, topic);
  const coherenceCohesion = evaluateCoherenceCohesion(essayText);
  const lexicalResource = evaluateLexicalResource(essayText);
  const grammaticalRange = evaluateGrammaticalRange(essayText);

  const overallBand = estimateOverallBand(
    taskAchievement.score,
    coherenceCohesion.score,
    lexicalResource.score,
    grammaticalRange.score,
    wordCount
  );

  const generalFeedback = generateGeneralFeedback(
    taskAchievement, coherenceCohesion, lexicalResource, grammaticalRange,
    overallBand, wordCount
  );

  const estimatedBand = getBandDescription(overallBand);

  return {
    taskAchievement,
    coherenceCohesion,
    lexicalResource,
    grammaticalRange,
    overallBand,
    generalFeedback,
    wordCount,
    estimatedBand,
  };
}
