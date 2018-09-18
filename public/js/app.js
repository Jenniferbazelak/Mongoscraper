

$(document).ready(function () {


    var API = {
       
        addToSaved: function (articleId) {
            return $.ajax({
                type: "POST",
                url: "/add-to-saved/" + articleId
            });
        },

        updateComments: function () {
            return $.ajax({
                type: "UPDATE",
                url: "/add-comments"
            });
        },

        clearArticles: function () {
            return $.ajax({
                type: "DELETE",
                url: "/clear"
            });
        },

        deleteComments: function () {
            return $.ajax({
                type: "DELETE",
                url: "/delete-comments"
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

 // When someone clicks the add comment button...
 $(".addcomment").on("click", function () {
    $(".modal").modal("open");
    
   
});

 // When someone clicks the delete comment button...
 $(".delete-comment-btn").on("click", function () {

    API.deleteComments()
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

});

