$(document).ready(function() {
      // Initial array of movies
      var person = ["kim kardashian", "kourtney kardashian", "khloe kardashian", "kris jenner","kylie jenner", "kendall jenner", "scott disick"];


function displayGifs() {

      var person = $(this).attr("data-person");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          // var results = response.data;

          for (var i = 0; i < response.data.length; i++) {

            var gifDiv = $("<div class='item'>");

            var rating = response.data[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");

            personImage.addClass("giphy");

            personImage.attr("src", response.data[i].images.fixed_height_still.url);

            personImage.attr("data-animate", response.data[i].images.fixed_height.url);

            personImage.attr("data-still", response.data[i].images.fixed_height_still.url);

            personImage.attr("state", "still");

            gifDiv.prepend(p);

            gifDiv.prepend(personImage);

            $("#gif-gallery").prepend(gifDiv);

            $("#item").css("background color", "#A1A0A0");
          }
        });
    };


    $(document).on("click", ".giphy", function() {
      
      var state = $(this).attr("data-state");
      var activeurl = $(this).attr("data-animate");
      var stillurl = $(this).attr("data-still");

      if (state === "still") {
        console.log(this)

        $(this).attr("data-state", "animate");

        $(this).attr("src", activeurl);
      }

      else {

        $(this).attr("data-state", "still");

        $(this).attr("src", stillurl);

        console.log(this);
      
      }

    });

 function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < person.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("gif");
          // Adding a data-attribute
          a.attr("data-person", person[i]);
          // Providing the initial button text
          a.text(person[i]);
          // Adding the button to the buttons-view div
          $("#buttons").append(a);
        }
      }

       $("#add-dash").on("click", function(event) {

        event.preventDefault();
        // This line grabs the input from the textbox
        var newPerson = $("#search-input").val().trim();

        // Adding movie from the textbox to our array
        person.push(newPerson);

        renderButtons();

        // Calling renderButtons which handles the processing of our movie array
       
      });

       renderButtons();
      // // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".gif", displayGifs);

    });


