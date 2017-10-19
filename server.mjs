import net from 'net';

const clients = [];
const PORT = 5000;

const broadcast = (message, sender) => {
	clients.forEach((client) => {
		if (client === sender) {
			return;
		}
		client.write(message);
	});
	process.stdout.write(message);
}

net.createServer((socket) => {
	// identify this client
	socket.name = `${socket.remoteAddress}:${socket.remotePort}`;


	// Put this new client to the list
	clients.push(socket);

	// Send a nice welcome message and announce
	socket.write(`Welcome ${socket.name}\n`);
	broadcast(`${socket.name} joined to the chat\n`, socket);

	// Handle incoming messages from clients
	socket.on('data', (data) => {
		broadcast(`${socket.name}> ${data}`, socket);
	});
	socket.on('end', () => {
		clients.splice(clients.indexOf(socket), 1);
		broadcast(`${socket.name} left the chat.\n`);
	});
}).listen(PORT);

console.log(`Chat server running at port ${PORT}`);