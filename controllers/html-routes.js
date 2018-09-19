var express = require("express");
var exphbs = require("express-handlebars");
var Article = require("../models/Article");
var router = express.Router();

 // //set up database with mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;
var db = mongoose.connection;
mongoose.connect(MONGODB_URI);

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Main route -This route will retrieve all of the data
// from the scrapedData collection as a json
router.get("/", function (req, res) {
  Article.find({saved:false}).exec(function (error, data) {
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
// populate all articles that are saved MongoDB.
router.get("/saved", function (req, res) {
    Article.find({saved:true}).exec(function (err, data)  {
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


module.exports = router;