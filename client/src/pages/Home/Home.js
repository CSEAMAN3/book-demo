import React from "react";
import Book from "../../components/Book/Book";
import CreateBook from "../../components/CreateBook/CreateBook";

export default function Home({ books, deleteBook, createNewBook, handleChangeCreate, createForm }) {
  return (
    <div>
      <Book books={books} deleteBook={deleteBook} />
      <CreateBook createNewBook={createNewBook} handleChangeCreate={handleChangeCreate} createForm={createForm} />
    </div>
  );
}
