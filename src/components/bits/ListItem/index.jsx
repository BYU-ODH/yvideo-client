import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { LazyImage } from 'components/bits'

import Style, { Icon, Header } from './styles'

import defaultThumbnail from 'assets/default-thumb.svg'

class ListItem extends PureComponent {

	render() {

		const { id, name, thumbnail, translation, captions, annotations } = this.props.data
		const { isDropDown, isOpen, togglePanel } = this.props

		return (
			isDropDown ?
				<Header data-testid='list-item' className='list-header' isOpen={isOpen} onClick={togglePanel} >
					<div className='list-header-content'>
						<LazyImage
							src={thumbnail !== `empty` ? thumbnail : defaultThumbnail}
							height='3.5rem'
							width='5.5rem'
							heightSm='3.5rem'
							widthSm='5.5rem'
						/>
						<div className='name'>
							<h4>{name}</h4>
							<ul>
								<Icon className='translation' checked={translation} />
								<Icon className='captions' checked={captions} />
								<Icon className='annotations' checked={annotations} />
							</ul>
						</div>
						<span className='carrot' data-testid='carrot' />
					</div>
				</Header>
				:
				<Style>
					<Link to={`/player/${id}`}>
						<LazyImage
							src={thumbnail !== `empty` ? thumbnail : defaultThumbnail}
							height='3.5rem'
							width='5.5rem'
							heightSm='3.5rem'
							widthSm='5.5rem'
						/>
						<div className='name'>
							<h4>{name}</h4>
							<ul>
								<Icon className='translation' checked={translation} />
								<Icon className='captions' checked={captions} />
								<Icon className='annotations' checked={annotations} />
							</ul>
						</div>
					</Link>
				</Style>
		)
	}
}

export default ListItem