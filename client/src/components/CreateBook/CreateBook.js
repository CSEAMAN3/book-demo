import React from "react";
import "./CreateBook.css";

export default function CreateBook({ createNewBook, handleChangeCreate, createForm }) {
  return (
    <>
      <h2 className="add-book-heading">Add a new book</h2>
      <form onSubmit={createNewBook}>
        <input name="title" onChange={handleChangeCreate} placeholder="title" value={createForm.title} required />
        <br />
        <input name="author" onChange={handleChangeCreate} placeholder="author" value={createForm.author} required />
        <br />
        <input
          name="description"
          onChange={handleChangeCreate}
          placeholder="description"
          value={createForm.description}
          required
        />
        <br />
        <input name="year" onChange={handleChangeCreate} placeholder="year" value={createForm.year} required />
        <br />
        <input name="isbn" onChange={handleChangeCreate} placeholder="isbn" value={createForm.isbn} required />
        <br />
        <button className="add-book-btn">Add Book</button>
      </form>
    </>
  );
}
