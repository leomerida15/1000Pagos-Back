import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import Auth from './Auth.routes';
import tms7 from './tms7.routes';
import App1000Pagos from './App1000Pagos.routes';

//
export default (app: Application) => {
	app.use(Auth);
	app.use(tms7);
	app.use(App1000Pagos);
};
