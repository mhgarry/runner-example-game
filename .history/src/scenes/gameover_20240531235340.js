export default class GameOver extends Phaser.Scene {
	constructor() {
		super({ key: 'gameover' });
	}

	create() {
		this.width = this.sys.game.config.width; // set the width property to the width of the gameover scene
		this.height = this.sys.game.config.height; // set the height property to the height of the game
		this.center_width = this.width / 2;
		this.center_height = this.height / 2;

		this.cameras.main.setBackgroundColor('0x87ceeb');

		this.add
			.bitmapText(
				this.center_width,
				this.center_height,
				'arcade',
				this.registry.get('score'),
				45,
			)
			.setOrigin(0.5);
		// .setOrigin(0.5); // set the origin of the text to the center of the text
		this.add
			.bitmapText(
				this.center_width,
				250,
				'arcade',
				'Press Space or Click Restart!',
				15,
			)
			.setOrigin(0.5);
		this.input.keyboard.on('keydown-SPACE', this.startGame, this); // add an event listener to listen for the space key to be pressed and call the startGame method
		this.input.on('pointerdown', this.startGame(), this); // add an event listener to listen for the pointerdown event on the startGame() method to be called
	}

	showLine(text, y) {
		let line = this.introLayer.add(
			this.add
				.bitmapText(this.center_width, y, 'pixelFont', text, 25) // create a bitmap text object to display the text on the screen
				.setOrigin(0.5), // set the origin of the text to the center of the text
		);
	}
}
