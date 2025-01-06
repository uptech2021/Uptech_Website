import { adminAuth } from "@/firebase/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    console.log("Decoding Token", decodedToken);

    // Check for the isAdmin custom claim
    const isAdmin = decodedToken.email === process.env.ADMIN_EMAIL;

    return NextResponse.json({ isValid: true, isAdmin });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ isValid: false }, { status: 401 });
  }
}
