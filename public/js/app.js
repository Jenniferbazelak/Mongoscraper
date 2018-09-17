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
                type: "DELTE",
                url: "/clear"
            });
        },
        addToSaved: function () {
            return $.ajax({
                type: "UPDATE",
                url: "/add-to-saved"
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


    // When someone clicks the Scrape button...
    $("#scrape-btn").on("click", function () {

        API.scrapeArticles()
    });

 // When someone clicks the clear button...
 $("#clear-btn").on("click", function () {

    API.clearArticles()
});

 // When someone clicks the Saved button...
 $("#saved-btn").on("click", function () {

    API.savedArticles()
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