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
			const { editing } = this.state
			if (editing === true)
				this.functions.saveCollectionName()
			this.setState({ editing: !editing })
		},
		handleNameChange: e => {
			const { value } = e.target
			this.setState({ collectionName: value })
		}
	}

	functions = {
		saveCollectionName: e => {
			this.props.save(this.state.collectionName)
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

	componentDidUpdate(prevProps) {
		const { collection } = this.props
		if (prevProps.collection.name !== collection.name)
			this.setState({ collectionName: collection.name, editing: false })

	}
}

export default TitleEdit