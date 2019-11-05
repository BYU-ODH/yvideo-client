import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCollections, getContent, toggleModal, getResources, addResource } from 'redux/actions'

import axios from 'axios'
import styled from 'styled-components'
import Url from 'url'

import plus from 'assets/collections/plus_blue.svg'

const Form = styled.form`
	display: grid;
	grid: repeat(3, 1fr) / 1fr;
	grid-gap: 2rem;

	min-width: 30rem;

	& input, select {
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

	.keywords-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		max-width: 30rem;

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

const RemoveKeyword = styled.button`
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

const Tabs = styled.div`
	margin: 2rem 0;
	padding: 0;

	display: flex;
	justify-content: space-between;
`

const Tab = styled.button`
	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};

	border-radius: .3rem;

	padding: .75rem 1.25rem;
	background: ${props => props.selected ? `#D2E8FF` : `transparent`};
	border: none;
	outline: none;
	cursor: pointer;
`

const TypeButton = styled.button`
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;

	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};
`

const FileButton = styled.div`
	font-size: 1.2rem;
	color: #0582CA;
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;
`

const FileName = styled.span`
	text-align: right;
	font-size: 1.2rem;
	color: #0582CA;
	cursor: pointer;
`

export class CreateContent extends Component {

	state = {
		tab: `url`,
		data: {
			url: ``,
			file: ``,
			thumbnail: ``,
			resourceId: ``,
			contentType: `video`,
			title: ``,
			description: ``,
			keywords: []
		}
	}

	changeTab = e => {
		this.setState({ tab: e.target.name })
	}

	onKeyPress = e => {
		if (e.which === 13) {
			e.preventDefault()
			this.addKeyword(e.target)
		}
	}

	handleTextChange = e => {
		this.setState({
			data: {
				...this.state.data,
				[e.target.name]: e.target.value
			}
		})
	}

	handleUrlChange = e => {
		e.preventDefault()

		const url = Url.parse(e.target.value)

		const thumbnail = url.query ? `https://i.ytimg.com/vi/${url.query.split(`=`)[1]}/hqdefault.jpg` : ``

		this.setState({
			data: {
				...this.state.data,
				url: url.href,
				thumbnail
			}
		})
	}

	handleTypeChange = e => {
		const contentType = e.target.dataset.type
		this.setState({
			data: {
				...this.state.data,
				contentType
			}
		})
	}

	fakeHandler = () => {
		return
	}

	handleFile = e => {
		const { files } = e.target
		if (files.length <= 0) return

		const file = files[0]

		this.setState({
			data: {
				...this.state.data,
				file: file.name
			}
		})
	}

	addKeyword = element => {
		if (element.id !== `keyword-datalist-input` || element.value === ``) return

		const { data } = this.state

		this.setState({
			data: {
				...data,
				keywords: [...data.keywords, element.value]
			}
		})

		document.getElementById(`create-content-form`).reset()
	}

	handleSubmit = async e => {
		const { data } = this.state
		const { modal, toggleModal, getCollections, getContent, user, collectionsCache } = this.props

		e.preventDefault()

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/${this.state.tab}?collectionId=${modal.collectionId}&annotations=false`, {
			method: `POST`,
			data: JSON.stringify(data),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`
			}
		}).catch(err => console.error(err))

		toggleModal()

		const privileged = user.roles.includes(`admin`)
		await getCollections(privileged, true)

		const contentIds = collectionsCache.collections[modal.collectionId].content.map(item => item.id)
		getContent(contentIds, true)
	}

	handleSubmitFile = e => {
		e.preventDefault()
		document.getElementById(`real-file-form`).dispatchEvent(new Event(`submit`))
	}

	submitFile = async e => {
		const { modal, toggleModal, getCollections, getContent, user, collectionsCache } = this.props

		e.preventDefault()

		const data = new FormData(e.target)

		const results = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/${this.state.tab}?collectionId=${modal.collectionId}&annotations=false`,
			{
				method: `POST`,
				data,
				withCredentials: true
			})
			.catch(err => console.error(err))

		toggleModal()

		const privileged = user.roles.includes(`admin`)
		await getCollections(privileged, true)

		const contentIds = [...collectionsCache.collections[modal.collectionId].content.map(item => item.id), results.data.id]
		await getContent(contentIds, true)
	}

	remove = e => {
		const badkeyword = e.target.dataset.keyword
		this.setState({
			data: {
				...this.state.data,
				keywords: this.state.data.keywords.filter(keyword => keyword !== badkeyword)
			}
		})
	}

	render() {
		const { tab } = this.state
		const {
			title,
			contentType,
			url,
			description,
			keywords,
			file,
			resourceId,
			thumbnail
		} = this.state.data

		return (
				<>
					<h2>Create New Content</h2>

					<Tabs>
						<Tab selected={tab === `url`} onClick={this.changeTab} name={`url`}>From URL</Tab>
						<Tab selected={tab === `file`} onClick={this.changeTab} name={`file`}>From Computer</Tab>
						<Tab selected={tab === `resource`} onClick={this.changeTab} name={`resource`}>From Resource</Tab>
					</Tabs>

					{tab === `url` &&
					<>
						<Form onKeyPress={this.onKeyPress} onSubmit={this.handleSubmit} id='create-content-form' >
							<label htmlFor='create-content-title'>
								<span>Title</span>
								<input id='create-content-title' type='text' name='title' value={title} onChange={this.handleTextChange} required />
							</label>

							<label htmlFor='create-content-type'>
								<span>Type</span>
								<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
									<TypeButton type='button' selected={contentType === `video`} onClick={this.handleTypeChange} data-type='video'>Video</TypeButton>
									<TypeButton type='button' selected={contentType === `audio`} onClick={this.handleTypeChange} data-type='audio'>Audio</TypeButton>
									<TypeButton type='button' selected={contentType === `image`} onClick={this.handleTypeChange} data-type='image'>Image</TypeButton>
									<TypeButton type='button' selected={contentType === `text`} onClick={this.handleTypeChange} data-type='text'>Text</TypeButton>
								</div>
							</label>

							<label htmlFor='create-content-url'>
								<span>URL</span>
								<input id='create-content-url' type='text' name='url' value={url} onChange={this.handleUrlChange} required />
							</label>

							{thumbnail !== `` && <img src={thumbnail} alt={thumbnail} />}

							<label htmlFor='create-content-description'>
								<span>Description</span>
							</label>
							<textarea id='create-content-description' name='description' value={description} onChange={this.handleTextChange} rows={4} required />

							<label htmlFor='create-content-keywords'>
								<span>Tags</span>
							</label>

							<div className='keywords-list'>
								{keywords.map((keyword, index) => <span key={index}>{keyword}<RemoveKeyword src={plus} onClick={this.remove} type='button' data-keyword={keyword} /></span>)}
							</div>

							<input id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add a tag...' />
							<datalist id='create-content-keywords'>
								{keywords.map((keyword, index) => <option key={index} value={keyword} />)}
							</datalist>

							<div>
								<Button type='button' onClick={this.props.toggleModal}>Cancel</Button>
								<Button type='submit' color={`#0582CA`}>Create</Button>
							</div>
						</Form>
					</>
				}

				{tab === `file` &&
					<>
						<Form onKeyPress={this.onKeyPress} onSubmit={this.handleSubmitFile} id='create-content-form'>
							<label htmlFor='create-content-title'>
								<span>Title</span>
								<input id='create-content-title' type='text' name='title' value={title} onChange={this.handleTextChange} required />
							</label>

							<label htmlFor='create-content-type'>
								<span>Type</span>
								<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
									<TypeButton type='button' selected={contentType === `video`} onClick={this.handleTypeChange} data-type='video'>Video</TypeButton>
									<TypeButton type='button' selected={contentType === `audio`} onClick={this.handleTypeChange} data-type='audio'>Audio</TypeButton>
									<TypeButton type='button' selected={contentType === `image`} onClick={this.handleTypeChange} data-type='image'>Image</TypeButton>
									<TypeButton type='button' selected={contentType === `text`} onClick={this.handleTypeChange} data-type='text'>Text</TypeButton>
								</div>
							</label>

							<label htmlFor='file'>
								<span>File</span>
								{file === `` ? <FileButton>Choose File</FileButton> : <FileName>{file}</FileName>}
							</label>

							<label htmlFor='create-content-description'>
								<span>Description</span>
							</label>
							<textarea id='create-content-description' name='description' value={description} onChange={this.handleTextChange} rows={4} required />

							<label htmlFor='create-content-keywords'>
								<span>Tags</span>
							</label>

							<div className='keywords-list'>
								{keywords.map((keyword, index) => <span key={index}>{keyword}<RemoveKeyword src={plus} onClick={this.remove} type='button' data-keyword={keyword} /></span>)}
							</div>

							<input id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add a tag...' />
							<datalist id='create-content-keywords'>
								{keywords.map((keyword, index) => <option key={index} value={keyword} />)}
							</datalist>

							<div>
								<Button type='button' onClick={this.props.toggleModal}>Cancel</Button>
								<Button type='submit' color={`#0582CA`}>Create</Button>
							</div>
						</Form>

						<form hidden id='real-file-form' onSubmit={this.submitFile}>
							<input id='title' name='title' type='text' value={this.state.data.title} onChange={this.fakeHandler}></input>
							<input id='contentType' name='contentType' type='text' value={this.state.data.contentType} onChange={this.fakeHandler} />
							<textarea name='description' id='description' value={this.state.data.description} onChange={this.fakeHandler} />
							<select name='keywords' id='keywords' multiple='multiple' value={this.state.data.keywords} onChange={this.fakeHandler}>
								{this.state.data.keywords.map((item, index) => <option key={index} value={item}>{item}</option>)}
							</select>
							<input id='file' name='file' type='file' onChange={this.handleFile} />
						</form>
					</>
				}

				{tab === `resource` &&
					<Form>
						<input type='text' name='resourceId' value={resourceId} onChange={this.handleTextChange} />
					</Form>
				}
			</>
		)
	}
}

const mapStateToProps = ({ modal, user, collectionsCache, contentCache }) => ({ modal, user, collectionsCache, contentCache })

const mapDispatchToProps = {
	getCollections,
	getContent,
	toggleModal,
	getResources,
	addResource
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)
