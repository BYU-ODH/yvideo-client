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
			handleShowWordsModal
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
							<h4>Description</h4>
							<textarea rows={4} onChange={handleDescription} value={description} />
						</Column>
						<Column>
							<h4>Highlight Words</h4>
							<p>Add a list of words to be highlighted in the transcript. The highlighted
							words in the transcript will have quick translation on click if there is
							one available.</p><br/>
							<button className={`words-modal`} onClick={handleShowWordsModal}>OPEN</button>
						</Column>
					</InnerContainer>
				}
			</Style>
		)
	}
}