import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { ListItem } from 'components/bits'

import Style, { Body, Clip } from './styles'

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

		const { id, clips} = this.props.data
		const parsedClips = JSON.parse(clips)
		const { isDropDown } = this.props
		return (
			<Style>
				<ListItem data={this.props.data} isDropDown={isDropDown} isOpen={isOpen} togglePanel={this.togglePanel} />
				<Body isOpen={isOpen} count={parsedClips.length+1}>
					<div className='link'>
						<Link to={`/player/${id}`}>
							<Clip>
								<div className='name'>
									<h4><u>Full Video</u></h4>
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
												<u>Clip - {parsedClips[item][`title`]}</u>
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