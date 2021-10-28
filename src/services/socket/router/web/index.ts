import { Server } from 'socket.io';

const socket = (WSs: any) => {
	const io = new Server(WSs);

	io.on('connection', (ws: any): void => {
		console.log('a user connected');
	});
};

export default socket;
