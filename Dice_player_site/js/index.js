dice1Index = Math.floor(Math.random() * 6) + 1;
dice2Index = Math.floor(Math.random() * 6) + 1;
document.querySelector(".dice .img1").setAttribute("src", "images/dice"+dice1Index+".png");
document.querySelector(".dice .img2").setAttribute("src", "images/dice"+dice2Index+".png");


document.querySelector("h1").textContent = getStatus(dice1Index, dice2Index);

function getStatus(dice1Index, dice2Index){
    if (dice1Index > dice2Index){
        return "Player1 Wins"
    }else if (dice2Index > dice1Index){
        return "Player2 Wins"
    }
    else{
        return "Draw"
    }

}