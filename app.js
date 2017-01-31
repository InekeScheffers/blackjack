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

// require modules
const deck = require(__dirname + '/modules/deck');
const score = require(__dirname + '/modules/score');
const viewData = require(__dirname + '/modules/viewData');
const dealer = require(__dirname + '/modules/dealer');

app.get('/start', (request, response) => {
	console.log("About to deal...");
	// store request.session in session so it's shorter to type
	let session = request.session;
	// make shuffled deck and store it in session
	session.cardDeck = deck.stackDeck();

	// dealer taks two cards
	session.cardsDealer = deck.takeCards(session.cardDeck, 2);
	// calculate score of visible card of dealer
	session.scoreDealer = score.getScore([session.cardsDealer[0]]);

	// dealer gets two cards
	session.cardsPlayer = deck.takeCards(session.cardDeck, 2);
	// calculate score of player's entire hand
	session.scorePlayer = score.getScore(session.cardsPlayer);

	// if(request.session.scorePlayer === 21) {
	//
	// }

	// render game and send generated data to game.pug
	response.render('game', viewData.generate(session));
})

app.get('/hit', (request, response) => {
	console.log("About to hit...");
	let session = request.session;

	// add a card to player's hand
	session.cardsPlayer.push(deck.takeOneCard(session.cardDeck));
	// calculate current score of player
	session.scorePlayer = score.getScore(session.cardsPlayer);

	let hitViewData = viewData.generate(session);

	// result to viewData object when score goes over 21 or is 21
	if(session.scorePlayer > 21) {
		hitViewData.result = "Result: Busted. You lose.";
	} else if(session.scorePlayer === 21) {
		hitViewData.result = "Result: Blackjack! You win.";
	}

	// render game and send generated data to game.pug, including result now
	response.render('game', hitViewData);
})

app.get('/stick', (request, response) => {
	console.log("About to stick...");
	//response.send("Stick!");
	let session = request.session;
	// calculate score of both cards of dealer
	//session.scoreDealer = score.getScore(session.cardsDealer);
	let resultDealer = dealer.playDealer(session.cardsDealer, session.cardDeck);
	console.log(resultDealer)
	let stickData = {
		handDealer:		resultDealer.hand,
		handPlayer:		session.cardsPlayer,
		scoreDealer:	resultDealer.score,
		scorePlayer:	session.scorePlayer
	}

	if (resultDealer.score > 21) {
		stickData.result = "Dealer busted, you win!"
		response.render('game', stickData)
	} else if(resultDealer.score >= session.scorePlayer){
		stickData.result = "You lose!"
		response.render('game', stickData)
	} else {
		stickData.result = "You win!"
		response.render('game', stickData)
	}
})

// set port where app listens
app.listen(8000);
