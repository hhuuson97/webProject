var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var { autoPopulateAllFields } = require("../utils");

var schema = new Schema({
  //   imagePath: { type: String, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },
  num: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

schema.plugin(autoPopulateAllFields);

module.exports = mongoose.model("Product", schema);
