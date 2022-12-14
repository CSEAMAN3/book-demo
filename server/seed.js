const mongoose = require("mongoose");
require("dotenv").config();
const Book = require("./models/book");
mongoose.connect(process.env.DATABASE_URL);

async function seed() {
  await Book.create({
    title: "The Hobbit",
    description: "A small man goes and kills a dragon or something",
    year: "1999",
  });
  await Book.create({
    title: "Harry Snotter",
    description: "A little twat who thinks he can become a wizard",
    year: "2001",
  });
}

seed();
