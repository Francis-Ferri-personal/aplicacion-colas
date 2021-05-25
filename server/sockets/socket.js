const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();

io.on("connection", (client) => {
	client.on("siguienteTicket", (data, callback) => {
		const siguiente = ticketControl.siguiente();
		callback(siguiente);
	});
	client.emit("estadoActual", {
		actual: ticketControl.getUltimoTicket(),
		ultimos4: ticketControl.getUltimos4()
	});

	// emitir un evento estadoActual
	client.on("atenderTicket", (data, callback) => {
		if (!data.escritorio) {
			return callback({
				err: true,
				mensaje: "El escritorio es necersario"
			});
		}
		const atenderTicket = ticketControl.atenderTicket(data.escritorio);
		callback(atenderTicket);

		// emitir ultimos 4
		client.broadcast.emit("ultimos4", {
			ultimos4: ticketControl.getUltimos4()
		});
	});
});
