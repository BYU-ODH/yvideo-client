import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import {
	ListCollection,
	BlockCollection,
} from 'components/bits'

import Style, { ViewToggle } from './styles'

export default class Player extends PureComponent {

	render() {

		const {
			isProf,
			isAdmin,
			displayBlocks,
			collections,
		} = this.props.viewstate

		const {
			toggleCollectionsDisplay,
		} = this.props.handlers

		// console.error(`Player: render`)

		// const modRec = recent.slice(0, 4)
		// const modColl = collections.slice(0, 4)

		return (
			<Style id='contentHolder' />
		)

	}
}