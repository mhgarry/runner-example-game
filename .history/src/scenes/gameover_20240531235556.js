export default class GameOver extends Phaser.Scene {
	constructor() {
		super({ key: 'gameover' });
	}

	create() {
		this.width = this.sys.game.config.width; // set the width property to the width of the gameover scene
		this.height = this.sys.game.config.height; // set the height property to the height of the gameover scene
		this.center_width = this.width / 2; // set the center width property to half the width of the gameover scene to center scene horizontally on the screen
		this.center_height = this.height / 2; // set the center height property to half the height of the gameover scene to center scene vertically on the screen

		this.cameras.main.setBackgroundColor('0x87ceeb'); // set the background color of the gameover scene to light blue

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
				.setOrigin(0.5) // set the origin of the text to the center of the text
				.setAlpha(0), // set the alpha of the text to 0 to make it invisible
		);
		this.tweens.add({
			targets: line, // set the target of the tween to the line object
			alpha: 1, // set the alpha of the line object to 1 to make it visible
			duration: 2000, // set the duration of the tween to 2000 milliseconds
        });
        startGame() {
            this.scene.start('game') // start the game scene when the startGame method is called
        } // set the duration of the tween to 2000 milliseconds
	}
}
