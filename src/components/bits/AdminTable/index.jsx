import React, { Component } from 'react'

import { objectIsEmpty } from 'lib/util'

import {
	Container,
	Table,
} from './styles'

export default class AdminTable extends Component {
	render() {
		const { headers, data } = this.props
		let counter = 0
		return (
			<Container>
				<Table>
					<thead>
						<tr>
							{headers.map(title => <th key={title}>{title}</th>)}
						</tr>
					</thead>
					<tbody>
						{Object.keys(data).map(key => {
							return <tr key={key}>
								{headers.map(title => {
									counter++
									console.log(data[key])
									return <td key={counter} >{String(data[key][title])}</td>
								})}
							</tr>
						})}
					</tbody>
				</Table>
			</Container>
		)
	}
}