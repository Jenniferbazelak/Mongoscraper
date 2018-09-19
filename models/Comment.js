// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the comment schema
var CommentsSchema = new Schema({
  // The comment text
  comments: {
    type: String
  }
});

// Mongoose will automatically save the ObjectIds of the comments
// These ids are referred to in the Article model

// Create the Comment model with the CommentSchema
var Comments = mongoose.model("Comments", CommentsSchema);

// Export the Comment model
module.exports = Comments;