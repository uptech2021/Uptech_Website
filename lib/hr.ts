export function serializeDoc(doc: FirebaseFirestore.DocumentSnapshot) {
  const data = doc.data() || {};
  const clean: Record<string, unknown> = { id: doc.id };
  for (const [key,value] of Object.entries(data)) clean[key] = value && typeof (value as {toDate?:unknown}).toDate === "function" ? (value as FirebaseFirestore.Timestamp).toDate().toISOString() : value;
  return clean;
}
export function text(value: unknown, max = 5000) { return String(value || "").trim().slice(0,max); }
export function daysInclusive(start: string,end: string) { const a=Date.parse(`${start}T00:00:00Z`),b=Date.parse(`${end}T00:00:00Z`); return Number.isFinite(a)&&Number.isFinite(b)&&b>=a?Math.floor((b-a)/86400000)+1:0; }
