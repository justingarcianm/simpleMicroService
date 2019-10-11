const mongoose = require("mongoose");

mongoose.model("Order", {
  CustomerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  BookID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  intitialDate: {
    type: Date,
    require: true
  },
  deliveryDate: {
    type: Date,
    required: true
  }
});
