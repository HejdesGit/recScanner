var scrape = require('scrape');
var util = require('util');

module.exports = (function () {
	'use strict';
	var getPicture = function (callback) {
		var score,
			badPicture = false,
			picture,
			arr=[];
		scrape.request('http://www.svt.se/gokvall/recept/?p=1', function (err, $) {
			if (err) return console.error(err);

			$('div.svtExpandableColumn').each(function (div) {
				var title = div.find('a.svtJsLoadHref');
				var PerfectPicture = div.find('img.svtInline');
				var MigratedImage = div.find('div.svtRecipeMigratedImage').first();
				if (PerfectPicture === null && PerfectPicture == null) {
					var badPicture = true;
				}
				if (PerfectPicture) {
					picture = 'PerfectPicture';
				}

				if (MigratedImage) {
					picture = 'MigratedImage';
				}


				if (badPicture) {
					picture = 'bad';
				}
				//console.log('[%s]', score);
				console.log(util.inspect(title[0].attribs.href));
				console.log(util.inspect(picture));
				//console.log(util.inspect(score, {showHidden: false, depth: null}));
			});
		});
	};
	return {
		getPicture: getPicture
	};
}());
