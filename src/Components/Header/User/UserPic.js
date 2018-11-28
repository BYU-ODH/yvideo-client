import React, { Component } from 'react'
import styled from 'styled-components'

const StyledUserPic = styled.div`
	border: 2px solid black;
	border-radius: 50%;
`

export class UserPic extends Component {
	render() {
		return (
			<StyledUserPic>
				GP
			</StyledUserPic>
		)
	}
}

export default UserPic
