import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import SiteLayout from './layout/SiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/** Routes follow the navigation specified in the Brandfirst Media content
 *  document: Home, About, Services, Work, Insights, Contact.
 *  The Arolax demo's Team / Career / FAQ / Blog-single / Portfolio-detail
 *  pages are omitted — that document supplies no content for them. */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="brands" element={<Brands />} />
          <Route path="brands/:slug" element={<BrandDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
