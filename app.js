const express = require('express');
const session = require('express-session');

const app = express();

// settings for pug
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// settings for express-session
app.use(session({
	secret:'suuuuuuper secret',
	resave:true,
	saveUninitialized: false
}));

const deck = require(__dirname + '/modules/deck');

app.get('/start', (request, response) => {
	console.log("About to render start...");
	//deck.stackDeck();
	request.session.newShuffledDeck = deck.stackDeck();
	// console.log(request.session.newShuffledDeck);

	// dealer gets first two cards of deck in his array/hand
	// store in session while no DB yet
	request.session.cardsDealer = [request.session.newShuffledDeck[0], request.session.newShuffledDeck[1]];
	// delete these first two cards from deck
	request.session.newShuffledDeck.shift();
	request.session.newShuffledDeck.shift();
	// user gets the next first two cards of deck in his array/hand
	request.session.cardsPlayer = [request.session.newShuffledDeck[0], request.session.newShuffledDeck[1]];
	// delete these cards from deck
	request.session.newShuffledDeck.shift();
	request.session.newShuffledDeck.shift();
	// send first card of dealer + both cards of player
	//response.send([request.session.cardsDealer[0], request.session.cardsPlayer]);
	response.render('game', {handDealer: [request.session.cardsDealer[0]], handPlayer: request.session.cardsPlayer})
})

app.get('/hit', (request, response) => {
	console.log("About to render hit...");
	request.session.cardsPlayer.push(request.session.newShuffledDeck[0]);
	request.session.newShuffledDeck.shift();
	//response.send([cardsDealer, cardsPlayer]);
	//response.send("Hit!")
	response.render('game', {handDealer: [request.session.cardsDealer[0]], handPlayer: request.session.cardsPlayer})
	// make game.pug render after /start, /hit, /stick and send data of all arrays to pug file with session?
})

app.get('/stick', (request, response) => {
	console.log("About to render stick...");
	response.send("Stick!");
})

// set port where app listens
app.listen(8000);
