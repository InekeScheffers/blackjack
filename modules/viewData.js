const generate = (session) => {
	return {
			handDealer:		[session.cardsDealer[0]],
			handPlayer:		session.cardsPlayer,
			scoreDealer:	session.scoreDealer,
			scorePlayer:	session.scorePlayer
		};
}

module.exports = {generate}
