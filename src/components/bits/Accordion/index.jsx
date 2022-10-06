import React, { useState } from 'react'

import { Container, List, Arrow } from './styles'

import arrow from 'assets/carrot.svg'

const AccordionMenu = props => {

	const { header, children = [], active } = props

	const [isActive, setIsActive] = useState(active)

	const handleToggle = e => {
		e.preventDefault()
		setIsActive(!isActive)
	}

	return (
		<Container>
			<h6 className='accordion' data-testid='accordion' onClick={handleToggle}>
				{header}
				<Arrow data-testid='carrot' src={arrow} active={isActive} />
			</h6>
			<List data-testid='list' numChildren={children.length} active={isActive}>
				{children}
			</List>
		</Container>
	)

}

export default AccordionMenu
