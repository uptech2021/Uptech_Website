import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { adminFirestore } from "@/lib/firebase-admin";
import { audit, requireRole } from "@/lib/server-auth";
import { cleanTeamMember, DEFAULT_TEAM, TeamMember } from "@/lib/team";

const ref = () => adminFirestore.collection("publicContent").doc("team");

export async function GET() {
  try {
    const snap = await ref().get();
    const stored = snap.data()?.members;
    const members: TeamMember[] = Array.isArray(stored) ? stored : DEFAULT_TEAM;
    return NextResponse.json({ members: [...members].sort((a, b) => a.order - b.order) });
  } catch { return NextResponse.json({ members: DEFAULT_TEAM }); }
}

export async function POST(request: Request) {
  const user = await requireRole(["super_admin"]);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const snap = await ref().get();
  const current: TeamMember[] = Array.isArray(snap.data()?.members) ? snap.data()!.members : DEFAULT_TEAM;
  const member = cleanTeamMember(body, current.length);
  if (!member) return NextResponse.json({ error: "Name, position and team are required." }, { status: 400 });
  const created = { id: randomUUID(), ...member, order: current.length };
  await ref().set({ members: [...current, created], updatedAt: new Date(), updatedBy: user.uid });
  await audit(user.uid, "team_member_created", "teamMember", created.id, created);
  return NextResponse.json({ member: created }, { status: 201 });
}
