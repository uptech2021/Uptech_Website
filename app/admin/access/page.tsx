"use client";

import AdminShell from "@/components/AdminShell";
import { useEffect, useState } from "react";
import { ShieldCheck, UserRound, X } from "lucide-react";

type StaffMember = { id: string; firstName: string; lastName: string; email: string; employeeId: string; role: "staff" | "hr" };

export default function Page() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState("");
  const [selected, setSelected] = useState<StaffMember | null>(null);

  async function load() {
    const response = await fetch("/api/staff", { cache: "no-store" });
    if (response.ok) setStaff((await response.json()).staff);
  }

  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selected]);

  async function updateAccess() {
    if (!selected) return;
    const member = selected;
    const granting = member.role !== "hr";
    setBusy(member.id);
    setMessage("");
    const controller = new AbortController();
    // A cold development build can take longer while Next.js compiles this API route.
    const timeout = window.setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetch(`/api/staff/${member.id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: granting ? "hr" : "staff" }),
        signal: controller.signal,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "Access could not be updated.");
      setSelected(null);
      setMessage(`${member.firstName} ${member.lastName} ${granting ? "now has" : "no longer has"} HR access.`);
      await load();
    } catch (error) {
      setMessage(error instanceof DOMException && error.name === "AbortError"
        ? "The update took too long. Please try again."
        : error instanceof Error ? error.message : "Access could not be updated.");
    } finally {
      window.clearTimeout(timeout);
      setBusy("");
      setSelected(null);
    }
  }

  const shown = staff.filter((member) => `${member.firstName} ${member.lastName} ${member.email} ${member.employeeId}`.toLowerCase().includes(query.toLowerCase()));
  const granting = selected?.role !== "hr";

  return <AdminShell>
    <main className="max-w-[1000px] mx-auto px-4 sm:px-7 py-8">
      <p className="text-xs uppercase tracking-wider font-extrabold text-brand-700">Permissions</p>
      <h1 className="text-3xl mt-1">HR Access</h1>
      <p className="text-ink-soft mt-2">Choose which members can manage members, requests, leave, policies, documents, and announcements. This does not grant super-admin or equity permissions.</p>
      {message && <p className="mt-5 bg-white border border-line rounded-2xl p-4">{message}</p>}
      <label className="block mt-6 text-sm font-bold max-w-lg">Search members
        <input className="input" placeholder="Name, email, or member ID" value={query} onChange={(event) => setQuery(event.target.value)} />
      </label>
      <div className="grid md:grid-cols-2 gap-4 mt-5">{shown.map((member) => <article key={member.id} className="bg-white border border-line rounded-card shadow-card p-5">
        <div className="flex items-start gap-3">
          <span className={`w-11 h-11 grid place-items-center rounded-2xl ${member.role === "hr" ? "bg-brand text-white" : "bg-mist text-brand"}`}>{member.role === "hr" ? <ShieldCheck /> : <UserRound />}</span>
          <div className="min-w-0 flex-1"><h2 className="text-lg">{member.firstName} {member.lastName}</h2><p className="text-sm text-ink-soft break-all">{member.email}</p><p className="text-xs font-bold text-brand-700 mt-1">{member.employeeId}</p></div>
        </div>
        <div className="mt-5 pt-4 border-t border-line flex items-center justify-between gap-3">
          <span className="text-sm font-bold">{member.role === "hr" ? "HR manager" : "Regular member"}</span>
          <button onClick={() => setSelected(member)} className={member.role === "hr" ? "pill text-red-600" : "btn"}>{member.role === "hr" ? "Remove HR access" : "Grant HR access"}</button>
        </div>
      </article>)}</div>
    </main>

    {selected && <div className="fixed inset-0 z-[100] grid place-items-center bg-[#071735]/65 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
      <section className="relative w-full max-w-md rounded-[24px] bg-white p-7 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="access-dialog-title">
        <button className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full hover:bg-mist" onClick={() => setSelected(null)} aria-label="Close dialog"><X size={21} /></button>
        <span className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${granting ? "bg-mist text-brand" : "bg-red-50 text-red-600"}`}><ShieldCheck /></span>
        <h2 id="access-dialog-title" className="pr-10 text-2xl">{granting ? "Grant HR access?" : "Remove HR access?"}</h2>
        <p className="mt-3 text-ink-soft">{granting
          ? `${selected.firstName} ${selected.lastName} will be able to manage members, requests, leave, policies, documents, and announcements.`
          : `${selected.firstName} ${selected.lastName} will lose access to all HR management tools.`}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button className="pill" onClick={() => setSelected(null)} disabled={Boolean(busy)}>Cancel</button>
          <button className={granting ? "btn" : "btn bg-red-600 hover:bg-red-700"} onClick={updateAccess} disabled={Boolean(busy)} autoFocus>{busy ? "Updating…" : granting ? "Grant HR access" : "Remove HR access"}</button>
        </div>
      </section>
    </div>}
  </AdminShell>;
}
