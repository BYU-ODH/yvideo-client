import React, { Component } from 'react'

import {
	Table,
} from './styles'

export default class AdminTable extends Component {
	render() {
		const { headers, data } = this.props
		return (
			<Table>
				<thead>
					<tr>
						{headers.map(title => <th>{title}</th>)}
					</tr>
				</thead>
				<tbody>
					{data.map(item => {
						return <tr>
							{headers.map(title =>
								<td>{item[title]}</td>
							)}
						</tr>
					})}
				</tbody>
			</Table>
		)
	}
}