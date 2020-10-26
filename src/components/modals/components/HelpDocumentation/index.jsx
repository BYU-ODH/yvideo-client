import React, { PureComponent } from 'react'

import { Container, Back, CloseHelp } from './styles'

import closeIcon from 'assets/x.svg'

export default class HelpDocumentation extends PureComponent {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		document.getElementById('content').innerHTML = this.props.viewstate.help.htmlInstruction
	}

	render() {

		const { name, help } = this.props.viewstate

		return (
			<>
				<Back>
					<Container>
						<div id="title">
							<h1>Help Documentation: {name} <CloseHelp onClick={this.props.toggleModal}><img src={closeIcon} /></CloseHelp></h1>
						</div>
						<div id="content">
						</div>
					</Container>
				</Back>
			</>
		)
	}
}
