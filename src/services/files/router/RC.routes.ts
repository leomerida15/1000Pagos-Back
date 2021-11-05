import { Router } from 'express';
import { upload, uploads } from '../Middlewares/upload/index';
import { upFilesRecaudos, editRcByFm } from '../controllers/1000pagos.controllers';

const RC: Router = Router();

// RC
// RC.route('/RC').post(upload, upFileRecaudos);
//
RC.route('/RC').post(uploads, upFilesRecaudos);
//
RC.route('/RC/admition/:id_request/diferidos').put(uploads, editRcByFm);
//
export default RC;
