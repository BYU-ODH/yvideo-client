import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

import Style, { Table, ItemEdit, Filter, Sort, ItemMenu } from './styles'

//AdminTable has a function that returns the pop up menu for the users.
//Since we are only looking at users part of the code has been commented out
//Handlers come from the AdminContainer and to call the modal to confirm a delete
//we use toggleModal from interfaceService from the AdminContainer

export default class AdminTable extends PureComponent {

	render() {

		const {
			menuActive,
			searchCategory,
			menuItemInfo,
			data,
			mousePos,
		} = this.props.viewstate

		const {
			handleConfirmDelete,
			toggleMenu,
		} = this.props.handlers

		if (!data.length || data[0] === undefined) return null

		const headers = {
			Users: {
				sortBy: ``,
				descending: false,
				columns: [
					// {
					// 	title: `ID`,
					// 	sort: true,
					// 	descending: false,
					// },
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
						filter: {
							Admin: false,
							Manager: false,
							Professor: false,
							TA: false,
							Student: false,
						},
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
						title: `ID`,
					},
					{
						title: `Name`,
					},
					{
						title: `Owner`,
					},
					// {
					// 	title: `# Students`,
					// },
					// {
					// 	title: `# Content`,
					// },
					// {
					// 	title: `Email`,
					// },
				],
			},
			Content: {
				sortBy: ``,
				descending: false,
				columns: [
					{
						title: `ID`,
					},
					{
						title: `Name`,
					},
					{
						title: `Collection`,
					},
					// {
					// 	title: `Requester`,
					// },
					// {
					// 	title: `Language`,
					// 	filter: {},
					// },
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
			console.log(item)
			switch (category) {
				case 'Users':
					const date = new Date(item.lastLogin)
					return (
						<>
							{/* <td>{item.id}</td> */}
							<td>{item.username}</td>
							<td>{item.name}</td>
							<td>{item.roles}</td>
							<td>{item.email}</td>
							<td>{date.toString().substring(0, 16)}</td>
						</>
					)
				case 'Collections':
					return (
						<>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.owner}</td>
						</>
					)
				case 'Content':
					return (
						<>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.collectionId}</td>
							<td>{item.contentType}</td>
							<td>{item.expired.toString()}</td>
							<td>{item.resourceId}</td>
						</>
					)

				default:
					break;
			}
		}

		const menuOptions = (cat, data) => {
			switch (cat) {
			case `Users`:
				return (
					<ul>
						<li>
							<Link to={`/lab-assistant-manager/${data.id}`} target='_blank'>Collections</Link>
						</li>
						<li>
							<button onClick={handleConfirmDelete}>Delete</button>
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
							<button onClick={handleConfirmDelete}>Delete</button>
						</li>
					</ul>
				)

			case `Content`:
				console.log(data)
				return (
					<ul>
						<li>
							<Link to={`/player/${data.id}`} target='_blank'>View</Link>
						</li>
						<li>
							<Link to={`/linkToTrackEditor`}>Edit</Link>
						</li>
						<li>
							<button>Disable</button>
						</li>
						<li>
							<button onClick={handleConfirmDelete}>Delete</button>
						</li>
					</ul>
				)

			default:
				return null
			}
		}

		return (
			<Style>
				<Table>
					<thead>
						<tr>
							{headers[searchCategory].columns.map((header, index) => <th key={index}>{header.title}{header.filter && <Filter />}<Sort/></th>)}
							<th/>
						</tr>
					</thead>
					<tbody>
						{data.map(
							item => <tr key={item.id}>
								{ printTableValues(searchCategory, item) }
								<td><ItemEdit onClick={toggleMenu(item.id)}></ItemEdit></td>
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