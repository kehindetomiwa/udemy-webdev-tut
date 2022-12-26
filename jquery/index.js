colorList = ["red", "yellow", "blue", "black", "purple"];
colorListLength = colorList.length

$(document).keypress(function(event){
    corIndex =  Math.floor(Math.random() * colorListLength);
    $("h1").text(event.key).css("color", colorList[corIndex]);

});