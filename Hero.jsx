// Hero.jsx — Yhana's Hero Section

const Hero = ({ onOrder, onMenu }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
  {
    headline: <>Because every celebration<br />deserves a cake made<br />just for them</>,
    sub: "ANG CAKE NA HINDI NAKAKAUMAY — freshly baked and custom-designed for your occasion. Birthdays, weddings, debuts & more.",
    image: "https://yhanas.com/images/customized/floral/cake.jpg",
    tag: "Starting at ₱850"
  },
  {
    headline: <>Custom cakes crafted<br />with love in<br />Calauan, Laguna</>,
    sub: "Every Yhana's cake is freshly baked to order — your theme, your design, your moment. Ready in 2–3 days.",
    image: "https://yhanas.com/images/customized/floral/wedding.png",
    tag: "Floral · Themed · Number Cakes"
  },
  {
    headline: <>Yummy sweeties<br />delivered to your<br />dining table!</>,
    sub: "From our classic chiffon cakes to premium chocomoist — every bite is made with the finest ingredients and a whole lot of love.",
    image: "https://yhanas.com/images/menu/chocomoist.png",
    tag: "★★★★★ 5.0 · Loved by families in Laguna"
  }];


  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = slides[currentSlide];

  return (
    <div style={{ overflow: 'hidden' }}>
      <div style={{ ...heroStyles.hero, opacity: "1" }}>
        {/* Left content */}
        <div style={{ ...heroStyles.content, position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={heroStyles.tag}>{current.tag}</div>
          <h1 style={heroStyles.headline}>{current.headline}</h1>
          <p style={heroStyles.sub}>{current.sub}</p>
          <div style={heroStyles.actions}>
            <button
              style={heroStyles.btnOutline}
              onClick={onMenu}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, { background: '#e8432a', color: '#fff', borderColor: '#e8432a' })}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { background: '#fff', color: '#e8432a', borderColor: '#fff' })}>
              
              VIEW MENU
            </button>
            <button
              style={heroStyles.btnPrimary}
              onClick={onOrder}
              onMouseEnter={(e) => e.currentTarget.style.background = '#c93520'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#e8432a'}>
              
              ORDER NOW →
            </button>
          </div>
          <div style={heroStyles.social}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Message us on Facebook to place your order</span>
          </div>
          {/* Slide dots */}
          <div style={heroStyles.dots}>
            {slides.map((_, i) =>
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                ...heroStyles.dot,
                background: i === currentSlide ? '#e8432a' : '#ddd',
                width: i === currentSlide ? '24px' : '8px'
              }}
              aria-label={`Slide ${i + 1}`} />

            )}
          </div>
        </div>

        {/* Right: cake image removed — text centered */}
      </div>
    </div>);

};

const heroStyles = {
  hero: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '88px 80px 72px',
    minHeight: 'calc(100vh - 64px)',
    fontFamily: "'Nunito', sans-serif",
    gap: '40px'
  },
  content: { maxWidth: '640px', flex: '0 0 auto', position: 'relative', zIndex: 1, textAlign: 'center' },
  tag: {
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: '16px',
    background: '#e8432a',
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: '999px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.18)'
  },
  headline: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: 1.18,
    color: '#fff',
    letterSpacing: '-0.01em',
    marginBottom: '20px'
  },
  sub: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 1.75,
    marginBottom: '32px',
    maxWidth: '520px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  actions: { display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', justifyContent: 'center' },
  social: { display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '24px', justifyContent: 'center' },
  btnOutline: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em',
    textTransform: 'uppercase', borderRadius: '4px',
    padding: '11px 22px', cursor: 'pointer',
    background: '#fff', color: '#e8432a',
    border: '1.5px solid #fff', transition: 'all 0.16s',
    boxShadow: '0 2px 10px rgba(0,0,0,0.18)'
  },
  btnPrimary: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em',
    textTransform: 'uppercase', borderRadius: '4px',
    padding: '11px 22px', cursor: 'pointer',
    background: '#e8432a', color: '#fff',
    border: 'none', transition: 'background 0.16s'
  },
  dots: { display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center' },
  dot: { height: '8px', borderRadius: '9999px', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s' },
  imageWrap: {
    flex: '0 0 440px',
    height: '340px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '440px',
    height: '340px',
    objectFit: 'cover',
    borderRadius: '24px',
    boxShadow: '0 20px 56px rgba(0,0,0,0.18)',
    display: 'block',
    transition: 'opacity 0.3s'
  }
};

Object.assign(window, { Hero });