var scrape = require('scrape');
var util = require('util');
var fs = require('fs');

module.exports = (function () {
	'use strict';
	var getPicture = function (callback) {
		var badPicture = false,
			picture,
			endOfArray = 600,
			messArr = [];
		for (var i = 300; i < endOfArray; i++) {
			scrape.request('http://www.svt.se/mat/?p=' + i, function (err, $) {
				if (err) return console.error(err);

				$('div.svtExpandableColumn').each(function (div) {
					var title = div.find('a.svtJsLoadHref');
					var PerfectPicture = div.find('img.svtInline');
					var MigratedImage = div.find('div.svtRecipeMigratedImage').first();
					if (typeof(PerfectPicture[0]) === 'undefined' && MigratedImage === null) {
						var badPicture = true;
					}
					if (PerfectPicture) {
						picture = 'Bra bild';
					}

					if (MigratedImage) {
						picture = 'Dålig bild';
					}

					if (badPicture) {
						picture = 'Saknar bild';
					}
					var message = title[0].attribs.href + ' - ' + picture + '\n';
					console.log(picture);
					//messArr.push(message);
					//console.log(util.inspect());
					//console.log(util.inspect());
					fs.appendFile('picture.log', message, function (err) {

					});
				});
			});
		}
	};
	return {
		getPicture: getPicture
	};
}());
