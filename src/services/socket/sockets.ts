import { v4 as uuid } from 'uuid';

import {
	diferido,
	disconect,
	getDiferido,
	listDiferido,
	listSolic,
	listSolicWorking,
	solictudesTrabajando,
} from './modules/diferidos';

let notes: any[] = [];

export default (io: any) => {
	io.on('connection', (socket: any) => {
		// console.log(socket.handshake.url);
		console.log('nuevo socket connectado:', socket.id);

		// Send all messages to the client
		// socket.emit('server:loadnotes', notes);
		// io.emit('server:loadDiferido', diferidos);
		// console.log(diferidos);
		socket.emit('server:loadDiferido', diferido);
		// socket.emit('server:loadDiferido', 1);

		socket.on('prueba', async () => {
			console.log('Dimas es HOLA');
			await listSolic(socket);
			// console.log(solictudesTrabajando);
		});

		socket.on('Trabanjando_Solic', (user: any, callback: any) => {
			console.log('DIferidos-Solic');
			// console.log(solictudesTrabajando.length);

			callback(listSolicWorking(socket.id, user));
		});

		socket.on('cliente:loadDiferidos', async () => {
			// console.log('Dimas es gayyyyy');
			await listDiferido();
			io.emit('server:loadDiferidos', diferido);

			// console.log(diferido);
		});

		// Send all diferidos

		// Send all User Mu
		socket.emit('server:UserMu');

		socket.on('client:newnote', (newNote: any) => {
			const note = { ...newNote, id: uuid() };
			notes.push(note);
			io.emit('server:newnote', note);
		});

		socket.on('client:deletenote', (noteId: any) => {
			console.log(noteId);
			notes = notes.filter((note) => note.id !== noteId);
			io.emit('server:loadnotes', notes);
		});

		socket.on('client:getnote', (noteId: any) => {
			const note = notes.find((note) => note.id === noteId);
			socket.emit('server:selectednote', note);
		});

		socket.on('client:updatenote', (updatedNote: any) => {
			notes = notes.map((note) => {
				if (note.id === updatedNote.id) {
					note.title = updatedNote.title;
					note.description = updatedNote.description;
				}
				return note;
			});
			io.emit('server:loadnotes', notes);
		});

		socket.on('disconnect', () => {
			console.log(socket.id, 'disconnected');
			console.log('');

			disconect(socket.id);
		});

		socket.on('Editar_diferido', async (id_request: number, callback: any) => {
			console.log('id_request', id_request);
			console.log('');

			const diferido = await getDiferido(id_request);
			callback(diferido);
		});
	});
};
