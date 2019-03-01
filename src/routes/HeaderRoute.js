import React, { Fragment } from 'react'

import Header from './../components/header/Header'
import Menu from './../components/menu/Menu'

const HeaderRoute = props => {
	return (
		<Fragment>
			<Header />
			<Menu />
			{props.children}
		</Fragment>
	)
}

export default HeaderRoute