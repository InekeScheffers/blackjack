const express = require('express');

// require modules
const deck = require(__dirname + '/../modules/deck');
const score = require(__dirname + '/../modules/score');
const viewData = require(__dirname + '/../modules/viewData');

// create a router
const router = express.Router();

router.route('/hit')
	.get((request, response) => {
  	console.log("Hit!");
  	let session = request.session;

  	// add a card to player's hand
  	session.cardsPlayer.push(deck.takeOneCard(session.cardDeck));
  	// calculate current score of player
  	session.scorePlayer = score.getScore(session.cardsPlayer);

  	// if it goes over or === 21 redirect to route /finish
  	if(session.scorePlayer >= 21) {
  		return response.redirect('finish');
  	}

  	// if it is under 21 render the game with the newly drawn card and score so player can choose hit or stick again
  	response.render('game', viewData.generate(session));
  })

//export this router
module.exports = router;
