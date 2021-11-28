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
		///NUEVAS FUNCIONES DE SOCKET
		//Prueba de conexion de modulos
		socket.on('prueba', async () => {
			console.log('ESTA USTED VERIFICADO ');
			// await listSolic();
		});

		//Coloca 10 nuevos FM en la variable SOlicitudes
		socket.on('client:getAll', async () => {
			console.log('client:getAll');
			//toda las variables de data
			let listadiferidos = await listDiferido;
			let dataSDT = await getDash;
			let countAll = await All_Info;

			//Todos los emit de esa data
			//Devuelve diferidos
			socket.emit('server:loadDiferido', listadiferidos);
			//solicitudes,diferidos,solictudestrabajdno y diferidostrabjando
			io.emit('server:dashdata', dataSDT);
			//SI las solicitudes estan por terminar pide 10 mas
			if (solictudes.length <= 1) {
				//solo debe ejecutarse cunado variable solicitudes sea 1 o menos
				await listSolic;
			}
			//count de solicitudes, terminadas, diferidos
			io.emit('server:counAll', countAll);
		});

		//************************************************** */
	});
};

export default admitions;
