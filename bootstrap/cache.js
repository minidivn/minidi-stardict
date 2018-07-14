
module.exports.init = function (app) {
	require('../modules/stardict/dict.cache').cache(app);
}