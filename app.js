//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//                              Global Variables / Constants
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

// Moves
const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scissor = document.querySelector('.scissor')
const lizard = document.querySelector('.lizardField')
const spock = document.querySelector('.spockField')

//Sections
const beforeWrapper = document.getElementById('beforeWrapper')
const afterWrapper = document.getElementById('afterWrapper')
const resultField = document.querySelector('#resultContainer')

//player result field
const playerChoiceResult = document.getElementById('playerChoiceResult')
const playerChoiceButton = document.getElementById('playerChoiceButton')

//computer result field
const computerChoiceResult = document.getElementById('computerChoiceResult')
const computerChoiceButton = document.getElementById('computerChoiceButton')

const fields = document.querySelectorAll('.innerButton')


// Scoring
let playerCount = parseInt(localStorage.getItem('playerScore')) || 0;
const currentScore = document.getElementById('currentScore')
currentScore.textContent = playerCount;

//Rules
const rules = document.getElementById('rules')
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
    field.addEventListener('click', (e) =>{
        const value = e.target.value
        checkWin(value)
    })
})

// this function checks the winner by using Modulo-Mapping
// the first operand is the player and the second the computer
// result = (2 - 2 + 3) % 3 equals to 0 so it returns a draw
// result = (0 - 2 + 3) % 3 equals to 1 so it returns a player win
// result = (1 - 2 + 3) % 3 equals to 2 so it returns a computer win
// +3 makes sure that the result is never negative
// % returns the rest of the operation and so the final result
function checkWin(playerInput){
    let computerChoice = rand()
    let playerChoice = parseInt(playerInput)
    let result = (playerChoice - computerChoice + 3) % 3

    //console logging for the moment
    console.log('------------------------------------')
    console.log('Computers Choice: ', computerChoice)
    console.log('Players Choice: ', playerChoice)

    //removing existing classes from the buttons
    playerChoiceResult.classList.remove('blue', 'yellow', 'red');
    playerChoiceButton.classList.remove('paper', 'scissor', 'rock');
    computerChoiceResult.classList.remove('blue', 'yellow', 'red');
    computerChoiceButton.classList.remove('paper', 'scissor', 'rock');


    switch (result) {
        case 0:
            // draw()
            console.log('draw')
            break
        case 1:
            // playerWin()
            console.log('playerWin')
            playerCount++
            currentScore.textContent = playerCount;
            localStorage.setItem('playerScore', playerCount)
            break
        case 2:
            // computerWin()
            console.log('computerWin')
            break
    }
    //changes the button collors and inner images for the result pages
    switch(computerChoice){
        case 0:
            computerChoiceResult.classList.add('blue')
            computerChoiceButton.classList.add('paper')
            break
        case 1:
            computerChoiceResult.classList.add('yellow')
            computerChoiceButton.classList.add('scissor')
            break
        case 2:
            computerChoiceResult.classList.add('red')
            computerChoiceButton.classList.add('rock')
            break
    }

    switch(playerChoice){
        case 0:
            playerChoiceResult.classList.add('blue')
            playerChoiceButton.classList.add('paper')
            break
        case 1:
            playerChoiceResult.classList.add('yellow')
            playerChoiceButton.classList.add('scissor')
            break
        case 2:
            playerChoiceResult.classList.add('red')
            playerChoiceButton.classList.add('rock')
            break
    }
    afterWrapper.style.display = 'flex'
    beforeWrapper.style.display = 'none'
}

//simple play Again Function
function playAgain(){
    afterWrapper.style.display = 'none'
    beforeWrapper.style.display = 'grid'
}

//toggles the rules menu
rules.addEventListener('click', () => {
    beforeWrapper.style.display = 'none'
    const rulesBtn = document.getElementById('rulesOpen')

    if(rulesBtn.classList.contains('active')){
        rulesBtn.classList.remove('active')
        beforeWrapper.style.display = 'grid'
    }else{
        rulesBtn.classList.add('active')
    }
})

// reset the score
currentScore.addEventListener('click', () =>{
    playerCount = 0
    currentScore.textContent = 0
    localStorage.removeItem('playerScore')
})

window.addEventListener('load', () => {
    beforeWrapper.style.opacity = 1
})
