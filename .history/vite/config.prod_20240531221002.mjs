/* production config */

const phasermsg = () => {
	return {
		name: 'phasermsg',
		buildStart() {
			process.stdout.write('Building Phaser Game For Production\n');
		},
	};
};
