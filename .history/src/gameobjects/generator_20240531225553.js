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

class Cloud extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y) {
		const finalY = y || Phaser.Math.Between(0, 100); // set the finalY to a random value between 0 and 100 to generate a cloud at a random point along the
		super(scene, x, finalY, 98, 32, 0xffffff); // extend the rectangle class using super and pass scene, x, finalY, width, height, and color as parameters to create the cloud object
		scene.addExisting(this); // add the cloud object to the scene
		scene.alpha = 1 / Phaser.Math.Between(1, 3); // set the starting value  of the cloud object to a random value between 1 and 3

		this.setScale(); // call the setScale function to set the scale of the cloud object to 1 by 1
		this.init(); // call the init function to initialize the cloud object and set the properties
	}

	init() {
		// set the cloud object to move from right to left
		this.scene.tweens.add({
			target: this,
			x: { from: 800, to: -100 }, // set the x value of the cloud object to move from 800 to -100 along the x-axis
			duration: 2000 / this.scale,
			onComplete: () => this.destroy(), // destroy the cloud object when it reaches the end of the screen
		}); // set the duration of the cloud object to 2000 divided by the scale of the cloud object
	}
}
