
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var Comment = require("../models/Comment.js");
var Article = require("../models/Article");
var router = express.Router();


// This route will retrieve all of the data
// from the scrapedData collection as a json
router.get("/all", function (req, res) {
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
      res.redirect("/all")
      });
    });
});



module.exports = router;