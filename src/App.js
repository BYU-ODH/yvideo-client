import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import PrivateRoute from './routes/PrivateRoute'

// import Load from './components/load/Load'
import Dashboard from './views/Dashboard'
import Landing from './views/Landing'
import Collection from './views/Collection'

const mapStateToProps = state => {
	return {
		authorized: state.authorized,
		loading: state.loading
	}
}

class App extends Component {
	render = () =>
		<Router>
			<Switch>
				<Route exact path={'/'} component={Landing} />

				<Route component={PrivateRoute}>
					<Route path={'/dashboard'} component={Dashboard} />
					<Route path={'/collection'} component={Collection} />
					<Route path={'/login-success'} component={() => null} />
				</Route>
			</Switch>
		</Router>
}

export default connect(mapStateToProps)(App)
