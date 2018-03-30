//http request methods
var express = require("express");
//To read the params in the bodies of peticion
var bodyParser = require('body-parser');
var app = express();
var User = require('./models/user').User;
var methodOverride = require('method-override');
//Para manejar las sesiones iniciadas
// var session = require('express-session')
var cookieSession = require('cookie-session')
var router_app = require("./route_app");
var session_middleware = require('./middlewares/session');

var formidable = require("express-form-data");
//database
var mongoose = require('mongoose');

//middleware para que se pueda acceder a el contenido de esta carpeta
app.use(/*'estatico',*/express.static('public'));

app.use(bodyParser.json()); //Para peticiones aplication/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// //Para el manejo de sesiones
// app.use(session({
// 	secret: "123456",
// 	//Especifica que la sesión se vuelva a guardar aunque no haya sido modificada (true)
// 	//Por ejemplo, cuando dos usuarios intentan iniciar sesión
// 	resave: false,
// 	//Inidica si la sesión debe almacenarse aunque no hay sido inicializada
// 	//Aquellas que son nuevas pero que no han sido modificadas
// 	saveUninitialized: false
// }));

//Manejo de sessiones con cookies en el cliente
//Aunque el servidor se reinicie se conserva la información de la sesión
app.use(cookieSession({
	name: "session",
	keys: ["llave-1", "llave-2"]
}));

//Usar el middleware usado para subir archivos
/*Crea una carpeta temporal en donde va almacenando las imágenes 
y con keepExtensions le decimos que mantenga la extensión de las imágenes que suban*/
/*SOLUCION: formidable.parse() is not a function. tuve este problema y lo solucione con esta 
libreria npm install --save express-form-data dejan todo igual solo cambial el require de express-formidable 
por express-form-data y el la info del archivo se almacena en req.files enlugar de req.body es decir al hacer el 
console.log x ejemplo deben usar console.log(req.files.archivo)﻿*/
app.use(formidable.parse({keepExtensions: true}));

//to work the view's render
app.set("view engine", "jade");

//the root site "/"
app.get("/", function(req, res){
	// User.find(function(err, doc) {
	// 	console.log(doc);
	// })//Muestra todos los registros de la base de datos
	console.log(req.session.user_id);
	res.render("index");
})

app.get("/signup", function(req, res){
	// var nombre = req.params.nombre;
	// console.log(nombre);
	res.render("signup");
})

app.get("/login", function(req, res) {
	res.render("login");
})

app.post('/users', function(req, res) {
	// console.log("Contraseña: " + req.body.password);
	// console.log("Email: " + req.body.email);
	var user = new User({
							email: req.body.email, 
							password: req.body.password,
							password_confirmation: req.body.password_confirmation,
							username: req.body.username
						});

	console.log(req.body.password_confirmation);
	//Recibe todos los errores de validación de campos desde el Schema 
	//Params: Errores, objeto guardado (incluye _id) y el número de filas afectadas
	// user.save(function(err, user, numero) {
	// 	if(err) {
	// 		console.log(String(err));
	// 	}
	// 	res.send("Guardamos tus datos");
	// })

	//La misma función de arriba pero implementando promises
	user.save().then(function(us) {
		//Si todo sale bien
		res.send("Guardamos el usuario exitosamente");
	}, function(err) {
		//Si hay algún error
		console.log(String(err));
		res.send("Hubo un error al guardar el usuario");
	});
});

app.post('/sessions', function(req, res) {
	//Se trabaja con el mismo modelo de usuarios
	//El primer parámetro es un JSON de condición
	//El segundo es un string con los campos que quieres que te devuelvan, separados por espacios
	//por default te devulve todos los campos
	//fin
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
		if(user != null) {
			console.log(user);
			req.session.user_id = user._id;
			res.redirect("/app");	
		}
		else
		{
			console.log(err);
			res.send("Usuario o contraseña incorrecta");
		}
	})
});

app.use("/app", session_middleware);
app.use("/app", router_app);

app.listen(8080);

