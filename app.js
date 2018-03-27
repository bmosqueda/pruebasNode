//http request methods
var express = require("express");
//To read the params in the bodies of peticion
var bodyParser = require('body-parser');
var app = express();
var User = require('./models/user').User;

//database
var mongoose = require('mongoose');

//middleware para que se pueda acceder a el contenido de esta carpeta
app.use(/*'estatico',*/express.static('public'));

app.use(bodyParser.json()); //Para peticiones aplication/json
app.use(bodyParser.urlencoded({extended: true}));

//to work the view's render
app.set("view engine", "jade");

//the root site "/"
app.get("/", function(req, res){
	res.render("index");
})

app.get("/login", function(req, res){
	// var nombre = req.params.nombre;
	// console.log(nombre);
	User.find(function(err, doc) {
		console.log(doc);
	})
	res.render("login");
})

app.post('/users', function(req, res) {
	// console.log("Contraseña: " + req.body.password);
	// console.log("Email: " + req.body.email);
	var user = new User({email: req.body.email, 
							password: req.body.password,
							password_confirmation: req.body.password_confirmation
						});

	console.log(req.body.password_confirmation);
	user.save(function() {
		res.send("Guardamos tus datos");
	})
})

app.listen(8080);

