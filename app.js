//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//                              Global Variables / Constants
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// Moves
const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissor = document.querySelector(".scissor");
const lizard = document.querySelector(".lizard");
const spock = document.querySelector(".spock");

//Sections
const beforeWrapper = document.getElementById("beforeWrapper");
const bonusBeforeWrapper = document.getElementById("bonusBeforeWrapper");

//Left Header
const leftScoreDiv = document.getElementById("leftScoreDiv");
const lizardSpockSpan = document.querySelectorAll(".lsSpan");

const afterWrapper = document.getElementById("afterWrapper");
const resultField = document.querySelector("#resultContainer");

//player result field
const playerChoiceResult = document.getElementById("playerChoiceResult");
const playerChoiceButton = document.getElementById("playerChoiceButton");

//computer result field
const computerChoiceResult = document.getElementById("computerChoiceResult");
const computerChoiceButton = document.getElementById("computerChoiceButton");

const resultSpan = document.getElementById("resultSpan");
const fields = document.querySelectorAll(".innerButton");

const bonusFields = document.querySelectorAll(".innerButtonBonus");

//Modes
let modeSwitch = true;
afterWrapper.style.display = "none";

// Scoring
let playerCount = parseInt(localStorage.getItem("playerScore")) || 0;
const currentScore = document.getElementById("currentScore");
currentScore.textContent = playerCount;

//Rules
const rules = document.getElementById("rules");
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// The Main-Logic for the Oponent
// Each possible output stands for one move (0 = Paper | 1 = Scissor | 2 = Rock)
// The maxNum can be set to a different value to implement a variant with more moves
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
function rand(maxNum = 3) {
  const min = 0;
  let max = maxNum;

  return Math.floor(Math.random() * (max - min)) + min;
}

// adds a EL to every button and calling the checkWin with the values of the clicked button
fields.forEach((field) => {
  field.addEventListener("click", (e) => {
    if (modeSwitch) {
      const value = e.target.value;
      checkWin(value);
    }
  });
});

// this function checks the winner by using Modulo-Mapping
// the first operand is the player and the second the computer
// result = (2 - 2 + 3) % 3 equals to 0 so it returns a draw
// result = (0 - 2 + 3) % 3 equals to 1 so it returns a player win
// result = (1 - 2 + 3) % 3 equals to 2 so it returns a computer win
// +3 makes sure that the result is never negative
// % returns the rest of the operation and so the final result
function checkWin(playerInput) {
  if (modeSwitch) {
    let computerChoice = rand();
    let playerChoice = parseInt(playerInput);
    let result = (playerChoice - computerChoice + 3) % 3;

    //removing existing classes from the buttons
    playerChoiceResult.classList.remove("blue", "yellow", "red");
    playerChoiceButton.classList.remove("paper", "scissor", "rock");
    computerChoiceResult.classList.remove("blue", "yellow", "red");
    computerChoiceButton.classList.remove("paper", "scissor", "rock");

    //main switch
    switch (result) {
      case 0:
        resultSpan.innerHTML = "Draw";
        break;
      case 1:
        resultSpan.innerHTML = "You Win";
        playerCount++;
        currentScore.textContent = playerCount;
        localStorage.setItem("playerScore", playerCount);
        break;
      case 2:
        console.log("computerWin");
        resultSpan.innerHTML = "You Loose";
        break;
    }
    //changes the button collors and inner images for the result page
    switch (computerChoice) {
      case 0:
        computerChoiceResult.classList.add("blue");
        computerChoiceButton.classList.add("paper");
        break;
      case 1:
        computerChoiceResult.classList.add("yellow");
        computerChoiceButton.classList.add("scissor");
        break;
      case 2:
        computerChoiceResult.classList.add("red");
        computerChoiceButton.classList.add("rock");
        break;
    }

    switch (playerChoice) {
      case 0:
        playerChoiceResult.classList.add("blue");
        playerChoiceButton.classList.add("paper");
        break;
      case 1:
        playerChoiceResult.classList.add("yellow");
        playerChoiceButton.classList.add("scissor");
        break;
      case 2:
        playerChoiceResult.classList.add("red");
        playerChoiceButton.classList.add("rock");
        break;
    }
    afterWrapper.style.display = "flex";
    beforeWrapper.style.display = "none";
  } else {
    return;
  }
}

//simple play Again Function (called by a onclick function)
function playAgain() {
  if (modeSwitch) {
    beforeWrapper.style.display = "grid";
    beforeWrapper.style.opacity = "1";
    bonusBeforeWrapper.style.display = "none";
    afterWrapper.style.display = "none";
    leftScoreDiv.style.fontSize = "2rem";
  } else {
    beforeWrapper.style.display = "none";
    bonusBeforeWrapper.style.display = "grid";
    bonusBeforeWrapper.style.opacity = "1";
    afterWrapper.style.display = "none";
    leftScoreDiv.style.fontSize = "1.5rem";
  }
}

//toggles the rules menu
rules.addEventListener("click", () => {
  beforeWrapper.style.display = "none";
  bonusBeforeWrapper.style.display = "none";
  afterWrapper.style.display = "none";
  const rulesBtn = document.getElementById("rulesOpen");

  if (rulesBtn.classList.contains("active")) {
    rulesBtn.classList.remove("active");
    beforeWrapper.style.display = "grid";
  } else {
    rulesBtn.classList.add("active");
  }
});

