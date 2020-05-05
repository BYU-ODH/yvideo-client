import styled from 'styled-components'

import iconEdit from 'assets/admin-icon-edit.svg'
import iconFilter from 'assets/admin-icon-filter.svg'
import iconSort from 'assets/admin-icon-sort.svg'

const Style = styled.div`
	padding: 3rem 5rem;
	margin: 0 2rem;
	width: 90%;
	max-width: 100vw;
	overflow: scroll;
`

export default Style

export const Table = styled.table`
	background: white;
	box-shadow: 0 2px 5px -1px rgba(0,0,0,0.15);
	border-radius: 10px;
	width: 100%;

	& th {
		padding: 1.5rem;
		font-size: 1.5rem;
		text-align: left;
		border-bottom: 0.7px solid rgba(0,0,0,0.15)
	}

	& td {
		padding: 1.5rem;
		font-size: 1.3rem;
		text-align: left;
	}
	`

export const Filter = styled.button`
	background: url(${iconFilter}) center no-repeat;
	border: none;
	height: 1.5rem;
	cursor: pointer;`

export const Sort = styled.button`
	background: url(${iconSort}) center no-repeat;
	border: none;
	height: 1.5rem;
	cursor: pointer;`

export const ItemEdit = styled.button`
	background: url(${iconEdit}) center no-repeat;
	border: none;
	width: 2.5rem;
  height: 2rem;
	cursor: pointer;
	&:focus{
		outline: 0;
	}
`