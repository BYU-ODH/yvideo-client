import React, { Component } from 'react'

import SwitchToggle from 'components/toggle/SwitchToggle'
import Tag from 'components/bits/Tag'

import { Wrapper, InnerContainer, Column, Setting, RatioList, RadioButton } from './styles'

class ContentSettings extends Component {

	log = true

	state = {
		tag: ``
	}

	changeTag = e => {
		this.setState({
			tag: e.target.value
		})
	}

	render() {

		if (this.log) console.error(`ContentSettings: render`)

		const { handlers, content, editing } = this.props
		const { handleToggle, handleDescription, handleRatio, addTag, removeTag } = handlers

		const {
			allowDefinitions,
			showCaptions,
			showAnnotations,
			aspectRatio,
			showWordList
		} = content.settings

		if (content.resource === undefined) return null

		let { keywords } = content.resource

		if (typeof keywords === `string`) keywords = keywords.split(`,`)

		return <Wrapper active={editing}>
			<InnerContainer>
				<Column>
					<h4>General</h4>
					<Setting>
						<p>Allow automatic definitions</p>
						<SwitchToggle on={allowDefinitions} setToggle={handleToggle} data_key='allowDefinitions' />
					</Setting>
					<Setting>
						<p>Show Word List</p>
						<SwitchToggle on={showWordList} setToggle={handleToggle} data_key='showWordList' />
					</Setting>
				</Column>

				<Column>
					<h4>Tags</h4>
					<div className='tags'>
						{keywords.map((item, index) => item === `` ? null : <Tag key={index} onClick={removeTag}>{item}</Tag>)}
					</div>
					<form onSubmit={e => {
						e.preventDefault()
						addTag(this.state.tag.split(/[ ,]+/))
						this.setState({ tag: `` })
					}}>
						<input type='text' placeholder='Add tags...' onChange={this.changeTag} value={this.state.tag} className='tag-input' />
					</form>
				</Column>

				<Column>
					<h4>Description</h4>
					<textarea rows={4} onChange={handleDescription} value={content.description} />
				</Column>

				<Column>
					<h4>
						Notes
					<SwitchToggle on={showAnnotations} setToggle={handleToggle} data_key='showAnnotations' />
					</h4>
				</Column>

				<Column>
					<h4>
						Captions
					<SwitchToggle on={showCaptions} setToggle={handleToggle} data_key='showCaptions' />
					</h4>
				</Column>

				<Column>
					<h4>Aspect Ratio</h4>
					<RatioList>
						<div>
							<AspectRadio id={0} ratio='1.33' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.33`}>Standard</AspectRadio>
							<AspectRadio id={1} ratio='2.39' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `2.39`}>Widescreen</AspectRadio>
							<AspectRadio id={2} ratio='1.66' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.66`}>European Widescreen</AspectRadio>
							<AspectRadio id={3} ratio='1.85' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.85`}>US Widescreen</AspectRadio>
						</div>
						<div>
							<AspectRadio id={4} ratio='1.4142' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.4142`}>Lichtenberg</AspectRadio>
							<AspectRadio id={5} ratio='1.5' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.5`}>Classic Film</AspectRadio>
							<AspectRadio id={6} ratio='1.6' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.6`}>Credit Card</AspectRadio>
							<AspectRadio id={7} ratio='1.77' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.77`}>HD Video</AspectRadio>
							<AspectRadio id={8} ratio='1.618' onChange={handleRatio} contentId={content.id} selected={aspectRatio === `1.618`}>Golden</AspectRadio>
						</div>
					</RatioList>
				</Column>
			</InnerContainer>
		</Wrapper>
	}

}

export default ContentSettings

const AspectRadio = props => {
	const { id, selected, ratio, children, onChange, contentId } = props
	const HTMLID = `c${contentId}b${id}`
	return <label htmlFor={HTMLID}>
		<input id={HTMLID} name={`ratio${props.contentId}`} type='radio' value={ratio} onChange={onChange} hidden />
		<RadioButton checked={selected} />
		{children}
	</label>
}
