import React, { Component } from 'react'
import styled from 'styled-components'

import Overlay from './Overlay'

import CometsLeft from './CometsLeft.svg'
import CometsRight from './CometsRight.svg'

import HexLogo from './../../HexLogo2.svg'

const StyledLanding = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;

	&>div.comets {
		width: 50%;
		height: 100vh;
		margin: 0;
		background-color: transparent;
	}
`,

	StyledCometsLeft = styled.div`
		background: url(${CometsLeft}) no-repeat bottom left;
	`,

	StyledCometsRight = styled.div`
		background: url(${CometsRight}) no-repeat top right;
	`,

	StyledHello = styled.div`
		position: fixed;
		width: 100%;
		height: 100vh;
		background: transparent;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		& > div {
			display: flex;
			justify-content: center;
			align-items: center;

			& > h1 {
				font-family: 'Roboto Mono';
				font-size: 4.8rem;
				margin-left: 2rem;
			}

			&.button-wrapper {
				flex-direction: column;
				margin-top: 8rem;
			}
		}
	`,

	StyledLogo = styled.div`
		background: url(${HexLogo}) no-repeat center;
		background-size: contain;
		height: 10rem;
		width: 10rem;
	`,

	StyledButton = styled.button`
		font-family: 'Roboto Mono';
		font-weight: bold;
		font-size: 2.4rem;
		padding: 1.5rem 10rem;
		border-radius: 100rem;
		border: none;
		text-transform: uppercase;
		margin: 0 0 2.6rem 0;
		cursor: pointer;
		outline: none;
		
		&.primary {
			background-color: #0582CA;
			color: white;
		}
		
		&.secondary {
			background-color: transparent;
			color: #0582CA;
		}
	`

// TODO: make this mobile friendly

export default class Landing extends Component {
	constructor(props) {
		super(props)

		this.state = {
			overlay: false
		}

		this.toggleAbout = this.toggleAbout.bind(this)
	}

	toggleAbout = () => {
		this.setState({
			overlay: !this.state.overlay
		})
	}

	render() {
		return (
			<StyledLanding>
				<StyledCometsLeft className='comets' />
				<StyledCometsRight className='comets' />
				<StyledHello>
					<div>
						<StyledLogo />
						<h1>YVIDEO</h1>
					</div>
					<div className='button-wrapper'>
						<StyledButton className='primary'>Sign In</StyledButton>
						<StyledButton className='secondary' onClick={this.toggleAbout}>About</StyledButton>
					</div>
				</StyledHello>
				{
					this.state.overlay ?
						<Overlay toggleAbout={this.toggleAbout} />
						:
						''
				}
			</StyledLanding>
		)
	}
}