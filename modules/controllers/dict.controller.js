
const sd = require('../../utils/stardictUtils.js');
var _ = require("lodash");

function getMeaningDetail(text){
	var categoriesRaw = text.split('@');
	var categories = [];
	categoriesRaw.splice(0, 1);
	var mainRaw = categoriesRaw[0];
	var mainLines = mainRaw.split('\n');
	var mainTitle = mainLines[0];
	var main = {
		text: mainRaw.substring(mainTitle.length+1)
	};
	var transcription = mainTitle.substring(mainTitle.indexOf('/') + 1, mainTitle.indexOf('/', mainTitle.indexOf('/') + 1));
	var sound = '';
	var pronunciation = {};
	if (transcription) {
		pronunciation.transcription = transcription;
	} else {
		pronunciation = null;
	}
	for (var i=1; i< categoriesRaw.length; i++){
		var catLines = categoriesRaw[i].split('\n');
		var catTitle = catLines[0];
		var catText = categoriesRaw[i].substring(catTitle.length+1);
		categories.push({
			title: catTitle,
			text: catText
		})
	}
	return {main, categories, pronunciation};
}
module.exports.route = function(app){
	//APIS===================================================

	app.get("/api/word/list/", function (req, res){
		var cachedWordlist = app.get('wordlist');
		console.log('Index words num : ' + cachedWordlist.length);
		var pageIndex = req.query.pageIndex || 0;
		var pageSize = req.query.pageSize || 100;
	  	var list = _.chain(cachedWordlist)
	  			.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
	  			.map(a=>{return a[2]});
	  	res.json (list);
	});

	app.get("/api/word/find/", function (req, res){
		var dzfile = app.get('dzfile');
		var word = req.query.word;

		let meaningText = sd.getArticleBodyfromDZ3(dzfile, word, true);
		if (meaningText) {
			let meaningDetail = getMeaningDetail(meaningText);
			console.log(word, ' : ' , meaningDetail);
			res.json ({
			  word: word,
			  meaningText: meaningText,
			  detail: meaningDetail
			});
		} else {
			res.json({
				word: word
			});
		}
	});
}