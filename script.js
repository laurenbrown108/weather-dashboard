
$(document).ready(function() {

    

    $("button").on("click", function() {
        event.preventDefault();
        //empty out last search
        var city = $("#city").val();
        console.log(city);
    
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=4983d208fd371cf8ba56cd03550e6ec5&q=" + city;
        
        //console.log(queryURL);

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            
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
            //console.log(response.weather.icon)
            var queryUV = "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=4983d208fd371cf8ba56cd03550e6ec5&q=&lat=" + lat + "&lon=" + lon
            
            $.ajax({
            url: queryUV,
            method: "GET"
            }).then(function(uv) {
            
            var uvIndex = uv[0].value
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
            })
        })
        

    })
})
