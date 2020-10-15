var path = require('path');
var config = require('./config/index');

var startServer = (dbConfig) => {
	var expressBootstrap = require('./bootstrap/express-server');
	expressBootstrap.init();

	var cache = require('./bootstrap/cache');
	cache.init(expressBootstrap.app);

	/*
	if (config.seed) {
		var seeding = require('./bootstrap/seed');
		seeding.start(expressBootstrap.app);
	}
	*/
	expressBootstrap.start();
}
/*
var mongoBootstrap = require('./bootstrap/mongoose');
mongoBootstrap
.connect()
.then(startServer);
*/

startServer();
