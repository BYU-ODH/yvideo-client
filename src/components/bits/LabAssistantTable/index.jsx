import React from 'react'

import Style, { Table } from './styles'

import { Link } from 'react-router-dom'

const LabAssistantTable = props => {

	const { data } = props

	if (data === null || !data.length || data[0] === undefined) return null

	return (
		<Style>
			<Table>
				<thead>
					<tr>
						<th>
							Name
						</th>
						<th>
						</th>
						<th>
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) =>
						<tr key={item.id}>
							<td data-testid='name'>{item.name}</td>
							<td className='view-collections'><Link to={`/lab-assistant-manager/${item.id}`}>Collections</Link></td>
						</tr>,
					)}
				</tbody>
			</Table>
		</Style>
	)
}

export default LabAssistantTable