import cors, { CorsOptions, CorsRequest } from 'cors';

/** list the host auth */
const white_list: Array<string> = [''];

// const origin = (origin: string, cb) => cb(null, white_list.includes(origin));
const origin = (origin?: string, cb?: any) => cb(null, true);

/** Cors Option */
const corsOptions: CorsOptions = {
	methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
	origin,
};

export default cors(corsOptions);
