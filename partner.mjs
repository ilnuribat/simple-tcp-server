import net from 'net';

const connectHandler = () => {
	console.log('Connected');
	client.write(JSON.stringify({
		role: 'partnera',
	}));
	process.stdin.pipe(client);
}

const client = new net.Socket();
client.connect(5000, '127.0.0.1', connectHandler);

client.on('data', (data) => {
	console.log(data.toString());
	try {
		const { command, error } = JSON.parse(data.toString());

		if (error) {
			console.log(`error: ${error}`);
			throw error;
		}
	} catch (err) {

		client.destroy();
		// client.connect(5000, '127.0.0.1', connectHandler);
	}
});

client.on('close', () => {
	console.log('Connection closed');
});