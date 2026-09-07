import { NextRequest, NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebase-admin";
import { requireRole } from "@/lib/server-auth";
import crypto from "crypto";
const allowed = new Set(["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation","image/jpeg","image/png","image/webp"]);
export async function POST(req: NextRequest) {
  const user = await requireRole(["super_admin"]); if (!user) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const data = await req.formData(); const files = data.getAll("files").filter((v): v is File => v instanceof File);
  if (!files.length || files.length > 30) return NextResponse.json({ message: "Choose between 1 and 30 files." }, { status: 400 });
  const urls = [];
  for (const file of files) {
    if (!allowed.has(file.type) || file.size > 15 * 1024 * 1024) return NextResponse.json({ message: `${file.name} is not an allowed file or exceeds 15 MB.` }, { status: 400 });
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "-"); const token = crypto.randomUUID(); const path = `public-resources/${Date.now()}-${token}-${safe}`;
    const target = adminStorage.bucket().file(path); await target.save(Buffer.from(await file.arrayBuffer()), { contentType: file.type, metadata: { metadata: { firebaseStorageDownloadTokens: token, uploadedBy: user.uid } } });
    const bucket = adminStorage.bucket().name; urls.push({ url: `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media&token=${token}`, name: file.name, type: file.type, size: file.size });
  }
  return NextResponse.json({ files: urls });
}
