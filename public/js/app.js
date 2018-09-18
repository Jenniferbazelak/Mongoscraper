$(document).ready(function () {

    var API = {
        getArticles: function () {
            return $.ajax({
                type: "GET",
                url: "/all"
            });
        },
        scrapeArticles: function () {
            return $.ajax({
                type: "GET",
                url: "/scrape"
            });
        },

        clearArticles: function () {
            return $.ajax({
                type: "DELETE",
                url: "/clear"
            });
        },
        addToSaved: function (articleId) {
            return $.ajax({
                type: "POST",
                url: "/add-to-saved",
                data: articleId
            });
        },

        savedArticles: function () {
            return $.ajax({
                type: "GET",
                url: "/saved"
            });
        },

        updateComments: function () {
            return $.ajax({
                type: "UPDATE",
                url: "/add-comments"
            });
        },

        deleteComments: function () {
            return $.ajax({
                type: "GET",
                url: "/add-comments"
            });
        },
    };


 // When someone clicks the Saved button...
 $("#save-btn").on("click", function () {
    var articleId = $("#save-btn").attr("data-id");
    API.addToSaved(articleId)
});

 // When someone clicks the Scrape button...
 $("#add-to-save-btn").on("click", function () {

    API.addToSaved()
});

 // When someone clicks the Scrape button...
 $("#add-comment-btn").on("click", function () {

    API.updateComments()
});

 // When someone clicks the Scrape button...
 $("#delete-comment-btn").on("click", function () {

    API.deleteComments()
});

});