import React from "react";
import "./Book.css";
import { Link } from "react-router-dom";

export default function Book({ books, deleteBook }) {
  return (
    <>
      <h2 className="page-heading">Chris fav books</h2>
      {books.map((bookObj, idx) => {
        return (
          <div className="book" key={idx}>
            <div className="book-info-container">
              <Link className="book-title-link" to={`/book/${bookObj._id}`}>
                <h3 className="book-title">{bookObj.title}</h3>
              </Link>
              <p className="book-desc">{bookObj.description}</p>
              <div className="additional-info-container">
                <p>
                  <span className="bold">Released:</span> {bookObj.year}
                </p>
                <p>
                  <span className="bold">isbn:</span> {bookObj.isbn}
                </p>
              </div>
              <button className="delete-book-btn" onClick={() => deleteBook(bookObj)}>
                x
              </button>
            </div>
            <div className="book-img-container">
              <img
                className="book-img"
                src={`https://covers.openlibrary.org/b/isbn/${bookObj.isbn}-L.jpg`}
                alt={`${bookObj.title} book cover`}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
