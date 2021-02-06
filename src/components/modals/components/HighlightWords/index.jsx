import React, { PureComponent } from 'react'

import {
	Form,
	Button,
} from './styles'

export default class HighlightWords extends PureComponent {

	render() {

		// const {
		// 	toggleModal,
		// 	addWord,
		// 	removeWord,
		// 	changeWord,
		// 	changeCheckWord,
		// 	checkTranslation,
		// 	handleCheckWord,
		// 	changeLanguage,
		// 	handleShowTranslation,
		// } = this.props.handlers

		// const {
		// 	// files,checkWord,
		// 	word,
		// 	checkResponse,
		// 	language,
		// 	translationMeanings,
		// 	translationWords,
		// } = this.props.viewstate

		return (
			<>
				<h4>Highlight Words</h4>
				{/* <div style={{display:'flex'}}>
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
				</div> */}
			</>
		)
	}
}
