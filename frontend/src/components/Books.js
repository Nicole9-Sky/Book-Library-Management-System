import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [bag, setBag] = useState(() => {
    const savedBag = localStorage.getItem('bag');
    return savedBag ? JSON.parse(savedBag) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [newBook, setNewBook] = useState({ title: '', author: '', published: '' });
  const [editingBook, setEditingBook] = useState(null);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      textAlign: 'center',
      padding: '20px',
    },
    contentWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    booksSection: {
      flex: 2,
      marginRight: '20px',
    },
    formSection: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      textAlign: 'left',
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
      margin: '5px',
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
    bookCard: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '15px',
      textAlign: 'left',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    formField: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
    },
    formInput: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      margin: '5px',
    },
    addBookButton: {
      padding: '10px 20px',
      margin: '5px',
      fontSize: '16px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/books/')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleSearch = () => {
    axios.get(`http://localhost:8000/api/books/?search=${searchTerm}`)
      .then(response => setBooks(response.data))
      .catch(error => console.error('Search error:', error));
  };

  const addToBag = (book) => {
    if (!bag.some(b => b.id === book.id)) {
      const updatedBag = [...bag, book];
      setBag(updatedBag);
      localStorage.setItem('bag', JSON.stringify(updatedBag));
    }
  };

  const removeFromBag = (bookId) => {
    const updatedBag = bag.filter(b => b.id !== bookId);
    setBag(updatedBag);
    localStorage.setItem('bag', JSON.stringify(updatedBag));
  };

  const isInBag = (bookId) => bag.some(b => b.id === bookId);

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    axios.post('http://localhost:8000/api/books/', newBook)
      .then(response => {
        setBooks([...books, response.data]);
        setNewBook({ title: '', author: '', published: '' });
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
  };

  const handleEditChange = (e) => {
    setEditingBook({ ...editingBook, [e.target.name]: e.target.value });
  };

  const handleUpdateBook = () => {
    axios.put(`http://localhost:8000/api/books/${editingBook.id}/`, editingBook)
      .then(response => {
        const updatedBooks = books.map(book =>
          book.id === editingBook.id ? response.data : book
        );
        setBooks(updatedBooks);
        setEditingBook(null);
      })
      .catch(error => {
        console.error('Error updating book:', error);
      });
  };

  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:8000/api/books/${id}/`)
      .then(() => {
        const updatedBooks = books.filter(book => book.id !== id);
        setBooks(updatedBooks);
      })
      .catch(error => {
        console.error('Error deleting book:', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchSection}>
        <h2>📚 Search for books</h2>
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
        <p>My Bag: {bag.length}</p>
      </div>

      <div style={styles.contentWrapper}>
        <div style={styles.booksSection}>
          {books.map(book => (
            <div key={book.id} style={styles.bookCard}>
              {editingBook && editingBook.id === book.id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editingBook.title}
                    onChange={handleEditChange}
                    style={styles.formInput}
                  />
                  <input
                    type="text"
                    name="author"
                    value={editingBook.author}
                    onChange={handleEditChange}
                    style={styles.formInput}
                  />
                  <input
                    type="text"
                    name="published"
                    value={editingBook.published}
                    onChange={handleEditChange}
                    style={styles.formInput}
                  />
                  <button style={styles.addBookButton} onClick={handleUpdateBook}>
                    Save
                  </button>
                  <button style={styles.removeButton} onClick={() => setEditingBook(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h3>📘 Title: {book.title}</h3>
                  <p>✍️ Author: {book.author}</p>
                  <p>🏢 Published by: {book.published}</p>
                  <button style={styles.button} onClick={() => handleEditClick(book)}>Edit</button>
                  <button style={styles.removeButton} onClick={() => handleDeleteBook(book.id)}>Delete</button>
                  {isInBag(book.id) ? (
                    <button style={styles.removeButton} onClick={() => removeFromBag(book.id)}>Remove from bag</button>
                  ) : (
                    <button style={styles.button} onClick={() => addToBag(book)}>Add to bag</button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div style={styles.formSection}>
          <h2>Add a New Book</h2>
          <div style={styles.formField}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              style={styles.formInput}
              value={newBook.title}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formField}>
            <label>Author</label>
            <input
              type="text"
              name="author"
              style={styles.formInput}
              value={newBook.author}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formField}>
            <label>Published</label>
            <input
              type="text"
              name="published"
              style={styles.formInput}
              value={newBook.published}
              onChange={handleInputChange}
            />
          </div>
          <button style={styles.addBookButton} onClick={handleAddBook}>Add Book</button>
        </div>
      </div>
    </div>
  );
};

export default Books;
