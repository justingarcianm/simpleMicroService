const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// Connect to database
mongoose.connect(
  "mongodb://user1:password1@ds233278.mlab.com:33278/customerservice",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// \Load Model
require("./Customer");
const Customer = mongoose.model("Customer");

app.post("/customer", (req, res) => {
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  };

  var customer = new Customer(newCustomer);

  customer
    .save()
    .then(() => {
      res.send("Customer created");
    })
    .catch(err => {
      throw err;
    });
});

app.get("/customers", (req, res) => {
  Customer.find()
    .then(customers => {
      res.json(customers);
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.get("/customer/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then(customer => {
      if (customer) {
        res.json(customer);
      } else {
        res.send("Invalid id");
      }
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.delete("/customer/:id", (req, res) => {
  Customer.findOneAndRemove(req.params.id)
    .then(() => {
      res.send("Customer deleted from database");
    })
    .catch(err => {
      if (err) {
        throw err;
      }
    });
});

app.listen(5555, () => {
  console.log("Up and running -- Customers service");
});
