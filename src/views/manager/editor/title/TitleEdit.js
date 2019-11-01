import React, { Component } from 'react'

import {
	Title,
	TitleEditButton,
	TitleWarning
}
	from './styles'

class TitleEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			editing: false,
			collectionName: props.collection.name
		}
	}

	handlers = {
		toggleEdit: e => {
			//   e.preventDefault();
			// console.log(`clicked`)
			const editing = this.state.editing
			if (editing === true)
				this.props.save(this.state.collectionName)

			this.setState({ editing: !editing })
		},
		handleNameChange: e => {
			const { value } = e.target
			this.setState({ collectionName: value })
		}
	}

	render() {
		const { editing, collectionName } = this.state

		return (
			<div>
				<div style={{
					display: `flex`,
					alignItems: `center`,
					position: `relative`
					// TODO Make div align center if editing
				}}>
					{editing ?
						<Title
							type='text'
							value={collectionName}
							contenteditable='true'
							onChange={this.handlers.handleNameChange}
							onKeyPress={event => {
								if (event.key === `Enter` && collectionName.length > 0)
									this.handlers.toggleEdit()
							}}
							size={collectionName.length}
							autoFocus
						// onChange={handleNameChange}
						/>
						:
						<h6 onClick={this.handlers.toggleEdit}>{collectionName}</h6>
					}
					{collectionName.length > 0 ?
						<TitleEditButton
							editing={editing}
							onClick={this.handlers.toggleEdit}
						>
							{editing ? `Save` : `Edit`}
							{/* //TODO Change button to include save method */}
						</TitleEditButton>
						: null
					}

					{collectionName.length === 0 ?
						<TitleWarning>
							Collection name can not be empty
						</TitleWarning>
						: null
					}
				</div>
			</div>
		)
	}
}

export default TitleEdit