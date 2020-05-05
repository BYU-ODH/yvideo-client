import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header } from 'components'

export class HeaderContainer extends Component {
	render() {

		const {
			lost,
			border,
			editorStyle,
		} = this.props

		const viewstate = {
			lost,
			border,
			editorStyle,
		}

		return <Header viewstate={viewstate} />
	}
}

const mapStateToProps = store => ({
	lost: store.interfaceStore.lost,
	border: store.interfaceStore.headerBorder,
	editorStyle: store.interfaceStore.editorStyle,
})

export default connect(mapStateToProps)(HeaderContainer)
