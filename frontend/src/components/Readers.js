import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Readers = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '20px',
    },
    leftSection: {
      flex: 2,
      padding: '20px',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      marginRight: '20px',
    },
    rightSection: {
      flex: 1,  
      padding: '5px',
      backgroundColor: '#e8f4f8',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
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
    formSection: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    formField: {
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    formInput: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    addButton: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    actionbutton: {
      // padding: '10px 10px',
      border: '0.5px solid #000',
      marginRight: '5px',
      margin: '2px',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  const [readers, setReaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newReader, setNewReader] = useState({
    reader_name: '',
    reader_contact: '',
    reference_id: '',
    reader_address: '',
  });
  const [editingReaderId, setEditingReaderId] = useState(null);
const [editedReader, setEditedReader] = useState({
  reader_name: '',
  reader_contact: '',
  reference_id: '',
  reader_address: '',
});

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

  const handleEditClick = (reader) => {
    setEditingReaderId(reader.id);
    setEditedReader(reader);
  };

  const handleEditChange = (e) => {
    setEditedReader({ ...editedReader, [e.target.name]: e.target.value });
  };

  const handleUpdateReader = () => {
    axios.put(`http://localhost:8000/api/readers/${editingReaderId}/`, editedReader)
      .then(response => {
        const updatedReaders = readers.map(reader =>
          reader.id === editingReaderId ? response.data : reader
        );
        setReaders(updatedReaders);
        setEditingReaderId(null); // exit edit mode
      })
      .catch(error => {
        console.error('Error updating reader:', error);
        setError('Failed to update reader.');
      });
  };

  const filteredReaders = readers.filter(reader =>
    reader.reader_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setNewReader({ ...newReader, [e.target.name]: e.target.value });
  };

  const handleAddReader = () => {
    axios.post('http://localhost:8000/api/readers/', newReader)
      .then(response => {
        setReaders([...readers, response.data]); // Add new reader to the list
        setNewReader({
          reader_name: '',
          reader_contact: '',
          reference_id: '',
          reader_address: '',
        }); // Clear form
      })
      .catch(error => {
        console.error('There was an error adding the reader!', error);
        setError('Failed to add reader. Please try again.');
      });
  };

  const handleDeleteReader = (id) => {
    if (window.confirm("Are you sure you want to delete this reader?")) {
      axios.delete(`http://localhost:8000/api/readers/${id}/`)
        .then(() => {
          setReaders(readers.filter(reader => reader.id !== id));
        })
        .catch(error => {
          console.error('Error deleting reader:', error);
          setError('Failed to delete reader.');
        });
    }
  };

  return (
    <div style={styles.container}>
      
      {/* Left Section: Book/Reader List */}
      <div style={styles.leftSection}>
        <h1 style={styles.header}>📚 Readers List</h1>
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
                <th style={{ ...styles.thTd, ...styles.th }}>Actions</th>

              </tr>
            </thead>
            <tbody>
              {filteredReaders.map(reader => (
                <tr key={reader.id}>
                  <td style={styles.thTd}>{reader.id}</td>
                  <td style={styles.thTd}>
                      {editingReaderId === reader.id ? (
                        <input
                          type="text"
                          name="reader_name"
                          value={editedReader.reader_name}
                          onChange={handleEditChange}
                          style={styles.formInput}
                        />
                      ) : (
                        reader.reader_name
                      )}
                </td>
                  <td style={styles.thTd}>
                      {editingReaderId === reader.id ? (
                        <input
                          type="text"
                          name="reader_contact"
                          value={editedReader.reader_contact}
                          onChange={handleEditChange}
                          style={styles.formInput}
                        />
                      ) : (
                        reader.reader_contact
                      )}
                  </td>
                  <td style={styles.thTd}>
                      {editingReaderId === reader.id ? (
                        <input
                          type="text"
                          name="reference_id"
                          value={editedReader.reference_id}
                          onChange={handleEditChange}
                          style={styles.formInput}
                        />
                      ) : (
                        reader.reference_id
                      )}
                  </td>
                  <td style={styles.thTd}>
                      {editingReaderId === reader.id ? (
                        <input
                          type="text"
                          name="reader_address"
                          value={editedReader.reader_address}
                          onChange={handleEditChange}
                          style={styles.formInput}
                        />
                      ) : (
                        reader.reader_address
                      )}
                  </td>
                  <td style={styles.thTd}>
                      {editingReaderId === reader.id ? (
                        <>
                          <button style={styles.actionbutton} onClick={handleUpdateReader}>Save</button>
                          <button style={styles.actionbutton} onClick={() => setEditingReaderId(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button style={styles.actionbutton} onClick={() => handleEditClick(reader)}>Edit</button>
                          <button style={styles.actionbutton} onClick={() => handleDeleteReader(reader.id)}>Delete</button>
                        </>
                      )}
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && filteredReaders.length === 0 && (
          <p>No readers found.</p>
        )}
      </div>
      
      {/* Right Section: Add Reader Form */}
      <div style={styles.rightSection}>
        <h2 style={styles.header}>Add New Readers</h2>
        <div style={styles.formSection}>
        <div style={styles.formField}>
            <label>Name</label>
            <input
              type="text"
              name="reader_name"
              style={styles.formInput}
              value={newReader.reader_name}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formField}>
            <label>Contact</label>
            <input
              type="text"
              name="reader_contact"
              style={styles.formInput}
              value={newReader.reader_contact}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formField}>
            <label>Reference ID</label>
            <input
              type="text"
              name="reference_id"
              style={styles.formInput}
              value={newReader.reference_id}
              onChange={handleInputChange}
            />
          </div>
          <div style={styles.formField}>
            <label>Address</label>
            <input
              type="text"
              name="reader_address"
              style={styles.formInput}
              value={newReader.reader_address}
              onChange={handleInputChange}
            />
          </div>
          <button style={styles.addButton} onClick={handleAddReader}>
            Add Reader
          </button>
        </div>
      </div>
    </div>
  );
};

export default Readers;
