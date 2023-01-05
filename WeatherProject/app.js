const { json } = require("express");
const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");


app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

    const apiKey = "4d124a371061c805ed445d6be8b6e70f";
    const unit = "metric";
    
     
    var city = req.body.location;
    var countryIsoCode = req.body.countryisocode;

    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+","+countryIsoCode+"&APPID="+ apiKey +"&unit="+unit;
    console.log(url);

    https.get(url, function(response){
        console.log(response.statusCode);

        if (response.statusCode === 200){
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                const temperature = weatherData.main.temp;
                const tempFeelLike = weatherData.main.feels_like;
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                res.write("<h1> The weather is currently " + weatherDescription + " in "+city +", "+countryIsoCode +"</h1>");
                res.write('<img src="http://openweathermap.org/img/wn/'+icon+'@2x.png" alt="weather image">');
                res.write("<h3>The temperature in London in "+ temperature+" degrees </h3>");
                res.write("It feels like" +tempFeelLike);
                res.send();
            });
        }else {
            res.write("<p>Error " + response.statusCode + "</p>");
        }

        

    });
});

app.listen(3000, function(){
    console.log("Server is running on port 300")
});