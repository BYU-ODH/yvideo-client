import React, { PureComponent } from 'react'

import parse from 'html-react-parser'

import Style, {

} from './styles'

import closeIcon from 'assets/x.svg'

export default class Translation extends PureComponent {

	render() {

		const {
			toggleModal,
		} = this.props.handlers

		const {
			words,
			meanings,
		} = this.props.viewstate

		return (
			<Style>
				<button id="close" type="button" onClick={toggleModal}><img src={closeIcon}/></button>
				<h3>Translations:</h3>
				<br/>
				<p>{parse(words)}</p>
				<br/>
				<h3>Meanings:</h3>
				<br/>
				<p>{parse(meanings)}</p>
			</Style>
		)
	}
}
