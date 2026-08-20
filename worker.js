export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/demo') {
      return Response.json({
        ok: true,
        service: 'redwinter-online-demo',
        message: 'Hello from the Cloudflare Worker demo API',
        timestamp: new Date().toISOString(),
      }, {
        headers: {
          'Cache-Control': 'no-store',
        },
      });
    }

    // When deployed with Workers Static Assets, serve the site from the assets binding.
    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('RED Winter placeholder Worker is running. Configure static assets to serve index.html.', {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  },
};
