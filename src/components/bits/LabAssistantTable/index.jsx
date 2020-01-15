import React, { PureComponent } from 'react'

import Style, { Table, ItemEdit } from './styles'

export default class LabAssistantTable extends PureComponent {

	render() {
		const { data } = this.props

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
						</tr>
					</thead>
					<tbody>
						{data.map((item, index) =>
							<tr key={item.id}>
								<td>{item.name}</td>
								<td><ItemEdit /></td>
							</tr>,
						)}
					</tbody>
				</Table>
			</Style>
		)
	}
}