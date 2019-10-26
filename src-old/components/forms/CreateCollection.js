import React, { Component } from 'react'
import { connect } from 'react-redux'

import { toggleModal, getCollections } from 'redux/actions'

import styled from 'styled-components'

import axios from 'axios'

const Container = styled.form`
	display: grid;
	grid: repeat(3, 1fr) / 1fr;
	grid-gap: 2rem;

	min-width: 30rem;

	& > input {
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

	& > div {
		display: flex;
		justify-content: space-between;
	}
`

const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

export class CreateCollection extends Component {

	state = {
		name: ``
	}

	handleNameChange = e => {
		const name = e.target.value
		this.setState({ name })
	}

	handleSubmit = async e => {

		const { toggleModal, getCollections, user } = this.props

		e.preventDefault()

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/create`, {
			method: `POST`,
			data: JSON.stringify(this.state),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`
			}
		}).catch(err => console.error(err))
			.then(() => {
				toggleModal()
				const privileged = user.permissions.includes(`admin`)
				getCollections(privileged, true)
				getCollections()
			})
	}

	render() {
		return (
			<Container onSubmit={this.handleSubmit}>
				<h2>Create New Collection</h2>
				<input type={`text`} name={`name`} value={this.state.name} onChange={this.handleNameChange} placeholder={`Collection name...`} />
				<div>
					<Button type='button' onClick={this.props.toggleModal}>Cancel</Button>
					<Button type='submit' color={`#0582CA`}>Create</Button>
				</div>
			</Container>
		)
	}
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = {
	toggleModal,
	getCollections
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection)
