const score = require(__dirname + '/score');
const deck = require(__dirname + '/deck');

const playDealer = (cardsDealer, cardDeck) => {

  let currentScoreDealer = score.getScore(cardsDealer);

  // Check if dealer's total is < 17 then deal another card
  if (currentScoreDealer < 17) {
    cardsDealer.push(deck.takeOneCard(cardDeck));
    return playDealer(cardsDealer, cardDeck);
  }

  return {
    score: currentScoreDealer,
    hand: cardsDealer
  };
}

module.exports = {playDealer};
