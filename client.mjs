import net from 'net';

const client = new net.Socket();
client.connect(5000, '127.0.0.1', () => {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', (data) => {
	console.log(`Recieved: ${data}`);
	// kill client after server's response
	// client.destroy(); 
});

client.on('close', () => {
	console.log('Connection closed');
});