// ProductGrid.jsx — Specials / listing section

const ProductGrid = ({ title, subtitle, products, onAddToCart, wishlist, onToggleWishlist }) => (
  <section style={gridStyles.section}>
    <h2 style={gridStyles.title}>{title}</h2>
    {subtitle && <p style={gridStyles.subtitle}>{subtitle}</p>}
    <div style={gridStyles.grid}>
      {products.map(p => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  </section>
);

const gridStyles = {
  section: {
    padding: '64px 80px 80px',
    background: '#fff',
    fontFamily: "'Nunito', sans-serif",
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: '10px',
    fontFamily: "'Nunito', sans-serif",
  },
  subtitle: {
    fontSize: '14px',
    color: '#777',
    textAlign: 'center',
    marginBottom: '44px',
    lineHeight: 1.6,
  },
  grid: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
};

Object.assign(window, { ProductGrid });
