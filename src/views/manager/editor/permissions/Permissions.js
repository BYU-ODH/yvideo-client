import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCollectionPermissions } from 'redux/actions'

import PermissionTable from './permissionTable/PermissionTable'

class Permissions extends Component {

	componentDidMount = () => {
		const { collection, getCollectionPermissions } = this.props
		if (collection.id !== null) getCollectionPermissions(this.props.collection.id)
	}

	componentDidUpdate = prevProps => {
		const { collection, getCollectionPermissions } = this.props

		if (collection !== prevProps.collection && collection !== undefined)
			getCollectionPermissions(this.props.collection.id)

	}

	render() {

		return (
			<div>

				<PermissionTable header={`Courses`} placeholder={`Enter courseID`} data={courses} />

				<PermissionTable header={`TA / Faculty`} placeholder={`Enter netID or name`} data={tafaculty} />

				<PermissionTable header={`Audit Exceptions`} placeholder={`Enter netID or name`} data={auditors} />

			</div>
		)
	}
}

const mapStateToProps = state => ({
	state
})

const mapDispatchToProps = {
	getCollectionPermissions
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)

const courses = [
	{
		CourseID: `GER 101`,
		Section: `001`
	},
	{
		CourseID: `GER 200`,
		Section: `001`
	}
]

const tafaculty = [
	{
		NetID: `abc123`,
		Name: `Bob Sagat`,
		Status: `Faculty`
	},
	{
		NetID: `elephantMan47`,
		Name: `Joseph Merrick`,
		Status: `Faculty`
	},
	{
		NetID: `somekid12`,
		Name: `Bobby Bread`,
		Status: `Student`
	}
]

const auditors = [
	{
		NetID: `another1`,
		Name: `Freddy Mercury`
	},
	{
		NetID: `r1ng0fF1r3`,
		Name: `Johnny Cash`
	}
]