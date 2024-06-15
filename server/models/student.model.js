const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  pname: {
    type: String,
    required: true,
  },
  psurname: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  oldschool: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  class: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("students", studentSchema);
