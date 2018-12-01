 // ======================================================== Generate Buttons ===============================================================================

 $( document ).ready(function() {
    
    var comedians = ['john oliver', 'marcella arguello', 'naomi ekperigin', 'chris garcia', 'joe pera', 'maz jobrani', 'gabriel iglesias']

        function renderButtons() {


            $("#btnTarget").empty();

            for (var i = 0; i < comedians.length; i++) {

                var a = $("<button>");
                a.addClass("comedian");
                a.attr("btn-name", comedians[i]);
                a.text(comedians[i]);
                $("#btnTarget").append(a);
            }

        }
        
        $("this").on("click", function (event) {
            event.preventDefault();
            var data = $("#btn-name").val();
            comedians.push(comedians);

            renderButtons();
        });

        $(document).on("click", ".comedian", displayComedianInfo);

        renderButtons();

    // ===================================== User Input Handling =======================================================================
        

//         $( "#add-comedian" )
//   .keyup(function() {
//     //   event.preventDefault();
//     var value = $( "#comedian-input" ).val();
//     $( "p" ).text( value );
//     comedians.push(value)
//   })
//   .keyup();
        // var comInput = $("#comedian-input").val();

        $("#add-comedian").on('click', function (event) {
            event.preventDefault();
            var comInput = $("#comedian-input").val();
            comedians.push(comInput);
            renderButtons();
            // displayComedianInfo()
            
        })
        

// ============================================== Button Click Event Handling =========================================================================================


        
        function displayComedianInfo() {

            $(".comedian").on("click", function () {



              
                var btnInfo = $(this).attr("btn-name");

                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    btnInfo + "&api_key=PVlf9tWXIEFP8O8hIC4eS0Ehg2P9nvCz&limit=10";
                //dc6zaTOxFJmzC -- Trilogy api key
                console.log(btnInfo);

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    .then(function (response) {
                        // console.log(queryURL);
                        // console.log(response);

                        var results = response.data;

                         for (var i = 0; i < results.length; i++) {
                            
                            var comedianDiv = $("<div>");

                            var p = $("<p>").text("Rating: " + results[i].rating);
                            var comedianImage = $("<img>");
                            
                            comedianImage.attr("src", results[i].images.fixed_height.url);
                            comedianImage.attr("class", "gif");
                            comedianImage.attr("data-animate", results[i].images.fixed_height.url);
                            comedianImage.attr("data-still", results[i].images.fixed_height_still.url);
                            comedianImage.attr("data-state", "animate");

                            // var p = $("<p>");
                            comedianDiv.append(p);
                            comedianDiv.append(comedianImage);

                            $("#gifs-appear-here").prepend(comedianDiv);
                        }

// ================================== Gif Click Event =========================================================================

                        $('.gif').on("click", function () {

                            var state = $(this).attr("data-state");
                            var image = $('img').attr('src');

                            if (state === 'still') {

                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", 'animate');

                            } else {

                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", 'still');
                            }


                        });


                    });
            });

        }
    });