import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { Modal, Center, Options, Close, Delete, ConfirmDelete, ConfirmBox, ConfirmButton, Logo } from './styles'

export default class EditSearchItem extends PureComponent {

	constructor(props){
		super(props)

		this.state = {
			confirmDelete: false,
			positionY: 0
		}
		this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
	}

	componentDidMount(){
		const { lowClick, position } = this.props.viewstate
		let heightDifference = window.innerHeight - (this.modalHeight.clientHeight + position.top)

		if (lowClick && Math.sign(heightDifference) === -1){

			let newPosition = position.top - this.modalHeight.clientHeight
			newPosition = newPosition.toFixed(0) + 'px'
			this.setState({
				positionY: newPosition
			})
		}
		else {
			this.setState({
				positionY: this.props.viewstate.position.top
			})
		}
	}

	handleConfirmDelete(){
		this.setState({
			confirmDelete: !this.state.confirmDelete
		})
	}

	render() {
		const { category, data, position } = this.props.viewstate
		const { close, deleteConfirmed } = this.props.handlers
		const { confirmDelete, positionY } = this.state

		return (
			<>
					<Center
						style={{position: "absolute", top: positionY, left: position.right}}
						onMouseLeave={close}
						ref={ (modalHeight) => { this.modalHeight = modalHeight }}>
						<Modal>
							<h2><Close onClick={close}>x</Close></h2>
							<br/>
							<br/>
							<div>
								{ category === 'Users' ?
									(
										<Options>
											<button>
												<Link to={`/lab-assistant-manager/${data.ID}`} target="_blank"></Link>Collections
											</button>
											<Delete onClick={this.handleConfirmDelete}> Delete </Delete>
										</Options>
									)
									:
									category === 'Collections' ? (
										<Options>
											<button>
												<Link to={`/lab-assistant-manager/${data.Owner}/${data.ID}`} target="_blank"></Link>View/Edit
											</button>
											<Delete onClick={this.handleConfirmDelete}> Delete </Delete>
										</Options>
									)
									:
									category === 'Content' ? (
										<div>
											<Options>
												<button> <Link to={`/player/${data.ID}`} target="_blank"></Link> View </button>
												<button> Edit </button>
												<button> Disable </button>
												<Delete onClick={this.handleConfirmDelete}> Delete </Delete>
											</Options>
										</div>
									)
									: null
								}
							</div>
						</Modal>
						{
							confirmDelete && (
							<ConfirmDelete>
								<ConfirmBox>
									<Logo></Logo>
									<p>Are you sure you want to delete this item?<br/><br/><i>This action cannot be undone</i></p>
									<div>
										<button onClick={this.handleConfirmDelete}>Cancel</button>
										<ConfirmButton onClick={deleteConfirmed}>Confirm</ConfirmButton>
									</div>
								</ConfirmBox>
							</ConfirmDelete>)
						}
					</Center>
			</>
		)
	}
}
