import { Application } from 'express';
import Admitions from './admitions.routes';
import Deparments from './generalt.routes';

export default (app: Application) => {
	app.use('/deparment/', Admitions);
	app.use('/deparment/', Deparments);
};
