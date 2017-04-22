$(document).ready(function() {
      // Initial array of movies
      var person = ["kim kardashian", "kourtney kardashian", "khloe kardashian", "kris jenner","kylie jenner", "kendall jenner", "scott disick"];


function displayGifs() {

      var person = $(this).attr("data-person");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
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

            personImage.attr("src", response.data[i].images.fixed_height_still.url);

            gifDiv.prepend(p);

            gifDiv.prepend(personImage);

            $("#movies-view").prepend(gifDiv);
          }
        });
    };

 function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < person.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie");
          // Adding a data-attribute
          a.attr("data-person", person[i]);
          // Providing the initial button text
          a.text(person[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

       $("#add-movie").on("click", function(event) {

        event.preventDefault();
        // This line grabs the input from the textbox
        var newPerson = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        person.push(newPerson);

        renderButtons();

        // Calling renderButtons which handles the processing of our movie array
       
      });

       renderButtons();
      // // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayGifs);

    });