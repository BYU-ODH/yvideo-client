import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { ListItem } from 'components/bits'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Style, { Body, Clip } from './styles'

const ListItemDropDown = props => {

	const { isDropDown } = props
	const { id, clips } = props.data, data = props.data

	const [isOpen, setIsOpen] = useState(false)
	const parsedClips = JSON.parse(clips)

	const togglePanel = () => {
		setIsOpen(!isOpen)
	}

	return (
		<Style>
			<Container>
			<Row data={data} isDropDown={isDropDown} isOpen={isOpen} togglePanel={togglePanel} />
			{ isDropDown &&
				<Body isOpen={isOpen} count={parsedClips.length + 1}>
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
			}
			</Container>
		</Style>
	)
}

export default ListItemDropDown
