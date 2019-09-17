$(document).ready(function() {

    var title;
    var poster;
    var type;
    var year;

    function mediaObject(name, year, type, poster) {
        this.name = name;
        this.year = year;
        this.type = type;
        this.poster = poster;

    }

    function updateUIAfterSearch(Results) {
        var row = $("#search-row");
        if (Results.length > 0) {
            row.empty();
            for (var i = 0; i < Results.length; i++) {

                var card = "<div class=\"col-sm-6 col-md-2\">  <div class=\"card\">  <img src=\"" + Results[i].poster + "\" class=\"card-img-top\" alt=\"" + Results[i].name + "|" + Results[i].year + "|" + Results[i].year + "\"> <div class=\"card-body\"><h5 class=\"card-title\">" + Results[i].name + "</h5><p class=\"card-text\"></p><a href=\"#movie-info\" class=\"btn btn-primary details-btn\">Details</a> </div> </div> </div>";
                row.append(card)

            }
        } else alert("no results");

    }



    $("#button-addon2").on('click', function() {
        console.log("ay 7aga");
        var Results = []

        var request = 'http://www.omdbapi.com/?apikey=3f08b75d&s=';

        let m = $("#search-addon").val();
        console.log(m);
        if (m) {
            request += "\"" + m + "\"";
            $.getJSON(request, function(data) {

                let mArr = data.Search;
                if (data.Response) {

                    for (var i = 0; i < mArr.length; i++) {

                        title = mArr[i].Title;
                        poster = mArr[i].Poster;
                        type = mArr[i].Type;
                        year = mArr[i].Year;
                        Results.push(new mediaObject(title, year, type, poster));
                    }

                    updateUIAfterSearch(Results);


                    $(".details-btn").on('click', getMediaDeatails);

                } else alert("reponse failed");
            });

        } else alert('please enter a valid name');



    });


    function getMediaDeatails() {

        console.log();


        var request = 'http://www.omdbapi.com/?apikey=3f08b75d&t=';

        let m = $("#search-addon").val();
        console.log(m);
        if (m) {
            request += "\"" + $(this).siblings(".card-title").text() + "\"";
            $.getJSON(request, function(data) {

                console.log(data);
                let info = $("#movie-info");
                info.css("display", "block");
                console.log("");
                console.log(data.Poster);
                info.find("img").attr('src', data.Poster);

            });

        }




    }

});