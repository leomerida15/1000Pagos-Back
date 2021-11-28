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
	All_Info,
	allSolic,
	allTerm,
	listDiferidoWorking,
	disconectsolic,
} from '../controllers/admition';

let notes: any[] = [];

const admitions = (io: any) => {
	io.on('connection', (socket: any) => {
		// console.log(socket.handshake.url);
		console.log('nuevo socket connectado:', socket.id);

		socket.emit('server:loadDiferido', diferido);

		socket.on('prueba', async () => {
			console.log('Dimas es HOLA');
			// await listSolic();
		});

		socket.on('Trabanjando_Solic', async (user: any, callback: any) => {
			console.log('Trabanjando_Solic');
			// console.log(solictudesTrabajando.length);

			callback(await listSolicWorking(socket.id, user));
		});

		socket.on('cliente:loadDiferidos', async () => {
			// console.log('Dimas es gayyyyy');
			if (diferido.length <= 1) await listDiferido();
			io.emit('server:loadDiferidos', diferido);
			getDash();
			All_Info();

			// console.log(diferido);
		});

		////Devuelve Toda las cantidades de Admision

		socket.on('cliente:Todos', async (data: any, callback: any) => {
			console.log('cliente:Todos');
			
			const todos = await All_Info();
			callback(todos);

			// console.log('Toy aqui probando', todos);
		});

		socket.on('client:newnote', (newNote: any) => {
			console.log('client:newnote');
			
			const note = { ...newNote, id: uuid() };
			notes.push(note);
			io.emit('server:newnote', note);
		});

		socket.on('client:deletenote', (noteId: any) => {

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

		socket.on('cliente:cleansolic', () => {
			disconectsolic(socket.id);
			io.emit('server:loadDiferido', diferido);
			io.emit('cliente:dashdatasiempre');
		});

		socket.on('disconnect', () => {
			console.log(socket.id, 'disconnected');
			console.log('FUera');

			disconect(socket.id);
		});

		socket.on('Editar_diferido', async (id_request: number, callback: any) => {
			console.log('Editar_diferido');
			// console.log(''); listDiferido

			const diferido = await getDiferido(id_request);
			callback(diferido);
		});

		socket.on('cliente:dashdata', async (user: any, callback: any) => {
			console.log('cliente:dashdata');

			// console.log('Usuario de peticion: ', user);
			const dash = await getDash();

			// console.log('Informacion de tabla', dash);
			callback(dash);
		});

		socket.emit('server:dashdata', async (user: any, callback: any) => {
			console.log('server:dashdata');

			// console.log('Usuario de peticion: ', user);
			const dash = await getDash();

			// console.log('Informacion de tabla', dash);
			callback(dash);
		});
		socket.on('cliente:dashdatasiempre', async () => {
			// console.log('Dimas es gayyyyy');
			const todos = await getDash();
			io.emit('server:dashdata', todos);

			// console.log(diferido);
		});

		socket.on('cliente:trabanjandoDiferido', async (user: any, id: any) => {
			await listDiferidoWorking(socket.id, user, id);

			io.emit('server:loadDiferido', diferido);
		});

		//************************************************** */
		///CON DIMAS TRABAJANDO

		//************************************************** */
	});
};

export default admitions;
