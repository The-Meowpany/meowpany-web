// IFPUG function point estimate from a plain-language questionnaire. Same rules and calibration as
// the internal estimator in Core (sales/estimator.py and the Estimate model), so a visitor's estimate
// matches the one the team would compute. Amounts are kept in integers to avoid rounding drift.
//
// - Each thing the system stores is an internal logical file (ILF), sized by how much data it holds,
//   plus create, edit and delete (external inputs) and a search/view screen (external inquiry).
// - Each report or document it produces is an external output (EO).
// - Each outside service it talks to is an external interface file (EIF); online payments add an
//   input for the payment confirmation.
// - Several user roles add a users store with its maintenance screens.
// - Automatic notifications are an external output.

export type Kind = "EI" | "EO" | "EQ" | "ILF" | "EIF";
export type Complexity = "low" | "average" | "high";
export type Lang = "es" | "en";

export type Answers = {
  entities: { name: string; size?: string }[];
  reports: { name: string; complexity?: string }[];
  integrations: { name: string }[];
  online_payments?: boolean;
  notifications?: boolean;
  multiple_locations?: boolean;
  multilingual?: boolean;
  roles?: number;
  scale?: string;
  logic?: string;
};

export type Fn = { name: string; kind: Kind; complexity: Complexity; weight: number };

export type Estimate = {
  functions: Fn[];
  unadjustedPoints: number;
  adjustmentFactor: number; // 0.65 to 1.35
  adjustedPoints: number; // two decimals
  hours: number;
  weeks: number; // one decimal
  hourlyRate: number;
  price: number;
  priceLow: number;
  priceHigh: number;
};

export class InvalidAnswers extends Error {
  readonly fields: Record<string, string>;

  constructor(fields: Record<string, string>) {
    super("invalid answers");
    this.fields = fields;
  }
}

export const WEIGHTS: Record<Kind, Record<Complexity, number>> = {
  EI: { low: 3, average: 4, high: 6 },
  EO: { low: 4, average: 5, high: 7 },
  EQ: { low: 3, average: 4, high: 6 },
  ILF: { low: 7, average: 10, high: 15 },
  EIF: { low: 5, average: 7, high: 10 },
};

export const CALIBRATION = { hoursPerPoint: 3, hourlyRate: 35, teamHoursPerWeek: 40, priceRange: 0.2 };

const LIMITS = { entities: 30, reports: 30, integrations: 15 } as const;
const SIZE_TO_COMPLEXITY: Record<string, Complexity> = { few: "low", some: "average", many: "high" };
const SCALE: Record<string, number> = { small: 1, medium: 3, large: 5 };
const LOGIC: Record<string, number> = { simple: 1, moderate: 3, complex: 5 };

// Typical values for a modern web application (0 = no influence, 5 = strong).
const WEB_APP_BASELINE = {
  data_communications: 4, distributed_processing: 2, heavily_used_configuration: 2,
  online_data_entry: 5, end_user_efficiency: 4, online_update: 4, reusability: 2,
  installation_ease: 2, operational_ease: 3, facilitate_change: 3,
};

const NAMES = {
  es: {
    create: (n: string) => `Crear ${n}`, edit: (n: string) => `Editar ${n}`, remove: (n: string) => `Eliminar ${n}`,
    view: (n: string) => `Buscar y ver ${n}`, connection: (n: string) => `Conexión con ${n}`,
    provider: "Proveedor de pagos", confirmation: "Confirmación de pago", users: "Usuarios y roles",
    manageUsers: "Administrar usuarios", login: "Iniciar sesión", notifications: "Avisos automáticos",
  },
  en: {
    create: (n: string) => `Create ${n}`, edit: (n: string) => `Edit ${n}`, remove: (n: string) => `Delete ${n}`,
    view: (n: string) => `Search and view ${n}`, connection: (n: string) => `Connection with ${n}`,
    provider: "Payment provider", confirmation: "Payment confirmation", users: "Users and roles",
    manageUsers: "Manage users", login: "Log in", notifications: "Automatic notifications",
  },
};

export const KIND_LABELS: Record<Lang, Record<Kind, string>> = {
  es: { EI: "Entrada externa (EI)", EO: "Salida externa (EO)", EQ: "Consulta externa (EQ)", ILF: "Archivo lógico interno (ILF)", EIF: "Archivo de interfaz externa (EIF)" },
  en: { EI: "External input (EI)", EO: "External output (EO)", EQ: "External inquiry (EQ)", ILF: "Internal logical file (ILF)", EIF: "External interface file (EIF)" },
};

