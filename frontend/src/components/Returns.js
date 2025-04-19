import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Returns = () => {
  const [rentals, setRentals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all rentals from the API
  const fetchRentals = () => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/returns/`)
      .then((response) => {
        setRentals(response.data); // Assuming API returns the array directly
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

  // Return functionality
  const handleReturn = (readerId, bookId) => {
    axios
      .post(`http://localhost:8000/api/reader/${readerId}/return_book/${bookId}/`)
      .then(() => {
        alert('Book returned successfully!');
        fetchRentals(); // Refresh the rentals list
      })
      .catch((error) => {
        setError('Return failed. Please try again.');
        console.error('Return failed:', error.response?.data);
      });
  };
  

  const filteredRentals = rentals.filter((rental) =>
    rental.name?.toString().includes(searchTerm) ||
    rental.bookTitle?.toString().includes(searchTerm)
  );
  
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      textAlign: 'center',
    },
    searchBox: {
      marginBottom: '20px',
    },
    searchInput: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '250px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    thTd: {
      border: '1px solid #ddd',
      padding: '10px',
      textAlign: 'left',
    },
    returnButton: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Search readers</h2>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by name or book title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}

      <p>{filteredRentals.length} rentals found.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thTd}>Reader ID</th>
            <th style={styles.thTd}>Name</th>
            <th style={styles.thTd}>Book</th>
            <th style={styles.thTd}>Rental date</th>
            <th style={styles.thTd}>Return date</th>
            <th style={styles.thTd}>Return</th>
          </tr>
        </thead>
        <tbody>
          {filteredRentals.map((rental) => (
            <tr key={rental.id}>
              <td style={styles.thTd}>{rental.readerId}</td>
              <td style={styles.thTd}>{rental.name}</td>
              <td style={styles.thTd}>
                <strong>{rental.bookTitle}</strong>
                <p>Written by {rental.author}</p>
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
  );
};

export default Returns;
