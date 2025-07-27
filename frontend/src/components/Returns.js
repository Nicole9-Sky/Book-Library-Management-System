import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Returns = () => {
  const [rentals, setRentals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const fetchRentals = () => {
    setLoading(true);
    axios
      .get(`https://book-library-management-system-3.onrender.com/api/returns/`)
      .then((response) => {
        setRentals(response.data);
        setError('');
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching rentals. Please try again.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRentals();
  }, []);
  // Handle book return
  const handleReturn = (readerId, bookId) => {
    axios
      .post(`https://book-library-management-system-3.onrender.com/api/reader/${readerId}/return_book/${bookId}/`)
      .then(() => {
        alert('Book returned successfully!');
        fetchRentals();
      })
      .catch((error) => {
        setError('Return failed. Please try again.');
        console.error('Return failed:', error.response?.data);
      });
  };
  // Filter rentals based on search term
  const filteredRentals = rentals.filter((rental) =>
    rental.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rental.bookTitle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
    },
    header: {
      fontSize: '28px',
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: '25px',
      color: '#1e3a8a',
    },
    searchSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      backgroundColor: '#fff',
      padding: '15px 20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    },
    searchInput: {
      flex: 1,
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginRight: '10px',
    },
    tableContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.05)',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      backgroundColor: '#1e3a8a',
      color: 'white',
      fontWeight: 'bold',
    },
    thTd: {
      padding: '12px',
      border: '1px solid #ddd',
      fontSize: '15px',
      textAlign: 'left',
    },
    returnButton: {
      padding: '8px 14px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🔁 Return Borrowed Books</h1>

      <div style={styles.searchSection}>
        <input
          type="text"
          placeholder="Search by name or book title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <span>{filteredRentals.length} found</span>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.thTd, ...styles.th }}>Reader ID</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Name</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Book</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Rental Date</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Return Date</th>
              <th style={{ ...styles.thTd, ...styles.th }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRentals.map((rental) => (
              <tr key={rental.id}>
                <td style={styles.thTd}>{rental.readerId}</td>
                <td style={styles.thTd}>{rental.name}</td>
                <td style={styles.thTd}>
                  <strong>{rental.bookTitle}</strong>
                  <p>by {rental.author}</p>
                  <p>Published by {rental.published}</p>
                </td>
                <td style={styles.thTd}>{new Date(rental.rentalDate).toLocaleDateString()}</td>
                <td style={styles.thTd}>{new Date(rental.returnDate).toLocaleDateString()}</td>
                <td style={styles.thTd}>
                  <button
                    onClick={() => handleReturn(rental.readerId, rental.bookId)}
                    style={styles.returnButton}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Returns;
