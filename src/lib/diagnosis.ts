// The 2-minute diagnosis: five questions about how a business works today, scored into the service
// that fits it best. Labels live in the view; this module only knows answer ids and their weights,
// so the recommendation can be tested without a browser.

export type Need = "website" | "store" | "custom" | "support" | "hours";

/** Order used to break ties: the simpler, cheaper starting point wins. */
export const NEEDS: Need[] = ["website", "store", "custom", "support", "hours"];

type Weights = Partial<Record<Need, number>>;

export const QUESTIONS = {
  sell: {
    social: { store: 3, website: 1 },
    shop: { website: 3, store: 1 },
    online: { support: 2, store: 2 },
    appointments: { custom: 3, website: 1 },
    b2b: { website: 2, custom: 2 },
    team: { hours: 4 },
  },
  time: {
    questions: { website: 3 },
    orders: { store: 3, custom: 1 },
    schedule: { custom: 3 },
    sheets: { custom: 3 },
    upkeep: { support: 3 },
    backlog: { hours: 3 },
  },
  goal: {
    found: { website: 3 },
    sell: { store: 3 },
    order: { custom: 3 },
    grow: { custom: 2, support: 1 },
    capacity: { hours: 3 },
  },
  today: {
    nothing: { website: 2, store: 1 },
    old: { website: 3 },
    store: { support: 2, store: 1 },
    system: { custom: 2, support: 1 },
  },
  // Timing doesn't change what fits, only the next step.
  when: { now: {}, quarter: {}, exploring: {} },
} as const satisfies Record<string, Record<string, Weights>>;

export type Question = keyof typeof QUESTIONS;
export type Answers = { [Q in Question]: keyof (typeof QUESTIONS)[Q] };
export type NextStep = "prototype" | "call" | "explore";

export type Diagnosis = {
  need: Need;
  ranking: { need: Need; score: number }[];
  /** The answers that pointed to the recommendation, in question order. */
  reasons: { question: Question; answer: string }[];
  next: NextStep;
};

export class InvalidAnswers extends Error {}

export function diagnose(answers: Partial<Record<Question, string>>): Diagnosis {
  const scores = new Map<Need, number>(NEEDS.map((need) => [need, 0]));
  const chosen: { question: Question; answer: string; weights: Weights }[] = [];
  for (const question of Object.keys(QUESTIONS) as Question[]) {
    const answer = answers[question];
    const options: Record<string, Weights> = QUESTIONS[question];
    if (!answer || !Object.hasOwn(options, answer)) throw new InvalidAnswers(`Missing or unknown answer for "${question}"`);
    const weights = options[answer];
    for (const [need, points] of Object.entries(weights) as [Need, number][]) scores.set(need, scores.get(need)! + points);
    chosen.push({ question, answer, weights });
  }
  const ranking = NEEDS.map((need) => ({ need, score: scores.get(need)! }))
    .sort((a, b) => b.score - a.score || NEEDS.indexOf(a.need) - NEEDS.indexOf(b.need));
  const need = ranking[0].need;
  const reasons = chosen.filter((c) => (c.weights[need] ?? 0) > 0).map(({ question, answer }) => ({ question, answer }));
  const next: NextStep = answers.when === "now" ? "prototype" : answers.when === "quarter" ? "call" : "explore";
  return { need, ranking, reasons, next };
}
