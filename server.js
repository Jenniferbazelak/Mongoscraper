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
    res.render("index");
});

// When you visit this route, the server will
// populate all articles that are saved MongoDB.

app.get("/saved", function (req, res) {
    db.scrapedData.find({}).sort({saved:true}, function (err, data)  {
        // Log any errors if the server encounters one
        if (err) {
          console.log(err);
        }
        else {
          // Otherwise, send the result of this query to the browser
          res.render("saved", {
            data: data
          });
        }
      });
  
    });

    // When you visit this route, the server will
// update the article to a saved article MongoDB.

app.post("/", function (req, res) {
    db.scrapedData.find({}).sort({saved:true}, function (err, data)  {
        // Log any errors if the server encounters one
        if (err) {
          console.log(err);
        }
        else {
          // Otherwise, send the result of this query to the browser
          res.render("saved", {
            data: data
          });
        }
      });
  
    });

// When you visit this route, the server will
// clear the data from the MongoDB.

app.delete("/clear", function (req, res) {
    db.scrapedData.remove();
      res.redirect("/")
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
        res.render("index", {
            data: data
          });
      }
    });
  
  });

// When you visit this route, the server will
// scrape data from the site, and save it to MongoDB.

app.get("/scrape", function (req, res) {

    request("https://goop.com", function (error, response, html) {
    db.scrapedData.find({saved: false}).remove();
  
      var $ = cheerio.load(html);
  
  
      $("a.nl-item").each(function (i, element) {
        var summary = $(element).children().text();
        var title = $(element).children().text();
        var link = $(element).attr("href");
        var photo = $(element).children().first().attr("img");

  if(title && link && summary && photo){
        db.scrapedData.insert({ photo: photo, link: link, title: title, summary: summary, saved: false, comments: []})
      };
      res.redirect("/all")
      });
    });
});

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});

