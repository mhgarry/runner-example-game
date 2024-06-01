/*
Create a class called Player that extends Phaser.GameObjects.Rectangle. Put values into constructor to set parameters for the player object etc...
*/

class Player extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, number) {
		// Create a constructor that takes in scene, x, y, and number as parameters
		super(scene, x, y, 32, 32, 0x00ff00); // extend the class using super and pass scene and x, y, width, height, and color as parameters
		this.setOrigin(0.5); // set the origin of the player object to center of the object
		this.scene.add.existing(this); // add the player object to create the scene object
	}
}
