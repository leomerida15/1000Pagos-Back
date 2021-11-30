import administra from './administracion.routes';
import admitions from './admitions.routes';

export default (io: any) => {
	admitions(io);
	administra(io);
};
