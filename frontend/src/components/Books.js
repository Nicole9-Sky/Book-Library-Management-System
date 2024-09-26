import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bag, setBag] = useState(() => {
    // Retrieve the bag from localStorage when the component mounts
    const savedBag = localStorage.getItem('bag');
    return savedBag ? JSON.parse(savedBag) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
      padding: '20px',
    },
    searchSection: {
      margin: '30px 0',
    },
    searchBox: {
      marginBottom: '10px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      marginRight: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 15px',
      fontSize: '16px',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    removeButton: {
      padding: '10px 15px',
      fontSize: '16px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    booksList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    bookItem: {
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  // Fetch books from the Django API
  useEffect(() => {
    axios.get('http://localhost:8000/api/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    axios.get(`http://localhost:8000/api/books/?search=${searchTerm}`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('There was an error searching the books!', error);
      });
  };

  // Handle adding a book to the bag
  const addToBag = (book) => {
    if (!bag.some((b) => b.id === book.id)) {
      const updatedBag = [...bag, book];
      setBag(updatedBag);
      localStorage.setItem('bag', JSON.stringify(updatedBag)); // Save to localStorage
    }
  };

  // Handle removing a book from the bag
  const removeFromBag = (bookId) => {
    const updatedBag = bag.filter((b) => b.id !== bookId);
    setBag(updatedBag);
    localStorage.setItem('bag', JSON.stringify(updatedBag)); // Update localStorage
  };

  // Check if the book is in the bag
  const isInBag = (bookId) => {
    return bag.some((b) => b.id === bookId);
  };

  return (
    <div style={styles.container}>
      {/* Search Section */}
      <div style={styles.searchSection}>
        <h2>Search for books</h2>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search"
            style={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button style={styles.button} onClick={handleSearch}>Search</button>
        </div>
        <p>{books.length} books available.</p>
      </div>

      {/* Books List */}
      <div style={styles.booksList}>
        {books.map((book) => (
          <div key={book.id} style={styles.bookItem}>
            <div>
              <h3>{book.title}</h3>
              <p>Written by {book.author}</p>
              <p>Published by {book.published}</p>
            </div>
            {isInBag(book.id) ? (
              <button
                style={styles.removeButton}
                onClick={() => removeFromBag(book.id)}
              >
                Remove
              </button>
            ) : (
              <button
                style={styles.button}
                onClick={() => addToBag(book)}
              >
                Add to bag
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
