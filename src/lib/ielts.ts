/**
 * IELTS Band Score conversion tables & utilities
 * Based on official IELTS Academic conversion tables (approximate)
 * NOTE: These are estimated conversions. Real exam results may vary.
 * Official IELTS bands are certified by Cambridge ESOL, British Council, and IDP.
 */

// Listening: 40 items → Band 1-9 (Academic & General Training)
// Slight variation exists between Academic/GT for Listening — this uses the
// widely accepted compromise table used by most IELTS preparation resources.
const LISTENING_BANDS: [number, number][] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7],
  [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5],
  [10, 4], [7, 3.5], [5, 3], [3, 2.5], [0, 0],
];

// Academic Reading: 40 items → Band 1-9
// Note: General Training Reading uses a different (stricter) conversion.
// This table is for Academic Reading only.
const READING_BANDS: [number, number][] = [
  [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7],
  [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5],
  [10, 4], [8, 3.5], [6, 3], [4, 2.5], [0, 0],
];

/** Convert Listening correct count (0-40) to IELTS band (0-9, 0.5 increments) */
export function listeningScoreToBand(correct: number): number {
  for (const [minScore, band] of LISTENING_BANDS) {
    if (correct >= minScore) return band;
  }
  return 0;
}

/** Convert Academic Reading correct count (0-40) to IELTS band (0-9, 0.5 increments) */
export function readingScoreToBand(correct: number): number {
  for (const [minScore, band] of READING_BANDS) {
    if (correct >= minScore) return band;
  }
  return 0;
}

/**
 * Official IELTS overall band rounding rule:
 * - Average ending in .25 → round up to next .5  (e.g. 6.25 → 6.5)
 * - Average ending in .75 → round up to next whole (e.g. 6.75 → 7.0)
 * - Otherwise → round to nearest 0.5
 *
 * Implemented via Math.round(n * 2) / 2 which naturally handles
 * .25 and .75 correctly under standard midpoint rounding.
 */
export function roundIELTSBand(rawAverage: number): number {
  return Math.round(rawAverage * 2) / 2;
}

/** Calculate Overall Band Score from 4 skill bands using official IELTS rounding */
export function avgBandToOverall(bands: number[]): number {
  const valid = bands.filter(b => b > 0);
  if (valid.length === 0) return 0;
  const avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  return roundIELTSBand(avg);
}

/**
 * Calculate Writing band using official weighting:
 * Writing Band = (Task 1 band × 1 + Task 2 band × 2) / 3
 * Task 2 contributes twice as much as Task 1
 */
export function calcWritingBand(task1Band: number, task2Band: number): number {
  return roundIELTSBand((task1Band * 1 + task2Band * 2) / 3);
}

/** Approximate a writing band from word count and content heuristics */
export function estimateWritingBand(task1WordCount: number, task2WordCount: number): number {
  let band = 5.0;
  if (task1WordCount >= 150) band += 0.5;
  if (task1WordCount >= 180) band += 0.5;
  if (task2WordCount >= 250) band += 0.5;
  if (task2WordCount >= 300) band += 0.5;
  if (task1WordCount >= 200 && task2WordCount >= 350) band += 0.5;
  return roundIELTSBand(Math.min(9, band));
}

export function getBandDescription(band: number): string {
  if (band >= 9) return "Expert user — fully operational command of the language";
  if (band >= 8) return "Very good user — fully operational with occasional inaccuracies";
  if (band >= 7) return "Good user — operational command with occasional errors";
  if (band >= 6) return "Competent user — effective command despite some errors";
  if (band >= 5) return "Modest user — partial command, coping with overall meaning";
  if (band >= 4) return "Limited user — basic competence in familiar situations only";
  if (band >= 3) return "Extremely limited user — conveys only general meaning";
  if (band >= 2) return "Intermittent user — great difficulty understanding";
  if (band >= 1) return "Non user — essentially no ability to use the language";
  return "Did not attempt";
}

export function getStrengthWeakness(scores: Record<string, number | null>): {
  strongest: string; weakest: string; strongLabel: string; weakLabel: string;
} {
  const entries = Object.entries(scores).filter(([, v]) => v !== null) as [string, number][];
  if (entries.length === 0) return { strongest: "", weakest: "", strongLabel: "", weakLabel: "" };
  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const labelMap: Record<string, string> = {
    listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking",
  };
  return {
    strongest: sorted[0][0],
    weakest: sorted[sorted.length - 1][0],
    strongLabel: labelMap[sorted[0][0]] || sorted[0][0],
    weakLabel: labelMap[sorted[sorted.length - 1][0]] || sorted[sorted.length - 1][0],
  };
}
