import { Component } from 'react';
// import Home from './pages/Home';
// import Navvy from './components/Navvy';
// import { BrowserRouter, Route } from 'react-router-dom';
// import Blog from './pages/Blog';
import Game from './components/Game';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Game className='d-flex'></Game>
			</div>
		);
	}
}

export default App;
