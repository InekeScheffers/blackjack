const express = require('express');

// require modules
const deck = require(__dirname + '/../modules/deck');
const score = require(__dirname + '/../modules/score');
const viewData = require(__dirname + '/../modules/viewData');

// create a router
const router = express.Router();

router.route('/start')
	.get((request, response) => {
		let session = request.session;
		// if game is not over and session.isFinished is already defined because player has started a game, rerender and show error
		if(session.isFinished === false && session.isFinished !== undefined){
			let currentViewData = viewData.generateStart(session);
			currentViewData.error = "First finish this game.";
			//response.render('game', currentViewData);
			response.json(currentViewData);
		}
		// session.isFinished was never defined yet (game didn't start yet) or it has started and it has ended, deal
		else if(session.isFinished === undefined || session.isFinished){
	  	console.log("About to deal...");
	  	// store request.session in session so it's shorter to type
	  	//let session = request.session;
			// store gamestate
			session.isFinished = false;
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

			let startViewData = viewData.generateStart(session);
			startViewData.isFinished = false;

	  	// render game and send generated data (cards and scores) to game.pug
	  	//response.render('game', startViewData);
			response.json(startViewData)
		}
  });

//export this router
module.exports = router;
