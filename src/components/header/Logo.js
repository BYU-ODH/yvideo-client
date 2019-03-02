import React, { Component } from 'react'

import { TitleContainer, Name, Shadow, Logo } from './styles'

export default class Title extends Component {
	render() {
		return (
			<TitleContainer to='/'>
				<Logo />
				<Name>YVIDEO</Name>
				<Shadow>YVIDEO</Shadow>
			</TitleContainer>
		)
	}
}
