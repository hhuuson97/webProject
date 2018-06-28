const config = require("./config");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("./jwt");
const request = require("request");
const { asyncMiddleware } = require("./utils");

let conn = null;
let models = {};

function connect() {
  return (conn = mongoose.connect(config.mongoUrl));
}

async function initAdmin() {
  const User = mongoose.model("User");
  const admin = await User.findOne({ name: config.admin.name }).exec();
  if (!admin) {
    const user = new User(config.admin);
    user.save((err, user) => {
      if (err) return console.error(err);
      console.log("New admin: ", user);
    });
  }
}

function getModels() {
  return fs.readdirSync(config.modelDir);
}

function loadModels(models) {
  models.forEach(model => {
    const file = config.modelDir + "/" + model;
    models[model] = require(file);
  });
}

async function login({ email, password }) {
  const User = mongoose.model("User");
  console.log(1);
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return {
      error: "Không tồn tại tài khoản này"
    };
  }
  const isValid = user.validPassword(password);
  if (isValid) {
    const token = jwt.sign(user);
    return { user, token };
  } else {
    return {
      error: "Mật khẩu không đúng"
    };
  }
}

function checkToken({ token }) {
  const verify = jwt.verify(token);
  if (!verify) {
    return {
      error: "Mã token không đúng"
    };
  }
  return {
    user: verify
  };
}

const post = {
  login,
  checkToken
};

async function insert(model, body) {
  console.log(body);
  const Model = mongoose.model(model);
  const add = new Model({
    ...body
  });
  return await add.save();
}

// async function update(model, body) {
//   const Model = mongoose.model(model);
//   const add = new Model({
//     ...body
//   });
//   return await add.save();
// }

function getUser(token) {
  return jwt.verify(token);
}

async function findById(model, body = {}) {
  console.log(body);
  const Model = mongoose.model(model);
  return await Model.findById(body.id).exec();
}

async function find(model, body) {
  console.log(body);
  const Model = mongoose.model(model);
  return await Model.find(body).exec();
}

async function remove(model, body) {
  console.log(body);
  const Model = mongoose.model(model);
  return await Model.remove(body).exec();
}

function checkCaptcha(req, cb) {
  console.log(req.body);
  if (
    req.body["g-recaptcha-response"] === undefined ||
    req.body["g-recaptcha-response"] === "" ||
    req.body["g-recaptcha-response"] === null
  ) {
    return cb(false);
  }
  // Put your secret key here.
  var secretKey = "6LeDNmEUAAAAAPzqsirHwpP5r2N6d8ehXT5w_3YF";
  // req.connection.remoteAddress will provide IP address of connected user.
  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    req.body["g-recaptcha-response"] +
    "&remoteip=" +
    req.connection.remoteAddress;
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  console.log(verificationUrl);
  request(verificationUrl, function(error, response, body) {
    body = JSON.parse(body);
    // Success will be true or false depending upon captcha validation.
    if (body.success !== undefined && !body.success) {
      return cb(true);
    }
    cb(false);
  });
}

function routes(app) {
  Object.keys(post).forEach(key => {
    app.post(
      "/api/" + key,
      asyncMiddleware(async (req, res) => {
        const body = req.body;
        const ret = await post[key](body);
        return res.json(ret);
      })
    );
  });

  app.post(
    "/api/:model",
    asyncMiddleware(async (req, res) => {
      const model = req.params.model;
      let body = req.body;
      if (req.user) {
        body.user = req.user._id;
      }
      const ret = await insert(model, body);
      return res.json(ret);
    })
  );
  app.post("/changePassword", (req, res) => {
    const User = mongoose.model("User");
    const { oldPassword, newPassword } = req.body;
    const id = req.user._id;
    User.findOne({ _id: id }, (err, user) => {
      const isValid = user.validPassword(oldPassword);
      if (isValid) {
        user.password = newPassword;
        user.save(() => {
          res.json({ success: true });
        });
      } else {
        return res.json({
          error: true
        });
      }
    });
  });
  app.post(
    "/Order",
    asyncMiddleware(async (req, res) => {
      try {
        let user = null;
        if (req.user) user = req.user._id;
        const { phonenum, address, name } = req.body;
        const order = JSON.parse(req.body.order);
        const Order = mongoose.model("Order");
        for (let p of order.products) {
          const od = new Order({
            num: p.num,
            product: p.product,
            size: p.size,
            color: p.color,
            user,
            phonenum,
            address,
            name
          });
          await od.save();
          res.json({ success: true });
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
  app.post("/BanUser", (req, res) => {
    const User = mongoose.model("User");
    const { _id, isBan } = req.body;
    if (req.user.isAdmin) {
      User.findOne({ _id }, (err, user) => {
        console.log(user);
        user.isBan = isBan;
        user.save(() => {
          res.json({ success: true });
        });
      });
    }
  });
  app.post("/profile", (req, res) => {
    const User = mongoose.model("User");
    const { name, address, phonenum } = req.body;
    const id = req.user._id;
    User.findOne({ _id: id }, (err, user) => {
      if (!err) {
        user.name = name;
        user.address = address;
        user.phonenum = phonenum;
        user.save(err => {
          res.json({ user });
        });
      } else {
        console.log(2, err);
        res.json({ error: 2 });
      }
    });
  });
  app.post(
    "/register",
    asyncMiddleware(async (req, res) => {
      const model = "User";
      let body = req.body;
      // checkCaptcha(req, ok => {
      //   console.log(ok);
      // });
      if (req.user) {
        body.user = req.user._id;
      }
      const ret = await insert(model, body);
      return res.json(ret);
    })
  );
  app.get(
    "/api/:model/find",
    asyncMiddleware(async (req, res) => {
      const body = req.query;
      const model = req.params.model;
      if (req.user) {
        body.user = req.user._id;
      }
      const ret = await find(model, body);
      return res.json(ret);
    })
  );
  app.get(
    "/api/:model/findOne",
    asyncMiddleware(async (req, res) => {
      const body = req.query;
      const model = req.params.model;
      const ret = await find(model, body);
      return res.json(ret);
    })
  );
  app.post(
    "/api/:model/delete",
    asyncMiddleware(async (req, res) => {
      const model = req.params.model;
      const body = req.body;
      const ret = await remove(model, body);
      return res.json(ret);
    })
  );
}

function start(app) {
  connect().then(async () => {
    console.log("Start database with " + config.mongoUrl);
    const models = getModels();
    loadModels(models);
    initAdmin();
    routes(app);
  });
}

module.exports = {
  start,
  login
};
