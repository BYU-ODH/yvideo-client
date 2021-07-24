import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

import Style, { Table, ItemEdit, Filter, Sort, ItemMenu } from './styles'

// AdminTable has a function that returns the pop up menu for the users.
// Since we are only looking at users part of the code has been commented out
// Handlers come from the AdminContainer and to call the modal to confirm a delete
// we use toggleModal from interfaceService from the AdminContainer

export default class AdminTable extends PureComponent {
	constructor(props){
		super(props)
		this.state={
			sortType: {
				id: ``,
				reverse: false,
			},
		}
	}

	render() {

		const {
			menuActive,
			searchCategory,
			menuItemInfo,
			data,
			mousePos,
			isEdit,
		} = this.props.viewstate

		const {
			handleConfirmDelete,
			handleEdit,
			toggleMenu,
			userRoleSave,
			roleChange,
		} = this.props.handlers

		const {
			handleShowTip,
			toggleTip,
		} = this.props.tipHandlers

		if (!data.length || data[0] === undefined) return null

		const headers = {
			Users: {
				sortBy: ``,
				descending: false,
				columns: [
					{
						title: `NetID`,
						sort: true,
						descending: false,
					},
					{
						title: `Name`,
						sort: true,
						descending: false,
					},
					{
						title: `Roles`,
					// 	filter: {
					// 		Admin: false,
					// 		Manager: false,
					// 		Professor: false,
					// 		TA: false,
					// 		Student: false,
					// 	},
					},
					{
						title: `Email`,
					},
					{
						title: `Last Login`,
						sort: true,
						descending: false,
					},
				],
			},
			Collections: {
				sortBy: ``,
				descending: false,
				columns: [
					{
						title: `Name`,
					},
					{
						title: `Owner`,
					},
				],
			},
			Content: {
				sortBy: ``,
				descending: false,
				columns: [
					{
						title: `Name`,
					},
					{
						title: `Collection`,
					},
					{
						title: `Type`,
						filter: {
							Video: false,
							Image: false,
							Text: false,
							Audio: false,
						},
					},
					{
						title: `Expired`,
					},
					{
						title: `ResourceID`,
					},
				],
			},
		}

		const printTableValues = (category, item) => {
			const date = new Date(item.lastLogin)
			switch (category) {
			case `Users`:
				return (
					isEdit ?
						<>
							{/* <td>{item.id}</td> */}
							<td>{item.username}</td>
							<td>{item.name}</td>
							<td>
								<select defaultValue={item.roles} name='roles' id='roles' onChange={roleChange}>
									<option value='0'>0: admin</option>
									<option value='1'>1: lab assistant</option>
									<option value='2'>2: instructor / professor</option>
									<option value='3'>3: student</option>
								</select>
								<button type='submit' className='userRoleSave' onClick={userRoleSave}>Save</button>
							</td>
							<td>{item.email}</td>
							<td>{date.toString().substring(0, 16)}</td>
						</>
						:
						<>
							{/* <td>{item.id}</td> */}
							<td>{item.username}</td>
							<td>{item.name}</td>
							<td>{item.roles}</td>
							<td>{item.email}</td>
							<td>{date.toString().substring(0, 16)}</td>
						</>
				)
			case `Collections`:
				return (
					<>
						<td>{item.name}</td>
						<td>{item.owner}</td>
					</>
				)
			case `Content`:
				return (
					<>
						<td>{item.name}</td>
						<td>{item.collectionId}</td>
						<td>{item.contentType}</td>
						<td>{item.expired.toString()}</td>
						<td>{item.resourceId}</td>
					</>
				)

			default:
				break
			}
		}

		const menuOptions = (cat, data) => {
			switch (cat) {
			case `Users`:
				return (
					<ul>
						<li>
							<Link to={`/manager/${data.id}`} target='_blank'>Collections</Link>
						</li>
						<li>
							<button className='userEdit' onClick={handleEdit}>Edit</button>
						</li>
						<li>
							<button className='userDelete' onClick={handleConfirmDelete}>Delete</button>
						</li>
					</ul>
				)

			case `Collections`:
				return (
					<ul>
						<li>
							<Link to={`/lab-assistant-manager/${data.owner}/${data.id}`} target='_blank'>View/Edit</Link>
						</li>
						<li>
							<button className='collectionsDelete' onClick={handleConfirmDelete}>Delete</button>
						</li>
					</ul>
				)

			case `Content`:
				return (
					<ul>
						<li>
							<Link to={`/player/${data.id}`} target='_blank'>View</Link>
						</li>
						<li>
							<Link to={`/trackeditor/${data.id}`}>Edit</Link>
						</li>
						<li>
							<button>Disable</button>
						</li>
						<li>
							<button className='contentDelete' onClick={handleConfirmDelete}>Delete</button>
						</li>
					</ul>
				)

			default:
				return null
			}
		}

		const isReverse = (sortType) =>{
			if (this.state.sortType.id === sortType && this.state.sortType.reverse === false){
				this.setState({
					sortType:{
						id: sortType,
						reverse: true,
					},
				})
				return true
			} else {
				this.setState({
					sortType:{
						id: sortType,
						reverse: false,
					},
				})
				return false
			}
		}

		const sort = (data,sortType) => {
			data.sort((a, b) => {
				switch (sortType) {
				case `Name`:
					return isReverse(sortType) ? a.name.localeCompare(b.name,{sensitivity:`base`}) : b.name.localeCompare(a.name,{sensitivity:`base`})
				case `NetID`:
					return isReverse(sortType) ? a.username.localeCompare(b.username,{sensitivity:`base`}) : b.username.localeCompare(a.username,{sensitivity:`base`})
				case `Email`:
					return isReverse(sortType) ? a.email.localeCompare(b.email,{sensitivity:`base`}) : b.email.localeCompare(a.email,{sensitivity:`base`})
				case `Owner`:
					return isReverse(sortType) ? a.owner.localeCompare(b.owner,{sensitivity:`base`}) : b.owner.localeCompare(a.owner,{sensitivity:`base`})
				case `Roles`:
					return isReverse(sortType) ? a.roles - b.roles : b.roles - a.roles
				case `Last Login`:
					if(a.lastLogin === `na` && b.lastLogin !== `na`)
						return isReverse(sortType) ? 1 : 1
					else if(b.lastLogin === `na` && a.lastLogin !== `na`)
						return isReverse(sortType) ? -1 : -1
					else if(b.lastLogin === `na` && a.lastLogin === `na`)
						return isReverse(sortType) ? 0 : 0
					else
						return isReverse(sortType) ? new Date(a.lastLogin) - new Date(b.lastLogin) : new Date(b.lastLogin) - new Date(a.lastLogin)

				default: return null
				}
			})

			return data
		}

		return (
			<Style>
				<Table>
					<thead>
						<tr>
							{headers[searchCategory].columns.map((header, index) => <th className='headers' key={index}>{header.title}{header.filter && <Filter />}<Sort className='sorting-button' onClick={()=>sort(data,header.title)}/></th>)}
							<th/>
						</tr>
					</thead>
					<tbody>
						{data.map(
							item => <tr key={item.id}>
								{ printTableValues(searchCategory, item) }
								<td>
									<ItemEdit onClick={toggleMenu(item.id)} onMouseEnter={e => handleShowTip(`actions`, {x: e.target.getBoundingClientRect().x, y: e.target.getBoundingClientRect().y, width: e.currentTarget.offsetWidth})}
										onMouseLeave={e => toggleTip()}
									></ItemEdit>
								</td>
							</tr>,
						)}
					</tbody>
				</Table>
				{menuActive &&
					<ItemMenu mousePos={mousePos} onMouseLeave={toggleMenu()}>{menuOptions(searchCategory, menuItemInfo)}</ItemMenu>
				}
			</Style>
		)
	}
}