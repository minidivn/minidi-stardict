var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const ForumTopic = mongoose.model('ForumTopic');

module.exports.seed = function (app) {
	console.log('Seed data forum:');
	var t1 = new ForumTopic({
		title: 'English Grammar',
		description: 'Ngu phap tieng Anh'
	});

	t1.save();
}