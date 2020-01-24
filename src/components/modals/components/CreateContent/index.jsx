import React, { PureComponent } from 'react'

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

export default class CreateContent extends PureComponent {

	render() {

		const { adminContent, tab } = this.props.viewstate

		const {
			title,
			contentType,
			url,
			description,
			keywords,
			file,
			resourceId,
		} = this.props.viewstate.data

		const {
			changeTab,
			fakeHandler,
			handleFile,
			handleSubmit,
			handleSubmitFile,
			handleTextChange,
			handleTypeChange,
			onKeyPress,
			remove,
			submitFile,
			toggleModal,
		} = this.props.handlers

		return (
			<>
				<h2>Create New Content</h2>

				<Tabs>
					<Tab selected={tab === `url`} onClick={changeTab} name={`url`}>From URL</Tab>
					<Tab selected={tab === `file`} onClick={changeTab} name={`file`}>From Computer</Tab>
					<Tab selected={tab === `resource`} onClick={changeTab} name={`resource`}>Search Resources</Tab>
				</Tabs>

				{tab === `url` &&
					<Form onKeyPress={onKeyPress} onSubmit={handleSubmit} id='create-content-form' >
						<label htmlFor='create-content-title'>
							<span>Title</span>
							<input id='create-content-title' type='text' name='title' value={title} onChange={handleTextChange} required />
						</label>

						<label htmlFor='create-content-type'>
							<span>Type</span>
							<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
								<TypeButton type='button' selected={contentType === `video`} onClick={handleTypeChange} data-type='video'>Video</TypeButton>
								<TypeButton type='button' selected={contentType === `audio`} onClick={handleTypeChange} data-type='audio'>Audio</TypeButton>
								<TypeButton type='button' selected={contentType === `image`} onClick={handleTypeChange} data-type='image'>Image</TypeButton>
								<TypeButton type='button' selected={contentType === `text`} onClick={handleTypeChange} data-type='text'>Text</TypeButton>
							</div>
						</label>

						<label htmlFor='create-content-url'>
							<span>URL</span>
							<input id='create-content-url' type='text' name='url' value={url} onChange={handleTextChange} required />
						</label>

						<label htmlFor='create-content-description'>
							<span>Description</span>
						</label>
						<textarea id='create-content-description' name='description' value={description} onChange={handleTextChange} rows={4} required />

						<label htmlFor='create-content-keywords'>
							<span>Tags</span>
						</label>

						<div className='keywords-list'>
							{keywords.map((keyword, index) => <span key={index}>{keyword}<RemoveKeyword src={plus} onClick={remove} type='button' data-keyword={keyword} /></span>)}
						</div>

						<input id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add a tag...' />
						<datalist id='create-content-keywords'>
							{keywords.map((keyword, index) => <option key={index} value={keyword} />)}
						</datalist>

						<div>
							<Button type='button' onClick={toggleModal}>Cancel</Button>
							<Button type='submit' color={`#0582CA`}>Create</Button>
						</div>
					</Form>
				}

				{tab === `file` &&
					<>
						<Form onKeyPress={onKeyPress} onSubmit={handleSubmitFile} id='create-content-form'>
							<label htmlFor='create-content-title'>
								<span>Title</span>
								<input id='create-content-title' type='text' name='title' value={title} onChange={handleTextChange} required />
							</label>

							<label htmlFor='create-content-type'>
								<span>Type</span>
								<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
									<TypeButton type='button' selected={contentType === `video`} onClick={handleTypeChange} data-type='video'>Video</TypeButton>
									<TypeButton type='button' selected={contentType === `audio`} onClick={handleTypeChange} data-type='audio'>Audio</TypeButton>
									<TypeButton type='button' selected={contentType === `image`} onClick={handleTypeChange} data-type='image'>Image</TypeButton>
									<TypeButton type='button' selected={contentType === `text`} onClick={handleTypeChange} data-type='text'>Text</TypeButton>
								</div>
							</label>

							<label htmlFor='file'>
								<span>File</span>
								{file === `` ? <FileButton>Choose File</FileButton> : <FileName>{file}</FileName>}
							</label>

							<label htmlFor='create-content-description'>
								<span>Description</span>
							</label>
							<textarea id='create-content-description' name='description' value={description} onChange={handleTextChange} rows={4} required />

							<label htmlFor='create-content-keywords'>
								<span>Tags</span>
							</label>

							<div className='keywords-list'>
								{keywords.map((keyword, index) => <span key={index}>{keyword}<RemoveKeyword src={plus} onClick={remove} type='button' data-keyword={keyword} /></span>)}
							</div>

							<input id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add a tag...' />
							<datalist id='create-content-keywords'>
								{keywords.map((keyword, index) => <option key={index} value={keyword} />)}
							</datalist>

							<div>
								<Button type='button' onClick={toggleModal}>Cancel</Button>
								<Button type='submit' color={`#0582CA`}>Create</Button>
							</div>
						</Form>

						<form hidden id='real-file-form' onSubmit={submitFile}>
							<input id='title' name='title' type='text' value={title} onChange={fakeHandler}></input>
							<input id='contentType' name='contentType' type='text' value={contentType} onChange={fakeHandler} />
							<textarea name='description' id='description' value={description} onChange={fakeHandler} />
							<select name='keywords' id='keywords' multiple='multiple' value={keywords} onChange={fakeHandler}>
								{keywords.map((item, index) => <option key={index} value={item}>{item}</option>)}
							</select>
							<input id='file' name='file' type='file' onChange={handleFile} />
						</form>
					</>
				}

				{tab === `resource` &&
					<Form>
						{console.log(adminContent)}
						<input type='text' name='resourceId' value={resourceId} onChange={handleTextChange} />
					</Form>
				}
			</>
		)
	}
}
