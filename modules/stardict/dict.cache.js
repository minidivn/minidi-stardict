var _ = require("lodash");
const sd = require('./stardictUtils.js');
var dictConfig = require("./dict.config.js");

module.exports.cache = function(app) {
    //CACHE=================================================
    // console.log('Read dz file');
    // readAndCache(app, 'en-vi', './data/en-vi/star_anhviet.dict.dz', './data/en-vi/star_anhviet.idx');
    // readAndCache(app, 'vi-en', './data/vi-en/star_vietanh.dict.dz', './data/en-vi/star_vietanh.idx');
    // readAndCache(app, 'fr-vi', './data/en-vi/star_phapviet.dz', './data/en-vi/star_phapviet.idx');
    // readAndCache(app, 'vi-fr', './data/vi-en/star_vietphap.dict', './data/en-vi/star_vietphap.idx');
    var list = dictConfig.list();
    list.forEach((dict) => {
        readAndCache(app, dict.name, './data/' + dict.filePathDz, './data/' + dict.filePathIndex);
    });
}

function readAndCache(app, pairName, filePathDz, filePathIndex) {
    filePathIndex = filePathIndex || filePathDz.replace(/(\.dict\.dz)$/i, '');
    var cachedWordlist = [];
    // console.log(pairName, filePathDz, filePathIndex);
    try {
        sd.readIndexFile(filePathIndex, cachedWordlist, true);
        var cacheDictInfo = {
            filePathDz: filePathDz,
            filePathIndex: filePathIndex,
            wordlist: cachedWordlist
        };
        app.set("cache.dict." + pairName, cacheDictInfo);
    } catch (err) {
        console.log('Can not cache dict ', pairName);
    }
}