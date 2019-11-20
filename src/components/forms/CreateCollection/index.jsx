import React, { Component } from 'react'
import { connect } from 'react-redux'

import { roles } from 'models/User'

// TODO: Move axios call to a proxy that's behind a redux store
import axios from 'axios'

import { interfaceService, collectionService } from 'services'

import {
	Wrapper,
	Button,
} from './styles'

// TODO: Edit this so it doesn't break the container pattern

class CreateCollection extends Component {

	state = {
		name: ``,
	}

	handleNameChange = e => {
		const name = e.target.value
		this.setState({ name })
	}

	handleSubmit = async e => {
		e.preventDefault()

		const {
			admin,
			toggleModal,
			getCollections,
		} = this.props

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/create`, {
			method: `POST`,
			data: JSON.stringify(this.state),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
			},
		}).then(() => {
			toggleModal()
			getCollections(admin, true)
			getCollections()
		}).catch(err => console.error(err))

	}

	render() {
		return (
			<Wrapper onSubmit={this.handleSubmit}>
				<h2>Create New Collection</h2>
				<input type={`text`} name={`name`} value={this.state.name} onChange={this.handleNameChange} placeholder={`Collection name...`} />
				<div>
					<Button type='button' onClick={this.props.toggleModal}>Cancel</Button>
					<Button type='submit' color={`#0582CA`}>Create</Button>
				</div>
			</Wrapper>
		)
	}
}

const mapStateToProps = store => ({
	admin: store.authStore.user.roles.includes(roles.admin),
})

const mapDispatchToProps = {
	toggleModal: interfaceService.toggleModal,
	getCollections: collectionService.getCollections,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection)
