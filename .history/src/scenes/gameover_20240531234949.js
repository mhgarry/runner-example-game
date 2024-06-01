export default class GameOver extends Phaser.Scene {
	constructor() {
		super({ key: 'gameover' });
	}

	create() {
		this.width = this.sys.game.config.width;
		this.height = this.sys.game.config.height;
		this.center_width = this.width / 2;
		this.center_height = this.height / 2;

		this.cameras.main.setBackgroundColor('0x87ceeb');

		this.add.bitmapText(
			this.center_width,
			50,
			'arcade',
			this.registry.get('score'),
			25,
		);
	}
}
