

$(document).ready(function () {


    var API = {
       
        addToSaved: function (articleId) {
            return $.ajax({
                type: "POST",
                url: "/add-to-saved/" + articleId
            });
        },
        pullAddComments: function (articleId) {
            return $.ajax({
                type: "GET",
                url: "/get-comments/" + articleId
            });
        },
       addNewComment: function (articleId, userInput) {
            return $.ajax({
                type: "POST",
                url: "/add-new-comments" + articleId,
                data: {
                    comments: userInput
                }
            });
        },

        deleteComments: function () {
            return $.ajax({
                type: "DELETE",
                url: "/delete-comments"
            });
        },
        clearArticles: function () {
            return $.ajax({
                type: "DELETE",
                url: "/clear"
            });
        },

        deleteFromSaved: function (articleId) {
            return $.ajax({
                type: "POST",
                url: "/delete-from-saved/" + articleId
            });
        },
    };

    $('.modal').modal();

 // When someone clicks the Saved button...
 $(".save-btn").on("click", function () {
    var articleId = $(".save-btn").attr("data-id");
    API.addToSaved(articleId)
    window.location.href= ("/");
});

 // When someone clicks the article notes button...
 $(".addcomment").on("click", function () {
    $(".modal").modal("open");
    var articleId = $(this).attr("data-id");
   API.pullAddComments(articleId).then(function (data) {
    $("#comments-list").push(data)
});

});

// When someone clicks the add comment button...
$("#addCommentBtn").on("click", function () {
    var articleId = $(this).attr("data-id");
    var userInput = $("#new-comment-field" + articleId).val().toString();
   API.addNewComment(articleId, userInput);
   $("#new-comment-field" + articleId).val("");
   location.reload();
});



// When someone clicks the delete from saved button...
$(".deleteSavedArticle").on("click", function () {
    var articleId = $(".deleteSavedArticle").attr("data-id");
    API.deleteFromSaved(articleId)
    window.location.href= ("/saved");
    
});

// When someone clicks the clear button...
$("#clear-btn").on("click", function () {

    API.clearArticles();
    window.location.href= ("/");
});

// when someone deletes a comment
$(document).on("click", "#removeComment", function () {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/uncomment/" + thisId,
    });

    location.reload();
});



});

