import React, { Component } from 'react'

import { Route, Switch } from 'react-router-dom'

import './Fonts/fonts.css'

import Cookies from 'js-cookie'

import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'

import Landing from './Components/Pages/Landing/Landing'
import Home from './Components/Pages/Home/Home'
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
		fetch('https://santi.space/api/user/auth', { credentials: 'include' })
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
				// display 500 error
			})
	}

	signOut = () => {
		this.setState({ wait: true })
		fetch('https://santi.space/auth/logout', { credentials: 'include' })
			.then(data => {
				console.log(data)
				this.setState({
					auth: false,
					wait: false
				})
				window.location.href = window.location.origin
			})
	}

	render() {
		return (
			<Switch>
				<Route exact path='/' component={Landing} />

				<PrivateRoute
					path='/dashboard'
					component={Home}
					active={this.state.active}
					check={this.state.check}
					toggleMenu={this.toggleMenu}
					signOut={this.signOut}
				/>

				<Route component={Error} error='404' message={'You\'ve wandered too far'} />
			</Switch>
		)

	}
}

const HeaderRoute = props => {
	return (
		<div>
			<Header />
			<Menu active={props.active} toggleMenu={props.toggleMenu} signOut={props.signOut} />
			<Route path={props.path} component={props.component} />
		</div>
	)
}

const PrivateRoute = ({ component: Component, ...props }) => {
	if (!props.check) {
		if (Cookies.get('auth') !== 'true')
			window.location.href = 'https://santi.space/auth/cas/redirect' + window.location.origin + props.path
		else
			return <HeaderRoute {...props} component={Component} />
	} else return <Error error='500' message={'This is on us. We\'re very sorry.'} />
}