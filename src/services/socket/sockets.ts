import { v4 as uuid } from 'uuid';

import {
	diferidos,
	disconect,
	getdiferidos,
	listdiferidos,
	getDash,
	listSolic,
	listSolicWorking,
	solictudesTrabajando,
} from './modules/diferidos';

let notes: any[] = [];

export default (io: any) => {
	io.on('connection', (socket: any) => {
		// console.log(socket.handshake.url);
		console.log('nuevo socket connectado:', socket.id);

		socket.emit('server:loaddiferidos', diferidos);

		socket.on('prueba', async () => {
			console.log('Dimas es HOLA');
			// await listSolic();
			// console.log(solictudesTrabajando);
		});

		socket.on('Trabanjando_Solic', async (user: any, callback: any) => {
			console.log('diferidoss-Solic');
			// console.log(solictudesTrabajando.length);

			callback(await listSolicWorking(socket.id, user));
		});

		socket.on('cliente:loaddiferidoss', async () => {
			// console.log('Dimas es gayyyyy');
			await listdiferidos();
			io.emit('server:loaddiferidoss', diferidos);

			// console.log(diferidos);
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

		socket.on('disconnect', () => {
			console.log(socket.id, 'disconnected');
			console.log('');

			disconect(socket.id);
		});

		socket.on('Editar_diferidos', async (id_request: number, callback: any) => {
			// console.log('id_request', id_request);
			// console.log('');

			const diferidos = await getdiferidos(id_request);
			callback(diferidos);
		});

		socket.on('dash_data', (id_request: number, callback: any) => {
			// console.log('id_request', id_request);
			// console.log('');

			const dash = getDash(id_request);
			callback(dash);
		});
	});
};
