import { Router } from 'express';
import { Login } from '../controllers/TMS7';

const Auth: Router = Router();

// Auth
//
Auth.route('/auth/login').post(Login);
//
//
export default Auth;
