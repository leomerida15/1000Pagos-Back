import { Router } from 'express';
import { getAllStatus } from '../../controllers/global/index';
import { getStatusByIds } from '../../controllers/FM_request/status';
const Status: Router = Router();

// controllers
//
// ? status
//
Status.route('/status').get(getAllStatus);
//
// ? status by ids
//
Status.route('/status/:id_status_request/:id_department').get(getStatusByIds);

// ? images
export default Status;
