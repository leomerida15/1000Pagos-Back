import YAML from 'yaml';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import shell from 'shelljs';
import { exec } from 'child_process';

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

	rl.question('commit name: ', (name) => {
		if (shell.exec(`git add .gitlab-cli.yml`).code === 128) {
			shell.exec(`git commit -m "${name}"`);
			shell.exec(`git push lab-${scriptConsol}`);
		}

		shell.exit(1);
	});

	rl.on('close', () => process.exit(0));
}
