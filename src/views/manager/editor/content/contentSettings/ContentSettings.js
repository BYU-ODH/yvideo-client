import React, { Component } from 'react'

import SwitchToggle from 'components/toggles/SwitchToggle'

import { Wrapper, InnerContainer, Column, Setting, RatioList, RadioButton } from './styles'

const ContentSettings = ({ handlers, content, editing }) => {
	const { handleToggle, handleDescription, handleRatio } = handlers
	const {
		allowDefinitions,
		showCaptions,
		showAnnotations,
		aspectRatio
	} = content.settings

	return <Wrapper active={editing}>
		<InnerContainer>
			<Column>
				<h4>General</h4>
				<Setting>
					<p>Allow automatic definitions</p>
					<SwitchToggle on={allowDefinitions} setToggle={handleToggle} data_key='allowDefinitions' />
				</Setting>
			</Column>

			<Column>
				<h4>Tags</h4>
			</Column>

			<Column>
				<h4>Description</h4>
				<textarea rows={4} onChange={handleDescription} value={content.description} />
			</Column>

			<Column>
				<h4>
					Transcripts
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
