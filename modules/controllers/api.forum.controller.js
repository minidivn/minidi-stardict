const mongoose = require('mongoose');
const ForumTopic = mongoose.model('ForumTopic');

function listTopics(req, res) {
    ForumTopic.find({})
        .then((docs) => {
            res.json({
                topics: docs
            });
        });
}
module.exports.route = function(app) {
    app.route('/api/forum').get(listTopics);
}