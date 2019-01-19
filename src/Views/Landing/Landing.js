import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Overlay from './Overlay'

import CometsLeft from './../../Assets/Landing/CometsLeft.svg'
import CometsRight from './../../Assets/Landing/CometsRight.svg'
import HexLogo from './../../Assets/HexLogo2.svg'

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;

	&>div.comets {
		width: 50%;
		height: 100vh;
		margin: 0;
		background-color: transparent;

		@media (max-width: 800px) {
			background-size: contain;
		}
	}
`,

	CometsLeft = styled.div`
		background: url(${CometsLeft}) no-repeat bottom left;
	`,

	CometsRight = styled.div`
		background: url(${CometsRight}) no-repeat top right;
	`,

	Welcome = styled.div`
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
				margin: 0 0 0 2rem;
				height: 4.8rem;
				line-height: 4.8rem;

				background: linear-gradient(to right, #0582CA 0%, #002E5D 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			&.button-wrapper {
				flex-direction: column;
				margin-top: 8rem;
			}
		}
	`,

	Logo = styled.div`
		background: url(${HexLogo}) no-repeat center;
		background-size: contain;
		height: 10rem;
		width: 10rem;
	`,

	Button = styled.button`
		font-family: 'Roboto Mono';
		font-weight: bold;
		font-size: 2.4rem;
		padding: 1.5rem 10rem;
		border-radius: 100rem;
		border: none;
		text-transform: uppercase;
		text-decoration: none;
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
			<Container>
				<CometsLeft className='comets' />
				<CometsRight className='comets' />
				<Welcome>
					<div>
						<Logo />
						<h1>YVIDEO</h1>
					</div>
					<div className='button-wrapper'>
						<Button as={Link} to={'/dashboard'} className='primary'>Sign In</Button>
						<Button className='secondary' onClick={this.toggleAbout}>About</Button>
					</div>
				</Welcome>
				{
					this.state.overlay ?
						<Overlay toggleAbout={this.toggleAbout} />
						:
						''
				}
			</Container>
		)
	}
}