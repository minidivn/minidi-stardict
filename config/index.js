var dotenv = require('dotenv');
var path = require('path');
var envCfg = dotenv.config({ path: '.env' }).parsed;

var config = {};
config.seed = envCfg.seed;
config.db = {
    uri: process.env.MONGOURL || process.env.MONGODB_URI || 'mongodb://localhost:27017/minidi',
    options: {}
};
config.data = {
	folder: './data'
};

module.exports = config;