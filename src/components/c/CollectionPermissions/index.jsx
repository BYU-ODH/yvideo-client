import React, { PureComponent } from 'react'
import arrow_down from 'assets/arrow_down.svg'

import Style, {
	Search,
	DepartmentSelect,
	CatalogInput,
	SectionInput,
	AddButton,
	Table,
	TableContainer,
	AddManyButton,
	Sort,
	UserListTable,
	UserList,
	TableHeader,
	CourseTable,
	InnerContainer,
	Column,
} from './styles'
import { SwitchToggle } from 'components/bits'

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
			collection,
			users,
			userTA,
			courses,
			disabled,
			disabledUser,
			disabledTA,
			loggedinUser,
			isDeptValid,
			isCourseValid,
			isSectionValid,
		} = viewstate

		const {
			catalog,
			department,
			section,
		} = this.props.viewstate.course

		const {
			username,
		} = this.props.viewstate.user

		const sort = (data, sortType) => {
			if (this.state.sortType.reverse === false){
				this.setState({
					sortType: {
						reverse: true,
					},
				})
				data.sort((a, b) => {
					switch (sortType) {
					case `Username`:
						return b.username.localeCompare(a.username, {sensitivity: `base`})
					case `Name`:
						return b[`account-name`].localeCompare(a[`account-name`], {sensitivity: `base`})
					default:
						return ``
					}
				})
			}else{
				this.setState({
					sortType: {
						reverse: false,
					},
				})
				data.sort((a, b) => {
					switch (sortType) {
					case `Username`:
						return a.username.localeCompare(b.username, {sensitivity: `base`})
					case `Name`:
						return a[`account-name`].localeCompare(b[`account-name`], {sensitivity: `base`})
					default:
						return ``
					}
				})
			}
			return data
		}

		return (
			<Style>
				<InnerContainer>
					<Column>
						{/* only shows only for the admin */}
						{
							loggedinUser.roles === 0 &&
							<h4>
							Public
								<SwitchToggle on={collection.public} setToggle={handlers.makePublic} data_key='public' />
							</h4>
						}
					</Column>
				</InnerContainer>
				<TableContainer>

					<CourseTable id='course-table'>
						<h4>Courses</h4>
						<form onSubmit={handlers.addCourse}>
							<DepartmentSelect isDeptValid={isDeptValid} className='department-select' value={department} onChange={handlers.handleDepartmentChange} placeholder='Dept - Ex: ENGL'/>
							{isDeptValid === false && <img src={arrow_down} alt={`arrow`} />}
							{isDeptValid === false && <p className='error'>Please enter a valid department. Disregard this error if this department ID is what you want.</p>}
							
							
							<CatalogInput isCourseValid={isCourseValid} className='catalog-input' min='0' onChange={handlers.handleCatalogChange} onKeyPress={e => {
								if (e.charCode === 13) handlers.handleCatalogBlur(e)
							}} onBlur={handlers.handleCatalogBlur} value={catalog} placeholder='Course - Ex: 101' required/>
							{isCourseValid === false && <p className='error'>Please enter a valid course. Disregard this error if this course number is what you want.</p>}
							
							<SectionInput isSectionValid={isSectionValid} className='section-input' min='0' onChange={handlers.handleSectionChange}
							onKeyPress={e => {
								if (e.charCode === 13) handlers.handleSectionBlur(e)
							}} onBlur={handlers.handleSectionBlur} value={section} placeholder='Section - Ex: 001' required/>
							{isSectionValid === false && <p className='error'>Please enter a valid section. Disregard this error is this section number is what you want.</p>}
							<AddButton className='add-course-button' type='submit' disabled={disabled}>Add</AddButton>
						</form><br/>
						<Table border='1'>
							<thead>
								<tr>
									<th>Department</th>
									<th>Course</th>
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
											<td onClick={e => handlers.removeCourse(element[`id`])}><img src={removeIcon} alt='' width='20px'/></td>
										</tr>,
									)
									:
									null
								}
							</tbody>
						</Table>
					</CourseTable>

					<UserListTable>
						<UserList id='user-table'>
							<h4>Instructors and TAs</h4>
							<Search className='faculty-submit' onSubmit={handlers.addTA}>
								<input className='faculty-input' type='search' placeholder={`Enter netID`} onChange={handlers.handleUserTAChange} value={userTA.username} />
								<AddButton className='add-faculty-button' type='submit' disabled={disabledTA}>Add</AddButton>
							</Search>
							<Table border='1'>
								<thead>
									<tr>
										<th>Username<Sort onClick={() => sort(userTA, `Username`)}></Sort></th>
										<th>Name<Sort onClick={() => sort(userTA, `Name`)}></Sort></th>
										<th>type</th>
										<th>Last Login</th>
										<th>Remove</th>
									</tr>
								</thead>
								{/* {isLoading === true ?
									<tbody><tr className='loading'><Spinner/></tr></tbody>
									: */}
								<tbody>
									{userTA.length > 0 ?
										userTA.map((element, index) =>
											<tr key={index}>
												<td>{element[`username`]}</td>
												<td>{element[`account-name`]}</td>
												<td>{element[`account-type`]}</td>
												<td>{element[`last-login`]?.length > 2 ?
													`${element[`last-login`].substring(0, 11)}${element[`last-login`].substring(element[`last-login`].length - 4, element[`last-login`].length)}`
													:
													`NA`
												}
												</td>
												<td onClick={e => handlers.removeUser(element[`username`])}><img src={removeIcon} alt='' width='20px'/></td>
											</tr>,
										)
										: <></>
									}
								</tbody>
							</Table>
						</UserList>
						<UserList id='user-table'>
							<TableHeader>
								<h4>Guests (read-only)</h4>
								<div>
									<Search className='faculty-submit' onSubmit={handlers.addUser}>
										<input className='faculty-input' type='search' placeholder={`Enter netID`} onChange={handlers.handleUserChange} value={username} />
										<AddButton className='add-faculty-button' type='submit' disabled={disabledUser}>Add</AddButton>
									</Search>
									<AddManyButton type='button' onClick={handlers.AddBatchNetids}>Add many...</AddManyButton>
								</div>
							</TableHeader>
							<Table border='1'>
								<thead>
									<tr>
										<th>Username<Sort onClick={() => sort(users, `Username`)}></Sort></th>
										<th>Name<Sort onClick={() => sort(users, `Name`)}></Sort></th>
										<th>type</th>
										<th>Last Login</th>
										<th>Remove</th>
									</tr>
								</thead>
								{/* {isLoading === true ?
									<tbody><tr className='loading'><Spinner/></tr></tbody>
									: */}
								<tbody>
									{users.length > 0 ?
										users.map((element, index) =>
											<tr key={index}>
												<td>{element[`username`]}</td>
												<td>{element[`account-name`]}</td>
												<td>{element[`account-type`]}</td>
												<td>{element[`last-login`]?.length > 2 ?
													`${element[`last-login`].substring(0, 11)}${element[`last-login`].substring(element[`last-login`].length - 4, element[`last-login`].length)}`
													:
													`NA`
												}
												</td>
												<td onClick={e => handlers.removeUser(element[`username`])}><img src={removeIcon} alt='' width='20px'/></td>
											</tr>,
										)
										: <></>
									}
								</tbody>
							</Table>
						</UserList>
					</UserListTable>
				</TableContainer>

			</Style>
		)
	}
}

export default CollectionPermissions
