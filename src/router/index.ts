import { Application } from 'express';

// rputers
import client from './client';

//
export default (app: Application) => {
	client(app);
};
