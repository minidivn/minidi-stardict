var dotenv = require('dotenv');
var path = require('path');
var envCfg = dotenv.config({ path: '.env' }).parsed;

// console.log(envCfg);

var mongoBootstrap = require('./bootstrap/mongoose');
mongoBootstrap.connect()
.then((config) => {
	var expressBootstrap = require('./bootstrap/express-server');
	expressBootstrap.init();

	var cache = require('./bootstrap/cache');
	cache.init(expressBootstrap.app);

	if (envCfg.seed) {
		var seeding = require('./bootstrap/seed');
		seeding.start(expressBootstrap.app);
	}

	expressBootstrap.start();
});
