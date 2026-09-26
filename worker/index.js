/**
 * The site is static files. This Worker runs only for the paths listed in
 * wrangler.jsonc `assets.run_worker_first`; every other request goes straight
 * to the files without invoking it.
 *
 * Search engine verification files (public/google*.html) must answer at their
 * exact .html URL with a 200: Search Console does not follow redirects, and the
 * asset server's html_handling redirects /file.html to /file. So the Worker
 * asks for the extensionless path, which the asset server resolves to the
 * same file, and returns that response at the URL Google requested.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (/^\/google[0-9a-f]+\.html$/.test(url.pathname)) {
      url.pathname = url.pathname.slice(0, -'.html'.length);
      const file = await env.ASSETS.fetch(new Request(url, request));
      return new Response(file.body, { status: file.status, headers: file.headers });
    }
    return env.ASSETS.fetch(request);
  },
};
