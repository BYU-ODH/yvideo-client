import React from 'react'

import {
	Form,
	Button,
	DecideButton,
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

const CreateContent = props => {

	const {
		searchQuery,
		tab,
		resourceContent,
		hideResources,
		allLanguages,
		isResourceSelected,
		selectedResourceName,
		isAccess,
		resourceFiles,
		decision,
		isValidatingAddPermissions,
		isAdmin,
	} = props.viewstate

	const {
		title,
		contentType,
		url,
		description,
		resource,
		targetLanguage,
	} = props.viewstate.data

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
		removeResource,
		toggleModal,
		decideTab,
		cancelAdminPermissions,
		confirmAdminPermissions,
		adminResourceCheckPermissions,
	} = props.handlers
	return (
		decision ?
			isValidatingAddPermissions?(
				<div style={{padding:`2rem`}}>
					<h2 style={{textAlign:`center`}} className='create-content-title'>Warning:</h2>
					<h3 style={{textAlign:`center`, width:`50vh`, marginTop:`15px`}}>The owner of this collection does not have permission to use this resource, would you like to continue and give them permission?</h3>
					<div style={{width:`50vh`,display:`flex`, justifyContent:`space-around`, marginTop:`3rem`}}>
						<div>
							<DecideButton className='tab-url' onClick={cancelAdminPermissions} name={`url`}>Cancel</DecideButton>
						</div>
						<div>
							<DecideButton className='tab-search-resources' onClick={confirmAdminPermissions} name={`resource`}>Grant Permission</DecideButton>
						</div>
					</div>
					<div style={{display:`flex`, justifyContent:`space-around`}}>
					</div>
				</div>
			):(
				<>

					<h2 className='create-content-title'>Create New Content</h2>

					<Tabs>
						<Tab className='tab-url' selected={tab === `url`} onClick={changeTab} name={`url`}>From URL</Tab>
						<Tab className='tab-search-resources' selected={tab === `resource`} onClick={changeTab} name={`resource`}>From Resource</Tab>
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
											<TypeButton id='url-type-video' className='std-outline-color' type='button' selected={contentType === `video`} onClick={handleTypeChange} data-type='video'><i className='fa fa-video' data-type='video' />Video</TypeButton>
											<TypeButton id='url-type-audio' className='std-outline-color' type='button' selected={contentType === `audio`} onClick={handleTypeChange} data-type='audio'><i className='fa fa-headphones' data-type='audio' />Audio</TypeButton>
											<TypeButton id='url-type-image' className='std-outline-color' type='button' selected={contentType === `image`} onClick={handleTypeChange} data-type='image'><i className='fa fa-image' data-type='image' />Image</TypeButton>
											<TypeButton id='url-type-text' className='std-outline-color' type='button' selected={contentType === `text`} onClick={handleTypeChange} data-type='text'><i className='fa fa-text-width' data-type='text' />Text</TypeButton>
										</div>
									</label>

									<label htmlFor='create-content-url'>
										<span><b>URL:</b></span>
										<input className='url-content-url' id='create-content-url' type='text' name='url' value={url} onChange={handleTextChange} required />
									</label>

									<label htmlFor='create-content-description'>
										<span><b>Description:</b></span>
									</label>
									<textarea id='create-content-description' className='std-outline-color' name='description' value={description} onChange={handleTextChange} rows={5} />

									<label htmlFor='create-content-keywords'>
										<span><b>Tags:</b></span>
									</label>
									<input className='url-content-input-tag' id='keyword-datalist-input' type='text' name='keywords' list='create-content-keywords' placeholder='Add tag...'/>
									<div className='keywords-list'>
										{resource.keywords.length < 1 ?
											(<p>There are no tags. Add tags like <i>GoCougars, BYU, Tech, Science</i></p>)
											:
											null
										}
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
										<Button type='button' className='std-outline-color' onClick={toggleModal}>Cancel</Button>
										<Button type='submit' className='std-outline-color' color={`#0582CA`}>Create</Button>
									</div>
								</Form>
					}

					{tab === `resource` &&
								<FormResource onSubmit={isAdmin ? adminResourceCheckPermissions : handleAddResourceSubmit}>
									<Search>
										<SearchIcon />
										<input className='resource-search-title' type='search' name='searchInput' placeholder={`Search Resource`} autoComplete='off' value={searchQuery} onChange={handleSearchTextChange} />
									</Search>
									<TableContainer
										className='table-container'
										height={Object.keys(resourceContent).length}
										style={{ display: `${hideResources === true ? `none` : `initial`}` }}>
										{
											resourceContent && hideResources !== true &&
												Object.keys(resourceContent).map(index =>
													<li key={resourceContent[index].id} onClick={e => handleSelectResourceChange(e, resourceContent[index])}>
														<label>{resourceContent[index].resourceName}</label>
													</li>,
												)
										}
									</TableContainer>
									<br/>
									<label>
										<span><b>Resource</b></span><br/>
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
										!isAccess ?
											<div className={`box`}><p className='unauthorized-message'>You are currently unauthorized to add this resource. Please contact a Y-video admin to demonstrate proof of ownership.</p></div>
											:
											``
									}
									<label>
										<span><b>Display Title</b></span><br/>
										<input className='resource-content-title' type='text' name='title' value={title} onChange={handleTextChange}/>
									</label>
									<br/>
									<label>
										<span><b>Description</b></span><br/>
									</label>
									<textarea id='resource-content-description' className='std-outline-color' name='description' value={description} onChange={handleTextChange} rows={5} cols={35} /><br/>
									<label>

										<span><b>File Version</b><span id='no-files-message' style={{marginLeft: `10px`}}>{resourceFiles?.length <= 0 && `No files associated with this resource`}</span></span>
										{
											isResourceSelected && (
												resourceFiles?.length > 0 &&
													<select name='fileId' onChange={handleTextChange} required>
														<option value=''>Select</option>

														{
															resourceFiles.map(
																(element, index) =>
																	<option value={element[`id`]} key={index}>{`${element[`file-version`]}: ${element[`metadata`]}`}</option>,
															)
														}
													</select>
											)
										}
									</label>

									<div>

										<Button id='url-content-cancel' className='std-outline-color' type='button' onClick={toggleModal}>Cancel</Button>
										{targetLanguage.length > 0 ?
											(
												<Button id='url-content-create' className='std-outline-color' type='submit' color={`#0582CA`}>Create</Button>
											)
											:
											(
												<Button id='url-content-create' className='std-outline-color' type='submit' color={`#A0A0A0`} disabled>Create</Button>
											)
										}
									</div>
								</FormResource>
					}
				</>
			)

			:(
				<div style={{padding:`2rem`}}>
					<h2 style={{textAlign:`center`}} className='create-content-title'>Create New Video or Audio Content</h2>
					<div style={{width:`50vh`,display:`flex`, justifyContent:`space-around`, marginTop:`3rem`}}>
						<div style={{display: `flex`,flexDirection: `column`}}>
							<DecideButton className='url' onClick={decideTab} name={`url`}>From URL</DecideButton>
							<p style={{textAlign:`center`,marginTop:`10px`,width:`30vh`}}>YouTube, Facebook, Twitch, SoundCloud, Vimeo, Kaltura, etc.</p>
						</div>
						<div style={{display: `flex`,flexDirection: `column`}}>
							<DecideButton className='resources' onClick={decideTab} name={`resource`}>From Resource</DecideButton>
							<p style={{textAlign:`center`,marginTop:`10px`}}>Digitized by your institution</p>
						</div>
					</div>
					<div style={{display:`flex`, justifyContent:`space-around`}}>
					</div>
				</div>
			)
	)
}

export default CreateContent
