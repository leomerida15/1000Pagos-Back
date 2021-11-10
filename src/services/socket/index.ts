import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import Sockets from './sockets';
import { diferido, listDiferido, listSolic, listSolicWorking, solictudes } from './modules/diferidos';
import { createConnection } from 'typeorm';

const app = express();
const server = http.createServer(app);

const httpServer = server.listen(process.env.PORT_SOCKET || 777);

const io = new Server(httpServer);

//Donde estasn los On y Emit
Sockets(io);

(async () => {
	// Base de datos
	await createConnection();
	console.log('DB OK');

	//Lista de diferidos
	if (solictudes.length <= 5) await listDiferido();
	console.log('listdiferidos OK');

	//Lista de Solicitudes
	await listSolic();
	console.log('listSolic OK');

	// await listMu();

	// console.log(solictudes);
})();

app.use(express.static(__dirname + '/public'));
