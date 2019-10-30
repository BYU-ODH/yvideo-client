import React, { Component } from 'react'

import {
	Title,
	TitleEditButton
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
			console.log(`clicked`)
			const editing = this.state.editing
			this.setState({ editing: !editing })
			// TODO Add validation for collection name
		}
	}

	render() {
		const { editing } = this.state
		const { collectionName } = this.props

		return (
			<header>
				{editing ?
					<Title
						type='text'
						value={collectionName}
						contenteditable='true'
						onChange={this.handlers.handleNameChange}
						onKeyPress={event => {
							if (event.key === `Enter`)
								this.handlers.toggleEdit()

						}}
						size={collectionName.length}
						autoFocus
					// onChange={handleNameChange}
					/>
					:
					<h6 onClick={this.handlers.toggleEdit}>{collectionName}</h6>
				}
				<TitleEditButton
					editing={editing}
					onClick={this.handlers.toggleEdit}
				>
					{editing ? `Save` : `Edit`}
				</TitleEditButton>
			</header>
		)
	}

}

export default TitleEdit