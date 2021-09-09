import { Router } from 'express';
import { upload, uploads, FM_RC } from '../../Middlewares/upload/index';
import { upFileRecaudos, upFilesRecaudos } from '../../controllers/client/1000pagos.controllers';

const RC: Router = Router();

// RC
// RC.route('/RC').post(upload, upFileRecaudos);
//
RC.route('/RC').post(FM_RC, upFilesRecaudos);
//
export default RC;
