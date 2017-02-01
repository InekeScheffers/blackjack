#BLACKJACK
A simple game of blackjack.
---
* Deal - starts a new game by stacking and shuffling a deck of cards. And dealing two cards to the dealer and the player. Keeping one card of the dealer invisible.
* Hit - deals the player another card until the score >= 21.
* Stick - the dealer shows the hidden card and starts drawing from the deck until its score >= 17. Then the result of the game is shown.

##How to run this app
1. `git clone` this directory
2. `npm install` to install dependencies
3. Make sure you have MongoDB server running
4. Run `node app.js`
5. Start your first game of blackjack through localhost:8000/start

##Develop decisions
* I renamed the route `stick` to `finish`: this route finishes the game. Also, when the player didn't choose stick, but obtained cards >= 21.
* Starting building this app I stored all the game data using the module `express-session` serverside in the session. But because it forgets your game when the server is turned off, I used a compatible session store to store all this session data in a database (without having to rewrite a lot of code). Now you can return at any point to your game (within 14 days).
* I used `connect-mongo` because it had 1K stars, had good documentation and does exactly what I want: it stores the session data in my database.
* Which buttons are enabled gives the user a visible cue of what actions are valid at any point of the game. To disable and enable the buttons in the front end I send the game state to the pug file. The buttons disable and enable themselves accordingly.
* I also stored the game state on the database, so the server can also check when a route is requested whether the game state is valid for the requested route. When it's not it renders the correct route with the current data and an error message.
* To be able to easily re-use code without copying I made modules like dealer.js and deck.js.
* I've used Stack Overflow and the source code of other online games of Blackjack as examples to come up with ways to code e.g. shuffling the cards and getting the score.

##Branch: apify
See the branch apify to see a start of rewriting this game code into an API.
