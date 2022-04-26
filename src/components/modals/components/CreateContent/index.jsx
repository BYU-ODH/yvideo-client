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
	Search,
	SearchIcon,
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
			allLanguages,
			isResourceSelected,
			selectedResourceName,
			isAccess,
			resourceFiles,
		} = this.props.viewstate

		const {
			title,
			contentType,
			url,
			description,
			resource,
			targetLanguage,
		} = this.props.viewstate.data

		const {
			changeTab,
			handleAddResourceSubmit,
			handleSearchTextChange,
			handleSelectResourceChange,
			handleSubmit,
			handleTextChange,
			handleSelectLanguage,
			handleTypeChange,
			onKeyPress,
			remove,
			removeResource,
			toggleModal,
		} = this.props.handlers

		return (
			<>
				<h2 className='create-content-title'>Create New Content</h2>

				<Tabs>
					<Tab className='tab-url' selected={tab === `url`} onClick={changeTab} name={`url`}>From URL</Tab>
					<Tab className='tab-search-resources' selected={tab === `resource`} onClick={changeTab} name={`resource`}>Search Resources</Tab>
				</Tabs>

				{tab === `url` &&
					<Form onKeyPress={onKeyPress} onSubmit={handleSubmit} className='create-content-form' id='create-content-form' >
						<label htmlFor='create-content-title'>
							<span><b>Title:</b></span>
							<input className='url-title-input' id='create-content-title' type='text' name='title' value={title} onChange={handleTextChange} required />
						</label>

						<label htmlFor='create-content-type'>
							<span><b>Type:</b></span>
							<div style={{ flex: `5`, display: `flex`, justifyContent: `space-between` }}>
								<TypeButton className='url-type-video std-outline-color' type='button' selected={contentType === `video`} onClick={handleTypeChange} data-type='video'><i className="fa fa-video" />Video</TypeButton>
								<TypeButton className='url-type-audio std-outline-color' type='button' selected={contentType === `audio`} onClick={handleTypeChange} data-type='audio'><i className="fa fa-headphones" />Audio</TypeButton>
								<TypeButton className='url-type-image std-outline-color' type='button' selected={contentType === `image`} onClick={handleTypeChange} data-type='image'><i className="fa fa-image" />Image</TypeButton>
								<TypeButton className='url-type-text std-outline-color' type='button' selected={contentType === `text`} onClick={handleTypeChange} data-type='text'><i className="fa fa-text-width" />Text</TypeButton>
							</div>
						</label>

						<label htmlFor='create-content-url'>
							<span><b>URL:</b></span>
							<input className='url-content-url' id='create-content-url' type='text' name='url' value={url} onChange={handleTextChange} required />
						</label>

						<label htmlFor='create-content-description'>
							<span><b>Description:</b></span>
						</label>
						<textarea className='url-content-description std-outline-color' id='create-content-description' name='description' value={description} onChange={handleTextChange} rows={4} />

						<label htmlFor='create-content-keywords'>
							<span><b>Tags</b></span>
						</label>
						<input className='url-content-input-tag' id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add tag...'/>
						<div className='keywords-list'>
							{resource.keywords.length < 1 ? (<p>There are no tags. Add tags like <i>GoCougars, BYU, Tech, Science</i></p>) : null}
							{resource.keywords.map((keyword, index) => <span key={index}>{keyword}<RemoveKeyword className='url-content-remove' src={plus} onClick={remove} type='button' data-keyword={keyword} /></span>)}
						</div>
						{/* TODO: MAKE THE TAGS WORK AND BE PASSED WHEN ON CHANGE EVENT */}

						<label>
							<span><b>Target Language:</b></span>
							{
								allLanguages &&
									<select name='targetLanguage' onChange={handleTextChange} required>
										<option value=''>Select</option>
										{
											allLanguages.map(
												(element, index) =>
													<option value={element.slice(0, element.length)} key={index}>{element.slice(0, element.length)}</option>)
										}
									</select>
							}
						</label><br/>

						<div>
							<Button type='button' className="std-outline-color" onClick={toggleModal}>Cancel</Button>
							<Button type='submit' className="std-outline-color" color={`#0582CA`}>Create</Button>
						</div>
					</Form>
				}

				{tab === `resource` &&
					<FormResource onSubmit={handleAddResourceSubmit}>
						<Search>
							<SearchIcon />
							<input className='resource-search-title' type='search' name='searchInput' placeholder={`Search Resource`} autoComplete='off' value={searchQuery} onChange={handleSearchTextChange} />
						</Search>
						<TableContainer className='table-container' height={Object.keys(resourceContent).length} style={{ display: `${hideResources === true ? `none` : `initial`}` }}>
							{
								resourceContent && hideResources !== true &&
							Object.keys(resourceContent).map(index =>

								<li key={resourceContent[index].id} onClick={e => handleSelectResourceChange(e, resourceContent[index])}>
									<label>{resourceContent[index].resourceName}</label>
								</li>

								,
							)
							}
						</TableContainer>
						<br/>
						<label>
							<span>Resource</span><br/>
							<div className='resource-content-remove'>
								<input value={selectedResourceName} disabled required></input>
								{
									selectedResourceName &&
										<RemoveKeyword className='resource-content-remove-button' src={plus} onClick={removeResource} type='button'/>
								}
							</div>
						</label>
						<br/>
						{
							!isAccess &&
								<label>
									<p className='unauthorized-message'>You are currently unauthorized to add this resource. Please contact Y-video admin for more information.</p>
								</label>
						}
						<label>
							<span>Display Title</span><br/>
							<input className='resource-content-title' type='text' name='title' value={title} onChange={handleTextChange}/>
						</label>
						<br/>
						<label>
							<span>Description</span><br/>
							<textarea className='resource-content-description std-outline-color' name='description' value={description} onChange={handleTextChange} rows={2} cols={35} />
						</label><br/>
						<label>

							<span>Target Language</span>
							{
								isResourceSelected && resourceFiles &&(
									languages.length > 0 ?
										<select name='fileId' onChange={handleTextChange} required>
											<option value=''>Select</option>

											{
												resourceFiles.map(
													(element, index) =>
														<option value={element[`id`]} key={index}>{`${element[`file-version`]}: ${element[`metadata`]}`}</option>,
												)
											}
										</select>

										:
										(
											<div>
												<br/>
												<p>No file associate to this resource</p>
											</div>
										)
								)
							}
						</label>

						<div>

							<Button className='url-content-cancel std-outline-color' type='button' onClick={toggleModal}>Cancel</Button>
							{targetLanguage.length > 0 ?
								(
									<Button className='url-content-create std-outline-color' type='submit' color={`#0582CA`}>Create</Button>
								)
								:
								(
									<Button className='url-content-create std-outline-color' type='submit' color={`#A0A0A0`} disabled>Create</Button>
								)
							}
						</div>
					</FormResource>
				}
			</>
		)
	}
}
