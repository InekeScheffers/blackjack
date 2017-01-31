const express = require('express');
const session = require('express-session');

const app = express();

// settings for pug
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// settings for express-session
app.use(session({
	secret:'suuuuuuper secret',
	resave:true,
	saveUninitialized: false
}));

// require routes
const startRouter = require(__dirname + '/routes/start');
const hitRouter = require(__dirname + '/routes/hit');
const stickRouter = require(__dirname + '/routes/stick');

// use routes
app.use('/', startRouter);
app.use('/', hitRouter);
app.use('/', stickRouter);

// set port where app listens
app.listen(8000);
