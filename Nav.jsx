// Nav.jsx — Yhana's Cakes & Pastries Navigation

const Nav = ({ currentPage, onNavigate, cartCount }) => {
  const links = ['Home', 'Menu', 'Customized', 'About', 'Reminders'];

  return (
    <nav style={navStyles.nav}>
      <a href="#" style={navStyles.logo} onClick={(e) => {e.preventDefault();onNavigate('Home');}}>
        <img src="https://yhanas.com/images/logo.png" alt="Yhana's Cakes & Pastries"
          style={{ height: '44px', width: 'auto', objectFit: 'contain', display: 'block', marginRight: '10px' }}
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <span style={{ ...navStyles.logoAccent, margin: "0px 4px 0px 0px" }}>Yhana's</span>
          <span style={navStyles.logoSub}>Cakes & Pastries</span>
        </div>
      </a>
      <ul style={navStyles.links}>
        {links.map((link) =>
        <li key={link}>
            <a
            href="#"
            style={{ ...navStyles.link, ...(currentPage === link ? navStyles.linkActive : {}) }}
            onClick={(e) => {e.preventDefault();onNavigate(link);}}>
            
              {link}
            </a>
          </li>
        )}
      </ul>
      <div style={navStyles.actions}>
        <a
          href="https://m.me/YhanasCakesandPastries"
          target="_blank"
          rel="noopener noreferrer"
          style={navStyles.orderBtn}
          onMouseEnter={e => e.currentTarget.style.background = '#c93520'}
          onMouseLeave={e => e.currentTarget.style.background = '#e8432a'}
        >
          ORDER NOW
        </a>
      </div>
    </nav>);

};

const navStyles = {
  nav: {
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 48px',
    height: '64px',
    boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    fontFamily: "'Nunito', sans-serif"
  },
  logo: {
    textDecoration: 'none',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0'
  },
  logoAccent: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '20px',
    fontWeight: 700,
    color: '#e8432a'
  },
  logoSub: {
    fontFamily: "'Nunito', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#555'
  },
  links: {
    display: 'flex',
    gap: '28px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center'
  },
  link: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#444',
    textDecoration: 'none',
    transition: 'color 0.15s',
    fontFamily: "'Nunito', sans-serif",
    whiteSpace: 'nowrap'
  },
  linkActive: {
    color: '#e8432a',
    fontWeight: 700
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexShrink: 0
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#333',
    textDecoration: 'none',
    fontFamily: "'Nunito', sans-serif",
    transition: 'color 0.15s',
    whiteSpace: 'nowrap'
  },
  orderBtn: {
    background: '#e8432a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '9px 20px',
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontFamily: "'Nunito', sans-serif",
    transition: 'background 0.15s',
    cursor: 'pointer'
  },
  badge: {
    position: 'absolute',
    top: '-7px',
    right: '-9px',
    background: '#e8432a',
    color: '#fff',
    borderRadius: '9999px',
    fontSize: '9px',
    fontWeight: 800,
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

Object.assign(window, { Nav });