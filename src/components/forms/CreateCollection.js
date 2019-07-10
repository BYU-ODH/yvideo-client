import React, { Component } from 'react'
import { connect } from 'react-redux'

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
		e.preventDefault()

		const data = [].reduce.call(e.target.elements, (data, element) => {
			if (element.name !== ``) data[element.name] = element.value
			return data
		}, {})

		const newCollection = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/collection/create`, {
			method: `POST`,
			data: JSON.stringify(data),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`
			}
		}).catch(err => console.error(err))

		console.log(newCollection)
	}

	render() {
		return (
			<Container onSubmit={this.handleSubmit}>
				<h2>Create New Collection</h2>
				<input type={`text`} name={`name`} value={this.state.name} onChange={this.handleNameChange} placeholder={`Collection name...`} />
				<div>
					<Button onClick={this.props.toggleModal}>Cancel</Button>
					<Button type={`submit`} color={`#0582CA`}>Create</Button>
				</div>
			</Container>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCollection)
