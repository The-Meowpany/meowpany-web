// Where the site's forms deliver what visitors send. The forms only know the LeadSink contract;
// the adapter is chosen from src/site.ts, so changing provider never touches a form.

export type LeadKind = "quote" | "prototype" | "estimate" | "audit" | "call";

export type Lead = {
  kind: LeadKind;
  language: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  /** Extra answers, shown as "label: value" lines in the message the team receives. */
  details?: Record<string, string | number | boolean | undefined>;
};

/** "sent": the team has it. "drafted": the visitor's email app opened with it, ready to send. */
export type Delivery = "sent" | "drafted";

export interface LeadSink {
  send(lead: Lead): Promise<Delivery>;
}

const SUBJECTS: Record<LeadKind, string> = {
  quote: "Quote request",
  prototype: "First working version request",
  estimate: "Project estimate",
  audit: "Website audit",
  call: "Call request",
};

export const subjectOf = (lead: Lead) =>
  `${SUBJECTS[lead.kind]} · ${lead.company?.trim() || lead.name.trim() || lead.email}`;

/** Plain-text body shared by every adapter, so the team reads the same thing whatever the channel. */
export function bodyOf(lead: Lead): string {
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company && `Company: ${lead.company}`,
    lead.phone && `Phone: ${lead.phone}`,
    `Language: ${lead.language}`,
    ...Object.entries(lead.details ?? {})
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([label, value]) => `${label}: ${value}`),
  ].filter(Boolean);
  return lead.message?.trim() ? `${lines.join("\n")}\n\n${lead.message.trim()}` : lines.join("\n");
}

/** Sends the lead to the company inbox through Web3Forms, which accepts requests from browsers. */
export class Web3FormsSink implements LeadSink {
  readonly accessKey: string;
  readonly endpoint: string;

  constructor(accessKey: string, endpoint = "https://api.web3forms.com/submit") {
    this.accessKey = accessKey;
    this.endpoint = endpoint;
  }

  async send(lead: Lead): Promise<Delivery> {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: this.accessKey,
        subject: subjectOf(lead),
        from_name: "The Meowpany website",
        name: lead.name,
        email: lead.email,
        message: bodyOf(lead),
        botcheck: false,
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.success) throw new Error(result.message ?? `HTTP ${response.status}`);
    return "sent";
  }
}

/** Opens the visitor's email app with the request written out. Needs no service at all. */
export class MailtoSink implements LeadSink {
  readonly address: string;
  readonly open: (url: string) => void;

  constructor(address: string, open = (url: string) => window.location.assign(url)) {
    this.address = address;
    this.open = open;
  }

  url(lead: Lead): string {
    const query = `subject=${encodeURIComponent(subjectOf(lead))}&body=${encodeURIComponent(bodyOf(lead))}`;
    return `mailto:${this.address}?${query}`;
  }

  async send(lead: Lead): Promise<Delivery> {
    this.open(this.url(lead));
    return "drafted";
  }
}

/** Web3Forms when it is configured, falling back to email if it is missing or fails. */
export class FallbackSink implements LeadSink {
  readonly primary: LeadSink | null;
  readonly fallback: LeadSink;

  constructor(primary: LeadSink | null, fallback: LeadSink) {
    this.primary = primary;
    this.fallback = fallback;
  }

  async send(lead: Lead): Promise<Delivery> {
    if (this.primary) {
      try {
        return await this.primary.send(lead);
      } catch {
        // The visitor still gets their request out, through their own email app.
      }
    }
    return this.fallback.send(lead);
  }
}

export function leadSink(config: { web3formsKey: string; email: string }): LeadSink {
  return new FallbackSink(config.web3formsKey ? new Web3FormsSink(config.web3formsKey) : null, new MailtoSink(config.email));
}

/** Bots fill every field, people never see this one. */
export const isBot = (form: HTMLFormElement) =>
  Boolean((form.elements.namedItem("website") as HTMLInputElement | null)?.value);

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
