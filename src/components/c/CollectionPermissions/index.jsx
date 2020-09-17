import React, { PureComponent } from 'react'

import Style, { Search, DepartmentSelect, CatalogInput, SectionInput, AddButton, Table, TableContainer, AddManyButton, Sort, Loading } from './styles'

import logo from 'assets/hexborder.svg'

// import { PermissionTable } from 'components/bits'

import { departments } from 'lib/util'

import removeIcon from 'assets/trash_icon.svg'

export class CollectionPermissions extends PureComponent {
	constructor(props){
		super(props)
		this.state={
			sortType: {
				reverse: true,
			},
		}
	}

	render() {
		const {
			viewstate,
			handlers,
		} = this.props

		const {
			users,
			courses,
			state,
			disabled,
			disabledUser,
			loaded,
		} = viewstate

		const {
			catalog,
			department,
			section,
		} = this.props.viewstate.course

		const {
			username,
		} = this.props.viewstate.user

		// const reducedCourses = courses.map(item => ({
		// 	id: item.id,
		// 	Department: item.department,
		// 	Catalog: item.catalogNumber,
		// 	Section: item.sectionNumber,
		// }))

		// const reducedAdmins = admins.map(item => ({
		// 	id: item.id,
		// 	Name: item.name,
		// 	NetID: item.username,
		// 	Email: item.email,
		// }))

		// const reducedExceptions = exceptions.map(item => ({
		// 	id: item.id,
		// 	Name: item.name,
		// 	NetID: item.username,
		// 	Email: item.email,
		// }))

		const sort = (data,sortType) => {
			if (this.state.sortType.reverse === false){
				this.setState({
					sortType:{
						reverse: true,
					},
				})
				data.sort((a, b) => {
					switch (sortType) {
					case `Username`:
						return b.username.localeCompare(a.username,{sensitivity:`base`})
					case `Name`:
						return b['account-name'].localeCompare(a['account-name'],{sensitivity:`base`})
					}
				})
			}else{
				this.setState({
					sortType:{
						reverse: false,
					},
				})
				data.sort((a, b) => {
					switch (sortType) {
					case `Username`:
						return a.username.localeCompare(b.username,{sensitivity:`base`})
					case `Name`:
						return a['account-name'].localeCompare(b['account-name'],{sensitivity:`base`})
					}
				})
			}
			return data
		}

		return (
			<Style>

				<h4>Courses</h4>

				<form onSubmit={handlers.addCourse}>
					<DepartmentSelect className='department-select' value={department} onChange={handlers.handleDepartmentChange} placeholder='Enter department (EX: ENGL)'/>
					<CatalogInput className='catalog-input' min='0' onChange={handlers.handleCatalogChange} value={catalog} placeholder='Enter Catalog Number' required/>
					<SectionInput className='section-input' min='0' onChange={handlers.handleSectionChange} value={section} placeholder='Enter Section Number' required/>
					<AddButton className='add-course-button' type='submit' disabled={disabled}>Add</AddButton>
				</form><br/>

				<h4>TA / Faculty / Auditing</h4>
				<Search className='faculty-submit' onSubmit={handlers.addUser}>
					<input className='faculty-input' type='search' placeholder={`Enter netID or name`} onChange={handlers.handleUserChange} value={username} />
					<AddButton className='add-faculty-button' type='submit' disabled={disabledUser}>Add</AddButton>
				</Search>
				<AddManyButton type="button" onClick={handlers.AddBatchNetids}>Add many...</AddManyButton>

				{/* <AddManyButton onClick={handlers.handleShowHelp}>Add many...</AddManyButton> */}
				<TableContainer>
					<div id='course-table'>
						<h4>Current Courses</h4>
						<Table border='1'>
							<thead>
								<tr>
									<th>Department</th>
									<th>Catalog</th>
									<th>Section</th>
									<th>Remove</th>
								</tr>
							</thead>
							<tbody>
								{ courses.length > 0 ?
									 courses.map((element, index) =>
										<tr key={index}>
											<td>{element[`department`]}</td>
											<td>{element[`catalog-number`]}</td>
											<td>{element[`section-number`]}</td>
											<td onClick={e => handlers.removeCourse(element[`id`])}><img src={removeIcon} width='20px'/></td>
										</tr>,
									)
									 :
									null

								}
							</tbody>
						</Table>
					</div>
					<div id='user-table'>
						<h4>Current Users</h4>
<<<<<<< HEAD
							<Table border='1'>
								<thead>
									<tr>
										<th>Username<Sort onClick={()=>sort(users,"Username")}></Sort></th>
										<th>Name<Sort onClick={()=>sort(users,"Name")}></Sort></th>
										<th>Last Login</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody>
									{loaded === false ?
										( users.length > 0 ?
											users.map((element, index) =>
												<tr key={index}>
													<td>{element[`username`]}</td>
													<td>{element[`account-name`]}</td>
													<td>{element[`last-login`].substring(0, 11)}{element[`last-login`].substring(element[`last-login`].length - 4, element[`last-login`].length)}</td>
													<td onClick={e => handlers.removeUser(element[`username`])}><img src={removeIcon} width='20px'/></td>
												</tr>,
											)
											:
											null
										)
										:
										(
											<tr className='loading'><Loading colSpan={4} rowSpan={6} loaded={loaded}><img src={logo} /></Loading></tr>
										)
									}
								</tbody>
=======
						<Table border='1'>
							<thead>
								<tr>
									<th>Username</th>
									<th>Name</th>
									<th>Last Login</th>
									<th>Remove</th>
								</tr>
							</thead>
							<tbody>
								{ users.length > 0 ? (
									 users.map((element, index) =>
											<tr key={index}>
												<td>{element['username']}</td>
												<td>{element['account-name']}</td>
												<td>
													{
														element['last-login'] !== 'na' ? (
															`${element['last-login'].substring(0, 11)} ${element['last-login'].substring(element["last-login"].length - 4, element["last-login"].length)}`
														) : ('NA')
													}
												</td>
												<td onClick={e => handlers.removeUser(element['username'])}><img src={removeIcon} width="20px"/></td>
											</tr>
										)
									) : (
										null
									)
								}
							</tbody>
>>>>>>> 0fcdc58972ad013efafd2ab60525664718974b38
						</Table>
					</div>
				</TableContainer>

			</Style>
		)
	}
}

export default CollectionPermissions
