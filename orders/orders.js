const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");

app.use(bodyParser.json());

mongoose.connect(
  "mongodb://user1:password1@ds233278.mlab.com:33278/ordersservice",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Model loaded
require("./Order");
const Order = mongoose.model("Order");

// Create new order
app.post("/order", (req, res) => {
  var newOrder = {
    CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
    BookID: mongoose.Types.ObjectId(req.body.BookID),
    initialDate: req.body.initialDate,
    deliveryDate: req.body.deliveryDate
  };
  var order = new Order(newOrder);

  order
    .save()
    .then(() => {
      res.send("Order created");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/orders", (req, res) => {
  Order.find()
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id).then(order => {
    if (order) {
      axios
        .get(`http://localhost:5555/customer/${order.CustomerID}`)
        .then(response => {
          var orderObject = { customerName: response.data.name, bookTitle: "" };

          axios
            .get(`http://localhost:3000/book/${order.BookID}`)
            .then(response => {
              orderObject.bookTitle = response.data.title;
              res.json(orderObject);
            });
        });
    } else {
      res.send("Invalid order");
    }
  });
});

app.listen(7777, () => console.log("Up and running -- Order service"));
