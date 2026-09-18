export async function readApiJson<T extends Record<string, unknown>>(response: Response): Promise<T> {
  const contentType=response.headers.get("content-type")||"";
  if(!contentType.toLowerCase().includes("application/json")){
    // Hosting platforms commonly return an HTML error page for a missing or
    // crashed API route. Do not pass that markup to JSON.parse.
    await response.text().catch(()=>"");
    throw new Error(response.status===404
      ? "The server API is not available on this deployment. Please redeploy the complete Next.js application."
      : "The server returned an unexpected page instead of an API response. Please try again or check the live deployment logs.");
  }
  try{return await response.json() as T}
  catch{throw new Error("The server returned an invalid API response. Please try again.")}
}
