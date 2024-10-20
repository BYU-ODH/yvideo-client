import React from 'react'

import Style, { LogoWrapper, Name, Shadow, Logo } from './styles'

import BreadcrumbContainer from '../../../containers/c/BreadcrumbContainer'

const Header = props => {

	const {
		lost,
		border,
		editorStyle,
	} = props.viewstate

	let backgroundColor = `white`

	if (lost) backgroundColor = `transparent`
	else if (editorStyle) backgroundColor = `transparent`

	return (
		<Style id='navbar' backgroundColor={backgroundColor} border={border}>
			<LogoWrapper className='std-outline-color' to='/'>
				<Logo />
				<Name>Y-VIDEO</Name>
				<Shadow>Y-VIDEO</Shadow>
			</LogoWrapper>
			<BreadcrumbContainer />
		</Style>
	)
}

export default Header
