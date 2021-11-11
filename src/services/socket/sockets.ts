import { v4 as uuid } from 'uuid';

import {
	diferido,
	disconect,
	getDiferido,
	listDiferido,
	listSolic,
	listSolicWorking,
	solictudesTrabajando,
	getDash,
	solictudes,
} from './modules/diferidos';

let notes: any[] = [];

export default (io: any) => {
	io.on('connection', (socket: any) => {
		// console.log(socket.handshake.url);
		console.log('nuevo socket connectado:', socket.id);

		socket.emit('server:loadDiferido', diferido);

		socket.on('prueba', async () => {
			console.log('Dimas es HOLA');
			// await listSolic();
		});

		socket.on('Trabanjando_Solic', async (user: any, callback: any) => {
			console.log('DIferidos-Solic');
			// console.log(solictudesTrabajando.length);

			callback(await listSolicWorking(socket.id, user));
		});

		socket.on('cliente:loadDiferidos', async () => {
			// console.log('Dimas es gayyyyy');
			await listDiferido();
			io.emit('server:loadDiferidos', diferido);

			// console.log(diferido);
		});

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

		socket.on('cliente:disconnect', () => {
			console.log(socket.id, 'disconnected');
			console.log('');

			disconect(socket.id);
		});

		socket.on('disconnect', () => {
			console.log(socket.id, 'disconnected');
			console.log('');

			disconect(socket.id);
		});

		socket.on('Editar_diferido', async (id_request: number, callback: any) => {
			// console.log('id_request', id_request);
			// console.log('');

			const diferido = await getDiferido(id_request);
			callback(diferido);
		});

		socket.on('cliente:dashdata', (user: any, callback: any) => {
			// console.log('Usuario de peticion: ', user);
			const dash = getDash();

			// console.log('Informacion de tabla', dash);
			callback(dash);
		});

		socket.emit('server:dashdata', (user: any, callback: any) => {
			// console.log('Usuario de peticion: ', user);
			const dash = getDash();

			// console.log('Informacion de tabla', dash);
			callback(dash);
		});
		socket.on('cliente:dashdatasiempre', async () => {
			// console.log('Dimas es gayyyyy');
			const todos = await getDash();
			io.emit('server:dashdata', todos);

			// console.log(diferido);
		});
	});
};
