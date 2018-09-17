// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser")



// Initialize Express
var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));


// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

  // Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});
 

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});

module.exports = app;