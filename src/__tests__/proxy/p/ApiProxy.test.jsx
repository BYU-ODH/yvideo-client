import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import * as testutil from '../../testutil/testutil'
import ApiProxy from '../../../proxy/p/ApiProxy'
import proxies from 'proxy'
import axios from 'axios'
import Content from 'models/Content'
import uuid from 'react-uuid'

const collection4 = testutil.collection4

const user = testutil.user

jest.mock(`axios`)

describe(`ApiProxy test`, () => {

	// reset mock axios after each test
	beforeEach(() => {
		// jest.clearAllMocks()
		jest.resetAllMocks()
	})

	// admin
	it(`admin search get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `search result success`,
		}

		window.clj_session_id = `sessionId`

		const expected = `search result success`

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.admin.search.get(`testSearchCategory`, `testSearchQuery`)).resolves.toEqual(expected)
		expect(axios).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/admin/testSearchCategory/testSearchQuery`,
			{"headers": {"session-id": `sessionId`},
				"withCredentials": true,
			})
	})

	it(`admin collection get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: [{"collection-name" : `test collection name`}],
		}

		const expected = {"data": [{"name": `test collection name`}], "headers": {"session-id": `id`}}

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.admin.collection.get(`collectionId`)).resolves.toEqual(expected)
		expect(axios).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/user/collectionId/collections`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`admin collection create`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collection created`,
		}

		const expected = `collection created`

		axios.post.mockResolvedValue(res)
		await expect(proxies.apiProxy.admin.collection.create(`collectionName`, `collectionOwner`)).resolves.toEqual(expected)
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/collection/create`,
			`{"name":"collectionName","ownerId":"collectionOwner"}`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`admin collection delete`, async () => {
		proxies.apiProxy.admin.collection.delete(`collectionDeleteId`)
		expect(axios.delete).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/collectionDeleteId`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`admin collection content get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: collection4.content,
		}

		axios.mockResolvedValue(res)

		const expected = res.data.reduce((map, item) => {
			map[item.id] = new Content(item)
			return map
		}, {})

		await expect(proxies.apiProxy.admin.collection.content.get(`collectionContentId`)).resolves.toEqual(expected)
		expect(axios).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/collectionContentId/contents`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`admin collection content createFromResource`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `createFromResource`,
		}

		axios.post.mockResolvedValue(res)

		proxies.apiProxy.admin.collection.content.createFromResource(`collectionId`, `resoureId`)
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/content/create/resource?collectionId=collectionId`,
			`{"resourceId":"resoureId"}`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`admin user delete`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `adminUserDelete`,
		}

		axios.delete.mockResolvedValue(res)

		proxies.apiProxy.admin.user.delete(`deleteUserId`)
		expect(axios.delete).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/user/deleteUserId`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`admin user get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `admingUserGet`,
		}

		axios.get.mockResolvedValue(res)

		proxies.apiProxy.admin.user.get(`userId`)
		expect(axios.get).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/user/userId`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`admin content delete`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `deleteContent`,
		}

		axios.delete.mockResolvedValue(res)

		proxies.apiProxy.admin.content.delete(`deleteContentId`)
		expect(axios.delete).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/content/deleteContentId`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	// auth
	it(`auth cas`, async () => {})

	it(`auth logout`, async () => {})

	// collection
	it(`collection create`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionCreate`,
		}

		axios.post.mockResolvedValue(res)

		proxies.apiProxy.collection.create({"collectionId": `collection`})
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection`,
			{"collectionId": `collection`},
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`collection post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionPost`,
		}

		axios.patch.mockResolvedValue(res)

		proxies.apiProxy.collection.post(`collectionId`, `name`)
		expect(axios.patch).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/collectionId`,
			{"collection-name": `name`},
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`collection edit`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionEdit`,
		}

		axios.patch.mockResolvedValue(res)

		proxies.apiProxy.collection.edit(`collectionId`, `state`)
		expect(axios.patch).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/collectionId`,
			`state`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`collection remove`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionRemove`,
		}

		axios.delete.mockResolvedValue(res)

		proxies.apiProxy.collection.remove(`collectionId`)
		expect(axios.delete).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/content/collectionId`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`collection permissions getUsers`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionPermissionsGetUsers`,
		}

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.collection.permissions.getUsers(`userId`)).resolves.toEqual(`collectionPermissionsGetUsers`)
		expect(axios).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/userId/users`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`collection permissions getCourses`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionPermissionsGetCourses`,
		}

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.collection.permissions.getCourses(`courseId`)).resolves.toEqual(`collectionPermissionsGetCourses`)
		expect(axios).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/courseId/courses`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`collection permissions post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionPermissionsPost`,
		}

		axios.post.mockResolvedValue(res)
		await expect(proxies.apiProxy.collection.permissions.post(`id`, `endpoint`, {body: `body`})).resolves.toEqual({"data": `collectionPermissionsPost`, "headers": {"session-id": `id`}})
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/id/endpoint`,
			{"body": `body`},
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`collection permissions postMany`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `collectionPermissionsPostMany`,
		}

		axios.post.mockResolvedValue(res)
		await expect(proxies.apiProxy.collection.permissions.postMany(`id`, {body: `body`})).resolves.toEqual({"data": `collectionPermissionsPostMany`, "headers": {"session-id": `id`}})
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/collection/id/add-users`,
			{"body": `body`},
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	// content
	it(`content getSingleContent`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `contentGetSingleContent`,
		}

		axios.get.mockResolvedValue(res)
		await expect(proxies.apiProxy.content.getSingleContent(`id`)).resolves.toEqual(`contentGetSingleContent`)
		expect(axios.get).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/content/id`,
			{"headers": {"Content-Type": `application/json`,
				"session-id": `id`},
			"withCredentials": true,
			})
	})

	it(`content get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: collection4.content[0],
		}

		axios.mockResolvedValue(res)
		await proxies.apiProxy.content.get([`contentid1`, `contentid2`]).resolves
		expect(axios).toBeCalledWith(`//api.yvideobeta.byu.edu/api/content/contentid1`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
		expect(axios).toBeCalledWith(`//api.yvideobeta.byu.edu/api/content/contentid2`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})

		const expected = [res.data].reduce((map, item) => {
			const newItem = new Content(item)
			map[item.id] = newItem
			return map
		}, {})

		expect(await proxies.apiProxy.content.get([`contentid1`, `contentid2`])).toEqual(expected)
	})

	it(`content post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `contentPost`,
		}

		axios.post.mockResolvedValue(res)

		expect(await proxies.apiProxy.content.post(`contentPost`).resolves).toEqual()
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/content`,
			`contentPost`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`content addView get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `contentAddViewGet`,
		}

		axios.mockResolvedValue(res)
		await proxies.apiProxy.content.addView.get(`id`).resolves
		expect(axios).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/content/id/addview`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`content metadata post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `contentMetadataPost`,
		}

		axios.post.mockResolvedValue(res)
		proxies.apiProxy.content.metadata.post(`id`, {metadata: `metadata`})
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/content/id/metadata`,
			`{"metadata":"metadata"}`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`content update`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `contentMetadataUpdate`,
		}

		axios.patch.mockResolvedValue(res)
		await expect(proxies.apiProxy.content.update(`content`)).resolves.toEqual(`contentMetadataUpdate`)
		expect(axios.patch).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/content/undefined`,
			`content`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	// resources
	it(`resources post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `resourcesPost`,
		}

		axios.post.mockResolvedValue(res)
		await expect(proxies.apiProxy.resources.post(`resource`)).resolves.toEqual(`resourcesPost`)
		expect(axios.post).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/resource`,
			`resource`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`resources delete`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `resourcesDelete`,
		}

		axios.delete.mockResolvedValue(res)
		proxies.apiProxy.resources.delete(`resourceId`)
		expect(axios.delete).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/resource/resourceId`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`resources edit`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `resourcesEdit`,
		}

		axios.patch.mockResolvedValue(res)
		await expect(proxies.apiProxy.resources.edit(`resource` ,`resourceId`)).resolves.toEqual(`resourcesEdit`)
		expect(axios.patch).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/resource/resourceId`,
			`resource`,
			{"headers": {"Content-Type": `application/json`, "session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`resources get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `resourcesGet`,
		}

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.resources.get(`resourceId`)).resolves.toEqual(`resourcesGet`)
		expect(axios).toBeCalledWith(
			`//api.yvideobeta.byu.edu/api/resource/resourceId`,
			{"headers": {"session-id": `id`},
				"withCredentials": true,
			})
	})

	it(`resources search`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `resourcesSearch`,
		}

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.resources.search(`searchQuery`)).resolves.toEqual(`resourcesSearch`)
		expect(axios).toBeCalledWith(`//api.yvideobeta.byu.edu/api/admin/resource/searchQuery`, {"headers": {"session-id": `id`}, "withCredentials": true})
	})

	it(`resources files`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `resourcesFiles`,
		}

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.resources.files(`resourceId`)).resolves.toEqual(`resourcesFiles`)
		expect(axios).toBeCalledWith(`//api.yvideobeta.byu.edu/api/resource/resourceId/files`, {"headers": {"session-id": `id`}, "withCredentials": true})
	})

	// user
	it(`user get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: user,
		}

		const expected = {"email": `email@testemail.com`, "id": 22, "lastLogin": undefined, "name": undefined, "roles": undefined, "username": `testusername`}

		axios.get.mockResolvedValue(res)
		await expect(proxies.apiProxy.user.get()).resolves.toEqual(expected)
	})

	it(`user collections get`, async () => {
		const data = {
			headers:{
				"session-id": `id`,
			},
			data:[collection4],
		}

		const expected = {"1": {"archived": false, "content": [{"authKey": ``, "collectionId": `collectionsid1`, "contentType": `video`, "dateValidated": ``, "description": `test`, "expired": false, "fullVideo": false, "id": `contentid1`, "isCopyrighted": false, "name": `testname`, "physicalCopyExists": false, "published": true, "requester": ``, "resource": {"keywords": [``]}, "resourceId": `5ebdaef833e57cec218b457c`, "settings": {"allowDefinitions": true, "allowNote": true, "annotationDocument": [], "showCaptions": true, "targetLanguages": []}, "thumbnail": `test@thumbnail.com`, "url": `test url`, "views": 0, "words": ""}, {"authKey": ``, "collectionId": `collectionsid2`, "contentType": `video2`, "dateValidated": ``, "description": `test2`, "expired": false, "fullVideo": false, "id": `contentid2`, "isCopyrighted": false, "name": undefined, "physicalCopyExists": false, "published": true, "requester": ``, "resource": {"keywords": [``]}, "resourceId": `5ebdaef833e57cec218b457c`, "settings": {"allowDefinitions": true, "allowNote": true, "annotationDocument": [], "showCaptions": true, "targetLanguages": []}, "thumbnail": `test@thumbnail.com2`, "url": `test ur2l`, "views": 0, "words": ""}], "id": 1, "name": undefined, "owner": 22, "published": true, "thumbnail": `test@thumbnail`}}

		axios.mockResolvedValue(data)
		// axios.mockImplementation(() => Promise.resolve(data))

		await expect(proxies.apiProxy.user.collections.get()).resolves.toEqual(expected)
	})

	// language
	it(`language post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `languagePost`,
		}

		axios.post.mockResolvedValue(res)
		await expect(proxies.apiProxy.language.post(`lang`)).resolves.toEqual(`languagePost`)
		expect(axios.post).toBeCalledWith(`//api.yvideobeta.byu.edu/api/language`, `lang`, {"headers": {"session-id": `id`}, "withCredentials": true})
	})

	it(`language get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `languageGet`,
		}

		axios.get.mockResolvedValue(res)
		await expect(proxies.apiProxy.language.get()).resolves.toEqual(`languageGet`)
		expect(axios.get).toBeCalledWith(`//api.yvideobeta.byu.edu/api/language`, {"headers": {"session-id": `id`}, "withCredentials": true})
	})

	it(`language delete`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `languageDelete`,
		}

		axios.delete.mockResolvedValue(res)
		await expect(proxies.apiProxy.language.delete(`lang`)).resolves.toEqual(`languageDelete`)
		expect(axios.delete).toBeCalledWith(`//api.yvideobeta.byu.edu/api/language`, `lang`, {"headers": {"session-id": `id`}, "withCredentials": true})
	})

	// file
	it(`file post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `filePost`,
		}

		axios.post.mockResolvedValue(res)
		await expect(proxies.apiProxy.file.post(`file`)).resolves.toEqual(`filePost`)
		expect(axios.post).toBeCalledWith(`//api.yvideobeta.byu.edu/api/file`, `file`, {"headers": {"Content-Type": "multipart/form-data", "session-id": `id`}, "onUploadProgress": undefined, "withCredentials": true})
	})

	it(`file patch`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `filePatch`,
		}

		axios.patch.mockResolvedValue(res)
		await expect(proxies.apiProxy.file.patch(`fileId`, `file`)).resolves.toEqual(res)
		expect(axios.patch).toBeCalledWith(`//api.yvideobeta.byu.edu/api/file/fileId`, `file`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
	})

	it(`file delete`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `filePatch`,
		}

		axios.delete.mockResolvedValue(res)
		await expect(proxies.apiProxy.file.delete(`fileId`)).resolves.toEqual(`filePatch`)
		expect(axios.delete).toBeCalledWith(`//api.yvideobeta.byu.edu/api/file/fileId`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
	})

	// media
	it(`media getKey`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `mediaGetKey`,
		}

		axios.get.mockResolvedValue(res)
		await expect(proxies.apiProxy.media.getKey(`mediaId`)).resolves.toEqual(`mediaGetKey`)
		expect(axios.get).toBeCalledWith(`//api.yvideobeta.byu.edu/api/media/get-file-key/mediaId`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
	})

	// subtitle
	it(`subtitle post`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: {
				id: `subtitleId`,
			},
		}

		axios.post.mockResolvedValue(res)
		expect(proxies.apiProxy.subtitles.post(`data`)).resolves.toEqual(`subtitleId`)
		expect(axios.post).toBeCalledWith(`//api.yvideobeta.byu.edu/api/subtitle`, `data`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
	})

	it(`subtitle get`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `subtitleGet`,
		}

		axios.mockResolvedValue(res)
		await expect(proxies.apiProxy.subtitles.get([`id`, `id2`])).resolves.toEqual([`subtitleGet`, `subtitleGet`])
		expect(axios).toBeCalledWith(`//api.yvideobeta.byu.edu/api/subtitle/id`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
		expect(axios).toBeCalledWith(`//api.yvideobeta.byu.edu/api/subtitle/id2`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
	})

	it(`subtitle delete`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `subtitleDelete`,
		}

		axios.delete.mockResolvedValue(res)
		proxies.apiProxy.subtitles.delete([`id`, `id2`])
		expect(axios.delete).toBeCalledWith(`//api.yvideobeta.byu.edu/api/subtitle/id`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
		expect(axios.delete).toBeCalledWith(`//api.yvideobeta.byu.edu/api/subtitle/id2`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
	})

	it(`subtitle edit`, async () => {
		const res = {
			headers:{
				"session-id": `id`,
			},
			data: `subtitleEdit`,
		}

		axios.patch.mockResolvedValue(res)
		proxies.apiProxy.subtitles.edit(`update`, `id`)
		expect(axios.patch).toBeCalledWith(`//api.yvideobeta.byu.edu/api/subtitle/id`, `update`, {"headers": {"Content-Type": `application/json`, "session-id": `id`}, "withCredentials": true})
	})

})