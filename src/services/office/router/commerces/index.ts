import { Application } from 'express';
import asi from './asi.routes';
//
export default (app: Application) => {
	app.use(asi);
};
