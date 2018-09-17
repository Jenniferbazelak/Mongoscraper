// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");
var handlebars = require("express-handlebars");
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


// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.send("Hello world");
});


// This route will retrieve all of the data
// from the scrapedData collection as a json

app.get("/all", function (req, res) {
  db.scrapedData.find({}, function (error, found) {
    if (error) {
      console.log(error);
      res.status(500).send(error);
    }
    else {
      res.json(found);
    }
  });

});

// When you visit this route, the server will
// scrape data from the site, and save it to MongoDB.

app.get("/scrape", function (req, res) {

  request("https://goop.com", function (error, response, html) {
  db.scrapedData.remove();

    var $ = cheerio.load(html);


    $("a.nl-item").each(function (i, element) {
      var title = $(element).children().text();
      var link = $(element).attr("href");
if(title && link){
      db.scrapedData.insert({ link: link, title: title })
}
    });
    res.redirect("/all")

  });
});


// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});
