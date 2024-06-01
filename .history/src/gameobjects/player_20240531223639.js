/*
Create a class called Player that extends Phaser.GameObjects.Rectangle. Put values into constructor to set parameters for the player object etc...
*/

class Player extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, number) {
		// Create a constructor that takes in scene, x, y, and number as parameters
		super(scene, x, y, 32, 32, 0x00ff00); // extend the class using super and pass scene and x, y, width, height, and color as parameters
		this.setOrigin(0.5); // set the origin of the player object to center of the object
		this.scene.add.existing(this); // add the player object to create the scene object
		this.scene.physics.add.existing(this); // add physics to the player object
		this.body.collideWorldBounds = true; // set the player object to collide with the world
		this.setScale(1); // sets the scale of the player object to 1, which means it is 1x1 in size
		this.jumping = false; // set the jumping property initially to false
		this.invincible = false; // set the invincible property initially to false so the player can be hit
		this.health = 10; // set the health property to 10
		this.body.mass = 1; // set the mass of the player object to 1
		this.body.setDragY = 10; // set the drag of the player along the y-axis to 10 to slow player down
	}
}
