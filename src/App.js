import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './Fonts/fonts.css'

import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Collections from './Components/Collections/Collections'

export default class App extends Component {

	render() {
		return (
			<Router>
				<div>
					<Header />

					<Route exact path='/' component={Home} />
					<Route path='/collections' component={Collections} />

				</div>
			</Router>
		)
	}
}