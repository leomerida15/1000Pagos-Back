import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import RC from './RC.routes';

//
export default (app: Application) => {
	app.use('/1000pagosRC', RC);
};
