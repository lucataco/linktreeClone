export const dynamic = "force-static";

export function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      service: "lucataco-links",
      version: "1.0.0",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=60",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}
