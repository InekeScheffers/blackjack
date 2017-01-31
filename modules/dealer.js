const score = require(__dirname + '/score');
const deck = require(__dirname + '/deck');

// take in the current cards of the dealer and the current deck as parameters
const playDealer = (cardsDealer, cardDeck) => {

  // calculate the score of the dealer's entire hand
  let currentScoreDealer = score.getScore(cardsDealer);

  // Check if dealer's total is < 17 then deal another card and recursively call the playDealer function again
  if (currentScoreDealer < 17) {
    cardsDealer.push(deck.takeOneCard(cardDeck));
    return playDealer(cardsDealer, cardDeck);
  }

  // if the dealer's score is > 17
  return {
    score: currentScoreDealer,
    hand: cardsDealer
  };
}

module.exports = {playDealer};
