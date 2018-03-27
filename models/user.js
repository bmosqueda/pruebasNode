var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//Conexión a la base de datos
mongoose.connect("mongodb://localhost/fotos");

/*
	Tipos de datos en los documentos (como filas) de la base de datos
	String
	Number
	Date
	Buffer
	Boolean
	Mixed
	Objectid
	Array
*/	

//Estructura del documento
var userSchema = new Schema({
	name: String,
	username: String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
});

userSchema.virtual("password_confirmation").get(function() {
	return this.p_c;
}).set(function(password) {
	this.p_c = password;
});

//toda la comunicación con la base de datos se hace a través de los modelos
var User = mongoose.model("User", userSchema);

//Para dar acceso a otros archivos
module.exports.User = User;