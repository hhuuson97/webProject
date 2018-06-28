var express = require("express");
var app = express();
var handlebars = require("express-handlebars");
var constant = require("./const");
var csrf = require("csurf");
var session = require("express-session");
var bodyParser = require("body-parser");
var captchapng = require("captchapng");
var config = require("./config");
var db = require("./db");
var jwt = require("./jwt");
var paypal = require("paypal-rest-sdk");
var mongoose = require("mongoose");

var csrfProtection = csrf();

db.start(app);

app.use(express.static("source"));

app.set("views", "views");
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    helpers: {
      eq: function(v1, v2) {
        return v1 === v2;
      }
    }
  })
);
app.set("view engine", "handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "secretCode", resave: false, saveUninitialized: false })
);

// app.use(csrfProtection);

app.get("/member", function(req, res) {
  res.render("Member/index", {
    page: "index.html",
    nav: constant.nav.member,
    data: [
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      }
    ]
  });
});

app.get("/member/shop.html", function(req, res) {
  res.render("Member/shop", {
    page: "shop.html",
    nav: constant.nav.member,
    best: [
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      },
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      }
    ],
    new: [
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      },
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      }
    ]
  });
});

app.get("/member/edit.html", function(req, res) {
  res.render("Member/edit", {
    page: "edit.html",
    nav: constant.nav.member
  });
});

app.get("/member/history.html", function(req, res) {
  res.render("Member/history", {
    page: "history.html",
    nav: constant.nav.member
  });
});

app.get("/member/detail", function(req, res) {
  res.render("Member/detail", {
    page: "detail.html",
    nav: constant.nav.member
  });
});

app.get("/member/design.html", function(req, res) {
  res.render("Member/design", {
    page: "design.html",
    nav: constant.nav.member
  });
});

app.get("/member/cart.html", function(req, res) {
  res.render("Member/cart", {
    page: "cart.html",
    nav: constant.nav.member
  });
});

app.get("/member/aboutUs.html", function(req, res) {
  res.render("Member/aboutUs", {
    page: "aboutUs.html",
    nav: constant.nav.member
  });
});

app.get("/app", function(req, res) {
  res.render("App/index", {
    page: "index.html",
    nav: constant.nav.guest,
    data: [
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      }
    ]
  });
});

app.get("/app/shop", function(req, res) {
  res.render("App/shop", {
    page: "shop.html",
    nav: constant.nav.guest,
    best: [
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      },
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      }
    ],
    new: [
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      },
      {
        id: "1",
        link: "img/hot/ao1.jpg",
        info: "Mẫu áo mới, rẻ đẹp"
      },
      {
        id: "2",
        link: "img/hot/ao2.jpg",
        info: "Giảm giá đến 30%"
      },
      {
        id: "3",
        link: "img/hot/ao3.jpg",
        info: "Chất liệu vải tốt"
      },
      {
        id: "4",
        link: "img/hot/ao4.jpg",
        info: "Hiện đang sắp hến hàng"
      }
    ]
  });
});

app.use((req, res, next) => {
  const token = req.params.token || req.body.token || "";
  const verify = jwt.verify(token);
  if (verify) {
    req.user = verify;
  }
  if (req.user) {
    const User = mongoose.model("User");
    User.findOne({ _id: req.user._id }, (err, user) => {
      if (user) {
        if (user.isBan) {
          return res.json({ banned: true });
        } else return next();
      } else return next();
    });
  } else return next();
});

app.get("/app/detail", function(req, res) {
  res.render("App/detail", {
    page: "detail.html",
    nav: constant.nav.guest
  });
});

app.get("/app/design", function(req, res) {
  res.render("App/design", {
    page: "design.html",
    nav: constant.nav.guest
  });
});

app.get("/app/cart", function(req, res) {
  res.render("App/cart", {
    page: "cart.html",
    nav: constant.nav.guest
  });
});

app.get("/app/aboutUs", function(req, res) {
  res.render("App/aboutUs", {
    page: "aboutUs.html",
    nav: constant.nav.guest
  });
});

app.get("/app/signin", function(req, res) {
  res.render("App/signin", {
    page: "signin.html",
    nav: constant.nav.guest
  });
});

app.get("/app/profile", function(req, res) {
  res.render("App/profile", {
    page: "profile.html",
    nav: constant.nav.guest
  });
});

app.get("/app/signup", function(req, res) {
  var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000));
  p.color(0, 0, 0, 0);
  p.color(80, 80, 80, 255);
  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");

  res.render("App/signup", {
    page: "signup.html",
    nav: constant.nav.guest,
    // csrfToken: req.csrfToken(),
    captcha: img
  });
});

app.get("/admin/index.html", function(req, res) {
  res.render("Admin/index", {
    page: "index.html",
    nav: constant.nav.admin
  });
});

app.get("/admin/manager.html", function(req, res) {
  res.render("Admin/manager", {
    page: "manager.html",
    nav: constant.nav.admin
  });
});

app.get("/admin/order.html", function(req, res) {
  res.render("Admin/order", {
    page: "order.html",
    nav: constant.nav.admin
  });
});

app.get("/admin/statistics.html", function(req, res) {
  res.render("Admin/statistics", {
    page: "statistics.html",
    nav: constant.nav.admin
  });
});

app.get("/admin/update.html", function(req, res) {
  res.render("Admin/update", {
    page: "update.html",
    nav: constant.nav.admin
  });
});

var server = app.listen(config.port, function() {
  console.log("Server listening at port " + config.port);
});
