var _ = require('lodash');
var dotenv = require('dotenv');
var path = require('path');
var envCfg = dotenv.config({ path: '.env' });

var express = require('express'),
    http = require('http'),
    https = require('https');

var morgan = require('morgan'),
    bodyParser = require('body-parser'),
    compress = require('compression'),
    helmet = require('helmet'),
    hbs = require('express-hbs'),
    lusca = require('lusca');

var socketio = require('socket.io');

/*
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    favicon = require('serve-favicon'),
    flash = require('connect-flash'),
*/

function configStatic(app){
	app.use(express.static('public'));
}
function configViews(app){
	//NOTE: Use HandleBar template engine!
    app.engine('html', hbs.express4({
  		partialsDir: path.resolve('./modules/views/partials'),
  		layoutsDir: path.resolve('./modules/views/layouts'),
        extname: '.html'
    }));
    app.set('view engine', 'html');
    app.set('views', path.resolve('./'));
}

function configRoutes(app){
	require('../modules/controllers/api.dict.controller').route(app);
    require('../modules/controllers/api.forum.controller').route(app);
    // require('../modules/controllers/view.index.controller').route(app);
}

module.exports.init = function (){
	var app = express();
	this.app = app;
	configStatic(app);
	// configViews(app);
	configRoutes(app);
};

module.exports.start = function(cb) {
	var app = this.app;
	var port = process.env.PORT || 4000;
	var listener = app.listen(port, function () {
	  console.log('Your app is listening on port ' + port);
	  if (cb) cb(app, listener);
	});
}
