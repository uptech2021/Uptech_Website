import type { NextRequest } from "next/server";

function firstHeaderValue(value: string | null) {
  return value?.split(",", 1)[0]?.trim() || "";
}

/** Returns the public origin used for this request, including reverse-proxy headers. */
export function requestOrigin(request: NextRequest) {
  const forwardedHost = firstHeaderValue(request.headers.get("x-forwarded-host"));
  const host = forwardedHost || firstHeaderValue(request.headers.get("host"));
  const forwardedProtocol = firstHeaderValue(request.headers.get("x-forwarded-proto"));
  const protocol = forwardedProtocol === "http" || forwardedProtocol === "https"
    ? forwardedProtocol
    : request.nextUrl.protocol.replace(":", "");

  if (host) {
    try {
      return new URL(`${protocol}://${host}`).origin;
    } catch {
      // Fall through to the URL Next.js parsed for this request.
    }
  }

  return request.nextUrl.origin;
}
