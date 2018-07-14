module.exports.route = function(app){
	require('./view.forum.controller').route(app);
	
	app.route('/forum').get(function (req, res){
		res.render('modules/views/pages/forum', {
		});
	});
	app.route('/intro').get(function (req, res){
		res.render('modules/views/pages/intro', {
	    });
	});
	app.route('/study').get(function (req, res){
		res.render('modules/views/pages/study', {
	    });
	});
	app.route('/social').get(function (req, res){
		res.render('modules/views/pages/social', {
	    });
	});
	app.route('/blog').get(function (req, res){
		res.render('modules/views/pages/blog', {
	    });
	});
	app.route('/help').get(function (req, res){
		res.render('modules/views/pages/help', {
	    });
	});
	app.route('/dict').get(function (req, res){
		res.render('modules/views/pages/dict', {
	    });
	});
	app.route('/*').get(function (req, res){
		res.render('modules/views/index', {
	    });
	});
}