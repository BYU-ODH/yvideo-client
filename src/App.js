import React, { Component } from 'react'

import {
	Route,
	Switch
} from 'react-router-dom'

import './Fonts/fonts.css'

import Cookies from 'js-cookie'

import Landing from './Components/Pages/Landing/Landing'
import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'
import Home from './Components/Pages/Home/Home'
import Error from './Components/Pages/Error/Error'

// import VideoPage from './Components/VideoPage/VideoPage'
// import { createReadStream } from 'fs'

export default class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			active: false,
			lost: false,
			auth: false,
			authCheck: true
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

	componentWillMount = () => {
		this.checkAuth()
	}

	checkAuth() {
		fetch('https://ayamelbeta.byu.edu/api/user', { credentials: 'include' })
			.then(data => {
				if (data.ok) {
					Cookies.set('auth', true)
					console.log(data)
					this.setState({
						auth: true,
						authCheck: false
					})
					this.setState({ authCheck: false })
				} else {
					Cookies.set('auth', false)
					console.error(data)
					this.setState({
						auth: false,
						authCheck: false
					})
				}
			})
	}

	render() {
		return (
			<div>

				<Switch>
					<Route exact path='/' component={Landing} />

					<PrivateRoute
						path='/dashboard'
						component={Home}
						active={this.state.active}
						authCheck={this.state.authCheck}
						toggleMenu={this.toggleMenu}
						toggleLost={this.toggleLost}
					/>
					{/* <PrivateRoute path='/videos/:id' component={VideoPage} /> */}

					<Route render={props => <Error {...props} toggleLost={this.toggleLost} error='404' message={'You\'ve wandered too far'} />} />
				</Switch>
			</div>
		)

	}
}

const PrivateRoute = ({
	component: Component,
	toggleMenu: toggleMenu2,
	active: active2,
	path: Path,
	authCheck: AuthCheck,
	toggleLost: ToggleLost,
	...rest
}) => {
	if (!AuthCheck) {
		if (Cookies.get('auth') !== 'true')
			return window.location.href = 'https://ayamelbeta.byu.edu/auth/cas/redirect' + window.location.origin + Path
		else {
			return (
				<div>
					<Header />
					<Menu toggleMenu={props => props.toggleMenu2} active={props => props.active2} />

					<Route
						{...rest}
						render={props => <Component {...props} />}
					/>
				</div>
			)
		}
	} else return <Error toggleLost={ToggleLost} error='500' message={'This is on us. We\'re very sorry.'} />
}