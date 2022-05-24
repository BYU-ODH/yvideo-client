import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { LazyImage } from 'components/bits'

import Style, { Icon, Header, Body, Clip } from './styles'

import defaultThumbnail from 'assets/default-thumb.svg'

class ListItemDropDown extends PureComponent {
	state = {
		isOpen: false,
	}

	togglePanel = () => {
		this.setState(prevState => ({ isOpen: !prevState.isOpen }))
	}
	render() {
		const {
			isOpen,
		} = this.state

		// console.log(this.props.data)
		const { id, name, thumbnail, translation, captions, annotations, clips} = this.props.data
		const parsedClips = JSON.parse(clips)
		return (
			<Style>
				<Header className='list-header' isOpen={isOpen} onClick={this.togglePanel} >
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
						<span />
					</div>
				</Header>
				<Body isOpen={isOpen} count={parsedClips.length+1}>
					<div className='link'>
						<Link to={`/player/${id}`}>
							<Clip>
								<div className='name'>
									<h4>Full Video</h4>
								</div>
								<div />
							</Clip>
						</Link>
					</div>

					{
						Object.keys(parsedClips).map((item)=>{
							return (
								<div className='link' key={item}>
									<Link to={`/player/${id}/${item}`}>
										<Clip>
											<div className='name'>
											Clip - {parsedClips[item][`title`]}
											</div>
											<div>
												<h4>From {new Date(parsedClips[item][`start`] * 1000).toISOString().substr(11, 8)} to {new Date(parsedClips[item][`end`] * 1000).toISOString().substr(11, 8)}</h4>
											</div>
										</Clip>
									</Link>
								</div>
							)
						})
					}
				</Body>
				<Link to={`/player/${id}`}>
				</Link>
			</Style>
		)
	}
}

export default ListItemDropDown