import React from 'react'

import arrow from './../../assets/collections/carrot.svg'
import { Container, List, Arrow } from './styles'

class AccordionMenu extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			active: props.active
		}
	}

	handleToggle = e => {
		e.preventDefault()

		this.setState({
			active: !this.state.active
		})
	}

	render() {
		return (
			<Container>
				<h6 onClick={this.handleToggle}>{this.props.header}<Arrow src={arrow} active={this.state.active} /></h6>
				<List numChildren={this.props.children.length} active={this.state.active}>
					{this.props.children}
				</List>
			</Container>
		)
	}
}

export default AccordionMenu
