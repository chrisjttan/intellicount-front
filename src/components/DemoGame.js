import React, { Component } from 'react';
import Phaser from 'phaser';
import { IonPhaser } from '@ion-phaser/react';
import gameConfig from './DemoGameConfig/DemoMainCfg';

class Game extends Component {
	constructor(props) {
		super(props);

		// bind 'this' keyword to functions
		// this.collectStar = this.collectStar.bind(this);
		// this.hitBomb = this.hitBomb.bind(this);

		// initialise state
		this.state = {
			unmounted: false,
			initialize: false,
			game: null,
			gameVar: {
				platforms: null,
				player: null,
			},
		};
	}

	componentDidMount() {
		// main phaser game setup
		this.setState({
			game: gameConfig.game,
			initialize: true,
		});
	}

	render() {
		const { initialize, game } = this.state;
		return <IonPhaser game={game} initialize={initialize} />;
	}
}

export default Game;
