import { lazy, Suspense } from 'react'
import HeroSection from '../components/home/HeroSection'
import { asset } from '../lib/assets'
import { PRODUCTS } from '../data/products'

const PerfumeHeroStory     = lazy(() => import('../components/story/PerfumeHeroStory'))
const SplitPanelScene      = lazy(() => import('../components/story/SplitPanelScene'))
const TrustStrip           = lazy(() => import('../components/home/TrustStrip'))
const MoodCategories       = lazy(() => import('../components/home/MoodCategories'))
const BestsellerGrid       = lazy(() => import('../components/home/BestsellerGrid'))
const HorizontalProductScroll = lazy(() => import('../components/home/HorizontalProductScroll'))
const EditorialStatement   = lazy(() => import('../components/home/EditorialStatement'))
const WhyShopWithUs        = lazy(() => import('../components/home/WhyShopWithUs'))
const GiftSection          = lazy(() => import('../components/home/GiftSection'))
const Testimonials         = lazy(() => import('../components/home/Testimonials'))
const ScentFinderSection   = lazy(() => import('../components/home/ScentFinderSection'))
const NewsletterSection    = lazy(() => import('../components/home/NewsletterSection'))

const Placeholder = () => <div className="h-32" />

const newArrivals = PRODUCTS.filter((p) => p.is_new_arrival)
const featured = PRODUCTS.filter((p) => p.is_bestseller || p.rating >= 4.8).slice(0, 12)

export default function Home() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<Placeholder />}>
        <PerfumeHeroStory />
        <TrustStrip />
        <MoodCategories />
        <BestsellerGrid />
        <HorizontalProductScroll products={newArrivals} title="New Arrivals" label="Just In" />
        <EditorialStatement />
        <HorizontalProductScroll products={featured} title="The Edit" label="Curated For You" />
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
      </Suspense>
    </>
  )
}
