var express = require("express");
var Article = require("../models/Article");
var router = express.Router();
var mongoose = require("mongoose");

//Grab mongoose db
var db = mongoose.connection;
var dbURI = "mongodb://localhost/mongoHeadlines";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect(dbURI)
}
 
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