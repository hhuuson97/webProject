var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var { autoPopulateAllFields } = require("../utils");

var schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  size: { type: String, required: true },
  color: { type: String, required: true },
  num: { type: Number, required: true },
  createdAt: { type: String, required: true, default: Date.now() },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  phonenum: { type: String },
  address: { type: String },
  name: { type: String },
  status: { type: Number, required: true, default: 0 }
});

schema.plugin(autoPopulateAllFields);

module.exports = mongoose.model("Order", schema);
