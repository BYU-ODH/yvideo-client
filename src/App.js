import React, { Component } from 'react'

import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'

import './Fonts/fonts.css'

import Header from './Components/Header/Header'
import Menu from './Components/Menu/Menu'
import Home from './Components/Home/Home'
// import Collections from './Components/Collections/Collections'

export default class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			active: false
		}

		this.toggleMenu = this.toggleMenu.bind(this)
	}

	toggleMenu = () => {
		this.setState({
			active: !this.state.active
		})
	}

	render() {
		return (
			<Router>
				<div>
					<Header />
					<Menu active={this.state.active} toggleMenu={this.toggleMenu} />

					{/* <Route exact path='/' component={Home} />
					<Route path='/collections' component={Collections} /> */}

					<AuthButton />
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/protected'>Protected Page</Link>
						</li>
					</ul>
					<Route exact path='/' component={Public} />
					<Route path='/login' component={Login} />
					<PrivateRoute path='/protected' component={Home} />

				</div>
			</Router>
		)
	}
}

function Public() {
	return <h3>Home</h3>
}

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={
				props => fakeAuth.isAuthenticated ?
					<Component {...props} />
					:
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}} />
			}
		/>
	)
}

// eslint-disable-next-line one-var
const fakeAuth = {
	isAuthenticated: false,
	authenticate(cb) {
		this.isAuthenticated = true
		setTimeout(cb, 100) // fake async
	},
	signout(cb) {
		this.isAuthenticated = false
		setTimeout(cb, 100)
	}
}

// eslint-disable-next-line one-var
const AuthButton = withRouter(({ history }) =>
	fakeAuth.isAuthenticated ?
		<p style={{ paddingTop: 20 + 'rem' }}>
			Welcome!{' '}
			<button
				onClick={() => {
					fakeAuth.signout(() => history.push('/'))
				}}
			>
				Sign out
        </button>
		</p>
		:
		<p style={{ paddingTop: 20 + 'rem' }}>You are not logged in.</p>)

class Login extends React.Component {
	state = { redirectToReferrer: false };

	login = () => {
		fakeAuth.authenticate(() => {
			this.setState({ redirectToReferrer: true })
		})
	}

	render() {
		// eslint-disable-next-line prefer-const
		let { from } = this.props.location.state || { from: { pathname: '/' } },
			// eslint-disable-next-line prefer-const
			{ redirectToReferrer } = this.state

		if (redirectToReferrer) return <Redirect to={from} />

		return (
			<div>
				<p>You must log in to view the page at {from.pathname}</p>
				<button onClick={this.login}>Log in</button>
			</div>
		)
	}
}
