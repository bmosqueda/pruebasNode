var User = require("../models/user").User;

module.exports = function(req, res, next) {
	if(!req.session.user_id) {
		res.redirect("/login");
	}
	else {
		//Cada vez que pase por aquí una petición buscará la información del usuario y la agregará a la petición
		User.findById(req.session.user_id, function(err, user) {
			if(err) {
				console.log(err);
				res.redirect("/login");
			}
			else {
				res.locals = {user: user};
				next();
			}
		})
	}
}