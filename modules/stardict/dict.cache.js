
const sd = require('../../utils/stardictUtils.js');
var _ = require("lodash");

module.exports.route = function(app){
	//CACHE=================================================
	console.log('Read dz file');
	const dzfile = './data/en-vi/star_anhviet.dict.dz';
	const path = dzfile.replace(/(\.dict\.dz)$/i, '');
	var cachedWordlist = [];
	sd.readIndexFile(path, cachedWordlist, true);
	app.set("dzfile", dzfile);
	app.set("wordlist", cachedWordlist);
}