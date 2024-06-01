/* production config */

const phasermsg = () => {
	return {
		name: 'phasermsg',
		buildStart() {
			process.stdout.write('Building Phaser Game For Production\n');
		},
		buildEnd() {
			const line = '='.repeat(80);
			const msg = `Phaser Game Built For Production`;
			process.stdout.write(`${line}\n${msg}\n${line}\n`);

			process.stdout.write(`Done building Phaser Game For Production\n`);
		},
	};
};
