// Load Express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// Load mongoose
const mongoose = require("mongoose");

require("./Book");
const Book = mongoose.model("Book");

// Connect
mongoose.connect(
  "mongodb://user1:password1@ds233258.mlab.com:33258/booksservice",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("/", (req, res) => {
  res.send("Hello!");
});

// Create
app.post("/book", (req, res) => {
  var newBook = {
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  };
  // create new Book
  var book = new Book(newBook);

  book
    .save()
    .then(() => {
      console.log("New Book Created");
    })
    .catch(err => {
      throw err;
    });
  res.send("New Book created successfully!");
});

app.get("/books", (req, res) => {
  Book.find()
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      throw err;
    });
});

app.get("/book/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (book) {
        //   book data
        res.json(book);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      throw err;
    });
});

app.delete("/book/:id", (req, res) => {
  Book.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Book deleted");
    })
    .catch(err => {
      throw err;
    });
});

app.listen(3000, () => {
  console.log("Up and running! -- This is our Books service");
});
