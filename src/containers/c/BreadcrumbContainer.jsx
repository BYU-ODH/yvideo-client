import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Breadcrumb from '../../components/bits/Breadcrumb'

const BreadcrumbContainer = props => {

	const {
		breadcrumb,
		collectionId,
	} = props

	const [crumbs, setCrumbs] = useState([`Home`])
	const [id, serId] = useState(``)

	useEffect(() => {
		setCrumbs(breadcrumb)
		serId(collectionId)
	}, [breadcrumb])

	const viewstate = {
		crumbs,
		id,
	}

	const handler = {
		isLast(index) {
			return index === crumbs.length - 1
		},

		toLink(name) {
			let link = ``

			switch(name) {
			case `Home`:
				link = `/`
				break
			case `Manage Collections`:
				link = `/manager`
				break
			case `Lab Assistant Manager`:
				link = `/lab-assistant-manager`
				break
			case `Admin Dashboard`:
				link = `/admin`
				break
			case `Lab assistant Dashboard`:
				link = `/lab-assistant-manager`
				break
			case `Manage Resource`:
				link = `/public-manager`
				break
			case `Manage Public Collections`:
				link = `/manage-resource`
				break
			case `Player`:
				link = `/player`
				break
			case `Feedback`:
				link = `/feedback`
				break
			default:
				link = `/`
			}

			return link
		},
	}

	return <Breadcrumb viewstate={viewstate} handler={handler} />
}

const mapStateToProps = store => ({
	breadcrumb: store.interfaceStore.breadcrumb,
	collectionId: store.interfaceStore.id,
})

export default connect(mapStateToProps)(BreadcrumbContainer)

