import { Application } from 'express';
import Worker from './worker.routes';
import Auth from './auth.routes';

//
export default (app: Application) => {
	app.use('/auth', Auth);
	app.use(Worker);
};
