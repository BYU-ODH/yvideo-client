import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { Route, Switch } from 'react-router-dom'

import './Styles/global.css'
// import Global from './Styles/Global'

import PrivateRoute from './Components/Routes/PrivateRoute'

import Landing from './Views/Landing/Landing'
import Home from './Views/Home/Home'
import Collections from './Views/Collections/Collections'
import Error from './Views/Error/Error'

export default class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			active: false,
			lost: false,
			auth: false,
			check: true,
			isProf: false,
			isAdmin: false
		}

		this.toggleMenu = this.toggleMenu.bind(this)
		this.checkAuth = this.checkAuth.bind(this)
		this.signOut = this.signOut.bind(this)
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
		fetch(process.env.REACT_APP_YVIDEO_SERVER + '/api/user/auth', { credentials: 'include' })
			.then(data => {
				console.log('You\'re logged in via CAS.')
				// console.log('/api/user/auth', data)
				if (data.ok) {
					Cookies.set('auth', true)
					this.setState({
						auth: true,
						check: false
					})
				} else {
					Cookies.set('auth', false)
					this.setState({
						auth: false,
						check: false
					})
				}
			})
			.catch(error => {
				// TODO: display 500 error
			})
	}

	signOut = () => {
		this.setState({ wait: true })
		fetch(process.env.REACT_APP_YVIDEO_SERVER + '/auth/logout', { credentials: 'include' })
			.then(data => {
				console.log(data)
				Cookies.set('auth', false)
				this.setState({
					auth: false,
					wait: false
				})
				window.location.href = '/'
			})
	}

	render() {

		const stateVars = {
			active: this.state.active,
			check: this.state.check,
			toggleMenu: this.toggleMenu,
			signOut: this.signOut,
			isProf: this.state.isProf,
			isAdmin: this.state.isAdmin
		}

		return (
			<Switch>
				<Route exact path='/' component={Landing} />

				<PrivateRoute path='/dashboard' component={Home} stateVars={stateVars} />
				<PrivateRoute path='/collections' component={Collections} stateVars={stateVars} />

				<Route render={() => <Error error='404' message={'You\'ve wandered too far'} />} />
				{/* <Global /> */}
			</Switch>
		)

	}
}