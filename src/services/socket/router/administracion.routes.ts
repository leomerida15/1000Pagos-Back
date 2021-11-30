import { emit } from 'process';
import {
	administracion,
	administracionTrabajndo,
	disconectAdminis,
	getFmAdministration,
	listAdminisWorking,
} from '../controllers/administracion';

const administra = (io: any) => {
	io.on('connection', (socket: any) => {
		socket.emit('PruebaAdmin', administracion);
		socket.emit('server:loadAdministracion', administracion);

		//Devuelve
		socket.on('cliente:administrWorking', async (user: any, id: any) => {
			await listAdminisWorking(socket.id, user, id);
			// console.log('Lista de Administracion', administra);
			io.emit('server:loadAdministra', administracion);
		});

		socket.on('cliente:loadAdministracion', async () => {
			console.log('Toy llegando aqui');

			socket.emit('server:loadAdministracion', administracion);
			// console.log(administracion);
		});

		socket.on('cliente:trabajandoAdministra', async (user: any, id: any) => {
			console.log('administra trabajando');
			console.log('');
			// console.log('Administra antes: ', administracion);

			// if (user.id === ) {

			// } else {

			// }
			// console.log('administracion trabajando ;', administracionTrabajndo);

			await listAdminisWorking(socket.id, user, id);

			io.emit('server:loadAdministracion', administracion);

			// console.log('Administra desp: ', administracion);

			socket.on('disconnect', () => {
				// console.log(socket.id, 'disconnected');
				// console.log('FUera');

				disconectAdminis(socket.id);
				io.emit('server:loadAdministracion', administracion);
			});

			socket.on('cliente:disconnect', async () => {
				// console.log(socket.id, 'disconnected');
				// console.log('');
				disconectAdminis(socket.id);
				io.emit('server:loadAdministracion', administracion);
			});
		});
	});
};

export default administra;
