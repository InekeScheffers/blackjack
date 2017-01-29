const express = require('express');

const app = express();

const deck = require(__dirname + '/modules/deck');

app.get('/start', (request, response) => {
	console.log("About to render start...");

//store deck, hand dealer, hand player, score dealer, score player in session

	//deck.stackDeck();
	let newShuffledDeck = deck.stackDeck();
	console.log(newShuffledDeck);
	// dealer gets first two cards of deck in his array/hand
	let cardsDealer = [newShuffledDeck[0], newShuffledDeck[1]];
	// delete these first two cards from deck
	newShuffledDeck.shift();
	newShuffledDeck.shift();
	// user gets the next first two cards of deck in his array/hand
	let cardsPlayer = [newShuffledDeck[0], newShuffledDeck[1]];
	// delete these cards from deck
	newShuffledDeck.shift();
	newShuffledDeck.shift();
	// send first card of dealer + both cards of player
	response.send([cardsDealer[0], cardsPlayer]);
})

app.get('/hit', (request, response) => {
	console.log("About to render hit...");
	//cardsPlayer.push(newShuffledDeck[0]);
	//newShuffledDeck.shift();
	//response.send([cardsDealer, cardsPlayer]);
	response.send("Hit!")
	// make game.pug render after /start, /hit, /stick and send data of all arrays to pug file with session?
})

app.get('/stick', (request, response) => {
	console.log("About to render stick...");
	response.send("Stick!");
})

// set port where app listens
app.listen(8000);
