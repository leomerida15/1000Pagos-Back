import { Application } from 'express';

// rputers
import auth from './auth';
import deparments from './deparments';
import FM from './fm';
import global from './global';
//
export default (app: Application) => {
	auth(app);
	global(app);
	FM(app);
	deparments(app);
	//
};
