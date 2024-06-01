/*
The game scene that that loads the game assets, creates the gameobjects, and creates the game loop.
*/

import Player from '../gameobjects/player';
import Generator from '../gameobjects/generator';

// Create a class called game that extends Phaser.Scene and contains the game logic
export default class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game ' }); // Create a constructor that takes in a key parameter and passes it to the super class
		this.player = null; // Set the player property to null initially
		this.score = 0; // Set the score property to 0 initially.  Will be used to keep track of the player's score as a number
		this.scoreText = null; // Set the scoreText property to null initially. Will be used to display the player's score as text
	}
}
