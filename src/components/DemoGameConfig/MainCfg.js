import Phaser from 'phaser';

class Scenes extends Phaser.Scene {
	preload() {
		this.load.image('base', 'assets/floorPartBig.png');
	}

	create() {
		var level = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 2, 3, 0, 0, 0, 1, 2, 3, 0],
			[0, 5, 6, 7, 0, 0, 0, 5, 6, 7, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 14, 13, 14, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 14, 14, 14, 14, 14, 0, 0, 0, 15],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15],
			[35, 36, 37, 0, 0, 0, 0, 0, 15, 15, 15],
			[39, 39, 39, 39, 39, 39, 39, 39, 39, 39, 39],
		];

		//  When loading from an array, make sure to specify the tileWidth and tileHeight
		this.map = this.add.tilemap();

		var tiles = this.map.addTilesetImage('base');

		this.backgroundLayer = this.map.createStaticLayer('backgroundLayer', tiles);
	}
	update() {}
}

const gameConfig = {
	game: {
		width: 800,
		height: 600,
		type: Phaser.AUTO,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: 300 },
				debug: false,
			},
		},
		scene: Scenes,
	},
};

export default gameConfig;
