import HeroSection from '../components/home/HeroSection'
import PerfumeHeroStory from '../components/story/PerfumeHeroStory'
import SplitPanelScene from '../components/story/SplitPanelScene'
import { asset } from '../lib/assets'
import TrustStrip from '../components/home/TrustStrip'
import MoodCategories from '../components/home/MoodCategories'
import BestsellerGrid from '../components/home/BestsellerGrid'
import HorizontalProductScroll from '../components/home/HorizontalProductScroll'
import EditorialStatement from '../components/home/EditorialStatement'
import WhyShopWithUs from '../components/home/WhyShopWithUs'
import GiftSection from '../components/home/GiftSection'
import Testimonials from '../components/home/Testimonials'
import ScentFinderSection from '../components/home/ScentFinderSection'
import NewsletterSection from '../components/home/NewsletterSection'
import { PRODUCTS } from '../data/products'

const newArrivals = PRODUCTS.filter((p) => p.is_new_arrival)
const featured = PRODUCTS.filter((p) => p.is_bestseller || p.rating >= 4.8).slice(0, 12)

export default function Home() {
  return (
    <>
      <HeroSection />
      <PerfumeHeroStory />
      <TrustStrip />
      <MoodCategories />
      <BestsellerGrid />
      <HorizontalProductScroll
        products={newArrivals}
        title="New Arrivals"
        label="Just In"
      />
      <EditorialStatement />
      <HorizontalProductScroll
        products={featured}
        title="The Edit"
        label="Curated For You"
      />
      <SplitPanelScene
        image={asset('/products/elyssia-scarlet.jpg')}
        imageAlt="Elyssia Scarlet"
        label="Featured Fragrance"
        title="Elyssia Scarlet"
        lines={[
          'A magnetic evening fragrance built around Turkish rose and dark berries.',
          'It opens bright, settles into a velvet heart, and stays with you — softly, insistently.',
          'For the version of you that arrives late and is still the one remembered.',
        ]}
        cta={{ to: '/product/elyssia-scarlet', text: 'Discover Elyssia Scarlet' }}
      />
      <ScentFinderSection />
      <WhyShopWithUs />
      <GiftSection />
      <Testimonials />
      <NewsletterSection />
    </>
  )
}
