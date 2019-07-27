/*
 * Create a list that holds all of your cards
 */
let cardsList = [
  'fa-anchor',
  'fa-anchor',
  'fa-bomb',
  'fa-bomb',
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// select unorderd list with class deck
let ulDeck = document.querySelector('.deck');

/**
* @description create li element with attribute data-info
* @param {string} className
* @returns liElement
*/
function createLi (className){
  let liElement = document.createElement('li');
  liElement.classList.add('card');
  liElement.setAttribute('data-info', className);
  return liElement;
}

/**
* @description create i element
* @param {string} className
* @returns iElement
*/
function createI (className){
  let iElement = document.createElement('i');
  iElement.classList.add('fa', className);
  return iElement;
}

/**
* @description creating cards and adding them to deck
*/
function createAllCards(){
  let cards = shuffle(cardsList);
  for (let card of cards) {
    let li = createLi(card);
    let i = createI(card);
    li.appendChild(i);
    ulDeck.appendChild(li);
  }
}

createAllCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// twoCards to check the number of opened cards
// firstCard to store the first opened card
// secondCard to store the second opened card
// selectedCard to store the current opened card
// lastTarget to store the previous opened card
// checkM is a flag to finish checkMatch() function before listening to another click
// youWon to indicate the finish of the game by winning it
// movesNumber to count the number of moves
// startGame to start the timer
// timeInterval to stop the timer by clearing interval clearInterval()
  let twoCards = 0;
  let firstCard;
  let secondCard;
  let selectedCard;
  let lastTarget;
  let checkM = true;
  let youWon = 0;
  let movesNumber = 0;
  let startGame = false;
  let timeInterval;

// Count up timer from https://stackoverflow.com/a/5517836
  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds');
  let timeInSeconds = 0;

/**
* @description time counter function
*/
  function setCounter() {
    ++timeInSeconds;
    seconds.innerText = pad(timeInSeconds%60);
    minutes.innerText = pad(parseInt(timeInSeconds/60));
  }

/**
* @description converting time to string
* @param {number} timeInNumbers
* @returns timeString
*/
  function pad(timeInNumbers) {
    let timeString = timeInNumbers + '';
    if (timeString.length<2) {
      return '0' + timeString;
    }
    else {
      return timeString;
    }
  }

// modal to select the modal
// timePanel to select time span in the score panel
// countedTime to select time span in the modal
// mClose to select the close button in the modal
// movesN to select moves span in the score panel
// movesM to select moves span in the modal
// starOne to starFive is to select all the stars in the score panel
// restart to select restart button in the score panel
// replay to select replay button in the modal
// stars to select stars unorderd list in the score panel
// mStars to select stars unorderd list in the modal
  let modal = document.querySelector('.modal');
  let timePanel = document.querySelector('.time');
  let countedTime = document.querySelector('.counted-time');
  let mClose = document.querySelector('.modal-close');
  let movesN = document.querySelector('.moves');
  let movesM = document.querySelector('.modal-moves');
  let starOne = document.querySelectorAll('.fa-star')[0];
  let starTwo = document.querySelectorAll('.fa-star')[1];
  let starThree = document.querySelectorAll('.fa-star')[2];
  let starFour = document.querySelectorAll('.fa-star')[3];
  let starFive = document.querySelectorAll('.fa-star')[4];
  let restart = document.querySelector('.restart');
  let replay = document.querySelector('.modal-replay');
  let stars = document.querySelector('.stars');
  let mStars = document.querySelector('.modal-stars');

/**
* @description restart game function
*/
function restartGame(){
  // remove cards from the deck
  for (let i=0; i<cardsList.length; i++) {
    ulDeck.removeChild(ulDeck.firstElementChild);
  }
  // initialize varibles
  firstCard = null;
  secondCard = null;
  lastTarget = null;
  selectedCard = null;
  movesNumber = 0;
  movesN.innerText = '0';
  youWon = 0;
  twoCards = 0;
  checkM = true;
  startGame = false;
  // initialize stars rating
  starFive.classList.add('fa-star');
  starFive.classList.remove('fa-star-o');
  starFour.classList.add('fa-star');
  starFour.classList.remove('fa-star-o');
  starThree.classList.add('fa-star');
  starThree.classList.remove('fa-star-o');
  starTwo.classList.add('fa-star');
  starTwo.classList.remove('fa-star-o');
  // initialize timer
  minutes.innerText = '00';
  seconds.innerText = '00';
  // stop timer
  clearInterval(timeInterval);
  timeInSeconds = 0;
  // create a new shuffled cards and add them to the deck
  createAllCards();
}

// restart & replay buttons click listeners to restart the game
restart.addEventListener('click', restartGame);
replay.addEventListener('click', restartGame);

// The close button click listener to hide the modal
mClose.addEventListener('click', function() {
  modal.style.display = 'none';
});

// window click listener to hide the modal
window.addEventListener('click', function(even) {
  if (even.target == modal) {
    modal.style.display = 'none';
  }
});

/**
* @description flip function to flip cards when any click happend on them
*/
function flip(eve) {
  // start timer
  if(!startGame){
    timeInterval = setInterval(setCounter, 1000);
    startGame = true;
  }
  // check if checkMatch() function is currently finished
  if(checkM){
    if(eve.target.nodeName === 'LI'){
      eve.target.classList.add('open', 'show');
      selectedCard = eve.target;
      twoCards++;

      // check if this is the first card to store
      if (twoCards === 1){
        firstCard = selectedCard;
        lastTarget = selectedCard;
      }
      // check if this is the second card to store
      else if (twoCards === 2){
        // check if the currently selected card is not the previous selected card
        if(lastTarget === selectedCard){
          selectedCard = null;
          twoCards--;
          return;
        }
        else{
          secondCard = selectedCard;
          // after storing firstCard and secondCard, then check matching between them
          checkMatch();
          twoCards = 0;
        }
      }
    }
  }
  // check if checkMatch() function is currently in progress
  else {
    return;
  }
}

/**
* @description checkMatch function to check the matching between cards
*/
function checkMatch() {
  // checkMatch() function is currently is currently in progress
  checkM = false;
  // get data-info attribute of the two cards
  let firstInfo = firstCard.getAttribute('data-info');
  let secondInfo = secondCard.getAttribute('data-info');
  if(firstInfo != secondInfo){
    // the two cards is different
    setTimeout(function hideCards() {
      // hide the two cards after 1 second
      firstCard.classList.remove('open', 'show');
      secondCard.classList.remove('open', 'show');
      firstCard = null;
      secondCard = null;
      // increase the number of moves
      movesNumber++;
      // remove stars based on the number of moves
      removeStars();
      movesN.innerText = movesNumber;
      // checkMatch() function has finished
      checkM = true;
    }, 1000);
  }
  else {
    // the two cards have the same icon
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    firstCard = null;
    secondCard = null;
    movesNumber++;
    removeStars();
    movesN.innerText = movesNumber;
    // increase the number of pairs that have been matched with each other
    youWon++;
    // if it reaches 8, so the game has finished
    if(youWon === 8){
      // stop timer
      clearInterval(timeInterval);
      // add stars rating to the modal
      mStars.innerHTML = stars.innerHTML;
      // add time to the modal
      countedTime.innerText = timePanel.innerText;
      // add the number of moves to the modal
      movesM.innerText = movesNumber;
      // display the modal
      modal.style.display = 'block';
    }
    // checkMatch() function has finished
    checkM = true;
  }
}

/**
* @description function to remove stars based on the number of moves
*/
function removeStars() {
  if (movesNumber===15){
    starFive.classList.remove('fa-star');
    starFive.classList.add('fa-star-o');
  }
  else if (movesNumber===20) {
    starFour.classList.remove('fa-star');
    starFour.classList.add('fa-star-o');
  }
  else if (movesNumber===25) {
    starThree.classList.remove('fa-star');
    starThree.classList.add('fa-star-o');
  }
  else if (movesNumber===30) {
    starTwo.classList.remove('fa-star');
    starTwo.classList.add('fa-star-o');
  }
}

/**
* @description start listening to the click events
*/
function startListen(){
  ulDeck.addEventListener('click', flip);
}

startListen();
