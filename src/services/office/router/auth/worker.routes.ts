import { Router } from 'express';

const Worker: Router = Router();

// controllers
import { workerAll, worker, getWorkerById, editWorkerById } from '../../controllers/auth/worker';
import { getAllRoles, editRolByWorker } from '../../controllers/auth/roles';

// ? worker
//
Worker.route('/worker').get(worker);
//
Worker.route('/worker/all').get(workerAll);
//
Worker.route('/worker/:id').get(getWorkerById).put(editWorkerById);
//
Worker.route('/roles/all').get(getAllRoles);

export default Worker;
