import fm_request from '../../../db/models/fm_request';
import fm_phone from '../../../db/models/fm_phone';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { DateTime } from 'luxon';
import Comercios from '../../../db/models/Comercios';
import Contactos from '../../../db/models/Contactos';
import { Api } from '../../../interfaces';
import ComerciosXafiliado from '../../../db/models/CategoriasXafiliado';

export const createCommerce = async (
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; id_client: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {		
		const fmData = await getRepository(fm_request).findOne({
			where: { id: req.body.id_fm, id_commerce: req.body.id_commerce, id_client: req.body.id_client },
			order: { id: 'ASC' },
			relations: [
				// client
				'id_client',
				'id_client.id_location',
				'id_client.id_location.id_estado',
				'id_client.id_location.id_municipio',
				'id_client.id_location.id_ciudad',
				'id_client.id_location.id_parroquia',
				'id_client.id_ident_type',
				'id_client.phones',
				// dir_pos
				'dir_pos',
				'dir_pos.id_location',
				'dir_pos.id_location.id_estado',
				'dir_pos.id_location.id_municipio',
				'dir_pos.id_location.id_ciudad',
				'dir_pos.id_location.id_parroquia',
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
				'id_commerce.id_location',
				'id_commerce.id_location.id_estado',
				'id_commerce.id_location.id_municipio',
				'id_commerce.id_location.id_ciudad',
				'id_commerce.id_location.id_parroquia',
				//
			],
		});
		if (!fmData) throw { message: 'el commercio suministrado no existe', code: 400 };		

		const { id_commerce, id_client, bank_account_num, id_product, dir_pos, number_post }: any = fmData;

		const commerce: any = {
			comerDesc: id_commerce.name,
			comerTipoPer: [3, 4].includes(id_commerce.id_ident_type.id) ? 2 : 1,
			comerCodigoBanco: bank_account_num.slice(0, 4),
			comerCuentaBanco: bank_account_num,
			comerPagaIva: 'SI',			
			comerCodUsuario: null,
			comerCodPadre: 0,
			comerRif: id_commerce.id_ident_type.name + id_commerce.ident_num,
			comerFreg: null,
			comerCodTipoCont: id_commerce.special_contributor ? 2 : 1,
			comerInicioContrato: DateTime.local().toISODate(),
			comerFinContrato: DateTime.local().plus({ years: 1 }).toISODate(),
			comerExcluirPago: 0,
			comerCodCategoria: 5411,
			comerGarantiaFianza: 1,
			comerModalidadGarantia: 1,
			comerMontoGarFian: 7.77,
			comerModalidadPos: 3,
			comerTipoPos: id_product,
			comerRecaudos: null,
			comerDireccion: Object.keys(id_commerce.id_location)
				.filter((key) => key !== 'id')
				.map((key) => id_commerce.id_location[key][key.replace('id_', '')])
				.filter((item) => item)
				.join(', '),

			comerObservaciones: '',
			comerCodAliado: id_commerce.id_aci,
			comerEstatus: 5,
			comerHorario: null,
			comerImagen: null,
			comerPuntoAdicional: 0,
			comerCodigoBanco2: '',
			comerCuentaBanco2: '',
			comerCodigoBanco3: '',
			comerCuentaBanco3: '',
			//
			comerDireccionHabitacion: Object.keys(id_client.id_location)
				.filter((key) => key !== 'id')
				.map((key) => id_commerce.id_location[key][key.replace('id_', '')])
				.filter((item) => item)
				.join(', '),
			//
			comerDireccionPos: Object.keys(dir_pos[0].id_location)
				.map((key) => {
					return dir_pos[0].id_location[key][key.replace('id_', '')];
				})
				.filter((item) => item)[0],
			//
			comerDiasOperacion: id_commerce.days,
			comerFechaGarFian: null,
		};

		const comercioSave = await getRepository(Comercios).save(commerce);

		//Dimas Modifca el tlf para que use el de la lista phones porfaplis, 
		//ya la query esta aqui phonesClient

		const contacto: any ={
			contCodComer: comercioSave.comerCod,
			contCodUsuario: null,
			contNombres: id_client.name,
			contApellidos: id_client.last_name,
			contTelefLoc: id_client.phones[0].phone.slice(3, id_client.phones[0].phone.length),
			contTelefMov:  id_client.phones[1].phone.slice(3, id_client.phones[1].phone.length),
			contMail: id_client.email,
			contFreg: null
		};

		const contactoSave = await getRepository(Contactos).save(contacto); //new

		const cxaCodAfi = `${id_commerce.id_activity.id_afiliado.id}`.split('');

		while (cxaCodAfi.length < 15) cxaCodAfi.unshift('0');		

		await getRepository(ComerciosXafiliado).save({ cxaCodAfi: cxaCodAfi.join(''), cxaCodComer: comercioSave.comerCod });

		res.status(200).json({ message: 'comercio creado' });
	} catch (err) {
		next(err);
	}
};
