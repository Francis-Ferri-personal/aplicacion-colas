// Comando para establecer la conexion
const socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
	window.location = "index.html";
	throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get("escritorio");
var label = $("small");

console.log(escritorio);
$("h1").text("Escritorio " + escritorio);

$("button").on("click", () => {
	socket.emit("atenderTicket", { escritorio: escritorio }, (resp) => {
		if (resp === "No hay tickets") {
			label.text(resp);
			alert(resp);
			return;
		}
		label.text(resp.numero);
	});
});
