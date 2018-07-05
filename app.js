var express = require('express');
var app = express();
var _ = require("lodash");
const sd = require('./utils/stardictUtils.js');
var dotenv = require('dotenv');
var envCfg = dotenv.config({ path: '.env' });

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
var port = process.env.PORT || 4000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

require('./modules/stardict/dict.cache').route(app);
require('./modules/controllers/dict.controller').route(app);
