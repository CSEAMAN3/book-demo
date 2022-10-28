import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookDetails.css";

export default function BookDetails() {
  const [book, setbook] = useState({});
  const [formUpdate, setformUpdate] = useState({
    title: "",
    author: "",
    description: "",
    year: "",
    isbn: "",
  });

  useEffect(() => {
    getBookDetails();
  }, []);

  const { id } = useParams();

  const handleChangeUpdate = (event) => {
    setformUpdate({ ...formUpdate, [event.target.name]: event.target.value });
  };

  const updateBook = async (event) => {
    event.preventDefault();
    const bodyToSend = {};

    for (const prop in formUpdate) {
      // prop = "title"
      // formUpdate[prop] = ""

      if (formUpdate[prop] !== "") {
        bodyToSend[prop] = formUpdate[prop];
      }
    }

    const API = `http://localhost:8080/books/${id}`;
    const res = await axios.put(API, bodyToSend);
    console.log(res);
    getBookDetails();
  };

  const getBookDetails = async () => {
    const API = `http://localhost:8080/books/${id}`;
    console.log(API);
    const res = await axios.get(API);
    setbook(res.data[0]);
  };

  if (!book) {
    <>
      <h1>Woops. Thats a 404</h1>
      <p>The book with {id} no longer exists</p>
      <Link to="/">Go Back to the home page</Link>
    </>;
  }

  return (
    <div>
      <Link to="/">&#8617; Home</Link>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>{book.year}</p>
      <p>{book.isbn}</p>
      <img
        className="book-img"
        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
        alt={`${book.title} book cover`}
      />

      <form onSubmit={updateBook}>
        <input name="title" onChange={handleChangeUpdate} value={formUpdate.title} placeholder="Title of Book" />
        <br />
        <input name="author" onChange={handleChangeUpdate} value={formUpdate.author} placeholder="author" />
        <br />
        <input name="description" onChange={handleChangeUpdate} value={formUpdate.description} placeholder="Description" />
        <br />
        <input name="year" onChange={handleChangeUpdate} value={formUpdate.year} placeholder="Year of Release" />
        <br />
        <input name="isbn" onChange={handleChangeUpdate} value={formUpdate.isbn} placeholder="isbn" />
        <br />
        <button>Update Book</button>
      </form>
    </div>
  );
}
