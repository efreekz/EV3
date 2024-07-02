// Get the game state elements
const deckCount = document.getElementById('deck-count');
const playerHandCounts = document.querySelectorAll('.player-hand-count');
const trickCount = document.getElementById('trick-count');
const score = document.getElementById('score');
score.textContent = 0;let deck = [];

let players = [
  { name: 'Player 1', hand: [] },
  { name: 'Player 2', hand: [] },
  { name: 'Player 3', hand: [] },
  { name: 'Player 4', hand: [] }
];
let trick = [];
let score = 0;
score.textContent = 1;

function initialize() {
  // ... existing code ...

  // Add event listener to shuffle deck button
  dealCards();
  // ... existing code ...
}



// Function to update the game state
function updateGameState() {
  deckCount.textContent = deck.length;
  playerHandCounts.forEach((hand, index) => {
    hand.textContent = players[index].hand.length;
  });
  trickCount.textContent = trick.length;
  score.textContent = score;
}


// Function to shuffle the deck
function shuffleDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const ranks = ['Ace', '9', '10', 'Jack', 'Queen', 'King'];
  deck = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ suit, rank });
    });
  });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to deal the cards
function dealCards() {
  players.forEach(player => {
    player.hand = [];
  });
  for (let i = 0; i < 5; i++) {
    players.forEach(player => {
      player.hand.push(deck.pop());
    });
  }
}

// Function to play a card
function playCard(card) {
  trick.push(card);
  updateGameState();
}

// Function to determine the winner of the trick
function determineTrickWinner() {
  const winningCard = trick.reduce((winningCard, currentCard) => {
    if (currentCard.suit === trick[0].suit && currentCard.rank > winningCard.rank) {
      return currentCard;
    } else if (currentCard.suit !== trick[0].suit && winningCard.suit === trick[0].suit) {
      return winningCard;
    } else {
      return currentCard;
    }
  }, trick[0]);
  return players.find(player => player.hand.includes(winningCard));
}

// Function to update the score
function updateScore() {
  const winner = determineTrickWinner();
  if (winner) {
    score++;
    winner.score++;
  }
  updateGameState();
}

// Initialize the game
shuffleDeck();
dealCards();
updateGameState();