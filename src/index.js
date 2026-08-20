export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/demo") {
      if (request.method !== "GET") {
        return Response.json(
          { ok: false, error: "Method not allowed" },
          {
            status: 405,
            headers: {
              Allow: "GET",
              "Cache-Control": "no-store",
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
        {
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
