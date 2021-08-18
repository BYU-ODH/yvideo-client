import React, { PureComponent } from 'react'

import { SwitchToggle, Tag, LazyImage } from 'components/bits'
import { Prompt } from 'react-router'

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
} from './styles'

export default class ContentOverview extends PureComponent {
	render() {

		if(this.props.isExpired){
			return (
				<Style>
					<div className='expired'>
						<h3 className={`content-title`}>{this.props.content[`content-title`]} <span>Expired</span></h3><br/>
						<p>Please, contact a lab assistant to learn how to recover this content</p>
					</div>
				</Style>
			)
		}

		const {
			editing,
			content,
			tag,
			blockLeave,
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
			handleShowWordsModal,
			handleShowHelp,
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

		return (
			<Style>
				<Preview>
					<div>
						<LazyImage src={content.thumbnail !== `empty` ? content.thumbnail : defaultThumbnail} height='8rem' width='14rem' heightSm='4.5rem' widthSm='6.5rem' />
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
						<>
							<StyledLink to={`/videoeditor/${content.id}`}>Video Editor</StyledLink>
							<StyledLink to={`/subtileeditor/${content.id}`}>Subtitle Editor</StyledLink>
							<StyledLink to={`/clipeditor/${content.id}`}>Clip Manager</StyledLink>
						</>
						}
						{editing ?
							<div>
								<PublishButton className='publish-button' published={content.published} onClick={handleTogglePublish}>{content.published ? `Unpublish` : `Publish`}</PublishButton>
								<RemoveButton className='remove-button' onClick={handleRemoveContent}>Delete</RemoveButton>
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
							<div className='target-language'>
								<h4>
								Target Language:
								</h4>
								{content.settings.targetLanguages}
							</div>
							<h4>
								Allow automatic definitions
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
								{keywords ? keywords.map((item, index) => item === `` ? null : <Tag key={index} onClick={removeTag}>{item}</Tag>) : <></>}
							</div>
						</Column>
						<Column>
							<h4>Description</h4>
							<textarea rows={4} onChange={handleDescription} value={description} />
						</Column>
						<Column>
							<h4>Important Words
								<img src={helpIcon} onClick={handleShowHelp} width='20' height='20'/>
							</h4>
							<p>Add a list of important words to be highlighted in the transcript. The highlighted
							words will have quick translation on click if there is
							one available.</p><br/>
							<button className={`words-modal`} onClick={handleShowWordsModal}>OPEN</button>
						</Column>
					</InnerContainer>
				}
				<Prompt
					when={blockLeave}
					message='Have you saved your changes already?'
				/>
			</Style>
		)
	}
}