import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './taxidashboard.css';

function LibraryDashboard() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://backend-p4g5.onrender.com/viewBooks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (err) {
      setError('Error fetching books: ' + err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://backend-p4g5.onrender.com/deleteBook/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter(book => book._id !== bookId));
    } catch (err) {
      setError('Error deleting book: ' + err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Library Management System</h1>
        <button onClick={logout} className="dashboard-button">Logout</button>
      </header>

      <main className="dashboard-main">
        <h2>Books Dashboard</h2>
        {error && <p className="error-msg">{error}</p>}

        <h3>Book Collection</h3>
        <div className="books-table-container">
          <div className="flex justify-between items-center mb-6">
            <h4>Book List</h4>
            <Link to="/addBook" className="dashboard-table-link">
              Add Book
            </Link>
          </div>

          <table>
            <thead>
              <tr>
                <th>Si.No</th>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publication Year</th>
                <th>Status</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr key={book._id}>
                    <td>{index + 1}</td>
                    <td>{book.isbn}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.publicationYear}</td>
                    <td>{book.status}</td>
                    <td>
                      <Link to={`/editBook/${book._id}`} className="dashboard-table-link">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button onClick={() => deleteBook(book._id)} className="dashboard-table-button">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-books">No books available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default LibraryDashboard;