// reset the score
currentScore.addEventListener("click", () => {
  playerCount = 0;
  currentScore.textContent = 0;
  localStorage.removeItem("playerScore");
});

//page load fade in
window.addEventListener("load", () => {
  beforeWrapper.style.opacity = 1;
});

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||Rock Paper Scissors Reptile Spok|||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

bonusFields.forEach((bonusField) => {
  bonusField.addEventListener("click", (e) => {
    if (!modeSwitch) {
      const value = e.target.value;
      checkWinRPSLS(value);
    }
  });
});

function checkWinRPSLS(playerInput) {
  if (!modeSwitch) {
    let computerChoice = rand(5);
    let playerChoice = parseInt(playerInput);
    let result;

    // 0=Paper, 1=Scissors, 2=Rock, 3=Lizard, 4=Spock
    if (playerChoice === computerChoice) {
      result = 0; // Draw
    } else if (
      (playerChoice === 0 && (computerChoice === 2 || computerChoice === 4)) || // Paper beats Rock and Spock
      (playerChoice === 1 && (computerChoice === 0 || computerChoice === 3)) || // Scissors beats Paper and Lizard
      (playerChoice === 2 && (computerChoice === 1 || computerChoice === 3)) || // Rock beats Scissors and Lizard
      (playerChoice === 3 && (computerChoice === 4 || computerChoice === 0)) || // Lizard beats Spock and Paper
      (playerChoice === 4 && (computerChoice === 1 || computerChoice === 2))    // Spock beats Scissors and Rock
    ) {
      result = 1; // Player wins
    } else {
      result = 2; // Computer wins
    }

    //removing existing classes from the buttons
    playerChoiceResult.classList.remove(
      "blue",
      "yellow",
      "red",
      "cyan",
      "purple"
    );
    playerChoiceButton.classList.remove(
      "paper",
      "scissor",
      "rock",
      "lizard",
      "spock"
    );
    computerChoiceResult.classList.remove(
      "blue",
      "yellow",
      "red",
      "cyan",
      "purple"
    );
    computerChoiceButton.classList.remove(
      "paper",
      "scissor",
      "rock",
      "lizard",
      "spock"
    );

    //main switch
    switch (result) {
      case 0:
        resultSpan.innerHTML = "Draw";
        break;
      case 1:
        resultSpan.innerHTML = "You Win";
        playerCount++;
        currentScore.textContent = playerCount;
        localStorage.setItem("playerScore", playerCount);
        break;
      case 2:
        console.log("computerWin");
        resultSpan.innerHTML = "You Loose";
        break;
    }
    //changes the button collors and inner images for the result page
    switch (computerChoice) {
      case 0:
        computerChoiceResult.classList.add("blue");
        computerChoiceButton.classList.add("paper");
        break;
      case 1:
        computerChoiceResult.classList.add("yellow");
        computerChoiceButton.classList.add("scissor");
        break;
      case 2:
        computerChoiceResult.classList.add("red");
        computerChoiceButton.classList.add("rock");
        break;
      case 3:
        computerChoiceResult.classList.add("purple");
        computerChoiceButton.classList.add("lizard");
        break;
      case 4:
        computerChoiceResult.classList.add("cyan");
        computerChoiceButton.classList.add("spock");
        break;
    }

    switch (playerChoice) {
      case 0:
        playerChoiceResult.classList.add("blue");
        playerChoiceButton.classList.add("paper");
        break;
      case 1:
        playerChoiceResult.classList.add("yellow");
        playerChoiceButton.classList.add("scissor");
        break;
      case 2:
        playerChoiceResult.classList.add("red");
        playerChoiceButton.classList.add("rock");
        break;
      case 3:
        playerChoiceResult.classList.add("purple");
        playerChoiceButton.classList.add("lizard");
        break;
      case 4:
        playerChoiceResult.classList.add("cyan");
        playerChoiceButton.classList.add("spock");
        break;
    }
    afterWrapper.style.display = "flex";
    bonusBeforeWrapper.style.display = "none";
  }
}

//Mode Switch
// true => RPS | false => RPSLS
leftScoreDiv.addEventListener("click", () => {
  modeSwitch = !modeSwitch;
  lizardSpockSpan.forEach((span) => {
    span.classList.toggle("active");
  });
  // Clear all classes from result buttons when switching modes
  playerChoiceResult.classList.remove("blue", "yellow", "red", "cyan", "purple");
  playerChoiceButton.classList.remove("paper", "scissor", "rock", "lizard", "spock");
  computerChoiceResult.classList.remove("blue", "yellow", "red", "cyan", "purple");
  computerChoiceButton.classList.remove("paper", "scissor", "rock", "lizard", "spock");
  currentMode();
});

function currentMode() {
  if (modeSwitch) {
    beforeWrapper.style.display = "grid";
    beforeWrapper.style.opacity = "1";
    bonusBeforeWrapper.style.display = "none";
    afterWrapper.style.display = "none";
    leftScoreDiv.style.fontSize = "2rem";
  } else {
    beforeWrapper.style.display = "none";
    bonusBeforeWrapper.style.display = "grid";
    bonusBeforeWrapper.style.opacity = "1";
    afterWrapper.style.display = "none";
    leftScoreDiv.style.fontSize = "1.5rem";
  }
}
