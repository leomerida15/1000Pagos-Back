import { Application } from 'express';

// rputers
import auth from './auth/auth.routes';
import client from './client';

//
export default (app: Application) => {
	app.use('/auth', auth);
	client(app);
};
