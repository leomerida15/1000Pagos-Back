import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import FM from './fm.routes';

//
export default (app: Application) => {
	app.use(FM);
};
