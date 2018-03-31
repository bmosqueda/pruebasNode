//La función sale de la librearía que se importa en todos lados
//Para conectarse en tiempo real con el servidor
var socket = io();

//Cuando llega una nueva imagen desde emit
socket.on("new images", function(data) {
	data = JSON.parse(data);
	console.log(data);

	var container = document.querySelector("#imagenes");
	//Obtenemos todo el bloque de html de la parte donde se agregan imágnes en home.jade
	var source = document.querySelector("#image-template").innerHTML;
	//Compila y hace las modificaciones correspondientes en la vista
	var template = Handlebars.compile(source);

	container.innerHTML = template(data) + container.innerHTML;
})