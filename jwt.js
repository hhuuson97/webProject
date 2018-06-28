const config = require("./config");
const jwt = require("jsonwebtoken");

const sign = user => {
  return jwt.sign(JSON.stringify(user), config.secret);
};

const verify = token => {
  if (!token) return null;
  return jwt.verify(token, config.secret);
};

module.exports = {
  sign,
  verify
};
