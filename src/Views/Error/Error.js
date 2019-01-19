import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import Background from './../../Assets/desertbackground.svg'

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: url(${Background});
	background-size: cover;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&>h1 {
		font-size: 28.8rem;
		color: white;
		text-shadow: 0 0 15px rgba(255,255,255,1);
		font-weight: normal;
		margin-top: 10rem;
	}

	&>h2 {
		font-weight: bold;
		font-size: 6.4rem;
		color: white;
		text-shadow: 0 0 15px rgba(255,255,255,1);
	}
`,

	SLink = styled(Link)`
		padding: 1.5rem;
		border: 2px solid white;
		border-radius: 10rem;
		color: white;
		font-family: 'Roboto Mono';
		font-weight: bold;
		font-size: 1.8rem;
		text-decoration: none;
		cursor: pointer;
		margin-top: 8rem;
	`,

	Error = props => {
		return (
			<Container>
				<h1>{props.error}</h1>
				<h2>{props.message}</h2>
				<SLink to={'/dashboard'}>Go back home</SLink>
			</Container>
		)
	}

export default Error