
module.exports.start = function (app) {
	require('../modules/seed/forum.seed').seed(app);
}