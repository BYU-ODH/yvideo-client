import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Breadcrumb from '../../components/bits/Breadcrumb'

const BreadcrumbContainer = props => {

	const {
		breadcrumbs,
	} = props

	const [crumbs, setCrumbs] = useState(
		{	path: [],
			collectionId: ``,
			contentId: ``},
	)

	useEffect(() => {
		setCrumbs(breadcrumbs)
	}, [breadcrumbs])

	const viewstate = {
		crumbs,
	}

	const handler = {
		isLast(index) {
			return index === crumbs.path.length - 1
		},

		toLink(name) {
			let link = ``

			switch(name) {
			case `Home`:
				link = ``
				break
			case `Manage Collections`:
				link = `manager`
				break
			case `Lab Assistant Manager`:
				link = `lab-assistant-manager`
				break
			case `Admin Dashboard`:
				link = `admin`
				break
			case `Lab assistant Dashboard`:
				link = `lab-assistant-manager`
				break
			case `Manage Resource`:
				link = `manage-resource`
				break
			case `Manage Public Collections`:
				link = `public-manager`
				break
			case `Player`:
				link = `player`
				break
			case `Video Editor`:
				link = `videoEditor`
				break
			case `Subtitle Editor`:
				link = `subtileeditor`
				break
			case `Clip Manager`:
				link = `clipEditor`
				break
			case `Feedback`:
				link = `feedback`
				break
			default:
				link = ``
			}

			return link
		},
		isManager(name) {
			if(name === `Manage Collections` || name === `Lab Assistant Manager` || name === `Manage Public Collections`)
				return true
			 else return false
		},
		isPlayer(name) {
			if(name === `Player` || name === `Video Editor` || name === `Clip Manager`)
				return true
			 else return false
		},
	}

	return <Breadcrumb viewstate={viewstate} handler={handler} />
}

const mapStateToProps = store => ({
	breadcrumbs: store.interfaceStore.breadcrumbs,
})

export default connect(mapStateToProps)(BreadcrumbContainer)

