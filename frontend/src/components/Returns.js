import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const Returns = () => {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalsPerPage] = useState(5); // You can change this number to the desired rentals per page
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Memoize the fetchRentals function to avoid unnecessary re-renders
  const fetchRentals = useCallback(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/rentals/?page=${currentPage}&search=${searchTerm}`)
      .then((response) => {
        setRentals(response.data.rentals); // Assuming API returns an array of rentals
        setError('');
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching rentals. Please try again.');
        setLoading(false);
      });
  }, [currentPage, searchTerm]);

  // Fetch rentals whenever currentPage or searchTerm changes
  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  // Pagination logic
  const indexOfLastRental = currentPage * rentalsPerPage;
  const indexOfFirstRental = indexOfLastRental - rentalsPerPage;
  const currentRentals = rentals.slice(indexOfFirstRental, indexOfLastRental);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage * rentalsPerPage < rentals.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page after a new search
    fetchRentals();
  };

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
    searchButton: {
      padding: '10px 15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '10px',
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
    pagination: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
    },
    paginationButton: {
      padding: '10px 20px',
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      cursor: 'pointer',
      margin: '0 5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2>Search readers</h2>
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>
      </div>

      {loading ? <p>Loading...</p> : null}
      {error ? <p style={{ color: 'red' }}>{error}</p> : null}

      <p>{rentals.length} rentals found.</p>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.thTd}>Reader ID</th>
            <th style={styles.thTd}>Name</th>
            <th style={styles.thTd}>Book</th>
            <th style={styles.thTd}>Rental date</th>
            <th style={styles.thTd}>Expected return date</th>
            <th style={styles.thTd}></th>
          </tr>
        </thead>
        <tbody>
          {currentRentals.map((rental) => (
            <tr key={rental.id}>
              <td style={styles.thTd}>{rental.readerId}</td>
              <td style={styles.thTd}>{rental.name}</td>
              <td style={styles.thTd}>
                <strong>{rental.bookTitle}</strong>
                <p>Written by {rental.author}</p>
                <p>Published by {rental.published}</p>
              </td>
              <td style={styles.thTd}>{rental.rentalDate}</td>
              <td style={styles.thTd}>{rental.returnDate}</td>
              <td style={styles.thTd}>
                <button style={styles.returnButton}>Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.pagination}>
        <button onClick={handlePreviousPage} style={styles.paginationButton}>Previous</button>
        <button onClick={handleNextPage} style={styles.paginationButton}>Next</button>
      </div>
    </div>
  );
};

export default Returns;
