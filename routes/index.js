const express = require('express');

// create a router
const router = express.Router();

router.route('/')
	.get((request, response) => {
    response.render('game');
  })

//export this router
module.exports = router;
