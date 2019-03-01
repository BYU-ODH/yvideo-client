import React, { Component } from 'react'

import { UserPicStyled } from './styles'

class UserPic extends Component {
	render() {
		return (
			<UserPicStyled>
				{this.props.initials}
			</UserPicStyled>
		)
	}
}

export default UserPic
