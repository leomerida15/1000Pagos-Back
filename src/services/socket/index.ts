import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import Sockets from './router';

import { All_Info, listDiferido, listSolic } from './controllers/admition';
import { createConnection } from 'typeorm';
import { getFmAdministration } from './controllers/administracion';

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
	await listDiferido();
	console.log('listdiferidos OK');

	//Lista de Solicitudes
	await listSolic();
	console.log('listSolic OK');

	await getFmAdministration();
	console.log('listSolic OK');

	await All_Info();

	// console.log(solictudes);
})();

app.use(express.static(__dirname + '/public'));
