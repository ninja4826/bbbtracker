import { exec } from 'child_process';

console.log('Getting UName...');

exec('uname -a', (err, out, stderr) => {
	if (err) {
		console.error(err);
	}
	console.log(out);
});