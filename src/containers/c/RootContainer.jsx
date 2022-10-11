/* eslint-disable no-prototype-builtins */

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { authService } from 'services'

import { Root } from 'components'

import {
	AdminContainer,
	CollectionsContainer,
	FeedbackContainer,
	LabAssistantContainer,
	LabAssistantManagerContainer,
	LandingContainer,
	ManagerContainer,
	PlayerContainer,
	ManageResourceContainer,
	SearchPublicCollectionsContainer,
	PublicManagerContainer,
	VideoEditorContainer,
	SubtitleEditorContainer,
	ClipEditorContainer,
} from 'containers'

const RootContainer = props => {

	const adminEndpoints = [ // 0
		{ endpoints: [`/admin`], element: <AdminContainer /> },
		{ endpoints: [`/public-manager`, `:id`], element: <PublicManagerContainer /> },
	]
	const labAssistantEndpoints = [ // 1
		{ endpoints: [`/lab-assistant`], element: <LabAssistantContainer /> },
		{ endpoints: [`/manage-resource`], element: <ManageResourceContainer /> },
		{ endpoints: [`/lab-assistant-manager`, `:professorId`, `:collectionId`], element: <LabAssistantManagerContainer /> },
	]
	const instructorEndpoints = [ // 2
		{ endpoints: [`/manager`, `:id`], element: <ManagerContainer /> },
		{ endpoints: [`/videoeditor`, `:id`], element: <VideoEditorContainer /> },
		{ endpoints: [`/subtitleeditor`, `:id`], element: <SubtitleEditorContainer /> },
		{ endpoints: [`/clipeditor`, `:id`], element: <ClipEditorContainer /> },
	]
	const studentEndpoints = [ // 3
		{ endpoints: [`/`], element: <CollectionsContainer /> },
		{ endpoints: [`/search-public-collections`], element: <SearchPublicCollectionsContainer /> },
		{ endpoints: [`/player`, `:id`, `:clip`], element: <PlayerContainer /> },
		{ endpoints: [`/feedback`], element: <FeedbackContainer /> },
	]
	const studentTAEndpoints = [ // extras
		{ endpoints: [`/videoeditor`, `:id`], element: <VideoEditorContainer /> },
		{ endpoints: [`/subtitleeditor`, `:id`], element: <SubtitleEditorContainer /> },
		{ endpoints: [`/clipeditor`, `:id`], element: <ClipEditorContainer /> },
		{ endpoints: [`/manager`, `:id`], element: <ManagerContainer /> },
	]

	const unauthEndpoints = [ // no user
		{ endpoints: [`/`], element: <LandingContainer /> },
		{ endpoints: [`/search-public-collections`], element: <SearchPublicCollectionsContainer /> },
	]

	const {
		user,
		loading,
		tried,
		modal,
		tip,
		checkAuth,
		hasCollectionPermissions,
		checkHasCollectionPermissions,
	} = props

	useEffect(() => {
		if(user?.username)
			checkHasCollectionPermissions(user.username)
		if (!user && !tried)
			checkAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkAuth, tried, user])

	const viewstate = {
		user,
		loading,
		modal,
		tip,
		adminEndpoints,
		labAssistantEndpoints,
		instructorEndpoints,
		studentEndpoints,
		studentTAEndpoints,
		unauthEndpoints,
		hasCollectionPermissions,
	}

	return <Root viewstate={viewstate} />
}

const mapStoreToProps = ({ authStore, interfaceStore, collectionStore, contentStore, resourceStore }) => ({
	user: authStore.user,
	hasCollectionPermissions: authStore.permissions,
	loading: authStore.loading,
	tried: authStore.tried,
	modal: interfaceStore.modal,
	tip: interfaceStore.tip,
})

const mapDispatchToProps = {
	checkAuth: authService.checkAuth,
	checkHasCollectionPermissions: authService.checkHasCollectionPermissions,
}

export default connect(mapStoreToProps, mapDispatchToProps)(RootContainer)
