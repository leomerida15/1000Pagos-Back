import { Application } from 'express';

// rputers
import location from './location.routes';

//
export default (app: Application) => {
	app.use('/location', location);
};
