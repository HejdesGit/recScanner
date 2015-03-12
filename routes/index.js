var express = require('express');
var router = express.Router();
var pic = require('../helper/picture');

/* GET home page. */

router.get('/', function (req, res) {
	 pic.getPicture(function(data){
		 res.json({picture:data});
	 });
});

module.exports = router;
