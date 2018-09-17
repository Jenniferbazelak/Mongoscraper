module.exports = function(app) {
// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    res.render("index");
});


// When you visit this route, the server will
// clear the data from the MongoDB.

app.delete("/clear", function (req, res) {
    db.scrapedData.remove();
      res.redirect("/")
    });
};