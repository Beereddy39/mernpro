import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBook() {
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationYear, setPublicationYear] = useState("");
  const [status, setStatus] = useState("Available");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/addbook", {
        isbn,
        title,
        author,
        genre,
        publicationYear,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message || "Book added successfully!");
      
      // Reset form fields
      setIsbn("");
      setTitle("");
      setAuthor("");
      setGenre("");
      setPublicationYear("");
      setStatus("Available");
    } catch (error) {
      toast.error("Failed to add book. Please try again.");
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ISBN Field */}
        <div>
          <label className="block font-medium">ISBN</label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            className="w-full p-2 border rounded"
            placeholder="e.g., 978-3-16-148410-0"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium">Book Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block font-medium">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block font-medium">Genre</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., Fiction, Science, History"
          />
        </div>

        {/* Publication Year */}
        <div>
          <label className="block font-medium">Publication Year</label>
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., 2023"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} transition={Bounce} theme="colored" />
    </div>
  );
}

export default AddBook;