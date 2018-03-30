var Imagen = require('../models/imagenes');
var owner_check = require('./image_permission');

module.exports = function(req, res, next) {
	Imagen.findById(req.params.id)
		//Algo así como la condicón WHERE de SQL
		.populate("creator")
		.exec(function(err, imagen) {
			//Si la imagen existe y se pasaron los permisos necesarios
			if(imagen != null && owner_check(imagen, req, res)) {
				console.log("Se encontró la imagen " + imagen.creator);
				res.locals.imagen = imagen;
				next();
			}
			else {
				res.redirect("/app");
			}
		})
}