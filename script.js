$(document).ready(function() {
    //When input button is clicked, display forecast
    $("button").on("click", function() {


        event.preventDefault();
        //empty out last search
        $(".weatherNow").empty();
        
        var city = $("#city").val();
        console.log(city);
    
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=4983d208fd371cf8ba56cd03550e6ec5&q=" + city;
        
        //console.log(queryURL);

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            //Show current weather
            var cityName = response.name
            var appendName = $("<h3>")
            appendName.text(cityName + " (" + moment().format("MMM Do YY" + ")"))
            $(".weatherNow").append(appendName)
            
            var temp = response.main.temp
            var appendTemp = $("<p>")
            appendTemp.text("Temperature: " + temp + "°F")
            $(".weatherNow").append(appendTemp)
            
            var humidity = response.main.humidity
            var appendHumidity = $("<p>")
            appendHumidity.text("Humidity: " + response.main.humidity + "%")
            $(".weatherNow").append(appendHumidity)
            
            var windSpeed = response.wind.speed
            var appendWind = $("<p>")
            appendWind.text("Wind Speed: " + response.wind.speed + " mph")
            $(".weatherNow").append(appendWind)
            console.log(response.coord.lat)
            var lat = response.coord.lat
            var lon = response.coord.lon
            //console.log(response.weather[0].icon)
            var icon = $("<img>")
            icon.attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            $(".weatherNow").append(icon)

            cityEntry = $("<li>")
            cityEntry.text(cityName)
            $(".list-group").append(cityEntry)
            
            var queryUV = "https://api.openweathermap.org/data/2.5/onecall?&appid=4983d208fd371cf8ba56cd03550e6ec5&q=&lat=" + lat + "&lon=" + lon
            
            //Second ajax call for UV index & 5 day forecast
            
            $.ajax({
            url: queryUV,
            method: "GET"
            }).then(function(uv) {
            console.log(uv)
            var uvIndex = uv.current.uvi
            var appendUV = $("<button>")
            var uvText = $("<p>")
            uvText.text("UV Index: ")
            appendUV.text(uvIndex)
            uvText.append(appendUV)
            $(".weatherNow").append(uvText)
            
            if (uvIndex <= 2) {
                appendUV.addClass("low")
            }
            if (uvIndex >= 3 && uvIndex <= 5) {
                appendUV.addClass("mod")
            }
            if (uvIndex >= 6 && uvIndex <= 7) {
                appendUV.addClass("high")
            }
            if (uvIndex >= 8 && uvIndex <= 10) {
                appendUV.addClass("vhigh")
            }
            if (uvIndex >= 11) {
                appendUV.addClass("extreme")
            }
            
            //Loop for 5 day forecast.
            for (i = 1; i <= 5; i++) {
                //console.log(uv.daily[i].temp.max)
                
                var k = uv.daily[i].temp.max
                var fiveTemp = Math.floor((k - 273.15) * 1.80 + 32)
                //console.log(fiveTemp)
                
                var fiveDiv = $("<div class='card'>")
                $("#5day" + [i]).append(fiveDiv)

                var appendDate = $("<p>")
                appendDate.text(moment().add([i], "days").format("MMM Do YY"))
                fiveDiv.append(appendDate)

                var appendIcon = $("<img>")
                appendIcon.attr("src", "https://openweathermap.org/img/w/" + uv.daily[i].weather[0].icon + ".png")
                fiveDiv.append(appendIcon)

                var appendFiveTemp = $("<p>")
                appendFiveTemp.text("Temp: " + fiveTemp + "°F")
                fiveDiv.append(appendFiveTemp)
                

                var fiveHumidity = uv.daily[i].humidity
                var appendFiveHum = $("<p>")
                appendFiveHum.text("Humidity: " + fiveHumidity + " %")
                fiveDiv.append(appendFiveHum)
            }
            })
        })
    })
})
