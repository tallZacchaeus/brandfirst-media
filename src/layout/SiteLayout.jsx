import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FooterInner from './FooterInner';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ScrollManager from '../components/ScrollManager';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { brands } from '../data/site';

/** Shared chrome for every route: cursor, header, footer, smooth scroll.
 *  Stacked-card pinning is homepage-only, so it stays in <Home>. */
export default function SiteLayout() {
  useSmoothScroll();
  const { pathname } = useLocation();

  // Every page with a blue hero gets the transparent header floating over it:
  // the homepage and each inner page that opens with <PageHero>. The list is
  // explicit on purpose — the 404 page (and a brand URL with an unknown slug,
  // which renders it) sits on white, where the white overlay nav would vanish,
  // so anything not named here keeps the in-flow header.
  const isHome = pathname === '/';
  const path = pathname.replace(/\/+$/, '') || '/';
  const hasHero =
    isHome ||
    ['/about', '/services', '/work', '/brands', '/contact'].includes(path) ||
    brands.some((b) => path === `/brands/${b.slug}`);
  const variant = hasHero ? 'overlay' : 'inner';

  return (
    <>
      <ScrollManager />
      <Header variant={variant} />
      <Outlet />
      {isHome ? <Footer /> : <FooterInner />}
      {/* Contact already offers WhatsApp in its hero and beside the submit
          button; the float there would only sit over the form's actions on a
          phone. */}
      {path !== '/contact' && <WhatsAppFloat />}
    </>
  );
}
