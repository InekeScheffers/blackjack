const express = require('express');

// require modules
const deck = require(__dirname + '/../modules/deck');
const score = require(__dirname + '/../modules/score');
const viewData = require(__dirname + '/../modules/viewData');

// create a router
const router = express.Router();

router.route('/hit')
	.get((request, response) => {
		let session = request.session;

		// if player requests hit before ever starting a game redirect to start
		if(session.isFinished === undefined) {
      return response.redirect('start');
    }
		// if the game is over and hit is still requested show error message and let player deal again
		else if(session.isFinished){
			let currentViewData = viewData.generateFinish(session);
			currentViewData.isFinished = true;
			currentViewData.error = "Game is finished, first start a new game.";
			response.render('game', currentViewData);
		}
		// else hit!
		else {
	  	console.log("Hit!");
	  	// let session = request.session;

	  	// add a card to player's hand
	  	session.cardsPlayer.push(deck.takeOneCard(session.cardDeck));
	  	// calculate current score of player
	  	session.scorePlayer = score.getScore(session.cardsPlayer);

	  	// if it goes over or === 21 redirect to route /finish
	  	if(session.scorePlayer >= 21) {
	  		return response.redirect('finish');
	  	}

	  	// if it is under 21 render the game with the newly drawn card and score so player can choose hit or stick again
	  	response.render('game', viewData.generateStart(session));
		}
  })

//export this router
module.exports = router;
