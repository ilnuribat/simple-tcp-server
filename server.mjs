const net = require('net');
const router = require('./router.mjs');

const PORT = 5000;

net.createServer((socket) => router(socket))
	.listen(PORT, () => {
		console.log(`Chat server running at port ${PORT}`);
	});