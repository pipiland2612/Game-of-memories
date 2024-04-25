
//function make sound
function playSounds(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.2;
    audio.play();
}

// make animation
function makeAnimation (color) {
    $("#"+ color).addClass("pressed");
    setTimeout(() => {
        $("#"+ color).removeClass("pressed");
    }, 100);
}

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// define the function how the game gonna work
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSounds(randomChosenColour);
    level++;
    $("#level-title").text("Level "+level);
}

// click 
$(".btn").click(function(){
    if (gamePattern.length > 0) {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSounds(userChosenColour);
        makeAnimation(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
        console.log(gamePattern);
        console.log(userClickedPattern);
    } 
})

var level = 0;
// keyboard detecting
$(document).keydown(function(event){
    if (gamePattern.length === 0) {
        nextSequence();
        $("#level-title").text("Level "+level);
    } 
})

// check answer
function checkAnswer (currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
                userClickedPattern = [];
            }, 1000)

        }       
    } else {
        playSounds("wrong");
        $("body").addClass("game-over");
        setTimeout( ()=>$("body").removeClass("game-over"), 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// start over 
function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}