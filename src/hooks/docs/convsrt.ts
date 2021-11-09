import { fromPath } from 'pdf2pic';
import { base, replace } from './doc';

interface optionsPDF {
	quality?: number;
	format?: string;
	width?: number;
	height?: number;
	density?: number;
	savePath?: string;
	saveFilename?: string;
	compression?: string;
}

export const toConvert = (to: string) => {};
//
export const fromConvert = (from: string): any => {};
//
export const convert = async (file: any, to: string, options?: optionsPDF) => {
	const from: string = file.split('.')[file.split('.').length - 1];

	if (from === 'pdf') {
		const opt = options && {
			density: 100,
			saveFilename: file.replace('.pdf', to),
			savePath: `${base}`,
			format: to,
			width: 595,
			height: 842,
		};

		const storeAsImage = fromPath(`${base}/${file}`, opt);
		const pageToConvertAsImage: number = 1;

		const resolve = await storeAsImage(pageToConvertAsImage);

		console.log('resolve', resolve);

		return resolve;
	}
};
