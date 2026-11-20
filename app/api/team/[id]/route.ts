import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { audit, requireRole } from "@/lib/server-auth";
import { cleanTeamMember, DEFAULT_TEAM, TeamMember } from "@/lib/team";

const ref = () => adminFirestore.collection("publicContent").doc("team");
async function getMembers() { const snap = await ref().get(); return (Array.isArray(snap.data()?.members) ? snap.data()!.members : DEFAULT_TEAM) as TeamMember[]; }

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(["super_admin"]);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const current = await getMembers();
  const index = current.findIndex((member) => member.id === id);
  if (index < 0) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
  const cleaned = cleanTeamMember(await request.json().catch(() => null), current[index].order);
  if (!cleaned) return NextResponse.json({ error: "Name, position and team are required." }, { status: 400 });
  const updated = { id, ...cleaned };
  const members = [...current]; members[index] = updated;
  await ref().set({ members, updatedAt: new Date(), updatedBy: user.uid });
  await audit(user.uid, "team_member_updated", "teamMember", id, updated);
  return NextResponse.json({ member: updated });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await requireRole(["super_admin"]);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const current = await getMembers();
  if (!current.some((member) => member.id === id)) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
  const members = current.filter((member) => member.id !== id).map((member, order) => ({ ...member, order }));
  await ref().set({ members, updatedAt: new Date(), updatedBy: user.uid });
  await audit(user.uid, "team_member_deleted", "teamMember", id);
  return NextResponse.json({ success: true });
}
