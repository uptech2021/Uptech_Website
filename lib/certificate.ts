export interface CertificateRecord {
  name: string;
  reference: string;
  holdingLabel: string;
  holdingValue: string;
  updatedAt: string | null;
  startDate: string | null;
  effectiveDate: string | null;
  period: string | null;
  address: string | null;
  active: boolean;
}

function recordDate(value: unknown): string | null {
  const candidate = value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function" ? value.toDate() : value;
  if (!(typeof candidate === "string" || candidate instanceof Date)) return null;
  const date = new Date(candidate);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** Only administrator-owned profile fields may populate this document. */
export function certificateRecord(profile: Record<string, unknown>, referenceSuffix: string): CertificateRecord {
  const updatedAt = recordDate(profile.equityUpdatedAt);
  const unit = profile.equityUnit;
  const raw = profile.currentEquity;
  const value = typeof raw === "number" && Number.isFinite(raw) && raw >= 0 ? raw : null;
  const percentage = unit === "percentage";
  const shares = unit === "ordinary_shares";
  const valid = value !== null && (!percentage || value <= 100) && (!shares || Number.isSafeInteger(value));
  return {
    name: String(profile.legalName || profile.displayName || [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Name not recorded"),
    reference: `UNOFF-${updatedAt ? updatedAt.slice(0, 4) : "RECORD"}-${referenceSuffix}`,
    holdingLabel: shares ? "Current Recorded Holdings" : "Current Recorded Equity",
    holdingValue: valid ? new Intl.NumberFormat("en-US", {maximumFractionDigits: percentage ? 2 : 20, minimumFractionDigits: percentage ? 2 : 0}).format(value!) + (percentage ? "%" : shares ? " Ordinary Shares" : "") : "Not available",
    updatedAt,
    startDate: recordDate(profile.startDate),
    effectiveDate: recordDate(profile.equityEffectiveDate),
    period: typeof profile.equityPeriod === "string" ? profile.equityPeriod : null,
    address: profile.showAddressOnCertificate === true && typeof profile.address === "string" ? profile.address : null,
    active: profile.employmentStatus === "active" && profile.equityStatus !== "revoked" && profile.equityStatus !== "inactive" && profile.accountStatus !== "disabled" && valid,
  };
}
