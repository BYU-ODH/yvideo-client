import React from 'react'

import { Route } from 'react-router-dom'

import Header from './../Header/Header'
import Menu from './../Menu/Menu'

const HeaderRoute = ({ component: Component, ...rest }) => {
	const { active, toggleMenu, signOut, ...restprops } = rest.stateVars
	return (
		<div>
			<Header />
			<Menu active={active} toggleMenu={toggleMenu} signOut={signOut} />
			<Route {...restprops} render={props => <Component {...props} />} />
		</div>
	)
}

export default HeaderRoute
