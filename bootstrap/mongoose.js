var path = require('path'),
    mongoose = require('mongoose');
var bluebird = require('bluebird');

var config = {
    db: {
        uri: process.env.MONGOURL || process.env.MONGODB_URI || 'mongodb://localhost:27017/minidi',
        options: {}
    }
};

module.exports.config = config;

module.exports.connect = function(app) {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.db.uri, config.db.options, function(err) {
            // Log Error
            if (err) {
                console.error('Could not connect to MongoDB!');
                console.log(err);
                reject(err);
            } else {
                //
                mongoose.Promise = bluebird;
                console.log('Connect db: ', config.db.uri);
                //mongooseMiddleware.initialize(mongoose);

                require(path.resolve("modules/models/user/user.model"));
                //require(path.resolve("modules/models/dict/dict.model"));
                //require(path.resolve("modules/models/dict/dict-category.model"));
                //require(path.resolve("modules/models/dict/word.model"));
                //require(path.resolve("modules/models/dict/word-category.model"));
                require(path.resolve("modules/models/forum/forum.post.model"));
                require(path.resolve("modules/models/forum/forum.post-category.model"));
                require(path.resolve("modules/models/forum/forum.topic.model"));
                require(path.resolve("modules/models/forum/forum.topic-category.model"));
                //require(path.resolve("modules/models/article/article.model"));
                //require(path.resolve("modules/models/article/article-category.model"));

                resolve(config);
            }
        });
    });
}