var express = require('express');
var router = express.Router();
var pic = require('../helper/picture');
var mi = require('../helper/missingInfo');

/* GET home page. */

router.get('/', function (req, res) {
	//pic.getPicture(function (data) {
	//	res.json({picture: data});
	//});
	mi.getMissingInfo(function (data) {
		res.json({missingData: data});
	});
});

module.exports = router;
