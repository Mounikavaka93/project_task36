import { products } from '../data/products'
import ProductGrid from './ProductGrid'
import SectionHeader from './SectionHeader'

export default function Featured() {
  const featured = products.filter((p) => p.featured)

  return (
    <section id="perfumes" className="section-pad bg-cream">
      <div className="site-wrap">
        <SectionHeader
          kicker="The collection"
          title="Featured Perfumes"
          copy="Four signature bottles — mineral, floral, smoked, and salt. Hover a card to preview."
        />
        <div className="mt-14">
          <ProductGrid products={featured} eagerCount={4} />
        </div>
      </div>
    </section>
  )
}
