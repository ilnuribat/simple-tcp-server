// сперва все коннекты попадают сюда
// подключенный должен дать понять, кто он такой
// если партнер - выдаем специальный пин, куда вешаем его
// если касса - пытаемся получить пин и связать с партнером

const newbies = [];
const partners = [];
const devices = [];
const pinCodes = {};
require('./generatePincodes')(pinCodes);

const { stringify, parse } = JSON;



module.exports = (socket) => {
	// Put this new client to the list
	newbies.push(socket);

	socket.тфьу = 'defineYourself';
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
				throw new Error('UNKNOWN_ROLE');
			}
			// give pincode
			newbies.splice(newbies.indexOf(socket), 1);
		} catch (err) {

			if (err.message === 'UNKNOWN_ROLE') {
				console.log('unknown role');
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