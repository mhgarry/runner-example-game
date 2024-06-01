/*
Logic to generate obstacles and coins in the game randomly
 */

export default class Generator {
	constructor(scene) {
		this.scene = scene; // set the scene property to scene parameter
		this.scene.time.delayedCall(2000, () => this.init(), null, this); // set the scene to be delayed by 2 seconds when the game starts
	}

	init() {
		this.generateCloud(); // call the GenerateCloud
		this.generateObstacle(); // call the GenerateObstacle
		this.generateCoin(); // call the GenerateCoin
	}

	// a function to generate a new cloud object randomly in the game
	generateCloud() {
		new Cloud(this.scene); // generates a new cloud object
		this.scene.time.delayedCall(
			Phaser.Math.Between(2000, 3000),
			() => this.generateCloud(),
			null,
			this,
		); // set the clouds to be generated randomly between 2 and 3 seconds
	}
}
