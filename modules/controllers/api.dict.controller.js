
const sd = require('../stardict/stardictUtils.js');
var _ = require("lodash");


function extractMain(mainLines) {

	var main = {
		// text: text,
		wordClasses : []
	};

	var newWordClass = null;
	var newWordMeaningListItem = null;
	var newWordExample = null;
	var newWordIdiom = null;
	var newWordMeaningGroup = null;
	var currentWordMeaningGroup = null;

	mainLines.forEach((line)=>{
		if (line.startsWith('*')){
			var regExp = /(^\*\W*)(.*$)/;
			var strMatch = regExp.exec(line);
			if (!regExp.test(line)){
				console.log('Invalid format: * :', regExp.test(line), strMatch);
				throw new Error('Invalid format: * :' + line);
			}
			newWordClass = {
				title: strMatch[2].trim(),
				list: [],
				// idioms: [],
				groups: []
			};
			main.wordClasses.push(newWordClass);
			currentWordMeaningGroup = null;
		} else if (line.startsWith('-')){
			var regExp = /(^-\W*)(.*$)/;
			var strMatch = regExp.exec(line);
			if (!regExp.test(line)){
				console.log('Invalid format: * :', regExp.test(line), strMatch);
				throw new Error('Invalid format: - :' + line);
			}
			newWordMeaningListItem = {
				text: strMatch[2].trim(),
				examples: [],
			};
			if (currentWordMeaningGroup) {
				currentWordMeaningGroup.list.push(newWordMeaningListItem);
			} else {
				newWordClass.list.push(newWordMeaningListItem);
			}
		} else if (line.startsWith('=')){
			var regExp = /(^=\W*)(.*$)/;
			var strMatch = regExp.exec(line);
			if (!regExp.test(line)){
				console.log('Invalid format: * :', regExp.test(line), strMatch);
				throw new Error('Invalid format: - :' + line);
			}
			var kv = strMatch[2].split('+');
			newWordExample = {
				phrase: kv[0].trim(),
				text: kv[1].trim()
			}
			newWordMeaningListItem.examples.push(newWordExample);
		} else if (line.startsWith('!')){
			var regExp = /(^\!\W*)(.*$)/;
			var strMatch = regExp.exec(line);
			if (!regExp.test(line)){
				console.log('Invalid format: * :', regExp.test(line), strMatch);
				throw new Error('Invalid format: ! :' + line);
			}
			newWordMeaningGroup = {
				title: strMatch[2].trim(),
				list: [],
				// idioms: []
			};
			currentWordMeaningGroup = newWordMeaningGroup;
			newWordClass.groups.push(newWordMeaningGroup);
		}
	});

	return main;
}

function extractPronunciation(mainTitle){
	var pronunciation = {};
	
	var transcription = mainTitle.substring(mainTitle.indexOf('/') + 1, mainTitle.indexOf('/', mainTitle.indexOf('/') + 1));
	var sound = '';
	if (transcription) {
		pronunciation.transcription = transcription;
	} else {
		pronunciation = null;
	}
	return pronunciation;
}

function extractCategories(categoriesRaw) {
	var categories = [];

	for (var i=1; i< categoriesRaw.length; i++){
		var catLines = categoriesRaw[i].split('\n');
		var catTitle = catLines[0];
		var catText = categoriesRaw[i].substring(catTitle.length+1);
		var newCatData = {
			title: catTitle.trim(),
			text: catText.trim()
		};
		newCatData.list = [];
		catLines.forEach((line)=>{
			if (line.startsWith('-')){
				newCatData.list.push(line.substring(1).trim());
			}
		});
		categories.push(newCatData);
	}

	return categories;
}

function getMeaningDetail(text){
	var mainRaw = null;
	var categoriesRaw = text.split('@');
	if (categoriesRaw.length < 1) {
		throw new Error('Invalid format: categoriesRaw');
	} else if (categoriesRaw.length == 1) {
		// Do not modify categoriesRaw
	} else {
		categoriesRaw.splice(0, 1);
	}

	mainRaw = categoriesRaw[0];
	if (!mainRaw) {
		throw new Error('Invalid format: mainRaw');
	}
	var mainLines = mainRaw.split('\n');
	var main = extractMain(mainLines);
	var pronunciation = null;

	if (text.startsWith('@')) {
		var mainTitle = mainLines[0];
		pronunciation = extractPronunciation(mainTitle);
	}
	
	var categories = extractCategories(categoriesRaw);
	return {main, categories, pronunciation};
}

function listWords(req, res){
	var app = req.app;
	var cachedWordlist = app.get('wordlist');
	console.log('Index words num : ' + cachedWordlist.length);
	var pageIndex = req.query.pageIndex || 0;
	var pageSize = req.query.pageSize || 100;
  	var list = _.chain(cachedWordlist)
  			.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
  			.map(a=>{return a[2]});
  	res.json (list);
}

function findWord(req, res){
	var app = req.app;
	var dzfile = app.get('dzfile');
	var word = req.query.word;
	var isNotFound = false;

	let meaningText = sd.getArticleBodyfromDZ3(dzfile, word, true);
	if (meaningText) {
		try {
			let meaningDetail = getMeaningDetail(meaningText);
			// console.log(meaningText);
			// console.log(word, ' : ' , meaningDetail);
			res.json ({
			  word: word,
			  meaningText: meaningText,
			  detail: meaningDetail
			});
		} catch (err) {
			console.log('Invalid format: ');
			console.log(meaningText);
			console.log(err);
			isNotFound = true;
		}
	} else {
			isNotFound = true;
	}

	if (isNotFound) {
		res.json({
			word: word,
			message: 'Not found!'
		});
	}
}

module.exports.route = function(app){
	app.get("/api/word/list/", listWords);

	app.get("/api/word/find/", findWord);
}