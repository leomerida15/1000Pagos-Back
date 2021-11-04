import { Router } from 'express';
import { upload, uploads } from '../Middlewares/upload/index';
import { upFileRecaudos, upFilesRecaudos } from '../controllers/1000pagos.controllers';

const RC: Router = Router();

// RC
// RC.route('/RC').post(upload, upFileRecaudos);
//
RC.route('/RC').post(uploads, upFilesRecaudos);
//
RC.route('/RC/:id_request/diferidos').post(uploads, upFilesRecaudos);
//
export default RC;
