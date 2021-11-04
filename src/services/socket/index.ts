import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import Sockets from './sockets';
import { listDiferido, listSolic, solictudes } from './modules/diferidos';
import { createConnection } from 'typeorm';

const app = express();
const server = http.createServer(app);

const httpServer = server.listen(2020);

const io = new Server(httpServer);

Sockets(io);
(async () => {
	// Base de datos
	await createConnection();
	console.log('DB OK');

	await listDiferido();
	console.log('listDiferido OK');

	await listSolic();
	console.log('listSolic OK');

	// await listMu();

	console.log(solictudes);
})();

app.use(express.static(__dirname + '/public'));
