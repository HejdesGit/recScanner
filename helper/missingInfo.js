var scrape = require('scrape');
var util = require('util');
var fs = require('fs');

module.exports = (function () {
	'use strict';
	var getMissingInfo = function (callback) {
		var message = "",
			endOfArray = 600;
		for (var i = 1; i < endOfArray; i++) {
			scrape.request('http://www.svt.se/mat/?p=' + i, function (err, $) {
				if (err) return console.error(err);
				//console.log("FETCHING");
				$('div.svtExpandableColumn').each(function (div) {
					var title = div.find('a.svtJsLoadHref');

					//console.log('[%s]', score);
					//console.log(util.inspect(title[0].attribs.href));
					//console.log("---------------- Scraping title[0].attribs.href ---------------- " + title[0].attribs.href);
					scrape.request(title[0].attribs.href, function (err, $) {
						$('article.svtJSHistory').each(function (div) {

							var title2 = div.find('.svtH1');
							var INGREDIENSER = div.find('.svtArticleSectionHeader.svtXMargin-Top-15px.svtArticleSectionHeader-THEMED');
							var PORTIONER = div.find('.svtXDisplayInline-Block.svtXMargin-Right-15px');
							var INGRESS = div.find('hgroup .svtH3.svtH3-THEMED');
							var ALLERGI = div.find('ul.svtXDisplayInline li.svtXDisplayInline');
							var CHEFPROGRAM = div.find('.svtMediaBlockText.svtXFloatLeft.svtXMargin-Right-10px strong');
							var Link = div.find('.svtLink-Toolbox.svtJsSendEmail');
							var cookingTime = div.find('.svtIcon.svtIcon_Timer');
							//var log = fs.createWriteStream('logHEJDE.txt', {'flags': 'a'});
							// use {'flags': 'a'} to append and {'flags': 'w'} to erase and write a new file
							//log.write('hej');
							//log.end("this is a message");
							if (title2[0]) {
								message = "";
								message += util.inspect(title2[0].children[0].data) + ",, ";

								message += 'INGREDIENSER:';
								if (INGREDIENSER[0]) {
									message += 'HAS,, ';
								} else {
									message += 'MISSING,, ';
								}

								message += 'PORTIONER:';
								if (PORTIONER[0]) {
									message += 'HAS,, ';
								} else {
									message += 'MISSING,, ';
								}

								message += 'INGRESS:';
								if (INGRESS[0]) {
									message += 'HAS,, ';
								} else {
									message += 'MISSING,, ';
								}

								var CHEF = false;
								var PROG = false;
								if (CHEFPROGRAM[0]) {
									if (CHEFPROGRAM[0].children[0].data == 'Program:') {
										var PROG = true;
										message += 'PROGRAM:';
										message += 'HAS,, ';
									}
									if (CHEFPROGRAM[0].children[0].data == 'Kock:') {
										var CHEF = true;
										message += 'Kock:';
										message += 'HAS,, ';
									}

								}
								if (CHEFPROGRAM[1]) {
									if (CHEFPROGRAM[1].children[0].data == 'Program:') {
										var PROG = true;
										message += 'PROGRAM:';
										message += 'HAS,, ';
									}
									if (CHEFPROGRAM[1].children[0].data == 'Kock:') {
										var CHEF = true;
										message += 'Kock:';
										message += 'HAS,, ';
									}
								}
								if (!PROG) {
									message += 'PROGRAM:';
									message += 'MISSING,, ';
								}
								if (!CHEF) {
									message += 'Kock:';
									message += 'MISSING,, ';
								}

								message += 'ALLERGIER:';
								if (ALLERGI[0]) {
									var aller = [];
									aller.push(ALLERGI[0].children[0].data.replace(',', ''));
									if (ALLERGI[1]) {
										aller.push(ALLERGI[1].children[0].data.replace(',', ''));
									}
									if (ALLERGI[2]) {
										aller.push(ALLERGI[2].children[0].data.replace(',', ''));
									}
									if (ALLERGI[3]) {
										aller.push(ALLERGI[3].children[0].data.replace(',', ''));
									}
									if (ALLERGI[4]) {
										aller.push(ALLERGI[4].children[0].data.replace(',', ''));
									}
									if (ALLERGI[5]) {
										aller.push(ALLERGI[5].children[0].data.replace(',', ''));
									}
									message += aller.toString() + ",, ";
								} else {
									message += 'MISSING,, ';
								}
								message += 'TILLAGNINGSTID:';
								if (cookingTime[0]) {

									message += cookingTime[0].next.next.next.data;
								}
								else{
									message += 'MISSING,, ';
								}
								var url = Link[0].attribs['data-url'];
								var lastSlash = Link[0].attribs['data-url'].lastIndexOf("/");
								var slug = url.slice(lastSlash+1, url.length);
								message += ' SLUG:';
								message += slug + ',,';
								message += ' URL:';
								message += Link[0].attribs['data-url'] + '\n';

								fs.appendFile('missing.log', message, function (err) {

								});
							}
						});

					});
				});
			});
		}
	};
	return {
		getMissingInfo: getMissingInfo
	};
}());
