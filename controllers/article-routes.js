
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var Comment = require("../models/Comment.js");
var Article = require("../models/Article");
var router = express.Router();


// When you visit this route, the server will
// scrape data from the site, and save it to MongoDB.

router.get("/scrape", function (req, res) {

    request("https://goop.com", function (error, response, html) {
   // db.scrapedData.find({saved:false}).remove();
  
      var $ = cheerio.load(html);
  
  
      $("a.nl-item").each(function (i, element) {
        
        var result= {};
        
        result.summary = $(element).find("p").text();
        result.title = $(element).find("h3").text();
        result.link = $(element).attr("href");
        result.photo = $(element).find("div").find("img").attr("data-src");

        var entry = new Article(result);

        entry.save(function(err,doc){
            if(err){
                console.log(err);
            }
            else{
                console.log(doc);
            }
        });
      });
      res.redirect("/");
    });
});

// When you visit this route, the server will
// update the article to a saved article MongoDB.
router.post("/add-to-saved/:id", function (req, res) {
    Article.findOneAndUpdate({ _id :req.params.id}, {saved: true}).exec(function (err, data) {
      // Log any errors if the server encounters one
      if (err) {
        console.log(err);
      }
      else {
        // Otherwise, log result
        console.log("Data saved: ", data)
      }
    });
  });
  
  // When you visit this route, the server will
  // clear the data from the MongoDB.
  router.delete("/clear", function (req, res) {
   Article.remove({}, function (err){
       // Log any errors if the server encounters one
      if (err) {
        console.log(err);
      }
      else {
        // Otherwise, log result
        console.log("Removed all articles")
      }
   });
  });

  // When you visit this route, the server will
  // delete from the saved list.
  router.post("/delete-from-saved/:id", function (req, res) {
    Article.findOneAndUpdate({ _id :req.params.id}, {saved:false}).exec(function (err, data) {
      // Log any errors if the server encounters one
      if (err) {
        console.log(err);
      }
      else {
        // Otherwise, log result
        console.log("Data unsaved: ", data)
      }
    });
  });
  
//This route will retrieve all of the comments
// from the selected article
router.get("/get-comments/:id", function (req, res) {
    Article.findOne({ "_id": req.params.id })
  // ..and populate all of the comments associated with it
  .populate("comments")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


  
module.exports = router;