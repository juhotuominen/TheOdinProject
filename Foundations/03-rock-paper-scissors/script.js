let player_score = 0;
let computer_score = 0;


rockButton.addEventListener("click", ()=> game("ROCK"))
paperButton.addEventListener("click", ()=> game("PAPER"))
scissorsButton.addEventListener("click", ()=> game("SCISSORS"))

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection){
        document.getElementById('situation').innerHTML = "Round was a tie!";
    }
    if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK')
    ) {
        player_score ++;
        document.getElementById('player_score').innerHTML = player_score;
        document.getElementById('situation').innerHTML = "Player won a round!";
    }
    if (
        (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
        (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
        (computerSelection === 'PAPER' && playerSelection === 'ROCK')
    ) {
        computer_score++;
        document.getElementById('computer_score').innerHTML = computer_score;
        document.getElementById('situation').innerHTML = "Computer won a round!";
    }
}



function getComputerChoice(){
    var choices = [
        "ROCK",
        "PAPER",
        "SCISSORS"
    ];
     var random = Math.floor(Math.random()*choices.length);
    return choices[random];
}

function game(playerSelection){
    document.getElementById('player_score').innerHTML = player_score;
    document.getElementById('computer_score').innerHTML = computer_score;
    document.getElementById('situation').innerHTML = "First to 5 wins!";

    
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
    if(player_score===5){
        document.getElementById('situation').innerHTML = "You won!";
        reset();
    }
    else if (computer_score === 5){
        document.getElementById('situation').innerHTML = "You lost!";
        reset();
    }
}

function reset(){
    player_score = 0;
    computer_score = 0;
    document.getElementById('player_score').innerHTML = player_score;
    document.getElementById('computer_score').innerHTML = computer_score;
}


game();