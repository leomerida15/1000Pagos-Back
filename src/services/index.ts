import office from './office';
import files from './files';
import socket from './socket';

const services: any[] = [
	{ key: 'office', app: office },
	{ key: 'files', app: files },
	{ key: 'socket', app: socket },
];

export default services;
