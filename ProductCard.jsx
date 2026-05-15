// ProductCard.jsx — Yhana's Product Card with Modal Preview

const FALLBACKS = [
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80&auto=format&fit=crop',
];

// ─── Product Modal ────────────────────────────────────────────────────────────
const ProductModal = ({ product, onClose, onAddToCart, wishlist, onToggleWishlist }) => {
  const [imgSrc, setImgSrc] = React.useState(product.image);
  const isWishlisted = wishlist && wishlist.includes(product.id);

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return `₱${price.toLocaleString()}`;
  };

  // Close on Escape
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Prevent body scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        animation: 'modalBgIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'modalIn 0.25s cubic-bezier(.22,1,.36,1)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: '#fff', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '20px', color: '#555',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
        >
          ×
        </button>

        {/* Image */}
        <div style={{ background: '#fef6ee', height: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <img
            src={imgSrc}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '24px' }}
            onError={() => setImgSrc(FALLBACKS[product.id % FALLBACKS.length])}
          />
          {product.badge && (
            <div style={{ position: 'absolute', top: '16px', left: '16px', background: '#e8432a', color: '#fff', fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '4px' }}>
              {product.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px', fontFamily: "'Nunito', sans-serif" }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.25, flex: 1, paddingRight: '16px' }}>{product.name}</h2>
            <button
              onClick={() => onToggleWishlist(product.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24"
                fill={isWishlisted ? '#e8432a' : 'none'}
                stroke="#e8432a" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {product.description && (
            <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '16px' }}>{product.description}</p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#e8432a' }}>{formatPrice(product.price)}</div>
              {product.note && <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>{product.note}</div>}
            </div>
            <button
              style={{
                background: '#e8432a', color: '#fff', border: 'none',
                borderRadius: '4px', padding: '13px 32px',
                fontSize: '11px', fontWeight: 800, letterSpacing: '0.12em',
                textTransform: 'uppercase', cursor: 'pointer',
                transition: 'background 0.15s',
                fontFamily: "'Nunito', sans-serif",
              }}
              onClick={() => { onAddToCart(product); onClose(); }}
              onMouseEnter={e => e.currentTarget.style.background = '#c93520'}
              onMouseLeave={e => e.currentTarget.style.background = '#e8432a'}
            >
              ORDER THIS →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart, wishlist, onToggleWishlist }) => {
  const [hovered, setHovered] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState(product.image);
  const [showModal, setShowModal] = React.useState(false);
  const isWishlisted = wishlist && wishlist.includes(product.id);

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return `₱${price.toLocaleString()}`;
  };

  return (
    <>
      <div
        className="card-tilt"
        style={{
          ...cardStyles.card,
          boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.14)' : '0 2px 12px rgba(0,0,0,0.08)',
          transform: hovered ? 'translateY(-4px)' : 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* Image */}
        <div style={cardStyles.imgWrap}>
          <img
            src={imgSrc}
            alt={product.name}
            style={cardStyles.img}
            onError={() => setImgSrc(FALLBACKS[product.id % FALLBACKS.length])}
          />
          {product.badge && (
            <div style={cardStyles.badge}>{product.badge}</div>
          )}
          {onToggleWishlist && (
            <button
              style={cardStyles.heartBtn}
              onClick={e => { e.stopPropagation(); onToggleWishlist(product.id); }}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24"
                fill={isWishlisted ? '#e8432a' : 'none'}
                stroke="#e8432a" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div style={cardStyles.body}>
          <div style={cardStyles.name}>{product.name}</div>
          {product.description && (
            <div style={cardStyles.desc}>{product.description}</div>
          )}
          <div style={cardStyles.priceRow}>
            <div style={cardStyles.price}>{formatPrice(product.price)}</div>
            {product.note && <div style={cardStyles.note}>{product.note}</div>}
          </div>
          <button
            style={{ ...cardStyles.btn, background: hovered ? '#c93520' : '#e8432a' }}
            onClick={e => { e.stopPropagation(); onAddToCart(product); }}
          >
            ORDER THIS
          </button>
        </div>
      </div>

      {showModal && ReactDOM.createPortal(
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
          onAddToCart={onAddToCart}
          wishlist={wishlist}
          onToggleWishlist={onToggleWishlist}
        />,
        document.body
      )}
    </>
  );
};

const cardStyles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    width: '320px',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s, transform 0.2s',
    fontFamily: "'Nunito', sans-serif",
    flexShrink: 0,
  },
  imgWrap: {
    height: '260px',
    overflow: 'hidden',
    position: 'relative',
    background: '#fef6ee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '12px',
    display: 'block',
  },
  badge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#e8432a',
    color: '#fff',
    fontSize: '9px',
    fontWeight: 800,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '3px',
  },
  heartBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 1px 6px rgba(0,0,0,0.14)',
    padding: 0,
  },
  body: {
    padding: '14px 16px 18px',
    textAlign: 'center',
  },
  name: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: '4px',
    lineHeight: 1.35,
  },
  desc: {
    fontSize: '12px',
    color: '#888',
    marginBottom: '8px',
    lineHeight: 1.5,
  },
  priceRow: { marginBottom: '12px' },
  price: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#e8432a',
    lineHeight: 1.2,
  },
  note: { fontSize: '11px', color: '#aaa', marginTop: '2px' },
  btn: {
    display: 'block',
    width: '100%',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontFamily: "'Nunito', sans-serif",
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '10px 0',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
};

Object.assign(window, { ProductCard, ProductModal });
