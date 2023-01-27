import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SwitchToggle, Tag, LazyImage } from 'components/bits'
import {useCallbackPrompt} from '../../../hooks/useCallbackPrompt'
import defaultThumbnail from 'assets/default-thumb.svg'
import helpIcon from 'assets/help/help-icon-black.svg'

import Style, {
	EditButton,
	Icon,
	Preview,
	PublishButton,
	RemoveButton,
	TitleEdit,
	StyledLink,
	Column,
	InnerContainer,
	LinksWrapper,
	ContentIcons,
	IconWrapper,
	TitleWrapper,
	SettingsIcon,
} from './styles'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ContentOverview = props => {

	if(props.isExpired){
		return (
			<Style>
				<div className='expired'>
					<h3 className={`content-title`}>{props.content[`content-title`]} <span>Expired</span></h3><br/>
					<p>Please, contact a lab assistant to learn how to recover this content</p>
				</div>
			</Style>
		)
	}
	const SUPPORTED_LANGUAGES = [
		`German`,
		`Spanish`,
		`Russian`,
	]

	const {
		editing,
		content,
		tag,
		blockLeave,
	} = props.viewstate

	const {
		handleNameChange,
		handleRemoveContent,
		handleToggleEdit,
		handleTogglePublish,
		addTag,
		removeTag,
		handleToggleSettings,
		handleDescription,
		changeTag,
		handleShowWordsModal,
		handleShowHelp,
		handleLinks,
		handleShowTip,
		toggleTip,
		handleNavigation,
	} = props.handlers

	const {
		allowDefinitions,
		showCaptions,
		showAnnotations,
	} = content.settings

	const {
		keywords,
	} = content.resource

	const {
		description,
	} = content

	const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(blockLeave)

	// for testing purposes, I made this which just wraps 2 functions together
	const handleEditAndTip = () => {
		handleToggleEdit()
		toggleTip()
	}
	useEffect(() => {
		if (showPrompt)
			handleNavigation(confirmNavigation, cancelNavigation)
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showPrompt])

	return (
		<Style>
			<Preview onClick={handleToggleEdit}>
				<Container>
					<Row>
						<Col xs="6" lg="3" className="me-4">
							<Link to={`/player/${content.id}`}>
								<LazyImage
									src={content.thumbnail !== `empty` ? content.thumbnail : defaultThumbnail}
									height='12rem'
									width='21rem'
									heightSm='4.5rem'
									widthSm='6.5rem'
								/>
							</Link>
						</Col>

				{/* page opened when you click settings -- Start */}

							{editing &&
									<div className='icon-Buttons'>
										<PublishButton
											className='publish-button'
											published={content.published}
											onClick={handleTogglePublish}>{content.published ?
												<>
													<i className='fa fa-eye-slash'></i> Unpublish
												</>
												:
												<>
													<i className='fa fa-eye'></i> Publish
												</>
											}
										</PublishButton>
										<RemoveButton className='remove-button' onClick={handleRemoveContent}><i className='fa fa-trash-o'></i>Delete</RemoveButton>
										<EditButton id='edit-button' onClick={handleToggleEdit}><i className='fa fa-save'></i>Save</EditButton>
									</div>
							}
				{/* page opened when you click settings -- End */}
							<Col xs="6" lg="3">
								<Row className="mt-5">
									{editing ?
										<TitleEdit type='text' value={content.name} onChange={handleNameChange} />
										:
										<TitleWrapper><h3 className={`content-title`}>{content.name}</h3></TitleWrapper>
									}
								</Row>
							{/* <ul> */}
							<Row className="mt-2">
								<Col>
									<Icon className='translation' style={{fontSize:"10px"}}checked={allowDefinitions} onMouseEnter={e => handleShowTip(`${allowDefinitions ? `translation` : `translation-off`}`,
										{
											x: e.target.getBoundingClientRect().x + 10,
											y: e.target.getBoundingClientRect().y + 5,
											width: e.currentTarget.offsetWidth,
										})
									}
									onMouseLeave={e => toggleTip()}/>
								</Col>
								<Col>
									<Icon className='captions' checked={showCaptions} onMouseEnter={e => handleShowTip(`${showCaptions ? `closed-captioning-on` : `closed-captioning-off`}`,
										{
											x: e.target.getBoundingClientRect().x + 10,
											y: e.target.getBoundingClientRect().y + 5,
											width: e.currentTarget.offsetWidth,
										})
									}
									onMouseLeave={e => toggleTip()}/>
								</Col>
								{/* <Col>
									<Icon className='annotations' checked={showAnnotations} />
								</Col> */}
								<Col>
									<Icon>{content.published ? <i className='fa fa-eye'
										onMouseEnter={e => handleShowTip(`published`,
											{
												x: e.target.getBoundingClientRect().x + 10,
												y: e.target.getBoundingClientRect().y + 7,
												width: e.currentTarget.offsetWidth,
											})
										}
										onMouseLeave={e => toggleTip()}></i> : <i className='fa fa-eye-slash'
										onMouseEnter={e => handleShowTip(`unpublished`,
											{
												x: e.target.getBoundingClientRect().x + 10,
												y: e.target.getBoundingClientRect().y + 5,
												width: e.currentTarget.offsetWidth,
											})
										}
										onMouseLeave={e => toggleTip()}></i>}</Icon>
									</Col>
									<Col></Col>
									<Col></Col>
									<Col></Col>
									<Col></Col>
								</Row>
							{/* </ul> */}
						</Col>
						<Col xs="6" lg="4">
								{editing ||
										<LinksWrapper className='LinksWrapper'>
										<Row className="mt-5">
												<Col>
													<IconWrapper onClick={handleLinks} className='video-editor-wrapper'>
															<ContentIcons className='video-editor'/>
															<StyledLink to={`/videoeditor/${content.id}`} style={{ textAlign: 'center'}}>Video Editor</StyledLink>
													</IconWrapper>
												</Col>
												<Col>
													<IconWrapper onClick={handleLinks} className='subtitle-editor-wrapper'>
														<ContentIcons className='subtitle-editor'/>
														<StyledLink to={`/subtitleeditor/${content.id}`}>Subtitle Editor</StyledLink>
													</IconWrapper>
												</Col>
												<Col>
													<IconWrapper onClick={handleLinks} className='clip-manager-wrapper'>
														<ContentIcons className='clip-manager'/>
														<StyledLink to={`/clipeditor/${content.id}`}>Clip Manager</StyledLink>
													</IconWrapper>
												</Col>
											</Row>

										</LinksWrapper>
								}
						</Col>
						<Col>
							{ !editing &&
									<SettingsIcon
										onClick={handleEditAndTip}
										onMouseEnter={e => handleShowTip(`settings`,
											{
												x: e.target.getBoundingClientRect().x + 45,
												y: e.target.getBoundingClientRect().y - 5,
												width: e.currentTarget.offsetWidth,
											})
										}
										onMouseLeave={() => toggleTip()} />
							}
						</Col>
						</Row>
					</Container>
					</Preview>

				<Row>
			{editing &&
					<InnerContainer>
						<Column>
							<div className='target-language'>
								<h4>
								Target Language:
								</h4>
								{content.settings.targetLanguage}
							</div>
							<h4>
								Allow automatic definitions
								<Icon className='translation-always-on'/>
								<div
									onMouseEnter={(e) => {
										!SUPPORTED_LANGUAGES.join(``).includes(content.settings.targetLanguage)
										&&
										handleShowTip(`definitions-disabled`,
											{
												x: e.target.getBoundingClientRect().x + 45,
												y: e.target.getBoundingClientRect().y + 5,
												width: e.currentTarget.offsetWidth,
											})
									}}
									onMouseOut={() => {
										!SUPPORTED_LANGUAGES.join(``).includes(content.settings.targetLanguage) && toggleTip()
									}}
									style={!SUPPORTED_LANGUAGES.join(``).includes(content.settings.targetLanguage) ? {cursor: `not-allowed`} : {cursor: `auto`}}
								>
									<SwitchToggle
										disabled={!SUPPORTED_LANGUAGES.join(``).includes(content.settings.targetLanguage)}
										id='definitions-toggle'
										on={allowDefinitions}
										setToggle={handleToggleSettings}
										size={1.5}
										data_key='allowDefinitions' />
								</div>
							</h4>
							<h4>
								Captions
								<Icon className='caption-always-on'/>
								<SwitchToggle id='captions-toggle'on={showCaptions} setToggle={handleToggleSettings} size={1.5} data_key='showCaptions' />
							</h4>

						</Column>
						<Column>
							<h4>Tags</h4>
							<div style={{ display: `flex` }}>
								<input type='text' placeholder='Add tags...' onChange={changeTag} value={tag} id='tag-input' />
								<button id={`add-tag`} onClick={addTag}>Add</button>
							</div>
							<br/>
							<div className='tags'>
								{ keywords ?
									keywords.map((item, index) => item === `` ?
										null
										:
										<Tag key={index} onClick={removeTag}>{item}</Tag>)
									:
									<></>
								}
							</div>
						</Column>
						<Column>
							<h4>Description</h4>
							<textarea rows={4} onChange={handleDescription} value={description} />
						</Column>
						<Column>
							<h4>Important Words
								<img src={helpIcon} alt={`help`}
									onClick={handleShowHelp}
									onMouseEnter={e => handleShowTip(`help`,
										{
											x: e.target.getBoundingClientRect().x + 45,
											y: e.target.getBoundingClientRect().y + 5,
											width: e.currentTarget.offsetWidth,
										})
									}
									onMouseLeave={() => toggleTip()}
									width='20' height='20'/>
							</h4>
							<p>Add a list of important words to be highlighted in the transcript. The highlighted
							words will have quick translation on click if there is
							one available.</p><br/>
							<button className={`words-modal`} onClick={handleShowWordsModal}>OPEN</button>
						</Column>
					</InnerContainer>
			}
			{/* <Prompt
					when={blockLeave}
					message='Have you saved your changes already?'
				/> */}
				</Row>

		</Style>
	)
}

export default ContentOverview
