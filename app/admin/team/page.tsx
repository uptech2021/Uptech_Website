"use client";

import { FormEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminShell from "@/components/AdminShell";
import type { TeamMember } from "@/lib/team";

const empty = { name: "", position: "", category: "Leadership Team" };
const teams = ["Leadership Team", "Engineering Team", "Design & Creative Team", "Quality Assurance", "Operations Team"];

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/team", { cache: "no-store" });
    if (response.ok) setMembers((await response.json()).members);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  function startEdit(member: TeamMember) {
    setEditing(member);
    setForm({ name: member.name, position: member.position, category: member.category });
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent) {
    event.preventDefault(); setSaving(true); setError("");
    const response = await fetch(editing ? `/api/team/${editing.id}` : "/api/team", {
      method: editing ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
    });
    if (!response.ok) { setError((await response.json()).error || "Could not save this person."); setSaving(false); return; }
    setForm(empty); setEditing(null); setSaving(false); await load();
  }

  async function remove(member: TeamMember) {
    if (!window.confirm(`Remove ${member.name} from the About page?`)) return;
    const response = await fetch(`/api/team/${member.id}`, { method: "DELETE" });
    if (!response.ok) { setError("Could not remove this person."); return; }
    await load();
  }

  return <AdminShell><main className="max-w-[1100px] mx-auto px-5 py-8">
    <div><p className="text-xs font-extrabold uppercase text-brand-700">Public About page</p><h1 className="text-3xl mt-1">Team Management</h1><p className="text-ink-soft mt-2">Add, edit, or remove the people shown in the About page team section.</p></div>
    <form onSubmit={submit} className="mt-7 bg-white rounded-2xl border border-line p-6 grid md:grid-cols-2 gap-4">
      <h2 className="text-xl font-bold md:col-span-2">{editing ? `Edit ${editing.name}` : "Add a person"}</h2>
      <label className="grid gap-1 text-sm font-bold">Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Full name" /></label>
      <label className="grid gap-1 text-sm font-bold">Team<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">{teams.map((team) => <option key={team}>{team}</option>)}</select></label>
      <label className="grid gap-1 text-sm font-bold md:col-span-2">Position / title<input required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="input" placeholder="Job title" /></label>
      {error && <p className="text-red-600 text-sm md:col-span-2" role="alert">{error}</p>}
      <div className="md:col-span-2 flex gap-3"><button disabled={saving} className="rounded-full bg-brand text-white px-5 py-3 font-bold disabled:opacity-60"><Plus className="inline w-4 h-4 mr-2" />{saving ? "Saving…" : editing ? "Save changes" : "Add person"}</button>{editing && <button type="button" onClick={() => { setEditing(null); setForm(empty); }} className="rounded-full border border-line px-5 py-3 font-bold">Cancel</button>}</div>
    </form>
    <div className="mt-7 grid gap-3">{loading ? <p className="text-ink-soft">Loading team…</p> : members.map((member) => <article key={member.id} className="bg-white rounded-2xl border border-line p-4 flex items-center justify-between gap-4"><div><span className="text-xs uppercase font-bold text-brand-700">{member.category}</span><h2 className="text-lg font-bold">{member.name}</h2><p className="text-sm text-ink-soft">{member.position}</p></div><div className="flex gap-2 shrink-0"><button onClick={() => startEdit(member)} aria-label={`Edit ${member.name}`} className="p-3 rounded-full bg-brand/10 text-brand"><Pencil className="w-5 h-5" /></button><button onClick={() => remove(member)} aria-label={`Remove ${member.name}`} className="p-3 rounded-full bg-red-50 text-red-600"><Trash2 className="w-5 h-5" /></button></div></article>)}</div>
  </main></AdminShell>;
}
