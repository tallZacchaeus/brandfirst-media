import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Production pages arrive prerendered (scripts/prerender.mjs), so React
// adopts the markup already on screen instead of rebuilding it: the first
// paint needs no JavaScript and the hero's CSS entrance is not restarted.
// The dev server sends the template's placeholder comment and nothing else, so
// it renders from scratch (hence an element check, not hasChildNodes).
const root = document.getElementById('root');
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
