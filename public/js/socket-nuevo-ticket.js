// Comando para establecer la conexion
const socket = io();

const label = $("#lblNuevoTicket");

socket.on("connect", () => {
	console.log("Conectando al servidor");
});

socket.on("disconnect", () => {
	console.log("Desconectado del servidor");
});

socket.on("estadoActual", ({ actual }) => {
	label.text(actual);
});

$("button").on("click", () => {
	socket.emit("siguienteTicket", null, (siguienteTicket) => {
		console.log(siguienteTicket);
		label.text(siguienteTicket);
	});
});
