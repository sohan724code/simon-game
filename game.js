var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;

var level = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  //when clikc a button
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    //call starover function
    startOver();

  }

}

//creat a new function called next sequence
function nextSequence() {
  // once nextSequence is called then userClickedPattern have to be emety
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
  //generate a random number
  var randomNumber = Math.floor(Math.random() * 4);
  //generrate a random color
  var randomChosenColour = buttonColours[randomNumber];
  //push randomChosenColour to the end of game gamePattern
  gamePattern.push(randomChosenColour);
  //select button using jquery
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // play sound
  playSound(randomChosenColour);

}


//for play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//button Animaton
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}