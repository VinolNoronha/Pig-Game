'use strict';

// selecting elements
const finalScore0 = document.querySelector('#score--0');
const finalScore1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const diceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');

//starting conditions
let playing, holdScore, currentPlayer, totalScore;

const init = function () {
  finalScore0.textContent = 0;
  finalScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  playing = true;
  holdScore = 0;
  currentPlayer = 0;
  totalScore = [0, 0];
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  diceImg.classList.add('hidden');
};

init();

const switchPlayer = function () {
  holdScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  currentPlayer = currentPlayer == 0 ? 1 : 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
};

//User rolling the dice
diceBtn.addEventListener('click', function () {
  if (playing) {
    //Random Number Generation
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    diceImg.src = `dice-${randomNumber}.png`;
    diceImg.classList.remove('hidden');
    //Checking if the num generated is 1
    if (randomNumber !== 1) {
      holdScore += randomNumber;
      //adding the generated number to the temp score holder
      document.querySelector(`#current--${currentPlayer}`).textContent =
        holdScore;
    } else {
      //Switch player
      switchPlayer();
    }
  }
});

//Hold Button
holdBtn.addEventListener('click', function () {
  if (playing) {
    //adding the temp score to the total score of the active player
    totalScore[currentPlayer] += holdScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      totalScore[currentPlayer];
    if (totalScore[currentPlayer] >= 20) {
      //current player wins
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      //the player switches
      switchPlayer();
    }
  }
});

//reset button
newGameBtn.addEventListener('click', init);
