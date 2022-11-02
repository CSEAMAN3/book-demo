"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bp = require("body-parser");
const serverless = require("serverless-http");
require("dotenv").config();
//were not making any axios calls
// const axios = require("axios");
const Book = require("./models/book");

// const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE_URL);

app.get("/.netlify/functions/api", (request, response) => {
  response.json("Yo mofo");
});

//retrieve all books

app.get("/.netlify/functions/api/books", async (request, response) => {
  try {
    //try and make a call to the database
    const allBooks = await Book.find();
    response.status(200).json(allBooks);
  } catch (error) {
    //show the error if the "try" fails
    console.log(error);
    response.status(500).json(error);
  }
});

// retrieve a specific book
app.get("/.netlify/functions/api/books/:id", async (request, response) => {
  try {
    const theBook = await Book.find({ _id: request.params.id });
    response.status(200).json(theBook);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

//create a new book

app.post("/.netlify/functions/api/books", async (request, response) => {
  try {
    //const cover = await axios.get(`https://covers.openlibrary.org/b/id/4${request.body.isbn}-L.jpg`);
    const newBook = await Book.create(request.body);
    response.status(200).json(newBook);
  } catch (error) {
    console.log(err);
    response.status(500).json(error);
  }
});

//https://covers.openlibrary.org/b/id/12547191-L.jpg
//update a book
app.put("/.netlify/functions/api/books/:id", async (request, response) => {
  try {
    const bookToUpdate = request.params.id;
    const updatedBook = await Book.updateOne({ _id: bookToUpdate }, request.body);
    response.status(200).json(updatedBook);
  } catch (error) {
    console.log(err);
    response.status(500).json(error);
  }
});

//delete a book

app.delete("/.netlify/functions/api/books/:id", async (request, response) => {
  try {
    const bookToDelete = request.params.id;
    const deletedBook = await Book.deleteOne({ _id: bookToDelete });
    response.status(200).json(deletedBook);
  } catch (error) {
    console.log(err);
    response.status(500).json(error);
  }
});

//old way of starting the server
// app.listen(PORT, () => console.log(`App is listenning on port ${PORT}`));

//new netlify way to start the server
const handler = serverless(app);

//we use this so the handler can use async (that mongoose uses)
module.exports.handler = async (event, context) => {
  //you can do any code here
  const result = await handler(event, context);
  //and here
  return result;
};
