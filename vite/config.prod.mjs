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

export default defineConfig({
	base: './',
	logLevel: 'warning',
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					phaser: ['phaser'],
				},
			},
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
					passes: 2,
				},
				mangle: true,
				format: {
					comments: false,
				},
				server: {
					port: 8080,
				},
				plugins: [phasermsg()],
			},
		},
	},
});
