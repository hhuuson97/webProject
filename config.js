module.exports = {
  mongoUrl:
    process.env.mongoUrl ||
    "mongodb://hhuuson97:mtk10197@ds227119.mlab.com:27119/webshoping",
  port: process.env.port || 8081,
  modelDir: "./models",
  SALT_WORK_FACTOR: 10,
  admin: {
    name: "admin",
    email: "knightvincv@gmail.com",
    isAdmin: true,
    password: "123456",
    address: "HCM"
  },
  secret: "son_kien!!!!@@@@@",
  expiresIn: "1h"
};
