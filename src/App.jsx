import { Routes, Route } from 'react-router-dom';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import SiteLayout from './layout/SiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/** Routes follow the navigation specified in the Brandfirst Media content
 *  document: Home, About, Services, Work, Insights, Contact.
 *  The Arolax demo's Team / Career / FAQ / Blog-single / Portfolio-detail
 *  pages are omitted — that document supplies no content for them. Insights
 *  stays unrouted until its articles exist (see site.js).
 *
 *  No router here: the browser wraps this in BrowserRouter (main.jsx) and the
 *  build-time prerender in StaticRouter (entry-server.jsx). Every public path
 *  is listed in seo/pages.js, which the prerender and sitemap read. */
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="work" element={<Work />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:slug" element={<BrandDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
