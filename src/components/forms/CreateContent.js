import React, { Component } from 'react'
import { connect } from 'react-redux'

import styled from 'styled-components'

import plus from 'assets/collections/plus_blue.svg'

const Container = styled.form`
	display: grid;
	grid: repeat(3, 1fr) / 1fr;
	grid-gap: 2rem;

	min-width: 30rem;

	& input {
		flex: 5;
		border: none;
		border-bottom: 1px solid #ccc;
		outline: none;
	}

	& > label{

		display: flex;
		justify-content: space-between;

		& > span {
			flex: 1;
		}

	}

	& > div {
		display: flex;
		justify-content: space-between;
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;

		& > span {
			color: white;
			background-color: #0582CA;
			padding: .5rem .75rem;
			border-radius: 1.2rem;
			margin: 0 .5rem 0 0;
			display: flex;
			align-items: center;
		}
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

const RemoveTag = styled.button`
	height: 1.5rem;
	width: 1.5rem;
	background: url(${props => props.src}) center no-repeat;
	background-size: contain;
	transform: rotate(45deg);
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin: 0 -.25rem 0 .25rem;
`

export class CreateContent extends Component {

	state = {
		tab: 0,
		data: {
			url: ``,
			type: ``,
			title: ``,
			description: ``,
			tags: [`test`, `test2`]
		}
	}

	changeTab = number => {
		this.setState({
			tab: number
		})
	}

	handleTextChange = e => {
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value
			}
		})
	}

	handleSubmit = e => {
		e.preventDefault()

		const data = [].reduce.call(e.target.elements, (data, element) => {
			if (element.name !== ``) data[element.name] = element.value
			return data
		}, {})

		this.setState({
			data: {
				...data,
				tags: [...this.state.data.tags, data.tags]
			}
		})

		document.getElementById(`create-content-form`).reset()
	}

	handleRealSubmit = e => {
		e.preventDefault()
		alert(`wow`)
	}

	remove = e => {
		const badtag = e.target.dataset.tag
		this.setState({
			data: {
				...this.state.data,
				tags: this.state.data.tags.filter(tag => tag !== badtag)
			}
		})
	}

	render() {
		const { title, type, url, description, tags } = this.state.data
		return (
			<Container onSubmit={this.handleSubmit} id='create-content-form'>

				<label htmlFor='create-content-title'>
					<span>Title</span>
					<input id='create-content-title' type='text' name='title' value={title} onChange={this.handleTextChange} />
				</label>

				<label htmlFor='create-content-type'>
					<span>Type</span>
					<input id='create-content-type' type='text' name='type' value={type} onChange={this.handleTextChange} />
				</label>

				<label htmlFor='create-content-url'>
					<span>URL</span>
					<input id='create-content-url' type='text' name='url' value={url} onChange={this.handleTextChange} />
				</label>

				<label htmlFor='create-content-description'>
					<span>Description</span>
				</label>
				<textarea id='create-content-description' name='description' value={description} onChange={this.handleTextChange} rows={4} />

				<label htmlFor='create-content-tags'>
					<span>Tags</span>
				</label>

				<div className='tag-list'>
					{tags.map((tag, index) => <span key={index}>{tag}<RemoveTag src={plus} onClick={this.remove} type='button' data-tag={tag} /></span>)}
				</div>

				<input id='tag-datalist-input' type='text' name='tags' list='create-content-tags' placeholder='Add a tag...' />

				<datalist id='create-content-tags'>
					{tags.map((tag, index) => <option key={index} value={tag} />)}
				</datalist>

				<div>
					<input type='submit' hidden />
					<Button type='button' onClick={this.props.toggleModal}>Cancel</Button>
					<Button type='button' color={`#0582CA`} onClick={this.handleRealSubmit}>Create</Button>
				</div>
			</Container>
		)
	}
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)
