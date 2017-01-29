const express = require('express');

const app = express();

const deck = require(__dirname + '/modules/deck');

app.get('/start', (request, response) => {
	console.log("About to render start...");
	//deck.stackDeck();
	let newShuffledDeck = deck.stackDeck();
	console.log(newShuffledDeck);
	let cardsDealer = [newShuffledDeck[0], newShuffledDeck[1]];
	newShuffledDeck.shift();
	newShuffledDeck.shift();
	let cardsPlayer = [newShuffledDeck[0], newShuffledDeck[1]];
	newShuffledDeck.shift();
	newShuffledDeck.shift();
	//var shuffledDeck = deck.stackDeck();
	response.send([cardsDealer, cardsPlayer]);
	//response.write("foo \nbar\n");
	//...
	//response.end()
})

app.get('/hit', (request, response) => {
	console.log("About to render hit...");
	response.send("Hit!");
})

app.get('/stick', (request, response) => {
	console.log("About to render stick...");
	response.send("Stick!");
})

// set port where app listens
app.listen(8000);
