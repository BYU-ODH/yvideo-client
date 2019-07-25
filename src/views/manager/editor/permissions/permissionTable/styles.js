import styled from 'styled-components'

import remove from 'assets/collections/delete.svg'

export const Container = styled.div`
	overflow-x: auto;
`

export const Table = styled.table`
	background: white;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	border-collapse: collapse;

	table-layout: fixed;

	margin-bottom: 3rem;

	& > thead {
		border-bottom: 2px solid #eee;

		& th {
			padding: 1rem;
			text-align: left;
			min-width: 20rem;

			&.small {
				min-width: 2rem;
			}
		}
	}

	& > tbody {
		& td {
			padding: 1rem;
		}
	}
`

export const RemoveButton = styled.button`
	height: 2rem;
	width: 2rem;
	border: none;
	background: url(${remove}) center no-repeat;
	background-size: contain;
	outline: none;
	cursor: pointer;
`