import { useStackedPin } from '../hooks/useStackedPin';
import Hero from '../sections/Hero';
import StatsIntro from '../sections/StatsIntro';
import BrandsStrip from '../sections/BrandsStrip';
import Services from '../sections/Services';
import ProcessSteps from '../sections/ProcessSteps';
import Testimonials from '../sections/Testimonials';
import CTAFooter from '../sections/CTAFooter';

// Team is omitted: the Brandfirst content document has no team content.
//
// Only the hero pins: it holds while the page rises over it, the one stacked
// transition that earns its motion. The demo pinned all six sections above the
// CTA, which made every boundary a held beat — including Services, a list two
// to three screens tall. The rest still overlap under rounded tops, so the
// stack reads; they simply scroll. Indexes are positions in `main`.
const PINS = { 0: 0 };

/* SelectedWork and Journal are omitted: both rendered placeholder cards
   labelled "in preparation". They return when there is real work to show.
   ShowcaseImage is gone entirely: it was the Arolax demo's decorative divider
   image, carrying nothing of this business. Real production photography now
   lives in the hero and on the brand pages instead. */

/** Home. Started from Elementor page #9322 ("Home", Branding Agency demo) and
 *  still follows its section order, less the demo sections that carried no
 *  Brandfirst content, plus BrandsStrip. */
export default function Home() {
  useStackedPin('main > section', PINS);
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
