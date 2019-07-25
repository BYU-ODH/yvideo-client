import React from 'react'

import Header from 'components/header/Header'
import Menu from 'components/menu/Menu'

const HeaderRoute = props => {
	return (
		<>
			<Header />
			<Menu />
			{props.children}
		</>
	)
}

export default HeaderRoute