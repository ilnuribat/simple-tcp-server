// сперва все коннекты попадают сюда
// подключенный должен дать понять, кто он такой
// если партнер - выдаем специальный пин, куда вешаем его
// если касса - пытаемся получить пин и связать с партнером
const newbies = [];
const partners = [];
const devices = [];
const pinCodes = {};
const { stringify, parse } = JSON;



export default (socket) => {
	// Put this new client to the list
	newbies.push(socket);

	socket.state = 'defineYourself';
	// Send a nice welcome message and announce
	
	// Handle incoming message from newbies
	socket.once('data', (data) => {
		try {
			const { role } = parse(data);
			
			if (role === 'partner') {
				partners.push(socket);
				socket.name = role;
				console.log(`newbie is partner`);
			} else {
				throw new Error('UNKNOW_ROLE');
			}
			// give pincode
			newbies.splice(newbies.indexOf(socket), 1);
		} catch (err) {
			if (err.name === 'UNKNOW_ROLE') {
				socket.write(stringify({
					error: 'notJsonFormat',
				}));

				return;
			}
			socket.write(stringify(err));
		}
	});
	socket.on('end', () => {
		console.log(`${socket.name} left dialog.\n`);
		newbies.splice(newbies.indexOf(socket), 1);
	});
}