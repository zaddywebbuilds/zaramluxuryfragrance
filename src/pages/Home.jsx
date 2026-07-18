import HeroSection from '../components/home/HeroSection'
import HeroShowcase from '../components/home/HeroShowcase'
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
      <HeroShowcase />
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
      <ScentFinderSection />
      <WhyShopWithUs />
      <GiftSection />
      <Testimonials />
      <NewsletterSection />
    </>
  )
}
