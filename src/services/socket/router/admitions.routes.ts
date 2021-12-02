import { emit } from 'process';
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
	OneSolic,
} from '../controllers/admition';

let notes: any[] = [];

const admitions = (io: any) => {
	io.on('connection', (socket: any) => {
		//// // console.log(socket.handshake.url);
		// console.log('nuevo socket connectado:', socket.id);

		io.emit('server:loadDiferidos', diferido);

		socket.on('client:prueba', async () => {
			console.log('Prueba de emision');
			// await listSolic();
			let data = 'mano funciona';
			io.emit('server:prueba', data);
		});

		socket.on('Trabanjando_Solic', async (user: any) => {
			// console.log('DIferidos-Solic');
			//// // console.log(solictudesTrabajando.length);

			socket.emit('server:Trabanjando_Solic', await listSolicWorking(socket.id, user));
			const todo = await All_Info();
			const todos = getDash();

			io.emit('server:loadDiferidos', diferido);
			io.emit('server:dashdata', todos);
			io.emit('server:todos', todo);
		});

		socket.on('cliente:loadDiferidos', async () => {
			//// // console.log('Dimas es gayyyyy');
			if (diferido.length < 1) await listDiferido();
			io.emit('server:loadDiferidos', diferido);
		});

		////Devuelve Toda las cantidades de Admision

		socket.on('cliente:todo', async (callback: any) => {
			const todos = await All_Info();
			callback(todos);

			//// // console.log('Toy aqui probando', todos);
		});

		socket.on('client:newnote', (newNote: any) => {
			const note = { ...newNote, id: uuid() };
			notes.push(note);
			io.emit('server:newnote', note);
		});

		socket.on('client:deletenote', (noteId: any) => {
			//// // console.log(noteId);
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

		socket.on('cliente:disconnect', async () => {
			// console.log(socket.id, 'disconnected');
			// console.log('');

			disconect(socket.id);
			const todos = getDash();
			const todo = await All_Info();
			if (diferido.length < 1) await listDiferido();
			await listSolic();
			io.emit('server:loadDiferidos', diferido);
			io.emit('server:dashdata', todos);
			io.emit('server:todos', todo);
		});

		socket.on('cliente:cleansolic', async () => {
			disconectsolic(socket.id);
			await listSolic();
			const todo = await All_Info();
			if (diferido.length < 1) await listDiferido();
			const todos = getDash();
			io.emit('server:loadDiferidos', diferido);
			io.emit('server:dashdata', todos);
			io.emit('server:todos', todo);
		});

		socket.on('disconnect', async () => {
			// console.log(socket.id, 'disconnected');
			// console.log('FUera');
			await listSolic();
			disconect(socket.id);
		});

		socket.on('Editar_diferido', async (id_request: number, callback: any) => {
			const diferido = await getDiferido(id_request);
			callback(diferido);
		});

		socket.on('cliente:dashdata', async (callback: any) => {
			await listSolic();
			if (diferido.length < 1) await listDiferido();
			const dash = getDash();
			callback(dash);
		});

		socket.on('cliente:dashdatasiempre', async () => {
			if (diferido.length < 1) await listDiferido();
			const todos = getDash();
			io.emit('server:dashdata', todos);
		});

		socket.on('cliente:trabanjandoDiferido', async (user: any, id: any) => {
			console.log('diferidos trabajando');
			console.log('');

			await listDiferidoWorking(socket.id, user, id);

			const todos = getDash();
			const todo = await All_Info();
			if (diferido.length < 1) await listDiferido();

			io.emit('server:loadDiferidos', diferido);
			io.emit('server:dashdata', todos);
			io.emit('server:todos', todo);
		});

		socket.on('cliente:coleado', async (key: any, callback: any) => {
			const one = await OneSolic(key);
			console.log('Coleado... :', one);
			callback(one);
		});
	});
};

export default admitions;
