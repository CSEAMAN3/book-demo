import React from "react";
import "./Home.css";
import Book from "../../components/Book/Book";
import CreateBook from "../../components/CreateBook/CreateBook";

export default function Home({ books, deleteBook, createNewBook, handleChangeCreate, createForm }) {
  return (
    <div>
      <div className="books-container">
        <Book books={books} deleteBook={deleteBook} />
      </div>
      <CreateBook createNewBook={createNewBook} handleChangeCreate={handleChangeCreate} createForm={createForm} />
    </div>
  );
}
