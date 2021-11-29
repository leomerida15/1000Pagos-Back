import { administracion, listAdminisWorking } from '../controllers/administracion';

const administra = (io: any) => {
	io.on('connection', (socket: any) => {
		socket.emit('PruebaAdmin', administracion);

		//Devuelve
		socket.on('cliente:administrWorking', async (user: any, id: any) => {
			await listAdminisWorking(socket.id, user, id);
			console.log('Lista de Administracion', administra);
			io.emit('server:loadAdministra', administracion);
		});
	});
};

export default administra;
