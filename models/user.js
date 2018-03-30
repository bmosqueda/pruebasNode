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
var posiblesValores = ["M", "F"];
//Expresión regular para validar direcciones de correo electrónico
var emailMatch = [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Coloca un email válido"]

var passwordValidation = {
	validator: function(pass) {
		return this.password_confirmation == pass;	//Todos los validadores deben de regresar un booleano
	},
	message: "Las contraseñas no son iguales"
}

//Este es el modelo y las validaciones se hacen en este nivel, al nivel del esquema, pero son recibidas en la función que manda llamarlo
//Estructura del documento
var userSchema = new Schema({
	name: String,
	username: {type: String, required: true, maxlength: [50, "Username muy grande"]},
	password: {
		type: String, 
		required: true, 
		minlength: [8, "El password es muy corto"],
		validate: passwordValidation
	},
	age: {type: Number, min: [5, "La edad no puede ser menor de 5"], max: [100, "La edad no puede ser mayor a 10"]},
	email: {type: String, required: "El correo es obligatorio", match: emailMatch},	//Campo obligatorio required: true
	date_of_birth: Date,
	sex: {type: String, enum: {values: posiblesValores, message: "Opción no válida"}} //Cualquier cosa diferente de "M" o "F" dará erro
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