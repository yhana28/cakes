// Footer.jsx — Cake Shop Footer

const Footer = ({ onNavigate }) => (
  <footer style={footerStyles.footer}>
    <div style={footerStyles.inner}>
      <div style={footerStyles.brand}>
        <div style={footerStyles.logo}>Cake shop</div>
        <p style={footerStyles.tagline}>Yummy sweeties delivered<br />to your dining table.</p>
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.colTitle}>Shop</div>
        {['Cupcake', 'Recipes', 'Order online'].map(l => (
          <a key={l} href="#" style={footerStyles.link} onClick={e => { e.preventDefault(); onNavigate(l); }}>{l}</a>
        ))}
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.colTitle}>Company</div>
        {['Blog', 'Contact us', 'My Account'].map(l => (
          <a key={l} href="#" style={footerStyles.link} onClick={e => { e.preventDefault(); onNavigate(l); }}>{l}</a>
        ))}
      </div>
      <div style={footerStyles.col}>
        <div style={footerStyles.colTitle}>Follow Us</div>
        <a href="#" style={footerStyles.link}>Instagram</a>
        <a href="#" style={footerStyles.link}>Facebook</a>
        <a href="#" style={footerStyles.link}>Pinterest</a>
      </div>
    </div>
    <div style={footerStyles.bottom}>
      © 2026 Cake Shop. Made with 🎂 and love.
    </div>
  </footer>
);

const footerStyles = {
  footer: {
    background: '#1a1a1a',
    color: '#ccc',
    fontFamily: "'Nunito', sans-serif",
  },
  inner: {
    display: 'flex', gap: '60px', padding: '56px 80px 40px',
    flexWrap: 'wrap',
  },
  brand: { flex: '0 0 220px' },
  logo: {
    fontSize: '22px', fontWeight: 800,
    color: '#e8432a', marginBottom: '14px',
    letterSpacing: '-0.01em',
  },
  tagline: { fontSize: '13px', color: '#888', lineHeight: 1.65 },
  col: { display: 'flex', flexDirection: 'column', gap: '10px', flex: '0 0 140px' },
  colTitle: { fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', marginBottom: '6px' },
  link: { fontSize: '13px', color: '#888', textDecoration: 'none', transition: 'color 0.15s' },
  bottom: {
    borderTop: '1px solid #333',
    padding: '20px 80px',
    fontSize: '12px', color: '#666',
    textAlign: 'center',
  },
};

Object.assign(window, { Footer });
