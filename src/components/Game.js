import React, { Component } from 'react';
import { IonPhaser } from '@ion-phaser/react';
import gameConfig from './DemoGameConfig/MainCfg';
import { Container } from 'reactstrap';

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
			game: gameConfig.game,
			initialize: true,
		});
	}

	render() {
		const { initialize, game } = this.state;
		return (
			<Container fluid className='d-inline'>
				<IonPhaser game={game} initialize={initialize} />
			</Container>
		);
	}
}

export default DemoGame;
