import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Readers = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      // padding: '20px',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    readerListSection: {
      width: '80%',
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
    },
    thTd: {
      border: '1px solid #ddd',
      padding: '12px',
      textAlign: 'left',
      fontSize: '16px',
    },
    th: {
      backgroundColor: '#f4f4f4',
      fontWeight: 'bold',
    },
    searchSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    searchInput: {
      padding: '10px',
      width: '300px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
  };

  const [readers, setReaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch readers from the Django API
  useEffect(() => {
    axios.get('http://localhost:8000/api/readers/')
      .then(response => {
        setReaders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the readers!', error);
        setError('Failed to fetch readers. Please try again later.');
        setLoading(false);
      });
  }, []);

  const filteredReaders = readers.filter(reader =>
    reader.reader_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Reader List</h1>

      <div style={styles.readerListSection}>
        <div style={styles.searchSection}>
          <input
            type="text"
            placeholder="Search readers by name..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <p>{filteredReaders.length} readers found.</p>
        </div>

        {loading && <p>Loading readers...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && filteredReaders.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.thTd, ...styles.th }}>Reader ID</th>
                <th style={{ ...styles.thTd, ...styles.th }}>Name</th>
                <th style={{ ...styles.thTd, ...styles.th }}>Contact</th>
                <th style={{ ...styles.thTd, ...styles.th }}>Reference ID</th>
                <th style={{ ...styles.thTd, ...styles.th }}>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredReaders.map(reader => (
                <tr key={reader.id}>
                  <td style={styles.thTd}>{reader.id}</td>
                  <td style={styles.thTd}>{reader.reader_name}</td>
                  <td style={styles.thTd}>{reader.reader_contact}</td>
                  <td style={styles.thTd}>{reader.reference_id}</td>
                  <td style={styles.thTd}>{reader.reader_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && filteredReaders.length === 0 && (
          <p>No readers found.</p>
        )}
      </div>
    </div>
  );
};

export default Readers;
