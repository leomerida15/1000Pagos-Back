const Msg = (name: string, id?: number | string) => {
	const base: string = ` el ${name}  ${id ? `con el id: ${id}` : ``}`;
	const getAll: string = `todos los ${name}s`;
	return {
		getAll,
		create: 'Se a creado ' + base,
		get: base,
		getBy: (to: string) => `${getAll} filtrados por ${to}`,
		edit: 'Se a editado' + base,
		delete: 'Se a eliminado' + base,
	};
};

export default Msg;
