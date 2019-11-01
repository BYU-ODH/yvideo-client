/* eslint-disable array-bracket-newline */
import React from 'react'
import { connect } from 'react-redux'

import { Container, Table, RemoveButton } from './styles'

const PermissionTable = props => {

	const { data, removeFunc, user } = props

	return (
		<Container>
			<Table>
				<thead>
					{
						data.length > 0 &&
						<tr>
							{Object.keys(data[0])
								.map((column, index) =>
									column !== `id` &&
									<th key={index}>{column}</th>)}
							<th className='small'></th>
						</tr>
					}
				</thead>
				<tbody>
					{
						data !== undefined && data.map((item, index) =>
							<tr key={index}>
								{
									Object.keys(item)
										.map((key, index2) =>
											key !== `id` &&
											<td key={index2}>{item[key]}</td>)
								}
								<td>
									{
										item.NetID === user.username ||
										<RemoveButton
											data-item={`${JSON.stringify(item)}`}
											onClick={removeFunc}
										/>
									}
								</td>
							</tr>
						)
					}
				</tbody>
			</Table>

		</Container>
	)
}

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(PermissionTable)
