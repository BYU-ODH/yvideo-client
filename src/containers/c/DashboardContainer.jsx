import React, { Component } from 'react'

import { connect } from 'react-redux'

import { Dashboard } from 'components'

class DashboardContainer extends Component {

	render() {
		// const { recent = [], collectionsCache } = this.props
		// const { collections = {} } = collectionsCache

		// const modRec = recent.slice(0, 4)
		// const unarchived = Object.keys(collections).filter(id => !collections[id].archived)
		// const modColl = Object.keys(unarchived).slice(0, 4) || []

		const viewstate = {
			recentVideos: [],
			collections: [],
			// recentVideos: modRec,
			// collections: modColl,
		}

		return <Dashboard viewstate={viewstate} />
	}

	componentDidMount = async () => {
		const {
			// getCollections,
			// getRecent,
			loading,
			stopLoading,
		} = this.props

		try {
			// await getCollections()
			// console.log(`await getCollections()`)
		} catch (error) {
			console.warn(error)
		}

		try {
			// await getRecent()
			// console.log(`await getRecent()`)
		} catch (error) {
			console.warn(error)
		}

		if (loading) stopLoading()
	}

	componentWillUnmount = () => {
		const {
			loading,
			startLoading,
		} = this.props

		if (!loading) startLoading()
	}

}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
