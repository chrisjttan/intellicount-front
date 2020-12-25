import { Component } from 'react';
import DemoGame from './components/DemoGame';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return <DemoGame></DemoGame>;
	}
}

export default App;
