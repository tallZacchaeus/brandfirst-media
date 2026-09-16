import { useStackedPin } from '../hooks/useStackedPin';
import Hero from '../sections/Hero';
import StatsIntro from '../sections/StatsIntro';
import BrandsStrip from '../sections/BrandsStrip';
import Services from '../sections/Services';
import ProcessSteps from '../sections/ProcessSteps';
import Testimonials from '../sections/Testimonials';
import CTAFooter from '../sections/CTAFooter';

// Team is omitted: the Brandfirst content document has no team content.
// Offsets are by position in `main`, so they move when a section is added or
// removed above the one they target. The demo pins its intro and services
// sections at "bottom bottom-=150" and the rest at "bottom bottom"; here those
// are StatsIntro (1) and Services (3).
const PIN_OFFSETS = { 1: 150, 3: 150 };

/* SelectedWork and Journal are omitted: both rendered placeholder cards
   labelled "in preparation". They return when there is real work to show.
   ShowcaseImage is gone entirely: it was the Arolax demo's decorative divider
   image, carrying nothing of this business. Real production photography now
   lives in the hero and on the brand pages instead. */

/** Home. Started from Elementor page #9322 ("Home", Branding Agency demo) and
 *  still follows its section order, less the demo sections that carried no
 *  Brandfirst content, plus BrandsStrip. */
export default function Home() {
  useStackedPin('main > section', PIN_OFFSETS);
  return (
    <main>
      <Hero />
      <StatsIntro />
      <BrandsStrip />
      <Services />
      <ProcessSteps />
      <Testimonials />
      <CTAFooter />
    </main>
  );
}
