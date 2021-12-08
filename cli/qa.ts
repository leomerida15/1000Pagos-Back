import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { exec } from 'shelljs';

const route = path.resolve('.gitlab-ci.yml');

if (fs.existsSync(route)) {
	const file = fs.readFileSync(route, 'utf8');

	const ymlFile = YAML.parse(file);

	const scriptConsol = (() => {
		switch (process.env.npm_lifecycle_event) {
			case 'qa:files':
				return 'files';

			case 'qa:socket':
				return 'socket';

			case 'qa:providers':
				return 'providers';

			case 'qa:office':
				return 'office';
		}
	})();

	console.log('script', scriptConsol);

	switch (scriptConsol) {
		case 'files':
			ymlFile.deploy_qa.script[2] =
				'ssh  -i ~/.ssh/key.pem $USUARIO@$IP_REMOTEQA " cd $DOCUMENT_ROOT && sudo pm2 restart files "';

			break;

		case 'socket':
			ymlFile.deploy_qa.script[2] =
				'ssh  -i ~/.ssh/key.pem $USUARIO@$IP_REMOTEQA " cd $DOCUMENT_ROOT && sudo pm2 restart socket "';

			break;

		case 'providers':
			ymlFile.deploy_qa.script[2] =
				'ssh  -i ~/.ssh/key.pem $USUARIO@$IP_REMOTEQA " cd $DOCUMENT_ROOT && sudo pm2 restart providers "';

			break;

		case 'office':
			ymlFile.deploy_qa.script[2] =
				'ssh  -i ~/.ssh/key.pem $USUARIO@$IP_REMOTEQA " cd $DOCUMENT_ROOT && sudo pm2 restart backoffice "';
			break;
	}

	const ymlString = YAML.stringify(ymlFile);

	fs.writeFileSync(route, ymlString);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	console.log('question');
	console.log('');
	rl.question('commit name: ', (name) => {
		console.log('name: ', name);
		console.log('');
		exec(`git add .`, (error, stdout, stderr) => {
			if (!error) {
				console.log('git activo ......................................|>');
				console.log('');
				exec(`git commit -m "${name}"`, (error, stdout, stderr) => {
					if (!error) {
						console.log('commit activo ......................................|>');
						console.log('');
						exec(`git push lab-${scriptConsol}`, (error, stdout, stderr) => {
							if (!error) {
								console.log('push activo ......................................|>');
								console.log(`git push lab-${scriptConsol}`);
								console.log('');
							}
						});
					} else process.exit(0);
				});
			} else process.exit(0);
		});
	});
}
