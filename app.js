var express = require("express");

var app = express();

//to work the view's render
app.set("view engine", "jade");

//the root site "/"
app.get("/", function(req, res){
	res.render("index");
})

app.get("/:nombre", function(req, res){
	var nombre = req.params.nombre;
	console.log(nombre);
	res.render("form", {name: nombre});
})

app.post("/", function(req, res) {
	res.render("form");
})

app.listen(8080);

