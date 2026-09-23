import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

import { nav as NAV, site } from '../data/site';

/**
 * Header. Layout from Elementor template #13 (absolute, boxed 1720,
 * padding 32/20, columns 20/60/20); navigation from the Brandfirst Media
 * content document (Home, About, Services, Work, Insights, Contact).
 *
 * `variant="inner"` = template #7259: in-flow rather than absolute, since
 * inner pages sit on a light ground with no hero to overlay.
 * `variant="dark"` = template #6033, kept for any future dark-hero page.
 *
 * Lockup: the Brandfirst "B" mark (public/assets/brandfirst-logo-sm.png,
 * white background knocked out) beside the name in the hero face.
 *
 * Where the nav collapses behind the burger (≤ 1024 px) the header stays on
 * screen so another page is always one tap away. `is-stuck` marks that the
 * page has moved off the top: the transparent overlay header then needs a
 * ground of its own, or its white type would vanish over white sections.
 * The CSS applies it only at those widths; on desktop the header scrolls away.
 */
export default function Header({ variant = 'overlay' }) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    // Same-value updates don't re-render, so this only renders on crossing.
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header header--${variant}${stuck ? ' is-stuck' : ''}`}>
      <div className="header__inner">
        <div className="header__logo-col">
          <a className="header__logo" href="/" aria-label={`${site.name} home`}>
            <img className="header__mark" src="/assets/brandfirst-logo-sm.png" alt="" width="300" height="400" />
            <span className="header__wordmark">{site.name}</span>
          </a>
        </div>

        {/* data-lenis-prevent: on a short screen the open panel scrolls on its
            own, which Lenis would otherwise swallow as page scroll. */}
        <div className={`header__nav-col${open ? ' is-open' : ''}`} data-lenis-prevent>
          <nav>
            <ul className="nav">
              {NAV.map((item) => (
                <li key={item.label} className={`nav__item${item.children ? ' nav__item--has-children' : ''}`}>
                  {/* NavLink marks the current section with aria-current="page";
                      `end` keeps Home from matching every route. Brands stays
                      marked on its sub-pages. */}
                  <NavLink className="nav__link" to={item.href} end={item.href === '/'} onClick={() => setOpen(false)}>
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <ul className="nav__sub">
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <Link to={c.href} onClick={() => setOpen(false)}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="header__action-col">
          {/* "Purchase Now" in the demo — a ThemeForest marketing button, not site nav. */}
          <Link className="btn btn--primary" to="/contact">
            Start a Project
          </Link>
          <button
            className="header__burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
