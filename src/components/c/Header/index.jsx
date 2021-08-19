import React, { PureComponent } from 'react'

import Style, { LogoWrapper, Name, Shadow, Logo} from './styles'

import BreadcrumbContainer from '../../../containers/c/BreadcrumbContainer'

export default class Header extends PureComponent {
	render() {

		const {
			lost,
			border,
			editorStyle,
		} = this.props.viewstate

		let backgroundColor = `white`

		if (lost) backgroundColor = `transparent`
		else if (editorStyle) backgroundColor = `transparent`

		return (
			<Style backgroundColor={backgroundColor} border={border}>
				<LogoWrapper to='/'>
					<Logo />
					<Name>YVIDEO</Name>
					<Shadow>YVIDEO</Shadow>
				</LogoWrapper>
				<BreadcrumbContainer />
			</Style>
		)
	}
}
