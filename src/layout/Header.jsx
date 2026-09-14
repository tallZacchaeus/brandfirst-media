import { useState } from 'react';
import { Link } from 'react-router-dom';
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
 */
export default function Header({ variant = 'overlay' }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`header header--${variant}`}>
      <div className="header__inner">
        <div className="header__logo-col">
          <a className="header__logo" href="/" aria-label={`${site.name} home`}>
            <img className="header__mark" src="/assets/brandfirst-logo-sm.png" alt="" width="300" height="400" />
            <span className="header__wordmark">{site.name}</span>
          </a>
        </div>

        <div className={`header__nav-col${open ? ' is-open' : ''}`}>
          <nav>
            <ul className="nav">
              {NAV.map((item) => (
                <li key={item.label} className={`nav__item${item.children ? ' nav__item--has-children' : ''}`}>
                  <Link className="nav__link" to={item.href}>{item.label}</Link>
                  {item.children && (
                    <ul className="nav__sub">
                      {item.children.map((c) => (
                        <li key={c.label}><a href={c.href}>{c.label}</a></li>
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
