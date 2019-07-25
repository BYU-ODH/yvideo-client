/* eslint-disable array-bracket-newline */

import React from 'react'

import { Container, Table, RemoveButton } from './styles'

const PermissionTable = props => {

	const { data } = props

	const handleRemove = e => {
		e.preventDefault()
		alert(`This isn't ready yet!`)
	}

	return (
		<Container>
			<Table>
				<thead>
					<tr>
						{
							data[0] !== undefined && Object.keys(data[0]).map((column, index) => <th key={index}>{column}</th>)
						}
						<th className='small'></th>
					</tr>
				</thead>
				<tbody>
					{
						// data !== undefined && data.map(item => item.map((value, index) => ))
						data !== undefined && data.map((item, index) => <tr key={index}>
							{
								Object.keys(item).map((key, index2) => <td key={index2}>{item[key]}</td>)
							}
							<td><RemoveButton onClick={handleRemove} /></td>
						</tr>)
					}
				</tbody>
			</Table>

		</Container>
	)
}

export default PermissionTable
