/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
var tosses = [];
var totalTosses;
var winningValue;

function add(num) {
    tosses.unshift(num);
    if (tosses.length > 2) {
        tosses.pop();
    }
    var sum = 0;
    for (var i = 0; i < tosses.length; i++) {
        sum += tosses[i];
    }
    totalTosses = sum;
}


function initPlay() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.querySelector('.btn-roll').style.display = "inline";
    document.querySelector('.btn-hold').style.display = "inline";
    document.querySelector('.dice').style.display = "none";
    document.querySelector('.dice2').style.display = "none";
    document.querySelector('#score-0').textContent = "0";
    document.querySelector('#score-1').textContent = "0";
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

document.querySelector('.btn-roll').addEventListener('click', function() {
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var dice1DOM = document.querySelector('.dice');
    var dice2DOM = document.querySelector('.dice2');
    dice1DOM.style.display = 'block';
    dice2DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + ".png";
    dice2DOM.src = 'dice-' + dice2 + ".png";
    if (dice1 !== 1 && dice2 !== 1) {
        add(dice1);
        add(dice2);
        roundScore += dice1 + dice2;
        if (totalTosses === 12) {
            nextPlayer();
        }
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        console.log(tosses);
        console.log(totalTosses);
    } else {
        tosses = [];
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        var playerScore = document.querySelector('#score-' + activePlayer);
        playerScore.textContent = scores[activePlayer];
        if (scores[activePlayer] >= winningValue) {
            playerScore.textContent = "WINNER!";
            document.querySelector('.btn-roll').style.display = "none";
            document.querySelector('.btn-hold').style.display = "none";
            document.querySelector('.dice').style.display = "none";
            document.querySelector('.dice2').style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        };
    }
});

document.querySelector('.btn-score').addEventListener('click', function() {
    winningValue = document.querySelector('.score-input').value;
    console.log(winningValue);
});

document.querySelector('.btn-new').addEventListener('click', initPlay);

window.onload = initPlay;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';