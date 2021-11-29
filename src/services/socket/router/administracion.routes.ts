import { administracion } from '../controllers/administracion';

const administra = (io: any) => {
	io.on('connection', (socket: any) => {
		socket.emit('PruebaAdmin', administracion);
	});
};

export default administra;
