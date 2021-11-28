import { Application } from 'express';
import Admitions from './admitions.routes';
import Deparments from './generalt.routes';

export default (app: Application) => {
	app.use('/department/', Admitions);
	app.use( Deparments);
};
