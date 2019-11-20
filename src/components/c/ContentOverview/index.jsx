import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import { resourceService, contentService } from 'services'

import {
	ContentSettingsContainer,
} from 'containers'

import { LazyImage } from 'components/bits'

import Style, {
	Preview,
	TitleEdit,
	Icon,
	PublishButton,
	EditButton,
} from './styles'

class ContentOverview extends PureComponent {
	render() {

		const {
			editing,
			content,
		} = this.props.viewstate

		const {
			handleNameChange,
			handleToggleEdit,
			handleTogglePublish,
		} = this.props.handlers

		const {
			allowDefinitions,
			showCaptions,
			showAnnotations,
		} = content.settings

		return (
			<Style>
				<Preview>
					<div>
						<LazyImage src={content.thumbnail} height='6.1rem' width='10rem' />
					</div>
					<div>
						{editing ?
							<TitleEdit type='text' value={content.name} onChange={handleNameChange} />
							:
							<h4>{content.name}</h4>}
						<ul>
							<Icon className='translation' checked={allowDefinitions} />
							<Icon className='captions' checked={showCaptions} />
							<Icon className='annotations' checked={showAnnotations} />
						</ul>
						{editing ?
							<PublishButton published={content.published} onClick={handleTogglePublish}>{content.published ? `Unpublish` : `Publish`}</PublishButton>
							:
							<em>{content.published ? `Published` : `Unpublished`}</em>
						}
					</div>
					<div>
						<EditButton onClick={handleToggleEdit}>{editing ? `Save` : `Edit`}</EditButton>
					</div>
				</Preview>
				{editing &&
					<ContentSettingsContainer handlers={this.handlers} content={content} editing={editing} />
				}
			</Style>
		)
	}
}

const mapStateToProps = state => ({
	resourceCache: state.resourceCache,
})

const mapDispatchToProps = {
	getResources: resourceService.getResources,
	updateContent: contentService.updateContent,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentOverview)
