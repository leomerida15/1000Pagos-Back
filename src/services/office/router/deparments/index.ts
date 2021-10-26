import { Application } from 'express';
import Admitions from './admitions.routes';
export default (app: Application) => {
	app.use('/deparment/', Admitions);
};
