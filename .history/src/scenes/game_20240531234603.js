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

		this.physics.add.collider(
			this.player,
			this.obstacles,
			this.hitObstacle,
			() => {
				return true;
			},
			this,
		); // add a collider between the player and obstacles to detect collisions, call the hitObstacle function when a collision is detected using an anonymous function with the return value of true, and pass in the scene to the collider method

		this.physics.add.overlap(
			this.player,
			this.coins,
			this.hitCoin,
			() => {
				return true;
			},
			this,
		); // add an overlap between the player and the coins to detect overlaps, call the hitCoin function when an overlap is detected using an anonymous function with the return value of true, and pass in the scene to the overlap method

		this.loadAudio(); // call the loadAudio function to load the audio files
		this.playMusic(); // call the playMusic function to play the music

		/* Use a pointerdown event listener to listen for a mouse click or touch event */
		this.input.on('pointerdown', pointer => this.jump(), this);

		/* use update method to update the game state */
		this.updateScoreEvent = this.time.addEvent({
			delay: 100,
			callback: () => this.updateScoreEvent(),
			callbackScope: this,
			loop: true,
		}); // create an updateScoreEvent to update the score every 100 milliseconds and pass in the scene to the callback function
	}
	/* Create a method to be called when a player hits an obstacle */
	hitObstacle(player, obstacle) {
		this.updateScoreEvent.destroy(); // destroy the updateScoreEvent
		this.finishScore(); // call the finishScore function
	}
	/* Create a method to be called when a player hits a coin */
	hitCoin(player, coin) {
		this.playAudio('coin'); // play the coin sound
		this.updateScoreEvent(1000); // update the score by 1000 points
		coin.destroy(); // de
	}
	/* Create a method to load game audio */
	loadAudios() {
		this.audios = {
			jump: this.sound.add('jump'), // load the jump sound
			dead: this.sound.add('dead'), // load the dead sound
			coin: this.sound.add('coin'), // load the coin sound
		};
	}

	playAudio(key) {
		this.audios[key].play(); // play the audio with the key passed in to the function to play the correct sound
	}

	/* Create a method to play the game music */
	playMusic(theme = 'theme') {
		this.theme = this.sound.add(theme); // load the theme music
		this.theme.stop(); // stop the theme music
		this.theme.play({
			mute: false, // set the mute of the theme music to false
			volume: 1, // set the volume of the theme music to 1
			rate: 1, // set the rate of the theme music to 1
			detune: 0, // set the detune of the theme music to 0
			seek: 0, // set the seek of the theme music to 0
			loop: true, // set the loop of the theme music to true
			delay: 0, // set the delay of the theme music to 0
		}); // play the theme music
	}
	/* Create the game loop with the update method that's called every frame */
	update() {
		if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
			this.jump(); // call the jump function when the space key is pressed
		} else if (this.player.body.blocked.down) {
			this.justTween?.stop(); // stop the tween if the player is blocked down
			this.player.rotation = 0; // represents the ground level
		} // check if the player is blocked down and set the rotation of the player to 0
	}
	/* Create a method to make the player jump */
	jump() {
		if (!this.player.body.blocked.down) return; // return if the player is not blocked down
		this.player.body.setVelocity(-300); // set the velocity of the player to -300

		this.playAudio('jump'); // play the jump sound
		this.jumpTween = this.tweens.add({
			targets: this.player, // set the target of the tween to the player
			duration: 1000, // set the duration of the tween to 1000 milliseconds
			angle: { from: 0, to: 360 }, // set the angle of the player to rotate from 0 to 360 degrees
			repeat: -1, // repeat the tween indefinitely
		});
	}
	/* Create a method that is called when game is finished */
	finishScene() {
		this.theme.stop(); // stop the theme music
		this.playAudio('dead'); // play the dead sound
	}
}
