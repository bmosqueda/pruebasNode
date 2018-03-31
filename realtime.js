module.exports = function(server, sessionMiddleware) {
	var io = require('socket.io')(server);
	var redis = require('redis');
	var client = redis.createClient();

	client.subscribe("images");
	io.use(function(socket, next) {
		//Para que el socket comparta la misma sesión con express
		sessionMiddleware(socket.request, socket.request.res, next);
	})

	client.on("message", function(channel, message) {
		console.log("Recibimos un mensaje del canal: " + channel);
		if(channel == "images") {
			//Manda un mensaje a todas las sockets conectadas para actualizar
			io.emit("new images", message);
		}
	})

	io.sockets.on("connection", function(socket) {
		console.log("Desde socket: " + socket.request.session.user_id);
	})
}