var gameInProgress = false
var  buttonColor = ["green", "red", "yellow", "blue"]
var gamePattern = []
var clickCount = 0


function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var color = buttonColor[randomNumber];
    gamePattern.push(color);
    console.log(gamePattern)
}

function animateNext() {
    var currentLevel = $("h1").text();
    var newLevel;
    if (currentLevel.startsWith("Level")) {
        var levelNumber = parseInt(currentLevel.split(" ")[1]);
        newLevel = "Level " + (levelNumber + 1);
    } else{
        newLevel = "Level 1"
    };
    $("h1").text(newLevel);

    var lastItem = gamePattern[gamePattern.length - 1];
    var sound = new Audio("./sounds/"+lastItem+".mp3");
    setTimeout(function(){
        $("."+lastItem).addClass("chosen");
        sound.play();
    }, 450);
    
    setTimeout(function(){
        $("."+lastItem).removeClass("chosen");
    }, 600);
}

function animateClick(clickedColor){
    var clickSound = new Audio("./sounds/"+clickedColor+".mp3")
    $("."+clickedColor).addClass("pressed");
    clickSound.play();
    setTimeout(function() {$("."+clickedColor).removeClass("pressed")},
                150);
}

function startGame(){
    if (gameInProgress==false){
    gameInProgress = true;
    clickCount = 0;
    nextSequence();
    animateNext();}

}

function endGame(){
    var wrongSound = new Audio("./sounds/wrong.mp3");
    gameInProgress = false;
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass('red');
    wrongSound.play();
    setTimeout(function(){
        $("body").removeClass('red');
    }, 150);
    gamePattern = [];
}

function handleClick(event){
    // console.log(event.target);
    if (gameInProgress){
        if (buttonColor.includes(event.target.id)){
            var clickedColor = event.target.id;
            animateClick(clickedColor);
            if (clickedColor == gamePattern[clickCount]){
                if (clickCount == gamePattern.length-1){
                    nextSequence();
                    animateNext();
                    clickCount = 0;
                } else{clickCount++}
            } else {
                endGame();
                clickCount = 0
            }
        }
    console.log(clickCount);

}};


$(document).keydown(startGame);
$(document).click(handleClick)