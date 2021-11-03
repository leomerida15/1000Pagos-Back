import { Router } from 'express';
import { upload, uploads } from '../Middlewares/upload/index';
import { createImage, createImages, getImageById } from '../controllers/globals.controllers';

const Global: Router = Router();

// RC
// RC.route('/RC').post(upload, upFileRecaudos);
//
Global.route('/global/images').post(uploads, createImages);
//
Global.route('/global/image').post(upload, createImage);
//
Global.route('/global/image/:id').delete(createImage).get(getImageById);

//
export default Global;
