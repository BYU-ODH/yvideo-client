import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { authService } from 'services'

class Redirect extends PureComponent {

	componentDidMount = () => {
		this.props.loginWithRedirect(window.location)
	}

	render() {
		return (
			<></>
		)
	}
}

const mapDispatchToProps = {
	loginWithRedirect: authService.loginWithRedirect,
}

export default connect(null, mapDispatchToProps)(Redirect)
