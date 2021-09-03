import { Router } from 'express';
import { RegisterData, LoginData, PassMailData, RegisterData1, RegisterData2 } from '../../Middlewares/data/auth';

const Auth: Router = Router();

// controllers
import { editPass, login, passMail, register, registerValid1, registerValid2 } from '../../controllers/auth/index';
import { userByID } from '../../controllers/auth/user';

// ? Auth
//
Auth.route('/register').post(RegisterData, register);
//
Auth.route('/register/valid/1').post(RegisterData1, registerValid1);
//
Auth.route('/register/valid/2').post(RegisterData2, registerValid2);
//
Auth.route('/login').post(LoginData, login);
//
Auth.route('/passMail').post(PassMailData, passMail);
//
Auth.route('/log/editPass').patch(editPass);
//
Auth.route('/user').get(userByID);

export default Auth;
