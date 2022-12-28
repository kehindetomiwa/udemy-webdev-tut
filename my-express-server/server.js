const express = require("express");

var app = express();


app.get("/Hello", function(request, response){
    console.log(request);
    response.send("<h1> Hello clear</h1>")

});

app.listen(4000, function(){
    console.log("Server started on port")
});