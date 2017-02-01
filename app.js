const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

// settings for pug
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// settings for express-session
app.use(session({
	secret:'suuuuuuper secret',
	resave:true,
	saveUninitialized: false,
	store: new MongoStore({ url: 'mongodb://localhost/blackjack' })
}));

// require routes
const startRouter = require(__dirname + '/routes/start');
const hitRouter = require(__dirname + '/routes/hit');
const finishRouter = require(__dirname + '/routes/finish');

// use routes
app.use('/', startRouter);
app.use('/', hitRouter);
app.use('/', finishRouter);

// set port where app listens
app.listen(8000);
