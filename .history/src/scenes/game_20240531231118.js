/*
The game scene that that loads the game assets, creates the gameobjects, and creates the game loop.
*/

import Player from '../gameobjects/player';
import Generator from '../gameobjects/generator';

export default class Game extneds
Phaser.Scene {
    constructor() {
        super({ key: 'game ' });
        this.player = null;
        this.score = 0;
        this.scoreText = null;
    }
}
