import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FooterInner from './FooterInner';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

/** Shared chrome for every route: cursor, header, footer, smooth scroll.
 *  Stacked-card pinning is homepage-only, so it stays in <Home>. */
export default function SiteLayout() {
  useSmoothScroll();
  const { pathname } = useLocation();

  // The homepage header floats over the brand-blue hero (#13 + #1354).
  // Inner pages sit on a light ground and use the in-flow header (#7259)
  // and the CTA-led footer (#558).
  const isHome = pathname === '/';
  const variant = isHome ? 'overlay' : 'inner';

  return (
    <>
      <Header variant={variant} />
      <Outlet />
      {isHome ? <Footer /> : <FooterInner />}
      <WhatsAppFloat />
    </>
  );
}
