import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	RemoveKeyword,
	Table,
	TableContainer,
	Tabs,
	Tab,
	TypeButton,
	FormResource,
} from './styles'

import plus from 'assets/plus_blue.svg'

export default class CreateContent extends PureComponent {

	render() {

		const {
			adminContent,
			searchQuery,
			tab,
			resourceContent,
			hideResources,
			selectedResource,
			languages,
		} = this.props.viewstate

		const {
			title,
			contentType,
			url,
			description,
			resource,
			targetLanguages,
		} = this.props.viewstate.data

		const {
			changeTab,
			handleAddResourceSubmit,
			handleSearchTextChange,
			handleSelectResourceChange,
			handleSubmit,
			handleTextChange,
			handleTypeChange,
			onKeyPress,
			remove,
			toggleModal,
		} = this.props.handlers

		// console.log(languages)

		return (
			<>
				<h2>Create New Content</h2>

				<Tabs>
					<Tab selected={tab === `url`} onClick={changeTab} name={`url`}>From URL</Tab>
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
							{resource.keywords.map((keyword, index) => <span key={index}>{keyword}<RemoveKeyword src={plus} onClick={remove} type='button' data-keyword={keyword} /></span>)}
						</div>
						{/* TODO: MAKE THE TAGS WORK AND BE PASSED WHEN ON CHANGE EVENT */}
						<input id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add a tag...'/>
						<datalist id='create-content-keywords'>
							{resource.keywords.map((keyword, index) => <option key={index} value={keyword} />)}
						</datalist>

						<div>
							<Button type='button' onClick={toggleModal}>Cancel</Button>
							<Button type='submit' color={`#0582CA`}>Create</Button>
						</div>
					</Form>
				}

				{tab === `resource` &&
					<FormResource onSubmit={handleAddResourceSubmit}>
						<label>
							Search Resource Title<br/>
							<input type='text' name='searchInput' value={searchQuery} onChange={handleSearchTextChange} />
						</label>
						<TableContainer height={Object.keys(resourceContent).length} style={{ display: `${hideResources === true ? `none` : `initial`}` }}>
							{
								// TODO: need to be updated for submit work
								resourceContent && hideResources !== true &&
								Object.keys(resourceContent).map(index =>
									<li key={resourceContent[index].id}>
										<input type='radio' value={resourceContent[index].id} name='resource' onChange={e => handleSelectResourceChange(e, resourceContent[index].resourceName)}/>
										<label>{resourceContent[index].resourceName}</label>
									</li>,
								)
							}
						</TableContainer>
						<label>
							<span>Content Title</span><br/>
							<input type='text' name='title' value={title} onChange={handleTextChange} />
						</label>
						<label>
							<span>Description</span><br/>
							<textarea name='description' value={description} onChange={handleTextChange} rows={2} cols={35} required />
						</label>
						<label>
							<span>Target Language</span>
							{ languages.length > 0 &&
								<select name='targetLanguages' onChange={handleTextChange} required>
									<option value=''>Select</option>
									{
										languages.map((element, index) =>
											<option value={element.slice(0, element.length)} key={index}>{element.slice(0, element.length)}</option> )
									}
								</select>
							}
						</label>

						<div>
							<Button type='button' onClick={toggleModal}>Cancel</Button>
							<Button type='submit' color={`#0582CA`}>Create</Button>
						</div>
					</FormResource>
				}
			</>
		)
	}
}
