import HeroSection from '../components/home/HeroSection'
import TrustStrip from '../components/home/TrustStrip'
import MoodCategories from '../components/home/MoodCategories'
import BestsellerGrid from '../components/home/BestsellerGrid'
import EditorialStatement from '../components/home/EditorialStatement'
import WhyShopWithUs from '../components/home/WhyShopWithUs'
import GiftSection from '../components/home/GiftSection'
import Testimonials from '../components/home/Testimonials'
import ScentFinderSection from '../components/home/ScentFinderSection'
import NewsletterSection from '../components/home/NewsletterSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <MoodCategories />
      <BestsellerGrid />
      <EditorialStatement />
      <ScentFinderSection />
      <WhyShopWithUs />
      <GiftSection />
      <Testimonials />
      <NewsletterSection />
    </>
  )
}
