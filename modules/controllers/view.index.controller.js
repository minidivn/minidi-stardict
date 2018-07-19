module.exports.route = function(app){
	app.route('/*').get(function (req, res){
		res.render('modules/views/index', {
	    });
	});
}