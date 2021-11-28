import { Application } from 'express';
import asi from './aci.routes';
//
export default (app: Application) => {
	app.use(asi);
};
