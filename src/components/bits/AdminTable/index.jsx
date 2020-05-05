import React, { PureComponent } from 'react'

import { Link } from 'react-router-dom'

import Style, { Table, ItemEdit, Filter, Sort, ItemMenu } from './styles'

// import EditItemContainer from 'components/modals/containers/EditSearchItemContainer'

export default class AdminTable extends PureComponent {

	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		menuActive: false,
	// 		menuItemInfo: {},
	// 		menuPosition: {
	// 			position: `absolute`,
	// 			top: 0,
	// 		},
	// 		data: [],
	// 		lowClick: false,

	// 	}
	// }

	// static getDerivedStateFromProps(props, state) {
	// 	return {
	// 		...state,
	// 		data: props.data ? props.data.map(item => {
	// 			if (props.category === `Users`) {
	// 				return {
	// 					ID: item.id,
	// 					NetID: item.username,
	// 					Name: item.name,
	// 					Roles: item.roles,
	// 					Email: item.email,
	// 					"Last Login": new Date(item.lastLogin).toDateString(),
	// 				}
	// 			} else if (props.category === `Collections`) {
	// 				// We need to find a way to get the owner from the users data. INNER JOIN
	// 				return {
	// 					ID: item.id,
	// 					Name: item.name,
	// 					Owner: item.owner,
	// 					// "# Students",
	// 					// "# Content",
	// 					// Email,
	// 				}
	// 			} else if (props.category === `Content`){

	// 				// const lang = item.settings.targetLanguages[0]
	// 				// if (lang && !langs.includes(lang)) langs.push(lang)

	// 				return {
	// 					ID: item.id,
	// 					Name: item.name,
	// 					Collection: item.collectionId,
	// 					// Requester: item.requester,
	// 					// Language: lang || ``,
	// 					Type: item.contentType,
	// 					Expired: item.expired.toString(),
	// 					ResourceID: item.resourceId,
	// 				}
	// 			} else return item
	// 		}) : [],
	// 	}
	// }

	render() {

		const {
			menuActive,
			searchCategory,
			data,
			mousePos,
		} = this.props.viewstate

		const {
			handleConfirmDelete,
			toggleMenu,
		} = this.props.handlers

		// const { menuActive, menuItemInfo, menuPosition, lowClick } = this.state

		if (!data.length || data[0] === undefined) return null

		// const headers = this.state[searchCategory].columns

		const setItemId = (id) => {
			this.handleShowMenu()
			if(!this.state.menuActive){
				this.setState({
					currentItemId: id,
				})
			}
			data.forEach(item => {
				if (item.ID === id){
					this.setState({
						menuItemInfo: item,
					})
				}
			})
		}

		// const handleClickPosition = (e) => {
		// 	const height = window.innerHeight
		// 	// console.log(height, e.clientY.toFixed(0), e.nativeEvent)
		// 	if (e.clientY.toFixed(0) > height / 2){
		// 		// this is in the lower half
		// 		// lowClick false when it is in the upper side of the screen means position < height / 2
		// 		// lowClick true when it is in the lower half of the screen means position > height / 2
		// 		this.setState({
		// 			lowClick: true,
		// 		})
		// 	} else {
		// 		this.setState({
		// 			lowClick: false,
		// 		})
		// 	}
		// 	if (this.state.menuActive === false){
		// 		const yPosition = parseInt(e.clientY.toFixed(0))
		// 		const xPosition = `${e.clientX.toFixed(0) - 180}px`
		// 		this.setState({
		// 			menuPosition: {
		// 				top: yPosition,
		// 				right: xPosition,
		// 			},
		// 		})
		// 	}
		// }

		const headers = {
			Users: {
				sortBy: ``,
				descending: false,
				columns: [
					{
						title: `ID`,
						sort: true,
						descending: false,
					},
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

		const menuOptions = (cat, menuId) => {
			switch (cat) {
			case `Users`:
				return (
					<ul>
						<li>
							<Link to={`/lab-assistant-manager/${collectionId}`} target='_blank'>Collections</Link>
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
							<Link to={`/lab-assistant-manager/${data.Owner}/${data.ID}`} target='_blank'>View/Edit</Link>
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
							<Link to={`/${data.collectionId}`}>Edit</Link>
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
								{headers[searchCategory].columns.map((header, index) => {
									return (
										<td key={index}>
											{item[header.title]}
										</td>
									)
								})}
								<td><ItemEdit onClick={toggleMenu(item)}></ItemEdit></td>
							</tr>,
						)}
					</tbody>
				</Table>
				{menuActive &&
					// <EditItemContainer lowClick={lowClick} position={menuPosition} data={menuItemInfo} searchCategory={searchCategory} toggleModal={toggleModal}></EditItemContainer>
					<ItemMenu mousePos={mousePos} onMouseLeave={toggleMenu()}>{menuOptions(searchCategory, menuId)}</ItemMenu>
				}
			</Style>
		)
	}
}