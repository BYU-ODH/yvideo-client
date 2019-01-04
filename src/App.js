import React, { Component } from 'react'

import { Route, Switch } from 'react-router-dom'

import './Fonts/fonts.css'

import Cookies from 'js-cookie'

import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'

import Landing from './Components/Pages/Landing/Landing'

import Home from './Components/Pages/Home/Home'
import Collections from './Components/Pages/Collections/Collections'

import Error from './Components/Pages/Error/Error'

export default class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			active: false,
			lost: false,
			auth: false,
			check: true
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
				console.log('/api/user/auth', data)
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
			signOut: this.signOut
		}
		return (
			<Switch>
				<Route exact path='/' component={Landing} />

				<PrivateRoute path='/dashboard' component={Home} stateVars={stateVars} />
				<PrivateRoute path='/collections' component={Collections} stateVars={stateVars} />

				<Route render={() => <Error error='404' message={'You\'ve wandered too far'} />} />
			</Switch>
		)

	}
}

const HeaderRoute = props => {
	const { active, toggleMenu, signOut } = { ...props.stateVars }
	return (
		<div>
			<Header />
			<Menu active={active} toggleMenu={toggleMenu} signOut={signOut} />
			<Route path={props.path} component={props.component} />
		</div>
	)
}

const PrivateRoute = ({ component: Component, ...props }) => {
	if (!props.check) {
		if (Cookies.get('auth') !== 'true')
			window.location.href = process.env.REACT_APP_YVIDEO_SERVER + '/auth/cas/redirect' + window.location.origin + props.path
		else
			return <HeaderRoute {...props} component={Component} />
	} else return <Error error='500' message={'This is on us. We\'re very sorry.'} />
}
