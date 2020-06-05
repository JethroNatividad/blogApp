const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title:{type: String, default: "My Blog"},
  image: String,
  body: String,
  date: {type: Date, default: Date.now},
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment"
  }]
})
module.exports = mongoose.model("blog", blogSchema);
