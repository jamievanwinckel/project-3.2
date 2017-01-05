//Created by Jamie Van Winckel

var unshuffledDeck = [_2h, _2s, _2d, _2c, _3h, _3s, _3d, _3c, _4h, _4s, _4d, _4c,
  _5h, _5s, _5d, _5c,_6h, _6s, _6d, _6c, _7h, _7s, _7d, _7c, _8h, _8s, _8d, _8c,
  _9h, _9s, _9d, _9c, _10h, _10s, _10d, _10c, aceh, aces, aced, acec,jackh, jacks,
  jackd, jackc, queenh, queens, queend, queenc, kingh, kings, kingd, kingc];

var playerCards = [];
var dealerCards = [];
var shuffledDeck = [];

shuffledDeck = shuffleTheDeck(unshuffledDeck);
var nextCardToPick = 0;
var nextCardForPlayer = 0;
var nextCardForDealer = 0;

function shuffleTheDeck(unshuffledDeck) {
    //courtesy of w3schools.com, from: http://www.w3schools.com/js/js_array_sort.asp
    var randomizedDeck = unshuffledDeck.sort(function(a, b){return 0.5 - Math.random()});
    var inputDeck, outputDeck;
    inputDeck = randomizedDeck;
    for (i = 0; i < 5; i++) {
      outputDeck = cutTheDeck(inputDeck);
      inputDeck = outputDeck;
    }
    return outputDeck;
}
function cutTheDeck(inputDeck) {
  var cutDeck = [];
  //choose random number from 0-51
  var randomNumber = Math.floor(Math.random() * 51);
  //take bottom group and assign to beginning of array
  var bottomOfDeck = inputDeck.slice(randomNumber);
  //assign top group to the latter part of array
  var topOfDeck = inputDeck.slice(0,randomNumber);
  cutDeck = bottomOfDeck.concat(topOfDeck);
  return cutDeck;
}
function nextCard() {
  var cardToPick = shuffledDeck[nextCardToPick];
  nextCardToPick++;
  //make if statement for whencards are out, shuffle a new deck
  if (shuffledDeck == 51) {
    shuffleTheDeck();
  }
  return cardToPick;
}
function firstDeal() {
  oneCardToPlayer();
  oneCardToDealer();
  oneCardToPlayer();
  oneCardToDealer();
  displayPlayerCards();
  displayDealerCards();
}
function displayPlayerCards() {
  for (i = 0; i < playerCards.length; i++) {
    var divName = "p" + (i + 1);
    var imgName = "pid" + (i + 1);
    var divHolder = document.getElementById(divName);
    divHolder.className="boxy";
    document.getElementById(divName).className="boxy";
    document.getElementById(imgName).src = playerCards[i].img;
  }
}
function displayDealerCards() {
  for (i = 0; i < dealerCards.length; i++) {
    var divName = "d" + (i + 1);
    var imgName = "id" + (i + 1);
    var divHolder = document.getElementById(divName);
    divHolder.className="boxy";
    document.getElementById(divName).className="boxy";
    var purple = document.getElementById(imgName);
    document.getElementById(imgName).src = dealerCards[i].img;
  }
}
function sumOfCards(cards) {
  var sumTotal = 0;
  for (i = 0; i < cards.length; i++) {
    sumTotal += cards[i].maxValue;
    //make sum of min values
    var sumOfMinValues;
    //make sum of max values
    var sumOfMaxValues;
  }
  return sumTotal;
}
function oneCardToPlayer() {
  playerCards[nextCardForPlayer] = nextCard();
  nextCardForPlayer++;
}
function oneCardToDealer() {
  dealerCards[nextCardForDealer] = nextCard();
  nextCardForDealer++;
}
function hitMe() {
  oneCardToPlayer();
  displayPlayerCards();
  if (sumOfCards(playerCards) > 21) {
    var btn = document.getElementById("hitMe");
    btn.disabled = true;
    btn = document.getElementById("noMoreCards");
    btn.disabled = true;
    var playerScore = getCookie("playerScore");
    if (isNaN(playerScore)) {
      playerScore = 0;
    }
    playerScore++;
    setCookie("playerScore", playerScore, 1);
    document.getElementById("finalResults").innerHTML = "You Busted " + playerScore + " Times in the Last Day";
  }
}
function noMoreCards() {
  while (sumOfCards(dealerCards) < 17) {
    oneCardToDealer();
    displayDealerCards();
  }
  var holdPlayerScore = sumOfCards(playerCards);
  var holdDealerScore = sumOfCards(dealerCards);
  if (holdPlayerScore > 21 && holdDealerScore > 21) {
    bothBust();
  }
  else if (holdDealerScore > 21 && holdPlayerScore <= 21) {
    playerWins();
  }
  else if (holdPlayerScore > holdDealerScore && holdPlayerScore < 21) {
    playerWins();
  }
  else if (holdPlayerScore == 21 && holdDealerScore != 21) {
    playerWins();
  }
  else if (holdDealerScore > holdPlayerScore && holdDealerScore < 21) {
    dealerWins();
  }
  else if (holdPlayerScore == holdDealerScore) {
    dealerWins();
  }
  else if (holdDealerScore == 21) {
    dealerWins();
  }
}
function bothBust() {
  document.getElementById("finalResults").innerHTML = "You Both Busted!";
}
function playerWins() {
  document.getElementById("finalResults").innerHTML = "You Won!";
}
function dealerWins() {
  document.getElementById("finalResults").innerHTML = "The Dealer Won!";
}
function newGame() {
  document.getElementById("newGame").reset();
}
