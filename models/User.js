var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");
var config = require("../config");

var userSchema = new Schema({
  name: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  email: { type: String, required: true, unique: true },
  phonenum: { type: String },
  address: { type: String, required: true },
  password: { type: String, required: true },
  isBan: { type: Boolean, required: true, default: false }
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.pre("save", function(next) {
  var user = this;
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
