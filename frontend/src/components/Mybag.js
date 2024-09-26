import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBag = () => {
  const [books, setBooks] = useState([]);
  const [readerId, setReaderId] = useState('');
  const [readerDetails, setReaderDetails] = useState({
    name: '',
    contact: '',
    reference_id: '',
  });
  const [error, setError] = useState('');

  // Load books from localStorage
  useEffect(() => {
    const savedBag = localStorage.getItem('bag');
    if (savedBag) {
      setBooks(JSON.parse(savedBag));
    }
  }, []);

  const handleRemove = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('bag', JSON.stringify(updatedBooks)); // update localStorage
  };

  // Fetch reader details by ID
  const fetchReaderDetails = () => {
    if (!readerId) {
      setError('Please enter a valid Reader ID.');
      return;
    }

    axios
      .get(`http://localhost:8000/api/reader/${readerId}/`)
      .then((response) => {
        const { name, contact, reference_id } = response.data;
        setReaderDetails({
          name,
          contact,
          reference_id,
        });
        setError('');
      })
      .catch((error) => {
        setError('Reader not found. Please check the Reader ID.');
      });
  };

  // Handle form submission (Checkout)
  const handleCheckout = () => {
    if (!readerId || !books.length) {
      setError('Please select books and enter a valid Reader ID.');
      return;
    }
  
    axios
  .post(`http://localhost:8000/api/reader/${readerId}/checkout/`, {
    reader_id: readerId,
    books: books.map((book) => book.id), // Send book IDs
  })
  .then(() => {
    alert('Books checked out successfully!');
    setBooks([]);
    localStorage.removeItem('bag'); // Clear the bag after checkout
  })
  .catch((error) => {
    setError('Checkout failed. Please try again.');
    console.error('Checkout Error:', error.response.data);
  });
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
    },
    bookList: {
      width: '60%',
      backgroundColor: '#fff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    bookItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ccc',
    },
    bookDetails: {
      textAlign: 'left',
    },
    removeButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '10px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    checkoutSection: {
      width: '35%',
      padding: '20px',
      backgroundColor: '#e3f7f7',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
    },
    formLabel: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    formInput: {
      marginBottom: '10px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    formInputDate: {
      marginBottom: '10px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      color: '#555',
    },
    errorMessage: {
      color: 'red',
      marginBottom: '10px',
    },
    instructions: {
      fontSize: '14px',
      color: '#333',
    },
    instructionsList: {
      textAlign: 'left',
      paddingLeft: '20px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Book List Section */}
      <div style={styles.bookList}>
        <h2>Books in your bag - {books.length}</h2>
        {books.length === 0 ? (
          <p>Your bag is empty.</p>
        ) : (
          books.map((book) => (
            <div key={book.id} style={styles.bookItem}>
              <div style={styles.bookDetails}>
                <strong>{book.title}</strong>
                <p>Written by {book.author}</p>
                <p>Published by {book.published}</p>
              </div>
              <button style={styles.removeButton} onClick={() => handleRemove(book.id)}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Checkout Section */}
      <div style={styles.checkoutSection}>
        <h3>Ready for Checkout?</h3>
        <form style={styles.form}>
          <label htmlFor="readerId" style={styles.formLabel}>Reader ID:</label>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              id="readerId"
              name="readerId"
              value={readerId}
              onChange={(e) => setReaderId(e.target.value)}
              style={styles.formInput}
            />
            <button type="button" onClick={fetchReaderDetails} style={{ marginLeft: '10px', padding: '8px 15px' }}>
              Go
            </button>
          </div>

          {error && <p style={styles.errorMessage}>{error}</p>}

          <label htmlFor="name" style={styles.formLabel}>Name:</label>
          <input type="text" id="name" name="name" value={readerDetails.name} style={styles.formInput} readOnly />

          <label htmlFor="contact" style={styles.formLabel}>Contact:</label>
          <input type="text" id="contact" name="contact" value={readerDetails.contact} style={styles.formInput} readOnly />

          <label htmlFor="referenceId" style={styles.formLabel}>Reference ID:</label>
          <input
            type="text"
            id="referenceId"
            name="referenceId"
            value={readerDetails.reference_id}
            style={styles.formInput}
            readOnly
          />

          <label htmlFor="startDate" style={styles.formLabel}>Start date & time:</label>
          <input
            type="text"
            id="startDate"
            name="startDate"
            defaultValue="July 1, 2023, 5:43 p.m."
            style={styles.formInput}
            readOnly
          />

          <label htmlFor="returnDate" style={styles.formLabel}>Return due date & time:</label>
          <input type="date" id="returnDate" name="returnDate" style={styles.formInputDate} />
        </form>

        <button type="button" onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Checkout
        </button>

        {/* Checkout Instructions */}
        <div style={styles.instructions}>
          <ul style={styles.instructionsList}>
            <li>Readers should not mark, underline, or damage library materials.</li>
            <li>Handle library property carefully and avoid disturbing others.</li>
            <li>No library material can be taken out without librarian permission.</li>
            <li>Four books can be issued for up to two weeks and must be returned on time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyBag;
