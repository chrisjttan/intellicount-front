import React, { Component } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';

class Game extends Component {
	constructor(props) {
		super(props);

		// bind 'this' keyword to functions
		this.collectStar = this.collectStar.bind(this);
		this.hitBomb = this.hitBomb.bind(this);

		// initialise state
		this.state = {
			unmounted: false,
			initialize: false,
			game: null,
		};
	}

	componentDidMount() {
		let platforms;
		let player;
		let cursors;
		let stars;
		let bombs;
		let scoreText;
		let gameOver;
		// main phaser game setup
		this.setState({
			game: {
				width: 800,
				height: 600,
				type: Phaser.AUTO,
				scene: {
					extend: {
						component: this, // this allows us to access components state within scene object
					},
					init() {},
					preload() {
						this.load.image('sky', 'assets/sky.png');
						this.load.image('ground', 'assets/platform.png');
						this.load.image('star', 'assets/star.png');
						this.load.image('bomb', 'assets/bomb.png');
						this.load.spritesheet('dude', 'assets/dude.png', {
							frameWidth: 32,
							frameHeight: 48,
						});
					},
					create() {
						//  A simple background for our game
						this.add.image(400, 300, 'sky');

						//  The platforms group contains the ground and the 2 ledges we can jump on
						platforms = this.physics.add.staticGroup();

						//  Here we create the ground.
						//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
						platforms.create(400, 568, 'ground').setScale(2).refreshBody();

						//  Now let's create some ledges
						platforms.create(600, 400, 'ground');
						platforms.create(50, 250, 'ground');
						platforms.create(750, 220, 'ground');

						// The player and its settings
						player = this.physics.add.sprite(100, 450, 'dude');
						//  Player physics properties. Give the little guy a slight bounce.
						player.setBounce(0.2);
						player.setCollideWorldBounds(true);

						this.anims.create({
							key: 'left',
							frames: this.anims.generateFrameNumbers('dude', {
								start: 0,
								end: 3,
							}),
							frameRate: 10,
							repeat: -1,
						});

						this.anims.create({
							key: 'turn',
							frames: [{ key: 'dude', frame: 4 }],
							frameRate: 20,
						});

						this.anims.create({
							key: 'right',
							frames: this.anims.generateFrameNumbers('dude', {
								start: 5,
								end: 8,
							}),
							frameRate: 10,
							repeat: -1,
						});
						//  Input Events
						cursors = this.input.keyboard.createCursorKeys();

						//  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
						stars = this.physics.add.group({
							key: 'star',
							repeat: 11,
							setXY: { x: 12, y: 0, stepX: 70 },
						});

						stars.children.iterate(function (child) {
							//  Give each star a slightly different bounce
							child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
						});
						bombs = this.physics.add.group();

						//  The score
						scoreText = this.add.text(16, 16, 'score: 0', {
							fontSize: '32px',
							fill: '#000',
						});
						this.physics.add.collider(player, platforms);
						this.physics.add.collider(stars, platforms);
						this.physics.add.collider(bombs, platforms);

						//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
						this.physics.add.overlap(
							player,
							stars,
							this.collectStar,
							null,
							this
						);

						this.physics.add.collider(player, bombs, this.hitBomb, null, this);
					},
					update() {
						if (gameOver) {
							return;
						}

						if (cursors.left.isDown) {
							player.setVelocityX(-160);

							player.anims.play('left', true);
						} else if (cursors.right.isDown) {
							player.setVelocityX(160);

							player.anims.play('right', true);
						} else {
							player.setVelocityX(0);

							player.anims.play('turn');
						}

						if (cursors.up.isDown && player.body.touching.down) {
							player.setVelocityY(-330);
						}
					},
				},
				physics: {
					default: 'arcade',
					arcade: {
						gravity: { y: 300 },
						debug: false,
					},
				},
			},
		});
		this.setState({
			initialize: true,
		});
	}
	state = {
		initialize: true,
	};

	collectStar(player, star) {
		star.disableBody(true, true);

		//  Add and update the score
		this.score += 10;
		this.scoreText.setText('Score: ' + this.score);

		if (this.stars.countActive(true) === 0) {
			//  A new batch of stars to collect
			this.stars.children.iterate(function (child) {
				child.enableBody(true, child.x, 0, true, true);
			});

			var x =
				player.x < 400
					? Phaser.Math.Between(400, 800)
					: Phaser.Math.Between(0, 400);

			var bomb = this.bombs.create(x, 16, 'bomb');
			bomb.setBounce(1);
			bomb.setCollideWorldBounds(true);
			bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
			bomb.allowGravity = false;
		}
	}
	hitBomb(player, bomb) {
		this.physics.pause();

		player.setTint(0xff0000);

		player.anims.play('turn');

		this.gameOver = true;
	}
	render() {
		const { initialize, game } = this.state;
		return <IonPhaser game={game} initialize={initialize} />;
	}
}

export default Game;
