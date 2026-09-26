import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export { PUBLIC_PATHS } from './seo/pages';
export { SITE_URL } from './seo/config';

/** Build-time render of one URL (scripts/prerender.mjs): the page markup plus
 *  the head tags Seo.jsx set for it. Same tree as main.jsx, with the router
 *  swapped for one that takes the URL as given. */
export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
  const { helmet } = helmetContext;
  const head = [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script]
    .map((part) => part.toString())
    .filter(Boolean)
    .join('\n    ');
  return { html, head };
}
