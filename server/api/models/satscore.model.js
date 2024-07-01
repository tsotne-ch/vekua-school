const mongoose = require("mongoose");
const { Schema } = mongoose;

const satSchema = new Schema({
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  code: {
    type: String,
  },
  class: {
    type: Number,
  },
  score: {
    type: Number,
  },
});

module.exports = mongoose.model("satscore", satSchema);
