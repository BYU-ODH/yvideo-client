import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { resourceService, contentService, interfaceService } from 'services'

import { SwitchToggle, Tag, Spinner, LazyImage } from 'components/bits'

import defaultThumbnail from 'assets/default-thumb.svg'

import checkMark from 'assets/player-check.svg'
import xMark from 'assets/x_red.svg'

import Style, {
	EditButton,
	Icon,
	Preview,
	PublishButton,
	RemoveButton,
	TitleEdit,
	StyledLink,
	Setting,
	Column,
	InnerContainer,
} from './styles'

export default class ContentOverview extends PureComponent {
	render() {

		const {
			editing,
			content,
			tag,
			word,
			checkWord,
			checkResponse,
			language,
			translationMeanings,
			translationWords
		} = this.props.viewstate

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
			addWord,
			removeWord,
			changeWord,
			changeCheckWord,
			handleCheckWord,
			changeLanguage,
			handleShowTranslation,
		} = this.props.handlers

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
			words,
		} = content

		// const allowDefinitions = content['allow-definitions'] // <-- ?? -Matthew

		return (
			<Style>
				<Preview>
					<div>
						<LazyImage src={content.thumbnail !== `empty` ? content.thumbnail : defaultThumbnail} height='8rem' width='14rem' />
					</div>
					<div>
						{editing ?
							<TitleEdit type='text' value={content.name} onChange={handleNameChange} />
							:
							<h3 className={`content-title`}>{content.name}</h3>}
						<ul>
							<Icon className='translation' checked={allowDefinitions} />
							<Icon className='captions' checked={showCaptions} />
							<Icon className='annotations' checked={showAnnotations} />
						</ul>
						{editing ||
							<StyledLink to={`/trackeditor/${content.id}`}>Track Editor</StyledLink>
						}
						{editing ?
							<div>
								<PublishButton published={content.published} onClick={handleTogglePublish}>{content.published ? `Unpublish` : `Publish`}</PublishButton>
								<RemoveButton onClick={handleRemoveContent}>Delete</RemoveButton>
							</div>
							:
							<em>{content.published ? `Published` : `Unpublished`}</em>
						}
					</div>
					<div>
						<EditButton className='edit-button' onClick={handleToggleEdit}>{editing ? `Save` : `Edit`}</EditButton>
					</div>
				</Preview>
				{editing &&
					<InnerContainer>
						<Column>
							<h4>Allow automatic definitions
								<SwitchToggle className='definitions-toggle' on={allowDefinitions} setToggle={handleToggleSettings} size={1.5} data_key='allowDefinitions' />
							</h4>
							<h4>
								Captions
								<SwitchToggle className='captions-toggle'on={showCaptions} setToggle={handleToggleSettings} size={1.5} data_key='showCaptions' />
							</h4>
						</Column>
						<Column>
							<h4>Tags</h4>
							<div style={{ display: `flex` }}>
								<input type='text' placeholder='Add tags...' onChange={changeTag} value={tag} className='tag-input' />
								<button className={`add-tag`} onClick={addTag}>Add</button>
							</div>
							<br/>
							<div className='tags'>
								{keywords.map((item, index) => item === `` ? null : <Tag key={index} onClick={removeTag}>{item}</Tag>)}
							</div>
						</Column>
						<Column>
							<h4>Highlight Words</h4>
							<div style={{display:'flex'}}>
								<div>
									<div>
										<p>See available translation</p>
										<div style={{ display: 'flex' }}>
											<input type='text' placeholder='Check word' onChange={changeCheckWord} value={checkWord} className='tag-input' />
											<input type='text' placeholder='Language. Ex: spanish' onChange={changeLanguage} value={language} className='tag-input'/>
											<img src={ checkResponse === false ? (xMark) : (checkMark)} width="25" height="25" style={{ border: 'none', position: 'relative', left: '3px' }}/>
											<button className={`check-tag`} onClick={handleCheckWord}>Check</button>
											<button className={`check-tag ${translationMeanings.length < 1 ? ('view-disable'):('view-active')}`} onClick={handleShowTranslation} disabled={translationMeanings.length < 1 ? (true):(false)}>View</button>
										</div>
										<br/>
										<p>Add important words</p>
										<div style={{ display: 'flex' }}>
											<input type='text' placeholder='Add word. Ex: and, do, did' onChange={changeWord} value={word} className='tag-input' />
											<button className={`add-tag`} onClick={addWord}>Add</button>
										</div>
									</div>
									<br/>
									<div className='tags'>
										{words.map((item, index) => item === `` ? null : <Tag key={index} onClick={removeWord}>{item}</Tag>)}
									</div>
								</div>
							</div>
						</Column>
						<Column>
							<h4>Description</h4>
							<textarea rows={4} onChange={handleDescription} value={description} />
						</Column>
					</InnerContainer>
				}
			</Style>
		)
	}
}