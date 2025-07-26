import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get the current URL path

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1e3a8a',
      padding: '15px 30px',
      color: 'white',
      marginBottom: '20px',
    },
    navbarLogo: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    navbarMenu: {
      display: 'flex',
    },
    navbarLink: (isActive) => ({
      color: 'white',
      textDecoration: 'none',
      margin: '0 15px',
      fontWeight: '500',
      borderBottom: isActive ? '2px solid white' : 'none', // Highlight active link
    }),
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.navbarLogo}> Book Library</div>
      <nav style={styles.navbarMenu}>
        <Link to="/" style={styles.navbarLink(location.pathname === '/')}>Home</Link>
        <Link to="/readers" style={styles.navbarLink(location.pathname === '/readers')}>Readers</Link>
        <Link to="/books" style={styles.navbarLink(location.pathname === '/books')}>Books</Link>
        <Link to="/mybag" style={styles.navbarLink(location.pathname === '/mybag')}>My Bag</Link>
        <Link to="/returns" style={styles.navbarLink(location.pathname === '/returns')}>Returns</Link>
      </nav>
    </header>
  );
};

export default Navbar;
