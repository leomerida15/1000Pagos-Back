import YAML from 'yaml';
import fs from 'fs';
import path from 'path';

if (fs.existsSync(path.resolve('.gitlab-ci.yml'))) {
	const file = YAML.parse(fs.readFileSync(path.resolve('.gitlab-ci.yml'), 'utf8'));

	console.log('file', file);

	file.deploy_qa.script[2] = `ssh  -i ~/.ssh/key.pem $USUARIO@$IP_REMOTEQA " cd $DOCUMENT_ROOT && sudo pm2 restart backoffice "`;

	fs.writeFileSync(path.resolve('.gitlab-ci.yml'), YAML.stringify(file));
}
