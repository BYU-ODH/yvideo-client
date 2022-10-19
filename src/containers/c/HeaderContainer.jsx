import React from 'react'
import { connect } from 'react-redux'

import { Header } from 'components'

const HeaderContainer = props => {

	const {
		lost,
		border,
		editorStyle,
	} = props

	const viewstate = {
		lost,
		border,
		editorStyle,
	}

	return <Header viewstate={viewstate} />
}

const mapStateToProps = store => ({
	lost: store.interfaceStore.lost,
	border: store.interfaceStore.headerBorder,
	editorStyle: store.interfaceStore.editorStyle,
})

export default connect(mapStateToProps)(HeaderContainer)
