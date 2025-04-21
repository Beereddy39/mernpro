import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./edittaxi.css"; // Create this CSS for styling

function EditBook() {
    const [isbn, setIsbn] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [status, setStatus] = useState("Available");

    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://backend-p4g5.onrender.com/viewBooks/${id}`);
                const book = response.data;
                setIsbn(book.isbn);
                setTitle(book.title);
                setAuthor(book.author);
                setGenre(book.genre);
                setPublicationYear(book.publicationYear);
                setStatus(book.status);
            } catch (error) {
                console.error("Error fetching book details:", error);
                toast.error("Failed to load book data!");
            }
        };
        fetchBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isbn.trim()) {
            toast.error("ISBN is required!");
            return;
        }
        if (!title.trim()) {
            toast.error("Title is required!");
            return;
        }
        if (!author.trim()) {
            toast.error("Author is required!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `https://backend-p4g5.onrender.com/editBook/${id}`,
                { isbn, title, author, genre, publicationYear, status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message || "Book updated successfully!");
        } catch (error) {
            console.error("Error updating book:", error);
            toast.error("Failed to update book.");
        }
    };

    return (
        <>
            <div className="container">
                <h3 className="heading">Update Book Details</h3>
                <Link to="/dashboard" className="back-link">Back</Link>

                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label>ISBN</label>
                        <input
                            type="text"
                            value={isbn}
                            required
                            onChange={(e) => setIsbn(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Author</label>
                        <input
                            type="text"
                            value={author}
                            required
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Genre</label>
                        <input
                            type="text"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Publication Year</label>
                        <input
                            type="number"
                            value={publicationYear}
                            onChange={(e) => setPublicationYear(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={status}
                            required
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Available">Available</option>
                            <option value="Borrowed">Borrowed</option>
                            <option value="Reserved">Reserved</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-btn">Update Book</button>
                    </div>
                </form>
            </div>

            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                transition={Bounce}
                theme="dark"
            />
        </>
    );
}

export default EditBook;