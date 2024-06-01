/*
Create a class called Player that extends Phaser.GameObjects.Rectangle. Put values into constructor to set parameters for the player object etc..
*/

class Player extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, number) {
		super(scene, x, y, 32, 32, 0x00ff00);
		this.setOrigin(0.5);
	}
}
