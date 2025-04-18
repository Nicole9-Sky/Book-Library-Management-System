import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const navigate = useNavigate();
  const styles = {
    container: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      margin: 0,
      padding: 0,
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1e3a8a',
      padding: '15px 30px',
      color: 'white',
    },
    navbarLogo: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    navbarMenu: {
      display: 'flex',
    },
    navbarLink: {
      color: 'white',
      textDecoration: 'none',
      margin: '0 15px',
      fontWeight: '500',
    },
    navbarLinkHover: {
      borderBottom: '2px solid white',
    },
    hero: {
      backgroundColor: '#f3f4f6',
      padding: '50px',
    },
    heroText: {
      maxWidth: '700px',
      margin: '0 auto',
    },
    heroTitle: {
      fontSize: '36px',
      marginBottom: '20px',
    },
    heroDescription: {
      fontSize: '18px',
      marginBottom: '20px',
    },
    ctaButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    ctaButtonHover: {
      backgroundColor: '#1d4ed8',
    },
    info: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '40px 0',
      backgroundColor: '#fff',
    },
    infoBox: {
      width: '30%',
      padding: '20px',
      backgroundColor: '#e5e7eb',
      borderRadius: '10px',
    },
    infoBoxTitle: {
      fontSize: '24px',
      marginBottom: '15px',
    },
    infoBoxContent: {
      textAlign: 'left',
      fontSize: '16px',
      lineHeight: '1.6',
    },
    infoBoxListItem: {
      marginBottom: '10px',
    },
    footer: {
      padding: '20px',
      backgroundColor: '#1e3a8a',
      color: 'white',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
    
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroText}>
          <h1 style={styles.heroTitle}>Hello, readers!</h1>
          <p style={styles.heroDescription}>
            Welcome to City Library. We have a large collection of books to cater to the reading needs of all kinds of readers.
          </p>
          <button style={styles.ctaButton} onClick={() => navigate('/books')}>Browse our collection</button>
        </div>
      </section>

      {/* Information Section */}
      <section style={styles.info}>
        <div style={styles.infoBox}>
          <h2 style={styles.infoBoxTitle}>Why reading is important?</h2>
          <p style={styles.infoBoxContent}>
            Reading is good for you because it improves your focus, memory, empathy, and communication skills. It can reduce stress, improve your mental health, and help you live longer.
          </p>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.infoBoxTitle}>Key Benefits</h2>
          <ul style={styles.infoBoxContent}>
            <li style={styles.infoBoxListItem}>Increase your vocabulary and comprehension skills</li>
            <li style={styles.infoBoxListItem}>Reduce stress</li>
            <li style={styles.infoBoxListItem}>Improve mental health</li>
            <li style={styles.infoBoxListItem}>Prevents cognitive decline</li>
          </ul>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.infoBoxTitle}>Thought for the day</h2>
          <p style={styles.infoBoxContent}>
            "Just don’t give up trying to do what you really want to do. Where there is love and inspiration, I don’t think you can go wrong." – Ella Fitzgerald
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© City Library 2025</p>
      </footer>
    </div>
  );
}

export default Home;
