import { Application } from 'express';

// rputers
import location from './location.routes';
import Payments from './paymed.routes';
import global from './global.routes';

//
export default (app: Application) => {
	app.use(location);
	app.use(global);
	app.use(Payments);
};
