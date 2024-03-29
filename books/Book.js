const mongoose = require("mongoose");

// Model -> structure for collection

mongoose.model("Book", {
  title: {
    type: String,
    require: true
  },
  author: {
    type: String,
    require: true
  },
  numberPages: {
    type: Number,
    require: false
  },
  publisher: {
    type: String,
    require: false
  }
});
