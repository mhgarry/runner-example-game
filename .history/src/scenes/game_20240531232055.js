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
		this.score = 0; // Set the score property to 0 initially.  Will be used to keep track of the player's score to display on the screen
		this.scoreText = null; // Set the scoreText property to null initially. Will be used to display the player's score as text
	}

	init(data) {
		this.name = data.name; // Set the name property to the name passed in as data
		this.number = data.number; // Set the number property to the number passed in as data
	} // Create an init method that takes in data as a parameter to pass to store the name and number properties in the scene

	/* Use the preload method to load all game assets */

	preload() {
		this.registry.set('score', 0); // sets the initial score to 0
		this.load.audio('coin', 'assets/sounds/coin.mp3'); // loads the coin sound
		this.load.audio('jump', 'assets/sounds/jump.mp3'); // loads the jump sound
		this.load.audio('dead', 'assets/sounds/dead.mp3'); // loads the death sound
		this.load.spritesheet('coin', 'assets/coin.png', {
			frameWidth: 32,
			frameHeight: 32,
		}); // loads the coin spritesheet
		this.load.bitmapFont(
			'arcade',
			'assets/fonts/arcade.png',
			'assets/fonts/arcade.xml',
		); // loads the arcade font
		this.score = 0; // sets the initial score to 0
	}
}
