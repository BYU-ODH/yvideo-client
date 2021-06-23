import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Breadcrumb from '../../components/bits/Breadcrumb'

const BreadcrumbContainer = props => {

	const {
		breadcrumb,
	} = props

	const [crumbs, setCrumbs] = useState([`Home`])

	useEffect(() => {
		setCrumbs(breadcrumb)
	}, [breadcrumb])

	return <Breadcrumb crumbs={ crumbs } />
}

const mapStateToProps = store => ({
	breadcrumb: store.interfaceStore.breadcrumb,
})

export default connect(mapStateToProps)(BreadcrumbContainer)

