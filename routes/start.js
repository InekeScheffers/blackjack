const express = require('express');

// require modules
const deck = require(__dirname + '/../modules/deck');
const score = require(__dirname + '/../modules/score');
const viewData = require(__dirname + '/../modules/viewData');

// create a router
const router = express.Router();

router.route('/start')
	.get((request, response) => {
  	console.log("About to deal...");
  	// store request.session in session so it's shorter to type
  	let session = request.session;
  	// make shuffled deck and store it in session
  	session.cardDeck = deck.stackDeck();

		console.log("Deal!");

  	// dealer gets two cards
  	session.cardsDealer = deck.takeCards(session.cardDeck, 2);
  	// calculate score of visible card of dealer
  	session.scoreDealer = score.getScore([session.cardsDealer[0]]);

  	// player gets two cards
  	session.cardsPlayer = deck.takeCards(session.cardDeck, 2);
  	// calculate score of player's entire hand
  	session.scorePlayer = score.getScore(session.cardsPlayer);

		// if player's score === 21 go to route /finish
  	if(session.scorePlayer === 21) {
  		return response.redirect('finish');
  	}

  	// render game and send generated data (cards and scores) to game.pug
  	response.render('game', viewData.generate(session));
  });

//export this router
module.exports = router;
