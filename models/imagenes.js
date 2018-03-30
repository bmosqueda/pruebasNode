var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var img_schema = new Schema({ 
	title: {type: String, required: true},
	//El campo llave que le indica a que usuario pertence
	//Hace referencia al modelo de usuario
	creator: {type: Schema.Types.ObjectId, ref: "User"}
});

var Imagen = mongoose.model("Imagen", img_schema);

module.exports = Imagen;