const express = require('express');

// require modules
const dealer = require(__dirname + '/../modules/dealer');

// create a router
const router = express.Router();

router.route('/stick')
	.get((request, response) => {
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
  });

//export this router
module.exports = router;
