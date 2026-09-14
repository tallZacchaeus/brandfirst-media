import { useStackedPin } from '../hooks/useStackedPin';
import Hero from '../sections/Hero';
import StatsIntro from '../sections/StatsIntro';
import Services from '../sections/Services';
import ProcessSteps from '../sections/ProcessSteps';
import ShowcaseImage from '../sections/ShowcaseImage';
import Testimonials from '../sections/Testimonials';
import CTAFooter from '../sections/CTAFooter';

// Team is omitted: the Brandfirst content document has no team content.
// Sections 2 and 3 pin at "bottom bottom-=150" in the demo; the rest at "bottom bottom".
const PIN_OFFSETS = { 1: 150, 2: 150 };

/* SelectedWork and Journal are omitted: both rendered placeholder cards
   labelled "in preparation". They return when there is real work to show. */

/** Elementor page #9322 ("Home", Branding Agency demo).
 *  Section order mirrors the Elementor top-level container order exactly. */
export default function Home() {
  useStackedPin('main > section', PIN_OFFSETS);
  return (
    <main>
      <Hero />
      <StatsIntro />
      <Services />
      <ProcessSteps />
      <ShowcaseImage />
      <Testimonials />
      <CTAFooter />
    </main>
  );
}
