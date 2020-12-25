import { Component } from 'react';
import Game from './components/Game';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <Game></Game>;
	}
}

export default App;
