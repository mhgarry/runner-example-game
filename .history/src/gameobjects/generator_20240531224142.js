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
         = () => {  };
    }
}
