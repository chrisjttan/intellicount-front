import React, { Component } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import demoGameConfig from './DemoGameConfig/DemoMainCfg';

class DemoGame extends Component {
	constructor(props) {
		super(props);

		// initialise state
		this.state = {
			unmounted: false,
			initialize: false,
			game: null,
		};
	}

	componentDidMount() {
		// main phaser game setup
		this.setState({
			game: demoGameConfig.game,
			initialize: true,
		});
	}

	render() {
		const { initialize, game } = this.state;
		return <IonPhaser game={game} initialize={initialize} />;
	}
}

export default DemoGame;
