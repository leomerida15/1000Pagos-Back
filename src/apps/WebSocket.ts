import fm_request from '../db/models/fm_request';
import http from 'http';
import { Server } from 'socket.io';
import { getRepository, getConnection } from 'typeorm';
import Log from '../hooks/logs/index';

export let diferidos: any[] = [];

export const refresh = async () => {
	diferidos = await getConnection().query(/*sql*/ `
	SELECT 
		a.id AS id_fm 
		,c.id AS id_client
		,c.name AS name_client
		,c.last_name AS last_name_client
		,c.email AS email_client
		,i.name AS ident_type_client
		,c.ident_num AS ident_num_client
		,cc.name AS name_commerce
		,ic.name AS ident_type_commerce
		,cc.ident_num AS ident_num_commerce
	
	FROM
	
		(SELECT * FROM fm_request 
		 WHERE id_status_request = 4
		 ORDER by id ASC ) AS a

		INNER JOIN fm_client AS c ON id_client = c.id
		INNER JOIN fm_commerce AS cc ON id_commerce = cc.id
		INNER JOIN fm_ident_type AS i ON c.id_ident_type = i.id 
		INNER JOIN fm_ident_type AS ic ON cc.id_ident_type = ic.id`);
};

export default async (httpServer: http.Server): Promise<void> => {
	await refresh();
	Log.text.Info('Socket OK');
	//InitDB();

	const wss = new Server(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } });

	wss.on('connection', (ws) => {
		ws.emit('list_diferidos', { diferidos });
	});

	wss.emit('list_diferidos', { diferidos });
};
