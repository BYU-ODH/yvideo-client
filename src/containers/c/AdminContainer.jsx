import React from 'react'
import { connect } from 'react-redux'

import { Admin } from 'components'

import { collectionService } from 'services'

const AdminContainer = () => {

	const viewstate = {
		category,
		data,
		headers,
		placeholder,
	}

	const handlers = {
		search,
		updateCategory,
		updateSearchBar,
	}

	return <Admin viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	category: store.collectionStore.cache, // I'm not sure that this is where category comes from
})

const mapDispatchToProps = {
	search: collectionService.getCollections, // This isn't correct, but it gives the idea of how to use it
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