export const COMPLEXITY_LABELS: Record<Lang, Record<Complexity, string>> = {
  es: { low: "Baja", average: "Media", high: "Alta" },
  en: { low: "Low", average: "Average", high: "High" },
};

function clean<T extends { name: string }>(items: T[] | undefined, key: keyof typeof LIMITS): T[] {
  const kept = (Array.isArray(items) ? items : [])
    .filter((item) => item && String(item.name ?? "").trim())
    .map((item) => ({ ...item, name: String(item.name).trim().slice(0, 80) }));
  if (kept.length > LIMITS[key]) throw new InvalidAnswers({ [key]: "too_many" });
  return kept;
}

export function functionsFrom(answers: Answers, lang: Lang): Fn[] {
  const names = NAMES[lang];
  const entities = clean(answers.entities, "entities");
  const reports = clean(answers.reports, "reports");
  const integrations = clean(answers.integrations, "integrations");
  if (!entities.length) throw new InvalidAnswers({ entities: "required" });

  const list: [string, Kind, Complexity][] = [];
  for (const entity of entities) {
    const size = SIZE_TO_COMPLEXITY[entity.size ?? ""] ?? "average";
    list.push(
      [entity.name, "ILF", size],
      [names.create(entity.name), "EI", size],
      [names.edit(entity.name), "EI", size],
      [names.remove(entity.name), "EI", "low"],
      [names.view(entity.name), "EQ", size === "low" ? "low" : "average"],
    );
  }
  for (const report of reports) {
    const complexity = (["low", "average", "high"] as const).find((c) => c === report.complexity) ?? "average";
    list.push([report.name, "EO", complexity]);
  }
  for (const integration of integrations) list.push([names.connection(integration.name), "EIF", "average"]);
  if (answers.online_payments) list.push([names.provider, "EIF", "average"], [names.confirmation, "EI", "average"]);
  if ((Number(answers.roles) || 1) > 1) list.push([names.users, "ILF", "low"], [names.manageUsers, "EI", "low"], [names.login, "EQ", "low"]);
  if (answers.notifications) list.push([names.notifications, "EO", "average"]);
  return list.map(([name, kind, complexity]) => ({ name, kind, complexity, weight: WEIGHTS[kind][complexity] }));
}

export function characteristicsFrom(answers: Answers): Record<string, number> {
  const scale = SCALE[answers.scale ?? ""] ?? 3;
  return {
    ...WEB_APP_BASELINE,
    performance: scale,
    transaction_rate: scale,
    complex_processing: LOGIC[answers.logic ?? ""] ?? 3,
    multiple_sites: answers.multiple_locations ? 3 : 0,
    ...(answers.multilingual ? { facilitate_change: 4 } : {}),
  };
}

/** Banker's rounding, like Python's Decimal.quantize, so prices match Core's to the dollar. */
const roundHalfEven = (value: number) => {
  const floor = Math.floor(value);
  const diff = value - floor;
  if (Math.abs(diff - 0.5) < 1e-9) return floor % 2 === 0 ? floor : floor + 1;
  return Math.round(value);
};

/** Hours, duration and price from the counted points and the total degree of influence (0 to 70). */
export function size(unadjustedPoints: number, influence: number, calibration = CALIBRATION) {
  // VAF = 0.65 + 0.01 × the sum of the 14 characteristics, kept in hundredths.
  const factorHundredths = 65 + influence;
  const adjustedHundredths = unadjustedPoints * factorHundredths;
  const hours = Math.ceil((adjustedHundredths * calibration.hoursPerPoint) / 100);
  const price = hours * calibration.hourlyRate;
  return {
    unadjustedPoints,
    adjustmentFactor: factorHundredths / 100,
    adjustedPoints: adjustedHundredths / 100,
    hours,
    weeks: Math.ceil((hours * 10) / calibration.teamHoursPerWeek) / 10,
    hourlyRate: calibration.hourlyRate,
    price,
    priceLow: roundHalfEven(price * (1 - calibration.priceRange)),
    priceHigh: roundHalfEven(price * (1 + calibration.priceRange)),
  };
}

export function estimate(answers: Answers, lang: Lang, calibration = CALIBRATION): Estimate {
  const functions = functionsFrom(answers, lang);
  const points = functions.reduce((sum, f) => sum + f.weight, 0);
  const influence = Object.values(characteristicsFrom(answers)).reduce((sum, v) => sum + v, 0);
  return { functions, ...size(points, influence, calibration) };
}
