import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addtaxi.css";

function AddBook() {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [status, setStatus] = useState("Available");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("❌ Please login to add book details!");
      return;
    }

    try {
      const response = await axios.post(
        "https://backend-p4g5.onrender.com/addbook",
        { isbn, title, author, genre, publicationYear, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message || "✅ Book added successfully!");
      setIsbn("");
      setTitle("");
      setAuthor("");
      setGenre("");
      setPublicationYear("");
      setStatus("Available");
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Error adding book!");
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="ISBN"
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Book Title"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
          required
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
        />
        <input
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value)}
          placeholder="Publication Year"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Available">Available</option>
          <option value="Borrowed">Borrowed</option>
          <option value="Reserved">Reserved</option>
        </select>
        <button type="submit">Add Book</button>
      </form>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </div>
  );
}

export default AddBook;