import React from 'react'

import Style, { LogoWrapper, Name, Shadow, Logo, ReleaseBanner } from './styles'

import BreadcrumbContainer from '../../../containers/c/BreadcrumbContainer'

const Header = props => {

	const {
		lost,
		border,
		editorStyle,
		showReleaseBanner,
	} = props.viewstate

	const { dismissReleaseBanner } = props.handlers || {}

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
			{ showReleaseBanner &&
				<ReleaseBanner role='status' data-testid='release-banner'>
					<p>
						Y-Video 2.0 is being released on December 18! Read the{` `}
						<a href='https://odh.byu.edu/blog/meet-the-new-y-video/' target='_blank' rel='noopener noreferrer'>
							release blog post
						</a>
						{` `}to learn what you need to do.
					</p>
					<button type='button' aria-label='Dismiss announcement' onClick={dismissReleaseBanner} data-testid='release-banner-dismiss'>
						&times;
					</button>
				</ReleaseBanner>
			}
		</Style>
	)
}

export default Header
