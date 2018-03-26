var express = require("express");

var app = express();

app.set("view engine", "jade");

//the root site "/"
app.get("/", function(req, res){
	res.render("index", {hola: "brandon"});
})

app.listen(8080);

