import net from 'net';
import router from './router';

const PORT = 5000;

net.createServer((socket) => router(socket))
	.listen(PORT, () => {
		console.log(`Chat server running at port ${PORT}`);
	});