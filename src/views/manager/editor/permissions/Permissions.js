import React from 'react'

import PermissionTable from './permissionTable/PermissionTable'

const Permissions = props => {
	return (
		<div>

			<PermissionTable header={`Courses`} placeholder={`Enter courseID`} data={courses} />

			<PermissionTable header={`TA / Faculty`} placeholder={`Enter netID or name`} data={tafaculty} />

			<PermissionTable header={`Audit Exceptions`} placeholder={`Enter netID or name`} data={auditors} />

		</div>
	)
}

export default Permissions

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