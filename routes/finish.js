const express = require('express');

// require modules
const dealer = require(__dirname + '/../modules/dealer');
const viewData = require(__dirname + '/../modules/viewData');
const score = require(__dirname + '/../modules/score');

// create a router
const router = express.Router();

router.route('/finish')
	.get((request, response) => {
  	console.log("About to finish...");
  	//response.send("Stick!");
  	let session = request.session;
    // generate current viewData so you can add results in the next steps
    const finishViewData = viewData.generate(session);

    // if player's score is over 21, you're always busted, show all dealer's cards
    if(session.scorePlayer > 21){
      // add total score and both cards to viewData
      let currentScoreDealer = score.getScore(session.cardsDealer);
      finishViewData.handDealer = session.cardsDealer;
      finishViewData.scoreDealer = currentScoreDealer;
      finishViewData.result = "Busted, you lose!";

    }
    // Player's score === 21 and this happened with the first two cards (so no extra hit)
    else if(session.scorePlayer === 21 && session.cardsPlayer.length < 3) {

      // check dealer's hand
      let resultDealer = dealer.playDealer(session.cardsDealer, session.cardDeck);

      finishViewData.handDealer = resultDealer.hand;
      finishViewData.scoreDealer = resultDealer.score;

      // if it's also 21, you both have blackjack and it's a push
      if(resultDealer.score === 21) {
        finishViewData.result = "Push";
      } else {
        finishViewData.result = "Blackjack! You win!";
      }

    }
    // Player's score < 21
    else {

      // check dealer's hand first
      let currentScoreDealer = score.getScore(session.cardsDealer);
      // if it's 21 with his first two cards it's blackjack for the dealer
      if(currentScoreDealer === 21 && session.cardsDealer.length < 3) {
        finishViewData.handDealer = session.cardsDealer;
        finishViewData.scoreDealer = currentScoreDealer;
        finishViewData.result = "Dealer has blackjack! You lose!";

      }
      // if dealer's score < 21
      else {
        // dealer takes cards > 17
        let resultDealer = dealer.playDealer(session.cardsDealer, session.cardDeck);

        finishViewData.handDealer = resultDealer.hand;
        finishViewData.scoreDealer = resultDealer.score;

        // dealer's score is higher than player's and it's under or equal to 21
        if(resultDealer.score > session.scorePlayer && resultDealer.score <= 21){
          finishViewData.result = "Dealer wins! You lose!";
        }
        // dealer's score > 21
        else if(resultDealer.score > 21){
          finishViewData.result = "Dealer busted! You win!";
        }
        // it's a tie
        else if(resultDealer.score === session.scorePlayer) {
          finishViewData.result = "Push!";
        }
        // dealer > 17 but < 21, and < player's score
        else {
          finishViewData.result = "You win!";
        }
      }
    }
    response.render('game', finishViewData);
  });

//export this router
module.exports = router;
