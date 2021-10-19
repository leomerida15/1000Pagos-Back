import { Router } from 'express';
import {
	fm_valid_client,
	valid_existin_client,
	fm_create_commerce,
	FM_create,
	getFm,
	editStatusById,
} from '../../controllers/FM_request/index';
import { validExistingClient, validClientData, validBankAccount } from '../../Middlewares/data/auth';
import { validCommerceData } from '../../Middlewares/data/commerce';
import { validFmData } from '../../Middlewares/data/fm';
import { valid_bank_account } from '../../controllers/FM_request';
import { requestOrigin, valid_exitin_commerce } from '../../controllers/FM_request/index';

const FM: Router = Router();

// RC
//
FM.route('/FM/client').post(validClientData, fm_valid_client);
//
FM.route('/FM/:id/commerce').post(validCommerceData, fm_create_commerce);
//
FM.route('/FM').post(validFmData, FM_create);
//
FM.route('/FM/client/valid').post(validExistingClient, valid_existin_client);
//
FM.route('/FM/:id/commerce/valid').post(valid_exitin_commerce);
//
FM.route('/FM/bank/valid').post(validBankAccount, valid_bank_account);

// ? entregar data GET
//
FM.route('/FM').get(getFm);

// ? cambiar status fm
//
FM.route('/FM/:id_FM/status').put(editStatusById);

// ? origenes
//
FM.route('/FM/origins').get(requestOrigin);

export default FM;
