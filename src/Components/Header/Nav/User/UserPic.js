import React, { Component } from 'react'
import styled from 'styled-components'

const StyledUserPic = styled.div`
	border: 1px solid black;
	border-radius: 50%;
	height: 3.6rem;
	width: 3.6rem;
	display: flex;
	align-items: center;
	justify-content: center;
`

export default class UserPic extends Component {
	render() {
		return (
			<StyledUserPic>
				GP
			</StyledUserPic>
		)
	}
}
