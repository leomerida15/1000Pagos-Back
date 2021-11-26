import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import Auth from './Auth.routes';
import Commerce from './Commerce.routes';

//
export default (app: Application) => {
	app.use(Auth);
	app.use(Commerce);
};
