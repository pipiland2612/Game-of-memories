
function makeSound(name) {
    var audio = new Audio("./sounds/"+name+".mp3")
    audio.volume = 0.1;
    audio.play();
}

function makeAnimation(name) {
    $("#"+name).addClass("pressed");
    setTimeout(() => {
        $("#"+name).removeClass("pressed");
    }, 100);
}

function makeFlash (name) {
    $("#"+ name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

var color = ["yellow", "red", "blue","green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence (){
    var randomNumber = Math.floor(Math.random()*4);
    var chosenColor = color[randomNumber];
    gamePattern.push(chosenColor);
    makeSound(chosenColor);
    makeFlash(chosenColor);
    level++;
    $("h1").text("Level "+level);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
                userClickedPattern = [];
            }, 500);

        }
    }else {
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        makeSound("wrong");
        gameOver();
    }
}

function gameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
}

$(".btn").click(function(){
    if (gamePattern.length > 0) {
        userClickedPattern.push(this.id)
        checkAnswer(userClickedPattern.length - 1);
        makeSound(this.id);
        makeAnimation(this.id);
    }
});

$(document).keydown(function(){
    if(gamePattern.length === 0) {
        nextSequence();
    }
})