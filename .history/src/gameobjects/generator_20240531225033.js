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

	// a function to generate a new obstacle object randomly in the game
	generateCloud() {
		new Cloud(this.scene); // generates a new cloud object
		this.scene.time.delayedCall(
			Phaser.Math.Between(2000, 3000),
			() => this.generateCloud(),
			null,
			this,
		); // set the clouds to be generated randomly between 2 and 3 seconds
	}

	// a function to generate a new coin object randomly in the game
	generateObstacle() {
		this.scene.obstacles.add(
			new Obstacle(
				this.scene,
				800,
				this.scene.height - Phaser.Math.Between(32, 128), // generate obstacles randomly with a height between 32 and 128 pixels
			),
		);
		this.scene.time.delayedCall(
			Phaser.Math.Between(1500, 2500),
			() => this.generateObstacle(),
			null,
			this,
		); // set the obstacles to be generated randomly between 1.5 and 2.5 seconds
	}

	// a function to generate a new coin object randomly in the game
	generateCoin() {
		this.scene.coins.add(
			new Coin(
				this.scene,
				800,
				this.scene.height - Phaser.Math.Between(32, 128), // generate coins randomly with a height between 32 and 128 pixels
			),
		);
		this.scene.time.delayedCall(
			Phaser.Math.Between(500, 1500),
			() => this.generateCoin(1),
			null,
			this,
		);
	} // set the coins to be generated randomly between 0.5 and 1.5 seconds and pass in 1 as a parameter to generate a coin
}

/*
 This is a game object class that extends Phaser.GameObjects.Rectangle. It is used to create the cloud object in the game.
 */
