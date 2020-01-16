import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'

import { roles } from 'models/User'

import {
	collectionService,
	contentService,
	interfaceService,
	resourceService,
	adminService,
} from 'services'

import {
	Form,
	Button,
	RemoveKeyword,
	Tabs,
	Tab,
	TypeButton,
	FileButton,
	FileName,
} from './styles'

import plus from 'assets/plus_blue.svg'

class CreateContent extends PureComponent {

	state = {
		tab: `url`,
		data: {
			url: ``,
			file: ``,
			resourceId: ``,
			contentType: `video`,
			title: ``,
			description: ``,
			keywords: [],
		},
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
				[e.target.name]: e.target.value,
			},
		})
	}

	handleTypeChange = e => {
		const contentType = e.target.dataset.type
		this.setState({
			data: {
				...this.state.data,
				contentType,
			},
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
				file: file.name,
			},
		})
	}

	addKeyword = element => {
		if (element.id !== `keyword-datalist-input` || element.value === ``) return

		const { data } = this.state

		this.setState({
			data: {
				...data,
				keywords: [...data.keywords, element.value],
			},
		})

		document.getElementById(`create-content-form`).reset()
	}

	handleSubmit = async e => {
		const { data } = this.state
		const { modal, toggleModal, getCollections, getContent, admin, collections } = this.props

		e.preventDefault()

		await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/${this.state.tab}?collectionId=${modal.collectionId}&annotations=false`, {
			method: `POST`,
			data: JSON.stringify(data),
			withCredentials: true,
			headers: {
				'Content-Type': `application/json`,
			},
		}).catch(err => console.error(err))

		toggleModal()

		await getCollections(admin, true)

		const contentIds = collections[modal.collectionId].content.map(item => item.id)
		getContent(contentIds, true)
	}

	handleSubmitFile = e => {
		e.preventDefault()
		document.getElementById(`real-file-form`).dispatchEvent(new Event(`submit`))
	}

	submitFile = async e => {
		const { modal, toggleModal, getCollections, getContent, admin, collections } = this.props

		e.preventDefault()

		const data = new FormData(e.target)

		const results = await axios(`${process.env.REACT_APP_YVIDEO_SERVER}/content/create/${this.state.tab}?collectionId=${modal.collectionId}&annotations=false`,
			{
				method: `POST`,
				data,
				withCredentials: true,
			})
			.catch(err => console.error(err))

		toggleModal()

		await getCollections(admin, true)

		const contentIds = [...collections[modal.collectionId].content.map(item => item.id), results.data.id]
		await getContent(contentIds, true)
	}

	remove = e => {
		const badkeyword = e.target.dataset.keyword
		this.setState({
			data: {
				...this.state.data,
				keywords: this.state.data.keywords.filter(keyword => keyword !== badkeyword),
			},
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
		} = this.state.data

		return (
			<>
				<h2>Create New Content</h2>

				<Tabs>
					<Tab selected={tab === `url`} onClick={this.changeTab} name={`url`}>From URL</Tab>
					<Tab selected={tab === `file`} onClick={this.changeTab} name={`file`}>From Computer</Tab>
					<Tab selected={tab === `resource`} onClick={this.changeTab} name={`resource`}>Search Resources</Tab>
				</Tabs>

				{tab === `url` &&
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
							<input id='create-content-url' type='text' name='url' value={url} onChange={this.handleTextChange} required />
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
						{console.log(this.props.adminContent)}
						<input type='text' name='resourceId' value={resourceId} onChange={this.handleTextChange} />
					</Form>
				}
			</>
		)
	}
}

const mapStateToProps = store => ({
	adminContent: store.adminStore.data,
	modal: store.interfaceStore.modal,
	admin: store.authStore.user.roles.includes(roles.admin),
	collections: store.collectionStore.cache,
	content: store.contentStore.cache,
})

const mapDispatchToProps = {
	search: adminService.search,
	getCollections: collectionService.getCollections,
	getContent: contentService.getContent,
	toggleModal: interfaceService.toggleModal,
	getResources: resourceService.getResources,
	addResource: resourceService.addResource,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContent)
