import React, { PureComponent } from 'react'

import Style, { Table, ItemEdit, Filter, Sort } from './styles'

import EditItemContainer from 'components/modals/containers/EditSearchItemContainer'

export default class AdminTable extends PureComponent {

	constructor(props) {
		super(props)

		this.state = {
			showModal: false,
			modalItemInfo: {},
			modalPosition: {
				position: 'absolute',
				top: 0,
			},
			data: [],
			lowClick: false,
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
		this.handleShowModal = this.handleShowModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}

	handleShowModal(){
		const show = this.state.showModal
		if (!show){
				this.setState({
				showModal: !show
			})
		}
		else {
				this.setState({
				showModal: !show,
			})
		}
	}

	closeModal = () => {
		this.setState({
			showModal: false
		})
	}

	static getDerivedStateFromProps(props, state) {
		return {
			...state,
			data: props.data ? props.data.map(item => {
				if (props.category === `Users`) {
					return {
						ID: item.id,
						NetID: item.username,
						Name: item.name,
						Roles: item.roles,
						Email: item.email,
						"Last Login": new Date(item.lastLogin).toDateString(),
					}
				} else if (props.category === `Collections`) {
					//We need to find a way to get the owner from the users data. INNER JOIN
					return {
						ID: item.id,
						Name: item.name,
						Owner: item.owner,
						// "# Students",
						// "# Content",
						// Email,
					}
				} else if (props.category === `Content`){

					// const lang = item.settings.targetLanguages[0]
					// if (lang && !langs.includes(lang)) langs.push(lang)

					return {
						ID: item.id,
						Name: item.name,
						Collection: item.collectionId,
						// Requester: item.requester,
						// Language: lang || ``,
						Type: item.contentType,
						Expired: item.expired.toString(),
						ResourceID: item.resourceId,
					}
				} else return item
			}) : [],
		}
	}

	render() {
		const { category } = this.props
		const { data, showModal, modalItemInfo, modalPosition, lowClick } = this.state
		if (!data.length || data[0] === undefined) return null

		const headers = this.state[category].columns

		const setItemId = (id) => {
			this.handleShowModal()
			if(!this.state.showModal){
				this.setState({
					currentItemId: id
				})
			}
			data.forEach(item => {
				if (item.ID === id){
					this.setState({
						modalItemInfo: item
					})
				}
			})
		}

		const handleClickPosition = (e) => {
			const height = window.innerHeight
			//console.log(height, e.clientY.toFixed(0), e.nativeEvent)
			if (e.clientY.toFixed(0) > (height / 2)){
				//this is in the lower half
				//lowClick false when it is in the upper side of the screen means position < height / 2
				//lowClick true when it is in the lower half of the screen means position > height / 2
				this.setState({
					lowClick: true
				})
			}
			else {
				this.setState({
					lowClick: false
				})
			}
			if (this.state.showModal === false){
				let yPosition = parseInt(e.clientY.toFixed(0))
				let xPosition = (e.clientX.toFixed(0) - 180)  + 'px'
				this.setState({
					modalPosition: {
						top: yPosition,
						right: xPosition
					}
				})
			}
		}

		return (
			<Style onClick={(e) => handleClickPosition(e)}>
				<Table>
					<thead>
						<tr>
							{headers.map((header, index) => <th key={`${header.title}-${index}`}>{header.title}{header.filter && <Filter />}<Sort/></th>)}
							<th/>
						</tr>
					</thead>
					<tbody>
						{data.map(
							item => <tr key={item.ID}>
								{headers.map(
									(header, index) => {
										return <td key={`${header}-${index}`}>
											{item[header.title]}
										</td>
									},
								)}
								<td><ItemEdit onClick={() => setItemId(item.ID)}></ItemEdit></td>
							</tr>,
						)}
					</tbody>
				</Table>
				{ showModal && (
					<EditItemContainer lowClick={lowClick} position={modalPosition} data={modalItemInfo} category={category} close={this.closeModal}>
					</EditItemContainer> )}
			</Style>
		)
	}
}