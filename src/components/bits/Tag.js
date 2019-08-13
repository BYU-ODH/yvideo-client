import React from 'react'

import styled from 'styled-components'

import plus from 'assets/collections/plus_blue.svg'

const Tag = props => {
	return (
		<Container>
			{props.children}
			<Remove onClick={props.onClick} data-value={props.children} />
		</Container>
	)
}

export default Tag

const Container = styled.div`
	height: 1.5rem;
	width: fit-content;
	border-radius: 5rem;
	background-color: #0582CA;
	color: white;
	padding: .25rem;
	padding-left: .75rem;
	margin-right: .25rem;
	margin-bottom: .25rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Remove = styled.button`
	transform: rotate(45deg);

	height: 1.5rem;
	width: 1.5rem;

	padding: 0;
	margin: 0;
	border: none;

	background: url(${plus}) center no-repeat;
	background-size: contain;

	cursor: pointer;
	outline: none;
`