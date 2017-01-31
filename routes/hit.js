const express = require('express');

// require modules
const deck = require(__dirname + '/../modules/deck');
const score = require(__dirname + '/../modules/score');
const viewData = require(__dirname + '/../modules/viewData');

// create a router
const router = express.Router();

router.route('/hit')
	.get((request, response) => {
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

//export this router
module.exports = router;
