let player_score = 0;
let computer_score = 0;


function playRound(playerSelection, computerSelection) {
    console.log(playerSelection, computerSelection);

    if (playerSelection === computerSelection){
        alert("Tie!");
    }
    if (
        (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
        (playerSelection === 'PAPER' && computerSelection === 'ROCK')
    ) {
        alert("You win!");
        player_score ++;
    }
    if (
        (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
        (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
        (computerSelection === 'PAPER' && playerSelection === 'ROCK')
    ) {
        alert("Computer win!");
        computer_score++;
    }
}

function getPlayerSelection(){
    const playerInput = prompt("Give your selection: ", "");
    const playerChoice = playerInput.toUpperCase();
    return playerChoice;
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

function game(winner){

    for (let i = 0; i < 5; i++){
        const computerSelection = getComputerChoice();
        const playerSelection = getPlayerSelection();
         playRound(playerSelection, computerSelection);
    }

    if (player_score > computer_score){
            alert("Player won this game " + player_score + " to " + computer_score);
    }
    if (player_score < computer_score){
            alert("Computer won this game " + computer_score + " to " + player_score);
    }else if(player_score === computer_score){alert("Tie in best of 5")}
}

game();