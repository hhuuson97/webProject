var express = require("express");
var app = express();
var handlebars = require("express-handlebars");

app.use(express.static("source"));

app.set("views", "views");
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/project1", function(req, res) {
  res.render("project1", {
    quotes: [
      {
        src: "img/project1/happy.jpg",
        alt: "happy",
        img: "img/project1/quote1.jpg"
      },
      {
        src: "img/project1/cry.jpg",
        alt: "cry",
        img: "img/project1/quote2.jpg"
      },
      {
        src: "img/project1/angry.jpg",
        alt: "angry",
        img: "img/project1/quote3.jpg"
      },
      {
        src: "img/project1/sad.jpg",
        alt: "sad",
        img: "img/project1/quote4.jpg"
      }
    ]
  });
});

app.get("/project2", function(req, res) {
  res.render("project2", {
    divide: [
      { name: "Necessity account", id: "nec", val: 0.55 },
      { name: "Financial freedom account", id: "ffa", val: 0.1 },
      { name: "Education account", id: "edu", val: 0.1 },
      { name: "Long-term saving for spending account", id: "ltss", val: 0.1 },
      { name: "Play account", id: "play", val: 0.1 },
      { name: "Give account", id: "give", val: 0.05 }
    ]
  });
});

app.get("/project3", function(req, res) {
  res.render("project3", {
    tvs: [
      {
        brand: "Samsung",
        id: "ss",
        tv: [
          {
            class: "ss",
            img: "img/project3/tv1.png",
            info: 'Samsung SMART TV 43"'
          },
          {
            class: "ss",
            img: "img/project3/tv2.png",
            info: 'Samsung SMART TV 43"'
          },
          {
            class: "ss",
            img: "img/project3/tv3.png",
            info: 'Samsung SMART TV 49"'
          },
          {
            class: "ss",
            img: "img/project3/tv4.png",
            info: 'Samsung SMART TV 40"'
          },
          {
            class: "ss",
            img: "img/project3/tv5.png",
            info: 'Samsung SMART TV 49"'
          }
        ]
      },
      {
        brand: "Sony",
        id: "sn",
        tv: [
          {
            class: "sn",
            img: "img/project3/tv6.jpg",
            info: 'Sony SMART TV 43"'
          },
          {
            class: "sn",
            img: "img/project3/tv7.jpg",
            info: 'Sony SMART TV 48"'
          },
          {
            class: "sn",
            img: "img/project3/tv8.jpg",
            info: 'Sony SMART TV 43"'
          }
        ]
      }
    ]
  });
});

app.get("/project4", function(req, res) {
  res.render("project4", {
    zodiac: [
      {
        id: "aquarius",
        name: "Aquarius (January 20 - February 18)",
        img: "img/project4/aquarius.jpg",
        info: "img/project4/aquarius-img.jpg"
      },
      {
        id: "pisces",
        name: "Pisces (February 19 - March 20)",
        img: "img/project4/pisces.jpg",
        info: "img/project4/pisces-img.jpg"
      },
      {
        id: "aries",
        name: "Aries (March 21 - April 19)",
        img: "img/project4/aries.jpg",
        info: "img/project4/aries-img.jpg"
      },
      {
        id: "taurus",
        name: "Taurus (April 20 - May 20)",
        img: "img/project4/taurus.jpg",
        info: "img/project4/taurus-img.jpg"
      },
      {
        id: "gemini",
        name: "Gemini (May 21 - June 20)",
        img: "img/project4/gemini.jpg",
        info: "img/project4/gemini-img.jpg"
      },
      {
        id: "cancer",
        name: "Cancer (June 21 - July 22)",
        img: "img/project4/cancer.jpg",
        info: "img/project4/cancer-img.jpg"
      },
      {
        id: "leo",
        name: "leo (July 23 - August 22)",
        img: "img/project4/leo.jpg",
        info: "img/project4/leo-img.jpg"
      },
      {
        id: "virgo",
        name: "Virgo (August 23 - September 22)",
        img: "img/project4/virgo.jpg",
        info: "img/project4/virgo-img.jpg"
      },
      {
        id: "libra",
        name: "Libra (September 23 - October 22)",
        img: "img/project4/libra.jpg",
        info: "img/project4/libra-img.jpg"
      },
      {
        id: "scorpio",
        name: "Scorpio (October 23 - November 21)",
        img: "img/project4/scorpio.jpg",
        info: "img/project4/scorpio-img.jpg"
      },
      {
        id: "sagittarius",
        name: "Sagittarius (November 22 - December 21)",
        img: "img/project4/sagittarius.jpg",
        info: "img/project4/sagittarius-img.jpg"
      },
      {
        id: "capricorn",
        name: "Capricorn (December 22 - January 19)",
        img: "img/project4/capricorn.jpg",
        info: "img/project4/capricorn-img.jpg"
      }
    ]
  });
});

var server = app.listen(8081, function() {
  console.log("Server listening at port 8081");
});
