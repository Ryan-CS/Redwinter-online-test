const ALLOWED_ORIGINS = new Set([
  "https://www.redwinter.online",
  "https://redwinter.online",
  "https://ryan-cs.github.io",
]);

function corsHeaders(request) {
  const origin = request.headers.get("Origin");
  const headers = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
    "Cache-Control": "no-store",
    "Vary": "Origin",
  };

  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(request),
      });
    }

    if (url.pathname === "/api/demo") {
      if (request.method !== "GET") {
        return Response.json(
          { ok: false, error: "Method not allowed" },
          {
            status: 405,
            headers: {
              ...corsHeaders(request),
              Allow: "GET, OPTIONS",
            },
          },
        );
      }

      return Response.json(
        {
          ok: true,
          service: "redwinter-online-test",
          message: "Hello from the RED Winter Cloudflare Worker API",
          timestamp: new Date().toISOString(),
        },
        { headers: corsHeaders(request) },
      );
    }

    return Response.json(
      { ok: false, error: "Not found" },
      { status: 404, headers: corsHeaders(request) },
    );
  },
};
