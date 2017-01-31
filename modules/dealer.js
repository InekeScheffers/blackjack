const score = require(__dirname + '/score');
const deck = require(__dirname + '/deck');

const playDealer = (cardsDealer, cardDeck) => {

  let currentScoreDealer = score.getScore(cardsDealer);
  console.log(cardsDealer)
  console.log(cardDeck)
  console.log(currentScoreDealer)

  // Check if dealer's total is < 17 then deal another card
  if (currentScoreDealer < 17) {
    dealerGetCard(cardsDealer, cardDeck);
    return;
  }

  // Check if the dealer busted/loses
  if (currentScoreDealer > 21) {
    return {
      score: currentScoreDealer,
      hand: cardsDealer
    };
  }

  return {
    score: currentScoreDealer,
    hand: cardsDealer
  };
}

// if dealer has less than 17 and under 21, has to get another card and play again
const dealerGetCard = (cardsDealer, cardDeck) => {
  cardsDealer.push(deck.takeOneCard(cardDeck));
  console.log(cardsDealer)
  console.log(cardDeck)
  playDealer(cardsDealer, cardDeck);
}

module.exports = {playDealer};
