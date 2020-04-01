import React from 'react'

import { Route } from 'react-router-dom'

import Header from './../Header/Header'
import Menu from './../Menu/Menu'

const HeaderRoute = ({ component: Component, ...rest }) => {
	return (
		<React.Fragment>
			<Header />
			<Menu stateVars={rest.stateVars} />
			<Route path={rest.path} render={props => <Component {...props} stateVars={rest.stateVars} />} />
		</React.Fragment>
	)
}

export default HeaderRoute