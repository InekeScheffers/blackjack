const score = require(__dirname + '/score');

// module to generate viewData to send to client in json
const generateStart = (session) => {
	return {
			handDealer:		[session.cardsDealer[0]],
			handPlayer:		session.cardsPlayer,
			scoreDealer:	session.scoreDealer,
			scorePlayer:	session.scorePlayer
		};
}

const generateFinish = (session) => {
	return {
		handDealer:		session.cardsDealer,
		handPlayer:		session.cardsPlayer,
		scoreDealer:	score.getScore(session.cardsDealer),
		scorePlayer:	session.scorePlayer
	}
}

module.exports = {generateStart, generateFinish}
