import React from 'react'
import styled from 'styled-components'

const Container = styled.button`
	margin-bottom: 1rem;
	padding: 0;

	width: fit-content;

	text-decoration: none;
	outline: none;
	font-weight: 300;

	color: #FF6161;

	background: transparent;
	border: none;

	cursor: pointer;
`,

	SignOutButton = props => {
		return <Container onClick={props.signOut}>{props.children}</Container>
	}

export default SignOutButton
