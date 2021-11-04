import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import FM from './fm.routes';
import Status from './status.routes';

//
export default (app: Application) => {
	app.use(FM);
	app.use(Status);
};
