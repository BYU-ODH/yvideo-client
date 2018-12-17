import React from 'react'
import styled from 'styled-components'

import carrot from './../../../carrot.svg'

import { Link } from 'react-router-dom'

const StyledCollectionList = styled.div`
	display: flex;
	flex-direction: row;
	margin-left: 2rem;
	margin-right: 2rem;
	padding: 1rem;

	&>p {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}
	
	.gray {
		color: #a4a4a4;
	}

	.name {
		box-sizing: border-box;
		width: 30%;
	}

	.count {
		box-sizing: border-box;
		width: 65%;
	}

	.arrow {
		box-sizing: border-box;
		width: 5%;
	}

	embed {
		margin-top: 1rem;
		margin-bottom: 0;
		width: 1.25rem;
		height: 0.75rem;
	}

	:hover {
		cursor: pointer;
		text-decoration: underline;
		background: #efefef;
	}
	`,

	CollectionList = props => {
			return (
				<StyledCollectionList>
					<p className='name'>{props.name}</p>
					<p className='gray count'>{props.length} Videos</p>
					<embed className='arrow' src={carrot}/>
				</StyledCollectionList>
			)
	}

	export default CollectionList