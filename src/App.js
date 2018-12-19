import React, { Component } from 'react'

import {
	Route,
	Switch,
	withRouter,
	Redirect
} from 'react-router-dom'

import './Fonts/fonts.css'

import Cookies from 'js-cookie'

import Landing from './Components/Landing/Landing'
import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'
import Home from './Components/Home/Home'
import NotFound from './Components/Error/Error'

import VideoPage from './Components/VideoPage/VideoPage'
import { createReadStream } from 'fs'

export default class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			active: false,
			lost: false,
			auth: false
		}

		this.toggleMenu = this.toggleMenu.bind(this)
		this.toggleLost = this.toggleLost.bind(this)
		this.checkAuth = this.checkAuth.bind(this)
	}

	toggleLost = () => {
		this.setState({
			lost: !this.state.lost
		})
	}

	toggleMenu = () => {
		this.setState({
			active: !this.state.active
		})
	}

	componentDidMount = () => {
		this.checkAuth(this.setState)
	}

	checkAuth(setState) {
		fetch('https://ayamelbeta.byu.edu/api/user', { credentials: 'include' })
			.then(data => {
				data.ok ? console.log(data) : console.error(data)
				this.setState({
					auth: true
				})
			})
			.catch(err => {
				console.error(err)
				this.setState({
					auth: false
				})
			})
	}

	render() {
		return (
			<Switch>
				<Route exact path='/' component={Landing} />

				<PrivateRoute path='/dashboard' component={Home} auth={this.state.auth} />
				{/* <PrivateRoute path='/videos/:id' component={VideoPage} /> */}

				<Route render={props => <NotFound {...props} toggleLost={this.toggleLost} />} />
			</Switch>
		)
	}
}

const PrivateRoute = ({ component: Component, auth: isAuth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				isAuth ?
					<Component {...props} />
					:
					() => window.location.href = 'https://ayamelbeta.byu.edu/auth/cas/redirect' + window.location.origin
			}
		/>
	)
}
