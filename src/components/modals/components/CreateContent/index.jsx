import React, { PureComponent } from 'react'

import {
	Form,
	Button,
	RemoveKeyword,
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
			searchQuery,
			tab,
			resourceContent,
			hideResources,
			languages,
			isResourceSelected,
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

		return (
			<>
				<h2>Create New Content</h2>

				<Tabs>
					<Tab className='tab-url' selected={tab === `url`} onClick={changeTab} name={`url`}>From URL</Tab>
					<Tab className='tab-search-resources' selected={tab === `resource`} onClick={changeTab} name={`resource`}>Search Resources</Tab>
				</Tabs>

				{tab === `url` &&
					<Form onKeyPress={onKeyPress} onSubmit={handleSubmit} className='create-content-form' id='create-content-form' >
						<label htmlFor='create-content-title'>
							<span>Title</span>
							<input className='url-title-input' id='create-content-title' type='text' name='title' value={title} onChange={handleTextChange} required />
						</label>

						<label htmlFor='create-content-type'>
							<span>Type</span>
							<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
								<TypeButton className='url-type-video' type='button' selected={contentType === `video`} onClick={handleTypeChange} data-type='video'>Video</TypeButton>
								<TypeButton className='url-type-audio' type='button' selected={contentType === `audio`} onClick={handleTypeChange} data-type='audio'>Audio</TypeButton>
								<TypeButton className='url-type-image' type='button' selected={contentType === `image`} onClick={handleTypeChange} data-type='image'>Image</TypeButton>
								<TypeButton className='url-type-text' type='button' selected={contentType === `text`} onClick={handleTypeChange} data-type='text'>Text</TypeButton>
							</div>
						</label>

						<label htmlFor='create-content-url'>
							<span>URL</span>
							<input className='url-content-url' id='create-content-url' type='text' name='url' value={url} onChange={handleTextChange} required />
						</label>

						<label htmlFor='create-content-description'>
							<span>Description</span>
						</label>
						<textarea className='url-content-description' id='create-content-description' name='description' value={description} onChange={handleTextChange} rows={4} required />

						<label htmlFor='create-content-keywords'>
							<span>Tags</span>
						</label>

						<div className='keywords-list'>
							{resource.keywords.map((keyword, index) => <span key={index}>{keyword}<RemoveKeyword className='url-content-remove' src={plus} onClick={remove} type='button' data-keyword={keyword} /></span>)}
						</div>
						{/* TODO: MAKE THE TAGS WORK AND BE PASSED WHEN ON CHANGE EVENT */}
						<input className='url-content-input-tag' id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add a tag...'/>
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
							<input className='resource-search-title' type='text' name='searchInput' value={searchQuery} onChange={handleSearchTextChange} />
						</label>
						{!isResourceSelected &&
							<TableContainer className='table-container' height={Object.keys(resourceContent).length} style={{ display: `${hideResources === true ? `none` : `initial`}` }}>
								{
									resourceContent && hideResources !== true &&
								Object.keys(resourceContent).map(index =>
									<li key={resourceContent[index].id}>
										<input type='radio' value={resourceContent[index].id} name='resource' onChange={e => handleSelectResourceChange(e, resourceContent[index].resourceName)}/>
										<label>{resourceContent[index].resourceName}</label>
									</li>,
								)
								}
							</TableContainer>
						}
						<label>
							<span>Content Title</span><br/>
							<input className='resource-content-title' type='text' name='title' value={title} onChange={handleTextChange} required/>
						</label>
						<label>
							<span>Description</span><br/>
							<textarea className='resource-content-description' name='description' value={description} onChange={handleTextChange} rows={2} cols={35} required />
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
							<Button className='url-content-cancel' type='button' onClick={toggleModal}>Cancel</Button>
							{targetLanguages.length > 0 ?
								(
									<Button className='url-content-create' type='submit' color={`#0582CA`}>Create</Button>
								)
								:
								(
									<Button className='url-content-create' type='submit' color={`#A0A0A0`} disabled>Create</Button>
								)
							}
						</div>
					</FormResource>
				}
			</>
		)
	}
}
