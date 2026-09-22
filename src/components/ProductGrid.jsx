import ProductCard from './ProductCard'

export default function ProductGrid({ products, eagerCount = 0 }) {
  return (
    <div className="product-grid">
      {products.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          delay={i * 80}
          priority={i < eagerCount}
          index={i}
        />
      ))}
    </div>
  )
}
