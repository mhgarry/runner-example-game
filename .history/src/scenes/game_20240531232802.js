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

	/*
        Use the create method to:
        - create a method to initialize teh game
        - set variables to store width ahd height to use throughout the game
        - set background color, create the player object, the obstacles, and the coins in the game
        - Create a keyboard input to listen to the space key to make the player jump
        - add a collider between the player and the obstacles to detect collisions and detect damage  and a overlap between the player and the coins to detect overlaps and collect the coins
    */

	create() {
		this.width = this.sys.config.width; // set the width property to the width of the game
		this.height = this.sys.config.height; // set the height property to the height of the game
		this.center.width = this.width / 2; // set the center width property to half the width of the game
		this.center.height = this.height / 2; // set the center height property to half the height of the game

		this.cameras.main.setBackgroundColor('0x87ceeb'); // set the background color of the game to light blue
		this.obstacles = this.add.group(); // create a group for the games obstacles to be stored in
		this.coins = this.add.group(); // create a group for the games coins to be stored in
		this.generator = new Generator(this); // create a new generator object to generate the obstacles and coins in the game scene and pass in the scene as a parameter
		this.SPACE = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE,
		); // create a keyboard input to listen for the space key to be pressed
		this.player = new Player(
			this,
			this.center_width - 100,
			this.height - 200,
		); // create a new player object and pass in the scene, the center width, and the height of the game
		this.scoreText = this.add.bitmapText(
			this.center_width,
			10,
			'arcade',
			this.score,
			20,
		); // create a bitmap text object to display the score on the screen
	}
}
