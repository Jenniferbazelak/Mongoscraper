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

//set up database with mongoose
//DB config
var dbURI = "mongodb://localhost/mongoHeadlines";

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect(dbURI)
}

//Grab mongoose db
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Routing
app.use("/", htmlRouter);
app.use("/", articleRouter);


// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});



