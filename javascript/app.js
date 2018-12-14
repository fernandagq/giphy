// array of comedians (topics)    
var topics = ["Aziz Ansari", "Russel Peters", "Dave Chappelle", "Bert Kreischer", "Kevin Hart" ]

function displayComedian () {            
    
        var person= $(this).attr("data-person");
        
        var key= "UUIsJTJmqlfPxUflr5Mr6j6jKYorrxeo";
        
        var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=UUIsJTJmqlfPxUflr5Mr6j6jKYorrxeo&limit=10"
    
        $.ajax({
            url: queryURL,
            method: "GET"     
        })
        .then(function(response){
            

            var results = response.data;
            $("#gif-images").empty();

        for (var i=0; i<results.length; i++) {   
            
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>");

            p.text("Rating: " + rating);

            var img = $("<img>");
            
            img.attr("src", results[i].images.fixed_height_still.url);

            img.attr("data-still", results[i].images.fixed_height_still.url);
        
            img.attr("data-animate", results[i].images.fixed_height.url);

            img.attr("data-state", "still");

            img.addClass("gif-image");

            $(".gif-image").on("click", function(){

            var state = $(this).attr("data-state");

            if (state == "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");

            } else {
                $(this).attr("src", $(this).attr("data-still"));

                $(this).attr("data-state", "still")
            }

            });
            

            console.log(results);

            gifDiv.prepend(p);
            gifDiv.prepend(img); 


            $("#gif-images").prepend(gifDiv);

            $(".gif-image").on("click", function(){

            var state = $(this).attr("data-state");

            if (state == "still"){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");

            } else {
                $(this).attr("src", $(this).attr("data-still"));

                $(this).attr("data-state", "still")
            }

            });

            
        }
    
        });
    
}
//funciton for button creation

function renderButtons () {
// emptying button container to avoid repeat buttons
    $("#topic-buttons").empty();
// loop that goes through array of topics
    for (var i=0; i<topics.length; i++) {
// dynamic creation of buttons for each item in the array
        var topicButtons = $("<button>"); 
        
        topicButtons.addClass("comedians");

        topicButtons.attr("data-person", topics[i]);

        topicButtons.text(topics[i]);

        $("#topic-buttons").append(topicButtons);

    }
}

$("#add-comedian").on("click", function(event){
event.preventDefault();

var person = $("#comedian-input").val().trim();
topics.push(person);
renderButtons();
});

$(document).on("click", ".comedians", displayComedian);

renderButtons();
