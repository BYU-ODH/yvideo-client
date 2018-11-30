import React, { Component } from 'react'
import styled from 'styled-components'

import UserPic from './User/UserPic'

const StyledNav = styled.div`
	margin-right: 2.4rem;
`

export default class Nav extends Component {
	render() {
		return (
			<StyledNav>
				<UserPic />
			</StyledNav>
		)
	}
}
