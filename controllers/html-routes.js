var express = require("express");
var exphbs = require("express-handlebars");

var router = express.Router();

 
// Main route (simple Hello World Message)
router.get("/", function (req, res) {
    res.render("index");
});

// When you visit this route, the server will
// populate all articles that are saved MongoDB.
router.get("/saved", function (req, res) {
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


module.exports = router;