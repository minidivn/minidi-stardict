
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
		text: mainRaw.substring(mainTitle.length+1),
		wordClasses : []
	};
	var newWordClass = null;
	var newWordMeaningListItem = null;
	var newWordExample = null;
	var newWordIdiom = null;
	var newWordMeaningGroup = null;

	mainLines.forEach((line)=>{
		if (line.startsWith('*')){
			newWordClass = {
				title: line.substring(2).trim(),
				list: [],
				// idioms: [],
				groups: []
			};
			main.wordClasses.push(newWordClass);
			newWordMeaningGroup = null;
		} else if (line.startsWith('-')){
			newWordMeaningListItem = {
				examples: [],
			};
			if (newWordMeaningGroup) {
				newWordMeaningGroup.list.push(newWordMeaningListItem);
			} else {
				newWordClass.list.push(newWordMeaningListItem);
			}
		} else if (line.startsWith('=')){
			var kv = line.substring(1).split('+');
			newWordExample = {
				phrase: kv[0].trim(),
				text: kv[1].trim()
			}
			newWordMeaningListItem.examples.push(newWordExample);
		} else if (line.startsWith('!')){
			newWordMeaningGroup = {
				title: line.substring(1).trim(),
				list: [],
				// idioms: []
			};
			newWordClass.groups.push(newWordMeaningGroup);
		}
	});


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
		var newCatData = {
			title: catTitle,
			text: catText
		};
		newCatData.list = [];
		catLines.forEach((line)=>{
			if (line.startsWith('-')){
				newCatData.list.push(line.substring(1));
			}
		});
		categories.push(newCatData);
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