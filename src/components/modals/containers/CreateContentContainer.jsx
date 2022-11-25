import React, { useState, useEffect, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import {
	contentService,
	collectionService,
	interfaceService,
	adminService,
	resourceService,
	languageService,
} from 'services'

import CreateContent from 'components/modals/components/CreateContent'
import Swal from 'sweetalert2'

const CreateContentContainer = props => {

	const {
		adminContent,
		adminCreateContent,
		adminGetCollectionContent,
		adminGetUserById,
		createContent,
		addAccess,
		modal,
		toggleModal,
		getCollections,
		resourceContent,
		searchResource,
		getAccess,
		user,
		getLanguages,
		allLanguages,
		getFiles,
		collection,
	} = props

	const [tab, setTab] = useState(`url`)
	const [hideResources, setHide] = useState(true)
	const [searchQuery, setSearchQuery] = useState(``)
	const [selectedResourceId, setSelectedResourceId] = useState(``)
	const [selectedResourceName, setSelectedResourceName] = useState(``)
	const [isResourceSelected, setIsResourceSelected] = useState(false)
	const [languages, setLanguages] = useState([])
	const [isTyping, setIsTyping] = useState(false)
	const [isCalled, setIsCalled] = useState(false)
	const [blockLeave, setBlock] = useState(false)
	const [isAccess, setIsAccess] = useState(true)
	const [resourceFiles, setResourceFiles] = useState()
	const [decision, setDecision] = useState(false)
	const [isValidatingAddPermissions, setIsValidatingAddPermissions] = useState(false)
	const [ownerUname, setOwnerUname] = useState(``)
	const [data, setData] = useState({
		url: ``,
		resourceId: ``,
		contentType: `video`,
		title: ``,
		description: ``,
		resource: {
			keywords: [],
		},
		thumbnail: ``,
		targetLanguage: ``,
		fileId: `00000000-0000-0000-0000-000000000000`,
	})

	useEffect(() => {
		if(resourceContent[selectedResourceId] && isResourceSelected){

			const langs = resourceContent[selectedResourceId].allFileVersions ?
				resourceContent[selectedResourceId].allFileVersions.split(`;`)
				: []

			const finalLanguages = []
			langs.forEach((element, i) => {
				if(element === ``)
					delete langs[i]
				else {
					const newLetter = element[0].toUpperCase()
					element = newLetter + element.slice(1)
					finalLanguages.push(element)
				}
			})
			setLanguages(finalLanguages)
		}

		if(blockLeave)
			window.onbeforeunload = () => true

		else
			window.onbeforeunload = undefined

		return () => {
			window.onbeforeunload = undefined
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resourceContent, selectedResourceId, searchQuery, blockLeave, isResourceSelected])
	// missing isTyping
	useEffect(()=>{
		if(isTyping){
			setTimeout(() => {
				setIsTyping(false)
				setIsCalled(false)
			}, 1000)
		} else{
			if (searchQuery.length > 0 && searchQuery.match(/^[0-9a-zA-Z]+$/) && !isTyping) {
				if(!isCalled){
					searchResource(searchQuery)
					setHide(false)
					setIsCalled(true)
				}
			}else
				setHide(true)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTyping])

	useLayoutEffect(() => {
		getLanguages()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const changeTab = e => {
		setTab(e.target.name)
	}

	const decideTab = e =>{
		setDecision(true)
		setTab(e.target.name)
	}

	const onKeyPress = e => {
		if (e.which === 13) {
			e.preventDefault()
			addKeyword(e.target)
		}
	}

	const handleTextChange = e => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		})
		if(e.target.name === `fileId`){
			setData({
				...data,
				targetLanguage: resourceFiles.filter(file => file.id === e.target.value)[0][`file-version`],
			})
		}
		setBlock(true)
	}

	const handleSearchTextChange = e => {
		const { value } = e.target
		setSearchQuery(value)

		if(isResourceSelected && value === ``)
			setIsResourceSelected(false)

		if(!isTyping)
			setIsTyping(true)
	}

	const handleSelectResourceChange = async (e, resource) => {
		let theAccess = true
		if(user.id === collection.owner){
			const access = await getAccess(resource.id)

			if(access.length !== 0) {
				for (let i = 0; i < access.length; i++) {
					if(user.username === access[i].username) {
						setIsAccess(true)
						theAccess = true
						break
					}
					if(i === access.length -1) {
						setIsAccess(false)
						theAccess = false

					}
				}
			} else
				theAccess = false
		}
		setData({
			...data,
			title: resource.resourceName,
		})
		if(theAccess || user.roles === 0 || user.roles === 1) {
			setSelectedResourceName(resource.resourceName)
			setSelectedResourceId(resource.id)
			setIsResourceSelected(true)

			// get files that attached to the resource
			const files = await getFiles(resource.id)
			setResourceFiles(files)
		} else {
			setSelectedResourceName(``)
			setSelectedResourceId(``)
			setIsResourceSelected(false)
		}
		setSearchQuery(``)
		setHide(true)

	}

	const handleTypeChange = e => {
		const contentType = e.target.dataset.type
		setData({
			...data,
			contentType,
		})
		setBlock(true)
	}

	const addKeyword = element => {
		if (element.id !== `keyword-datalist-input` || element.value === ``) return

		setData({
			...data,
			resource: {
				keywords: [...data.resource.keywords, element.value],
			},
		})

		document.getElementById(`create-content-form`).reset()
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let tags = ``
		if(data.resource.keywords.length !== 0){
			data.resource.keywords.forEach((element, i) => {
				if(i !== data.resource.keywords.length -1)
					tags += `${element}; `
				else
					tags += `${element}`
			})
		}
		try {
			const videoId = new URL(data.url).search.split(`=`)[1]

			if(data.targetLanguage === ``){
				Swal.fire(`Adding Language`,`Please, select a valid language`,`warning`)
				return
			}
			const SUPPORTED_LANGUAGES = [ // eslint-disable-line no-unused-vars
				`German`,
				`Spanish`,
				`Russian`,
			]
			const backEndData = {
				"allow-definitions": false,
				"url": data.url,
				"allow-captions": true,
				"content-type": data.contentType,
				"resource-id": `00000000-0000-0000-0000-000000000000`,
				tags,
				"thumbnail": `https://i.ytimg.com/vi/${videoId}/default.jpg`,
				"file-version": data.targetLanguage,
				"file-id": `00000000-0000-0000-0000-000000000000`,
				"collection-id": modal.collectionId,
				"published": true,
				"views": 0,
				"annotations": ``,
				"title": data.title,
				"allow-notes": true,
				"description": data.description,
				"words": ``,
				"clips": ``,
			}

			if(modal.isLabAssistantRoute) {
				await adminCreateContent(backEndData)
				adminGetCollectionContent(modal.collectionId, true)
			} else {
				await createContent(backEndData)
				getCollections(true)
			}
			toggleModal()
			setBlock(false)
		} catch(err) {
			Swal.fire(`Invalid URL`,`Please use a valid URL`,`error`)
			return
		}

	}
	const adminResourceCheckPermissions = async(e) =>{
		e.preventDefault()
		if(user.roles < 2){
			try{
				const owner = await adminGetUserById(collection.owner)
				const uname = owner.username
				setOwnerUname(uname)
				const access = await getAccess(selectedResourceId)
				let theAccess = false
				if(access.length !== 0) {
					for (let i = 0; i < access.length; i++) {
						if(uname === access[i].username) {
							theAccess = true
							break
						}
						if(i === access.length -1)
							theAccess = false

					}
				} else
					theAccess = false
				if (!theAccess)
					setIsValidatingAddPermissions(true)
				else
					handleAddResourceSubmit1()

			}catch(e){
				alert(`Report following error to Yvideo team: `, e)
			}
		}
	}
	const cancelAdminPermissions = () => {
		setIsValidatingAddPermissions(false)
	}
	const confirmAdminPermissions = async() =>{
		if (ownerUname){
			await addAccess(selectedResourceId, ownerUname)
			handleAddResourceSubmit1()
		}
		setIsValidatingAddPermissions(false)
	}
	const handleAddResourceSubmit = (e) =>{
		e.preventDefault()
		handleAddResourceSubmit1()
	}
	const handleAddResourceSubmit1 = async () => {
		if(data.targetLanguage === ``){
			Swal.fire(`Valid Language`,`Please, select a valid language`,`warning`)
			return
		}

		// FIND IF THE COLLECTION IS PUBLIC
		// IF COLLECTION IS PUBLIC COPYRITED RESOURCES CANNOT BE ADDED TO IT
		if(modal?.props?.isPublic && resourceContent[selectedResourceId].copyrighted){
			Swal.fire(`Adding Resources`,`The resource you are trying to add is copyrighted and cannot be added to a public collection`,`warning`)
			return
		}

		// CONTENT FROM RESOURCE WILL HAVE AN EMPTY STRING IN THE URL
		// EVERY VIDEO HAS A FILE PATH BUT WE NEED TO GET A FILE KEY IN ORDER TO BE ABLE TO STREAM A VIDEO
		// THE FILE KEY WILL ACT AS PART OF THE URL WHERE WE WILL GET THE VIDEO URL: /api/media/stream-media/{file-key}
		const SUPPORTED_LANGUAGES = [ // eslint-disable-line no-unused-vars
			`German`,
			`Spanish`,
			`Russian`,
		]
		const backEndData = {
			"allow-definitions": false,
			"url": ``,
			"allow-captions": true,
			"content-type": data.contentType,
			"resource-id": selectedResourceId,
			"tags": ``,
			"clips": ``,
			"words": ``,
			"thumbnail": `empty`,
			"file-version": data.targetLanguage,
			"file-id": data.fileId,
			"collection-id": modal.collectionId,
			"published": true,
			"views": 0,
			"annotations": ``,
			"title": data.title,
			"allow-notes": true,
			"description": data.description,
		}
		// if(user.roles === 0){
		// 	try{
		// 		const owner = await adminGetUserById(collection.owner)
		// 		const uname = owner.username
		// 		const access = await getAccess(selectedResourceId)
		// 		let theAccess = false
		// 		if(access.length !== 0) {
		// 			for (let i = 0; i < access.length; i++) {
		// 				if(uname === access[i].username) {
		// 					theAccess = true
		// 					break
		// 				}
		// 				if(i === access.length -1)
		// 					theAccess = false

		// 			}
		// 		} else
		// 			theAccess = false
		// 		if (!theAccess)
		// 			addAccess(selectedResourceId,uname)

		// 	}catch(e){
		// 		alert(`Report following error to Yvideo team: `,e)
		// 	}
		// }
		if(modal.isLabAssistantRoute){
			await adminCreateContent(backEndData)
			adminGetCollectionContent(modal.collectionId, true)
		} else{
			await createContent(backEndData)
			getCollections(true)
		}
		toggleModal()
	}

	const remove = e => {
		const badkeyword = e.target.dataset.keyword
		setData({
			...data,
			resource: {
				keywords: data.resource.keywords.filter(keyword => keyword !== badkeyword),
			},
		})
		setBlock(true)
	}

	const removeResource = () => {
		setSelectedResourceName(``)
		setIsResourceSelected(false)
	}

	const viewstate = {
		adminContent,
		data,
		searchQuery,
		tab,
		resourceContent,
		hideResources,
		selectedResourceId,
		selectedResourceName,
		languages,
		isResourceSelected,
		isAccess,
		allLanguages,
		resourceFiles,
		decision,
		isValidatingAddPermissions,
		isAdmin: user.roles === 0,
	}

	const handlers = {
		changeTab,
		handleAddResourceSubmit,
		handleSearchTextChange,
		handleSelectResourceChange,
		handleSubmit,
		handleTextChange,
		handleTypeChange,
		onKeyPress,
		remove,
		removeResource,
		toggleModal,
		decideTab,
		cancelAdminPermissions,
		confirmAdminPermissions,
		adminResourceCheckPermissions,
	}

	return <CreateContent viewstate={viewstate} handlers={handlers} />
}

const mapStateToProps = store => ({
	admin: store.authStore.user.roles === 0,
	user: store.authStore.user,
	adminContent: store.adminStore.data,
	resourceContent: store.resourceStore.cache,
	modal: store.interfaceStore.modal,
	collections: store.collectionStore.cache,
	allLanguages: store.languageStore.cache.langs,
})

const mapDispatchToProps = {
	adminCreateContent: adminService.createContent,
	adminGetCollectionContent: adminService.getCollectionContent,
	adminCreateContentFromResource: adminService.createContentFromResource,
	adminGetUserById: adminService.getUserById,
	createContent: contentService.createContent,
	toggleModal: interfaceService.toggleModal,
	search: adminService.search,
	searchResource: resourceService.search,
	getCollections: collectionService.getCollections,
	getAccess: resourceService.readAccess,
	getFiles: resourceService.getFiles,
	getLanguages: languageService.get,
	addAccess: resourceService.addAccess,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContentContainer)
