//Middleware para establecer si un usuario tiene permisos sobre una imagen
var Imagen = require('../models/imagenes');

module.exports = function(image, req, res) {
	//Todas las imagenes que no tengan creador
	if(typeof image == "undefined") return false;
	//Si TRUE = tienes permisos
	//False = no tiene permisos
	//Si es GET y no tiene edit en la URL
	if(req.method === 'GET' && req.path.indexOf("edit") < 0) {
		//Ver la imagen, cualquier persona puede ver cualquier imagen
		return true;		
	}

	//Aquí ya no es necesario poner el método http porque si no es Get se deben validar los permisos para 
	//Cualquir otra cosa que queramos hacer con la image (borrar o actualizar)
	//image.creator ya es un objeto porque para entonces ya pasó por el populate
	if(image.creator._id.toString() == res.locals.user._id) {
		//Esta imagen la subió el usuario
		return true;
	}
	//Si no pasa la condicón anterior es porque no se tienen los permisos necesarios
	return false;
}