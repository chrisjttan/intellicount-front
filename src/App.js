import { Component } from 'react';
import DemoGame from './components/DemoGame';
import { Container } from 'reactstrap';
import Navbar from './components/Navbar';
import Game from './components/Game';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Container>
				<Game />
				<Navbar />
			</Container>
		);
	}
}

export default App;
