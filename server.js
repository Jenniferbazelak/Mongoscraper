// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser")
var mongoose = require("mongoose")



// Initialize Express
var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));


// Requiring Comment and Article models
var Comment = require("./models/Comment.js");
var Article = require("./models/Article.js");

// Requiring routing controllers
var htmlRouter = require("./controllers/html-routes.js");
var articleRouter = require("./controllers/article-routes.js");

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);



// When you visit this route, the server will
// update the article to a saved article MongoDB.

app.post("/add-to-saved/:id", function (req, res) {
  db.scrapedData.findOne({ id: req.params.id }, {
    $set: { saved: true }
  }), function (err, data) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    else {
      // Otherwise, send the result of this query to the browser
      console.log("message saved!")
    }
  };
  res.redirect("/all");

});

// When you visit this route, the server will
// clear the data from the MongoDB.

app.delete("/clear", function (req, res) {
  db.scrapedData.remove();
  res.redirect("/")
});






// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});



