import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'


import { LazyImage } from 'components/bits'

import Style, { Icon } from './styles'

import defaultThumbnail from 'assets/default-thumb.svg'

const ListItem = props => {

	const { id, name, thumbnail, translation, captions, annotations } = props.data
	const { isDropDown, isOpen, togglePanel } = props

	return (
		<Style  isOpen={isOpen}>
		{isDropDown ?
		<Container className='listItem'>
			<Row data-testid='list-item-dropDown' className='py-4 align-items-center justify-content-center' onClick={togglePanel}>
			<Col xs='1'></Col>
			<Col xs='3'>
					<LazyImage
						src={thumbnail !== `empty` ? thumbnail : defaultThumbnail}
						height='3.5rem'
						width='5.5rem'
						heightSm='3.5rem'
						widthSm='5.5rem'
					/>
				</Col>
				<Col>
					<Row>
						<Col xs='11'>
					<h4>{name}</h4>
					</Col>
						{/* <ul>
							<Icon className='translation' checked={translation} />
							<Icon className='captions' checked={captions} />
							<Icon className='annotations' checked={annotations} />
						</ul> */}
					<Col xs='1'>
					<div data-testid='carrot'><span className="icon"></span></div>
					</Col>
					</Row>
				</Col>
			</Row>
		</Container>
			:
			<Container className="listItem">
			<Row className="py-4 align-items-center justify-content-center">
				<Col xs='1'></Col>
				<Col xs='3'>
				<Link to={`/player/${id}`}>
					<LazyImage
						src={thumbnail !== `empty` ? thumbnail : defaultThumbnail}
						height='3.5rem'
						width='5.5rem'
						heightSm='3.5rem'
						widthSm='5.5rem'
					/>
				</Link>
				</Col>
				<Col>
					<Link to={`/player/${id}`}>
						<h4>{name}</h4>
						<ul>
							<Icon className='translation' checked={translation} />
							<Icon className='captions' checked={captions} />
							<Icon className='annotations' checked={annotations} />
						</ul>
				</Link>
				</Col>
			</Row>
			</Container>
	}
	</Style>
	)
}

export default ListItem