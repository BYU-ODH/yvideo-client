import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

import translation from './VideoOptions/translation.svg'
import captions from './VideoOptions/captions.svg'
import annotations from './VideoOptions/annotations.svg'

const StyledCollectionItem = styled(Link)`
	display: grid;
	grid-template-columns: 18rem auto;
	align-items: center;
	height: 3.5rem;
	padding: 1.5rem 2rem;

	color: black;
	text-decoration: none;

	:hover {
		background: #eee;
		cursor: pointer;
	}

	& .thumb {
		height: 3.5rem;
		width: 5.5rem;
		background: #ccc url(${props => props.thumb}) center no-repeat;
		background-size: cover;
	}

	& ul {
		margin: 0;
		padding: 0;

		display: grid;
		grid-template-columns: repeat(3, 2rem);
		grid-gap: .5rem;
	}
`,

	Icon = styled.li`
		width: 2rem;
		height: 2rem;
		background-size: contain;
		list-style: none;

		&.translation {
			background: url(${translation}) center no-repeat;
			display: ${props => props.checked === true ? 'block' : 'none'};
		}
		&.captions {
			background: url(${captions}) center no-repeat;
			display: ${props => props.checked === true ? 'block' : 'none'};
		}
		&.annotations {
			background: url(${annotations}) center no-repeat;
			display: ${props => props.checked === true ? 'block' : 'none'};
		}
	`

const CollectionItem = props => {
	const { name, thumbnail, translation, captions, annotations } = { ...props.data }
	return (
		<StyledCollectionItem to='/'>
			<div className='thumb' thumb={thumbnail} />
			<div className='name'>
				<h4>{name}</h4>
				<ul>
					<Icon className='translation' checked={translation} />
					<Icon className='captions' checked={captions} />
					<Icon className='annotations' checked={annotations} />
				</ul>
			</div>
		</StyledCollectionItem>
	)
}

export default CollectionItem