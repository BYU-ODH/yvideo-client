import React, { PureComponent } from 'react'

// import { Header, Menu } from 'components'

class HeaderRoute extends PureComponent {
	render() {
		return (
			<>
				{/* <Header /> */}
				{/* <Menu /> */}
				{this.props.children}
			</>
		)
	}
}

export default HeaderRoute