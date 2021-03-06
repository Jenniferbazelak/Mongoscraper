// Dependencies
var express = require("express");
// var mongojs = require("mongojs");
// var request = require("request");
// var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser")
var mongoose = require("mongoose")



// Initialize Express
var port = process.env.PORT || 3000;
var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));


// Requiring Comment and Article models
// var Comment = require("./models/Comment.js");
// var Article = require("./models/Article.js");

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



// Show any mongoose errors
// db.on("error", function(error) {
//   console.log("Mongoose Error: ", error);
// });

// Routing
app.use("/", htmlRouter);
app.use("/", articleRouter);

var PORT = process.env.PORT || 3000
// Listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port 3000!");
});



