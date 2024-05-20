const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  htmlContent: {
    type: String,
    default: "<h1>Your Html Content</h1>",
  },
  cssContent: {
    type: String,
    default: ".text-center{text-align: center;}",
  },
  tsContent: {
    type: String,
    default: "constructor(){}",
  },
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("notes", NoteSchema);
