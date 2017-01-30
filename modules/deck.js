// constructor to make a card-object with a rank and a face
class Card {
	constructor(rank, face) {
		this.rank = rank;
		this.face = face;
	}
}

// function to stack a deck of cards, using the card constructor
// shuffles new deck by calling the function shuffleDeck and return a shuffled deck to the game
const stackDeck = () => {
	const ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
	const faces = new Array("Diamonds", "Clubs", "Hearts", "Spades");

	// make array for all 52 cards
	this.cards = new Array([]);

	//loop through the four faces
	for (let i = 0; i < faces.length; i++){
			// create a card for this face of all ranks
			for (let j = 0; j < ranks.length; j++){
					this.cards[i * ranks.length + j] =
							new Card(ranks[j], faces[i]);
			}
	}

	console.log("Stacked deck with 52 cards");

	// shuffle the new stacked deck
	shuffleDeck(this.cards);

	console.log("Shuffled newly stacked deck")

	// return new and shuffled deck
	return this.cards
}

// function to shuffle an array in this case the 52 cards
const shuffleDeck = (stackedDeck) => {
	// loop through whole deck
	for(let cardIndex = stackedDeck.length; cardIndex; cardIndex--){
		// generate random index to get the card we shuffle in place of the new card
		let shuffleCardIndex = Math.floor(Math.random() * cardIndex);
		let currentCard = stackedDeck[cardIndex - 1];
		// at the index where we are now in the loop we put the new card with the shuffleCardIndex
		stackedDeck[cardIndex - 1] = stackedDeck[shuffleCardIndex];
		// at the index of the new card we put the currentCard
		stackedDeck[shuffleCardIndex] = currentCard;
	}
}

module.exports = {stackDeck:stackDeck}
