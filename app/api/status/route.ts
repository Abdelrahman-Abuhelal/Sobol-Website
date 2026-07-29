export function GET() {
  return Response.json(
    { status: "ok", service: "sobol-public-api" },
    {
      headers: {
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
