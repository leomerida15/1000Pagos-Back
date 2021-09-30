import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

let db: any = [];

export const InitDB = () => {
	db = new JsonDB(new Config('src/db/json/diferidos', true, false, '/src/db/json'));
};

export default db;
