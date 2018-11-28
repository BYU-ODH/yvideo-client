import React, { Component } from 'react'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'

import './Fonts/fonts.css'

class App extends Component {

	render() {
		return (
			<div>
				<Header />
				<Home />
			</div>
		)
	}
}

export default App
