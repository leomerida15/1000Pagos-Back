import models from './models';

export const find = (model: any, wheres: number | any | number[]) => {
	if (typeof wheres === 'number') return [models[model][wheres]];

	if (Array.isArray(wheres)) {
		const valid = wheres.filter((item) => typeof item === 'number').length;
		if (wheres.length > valid) return [];

		return wheres.filter((where: any, i: number) => i === where);
	}

	if (typeof wheres === 'object') {
		//
		const valids = Object.entries(wheres);

		return models[model].fillter((item: any) => {
			const valid_Where = valids.filter(([key, value]) => {
				if (Array.isArray(value)) value.includes(item[key]);
				else return item[key] === value;
			}).length;

			return valid_Where === valids.length;
		});
	}
};

export const findOne = (model: any, wheres: number | any) => {
	if (typeof wheres === 'number') return models[model][wheres];
	if (typeof wheres === 'object' && !Array.isArray(wheres)) {
		//
		const valids = Object.entries(wheres);

		return models[model].find((item: any) => {
			const valid_Where = valids.filter(([key, value]) => {
				if (Array.isArray(value)) value.includes(item[key]);
				else return item[key] === value;
			}).length;

			return valid_Where === valids.length;
		});
	}
};

export const drop = (model: any, wheres: number | any) => {
	if (typeof wheres === 'number') {
		// delete item in array
		models[model].splice(wheres, 1);

		return models[model];
	}
	if (typeof wheres === 'object') {
		//
		const valids = Object.entries(wheres);

		const index = models[model].findindex((item: any) => {
			const valid_Where = valids.filter(([key, value]) => {
				if (Array.isArray(value)) value.includes(item[key]);
				else return item[key] === value;
			}).length;

			return valid_Where === valids.length;
		});

		// delete item in array
		models[model].splice(index, 1);

		return models[model];
	}
};

export const findOneDrop = (model: any, wheres: number | any) => {
	findOne(model, wheres);
	drop(model, wheres);
};
