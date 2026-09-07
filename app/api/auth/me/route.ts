import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/server-auth";
export async function GET() { const user = await getSessionUser(); return user ? NextResponse.json(user) : NextResponse.json({ message: "Unauthorized" }, { status: 401 }); }
