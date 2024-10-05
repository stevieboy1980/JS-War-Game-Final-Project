//War card game

/**
 * Deck
 * -52 cards ()
 * -Rank
 * -Suit (Heart, Clubs, Diamonds, Hearts)
 * -values
 * -A way to shuffle
 * Dealer
 *
 * Players
 * -Name
 * -Score
 * -Hand
 * -Logic to play the game
 * -Ways to compare the cards
 */

//Deck Class
/** Should have
 * An Array to store the cards
 * An Array to store all the cards ranks
 */
console.log('Welcome to the game!')

/** Deck Class
 * The deck class represents a standard deck of playing cards
 * this.deck: An array that stores card objects
 * ranks: An array of card ranks ace to king
 * suits: An array of the four suits
 */
class Deck {
  constructor() {
    this.deck = [];
    this.ranks = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    this.suits = ["Hearts ♥ ", "Diamonds ♦", "Clubs ♣ ", "Spades ♠"];
  }

  /** Methods
   * createDeck creates a full deck by combining each rank with each suit
   * It iterates over the ranks and suits arrays creating a card object for each combination and pushing it into the deck array
   */

  createDeck() {
    for (let i = 0; i < this.suits.length; i++) {
      for (let j = 0; j < this.ranks.length; j++) {
        let card = {
          name: `${this.ranks[j]} of ${this.suits[i]}`,
          value: j + 1,
        };

        this.deck.push(card);
      }
    }
  }
  /**
   * shuffleDeck
   * This method randomly shuffles the cards in the deck.
   * It uses the Fisher-Yates algorithm to shuffle the deck in place.  This ensures that each card is random and not just in order
   */
  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
}

/** Game Class
 * this class represents the logic of the game
 * Properties
 * Player 1 and Player 2
 * These are the objects that represent the two players
 * Attributes: name, score, hand(Array to store the cards dealt to the player)
 */

class Game {
  constructor() {
    this.player1 = {
      name: "Player 1",
      score: 0,
      hand: [],
    };
    this.player2 = {
      name: "Player 2",
      score: 0,
      hand: [],
    };
  }

  //Method to play the game
  /**
   * playGame method 
   * It manages the overall gameplay, distributing cards, comparing card values, and determining the winner.
   */
  playGame() {
    // Instantiate new deck, create a deck, then shuffle the deck
    const deck = new Deck();
    deck.createDeck();
    deck.shuffleDeck();
// Distributes cards alternately between both players until deck is empty
    while (deck.deck.length !== 0) {
      this.player1.hand.push(deck.deck.shift());
      this.player2.hand.push(deck.deck.shift());
    }

   /**
    * The for loop compares each pair of cards between the players
    * If player 1 has a higher card value, they win a point
    * If player 2 does, they win a point
    * If the cards have the same value it triggers a tie and invokes the resolveTie method.
    */

    for (let i = 0; i < this.player1.hand.length; i++) {
      

      if (this.player1.hand[i].value > this.player2.hand[i].value) {
        this.player1.score++;
        console.log(`
            P1 Card: ${this.player1.hand[i].name}
            P2 Card: ${this.player2.hand[i].name}
            Player 1 wins a point!
            Current Score: p1: ${this.player1.score}, ${this.player2.score}`);
      }else if (this.player2.hand[i].value > this.player1.hand[i].value){
        this.player2.score ++
        console.log(`
            P1 Card: ${this.player1.hand[i].name}
            P2 Card: ${this.player2.hand[i].name}
            Player 2 wins a point!
            Current Score: p1: ${this.player1.score}, ${this.player2.score}`);
      }else {
        console.log(`
            P1 Card: ${this.player1.hand[i].name}
            P2 Card: ${this.player2.hand[i].name}
            Tie: Let the war begin!
            Current Score: p1: ${this.player1.score}, ${this.player2.score}`);
            i=this.resolveTie(i);
      }
    }
    

    if (this.player1.score > this.player2.score){
        console.log (`Player 1 wins!
        Final score: p1: ${this.player1.score}
                     p2: ${this.player2.score}`
        )
    } else if (this.player2.score > this.player1.score){
        console.log (`Player 2 wins!
        Final score: p1: ${this.player1.score}
                     p2: ${this.player2.score}`)
    } else {
        console.log (`Tie! Nobody Wins
        Final Score: p1: ${this.player1.score}
                     p2: ${this.player2.score}`)
    }
  }

  /** resolveTie method
   * This handles the game logic when a tie occurs
   * Each player plays additional cards to break the tie
   * The player with the higher value of the fourth card turned wins the war and earns more points
   * If there is another tie, the war continues until one player wins the war or a player runs out of cards.
   */
  resolveTie(i) {
    const warCards = 3; // Number of additional cards for the war
    let p1Card, p2Card;

    if (i + warCards < this.player1.hand.length && i + warCards < this.player2.hand.length) {
      p1Card = this.player1.hand[i + warCards];
      p2Card = this.player2.hand[i + warCards];
      console.log(`P1 War Card: ${p1Card.name} vs P2 War Card: ${p2Card.name}`);

      if (p1Card.value > p2Card.value) {
        this.player1.score+= warCards + 1;
        console.log("Player 1 wins the war and collects all war cards!");
      } else if (p2Card.value > p1Card.value) {
        this.player2.score+= warCards + 1;
        console.log("Player 2 wins the war and collects all war cards!");
      } else {
        console.log("The war ends in another tie! Continue the war!");
        return this.resolveTie(i + warCards); 
      }
    } else {
      // If one player doesn't have enough cards, they lose the war
      if (this.player1.hand.length > this.player2.hand.length) {
        this.player1.score++;
        console.log("Player 1 wins the war due to insufficient cards from Player 2!");
      } else if (this.player2.hand.length > this.player1.hand.length) {
        this.player2.score++;
        console.log("Player 2 wins the war due to insufficient cards from Player 1!");
      }
    }

    return i + warCards; 
  }

}

const game = new Game();
game.playGame();
