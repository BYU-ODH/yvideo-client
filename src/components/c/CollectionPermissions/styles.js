import styled, { keyframes, css } from 'styled-components'

import searchIcon from 'assets/search.svg'
import iconSort from 'assets/admin-icon-sort.svg'

const Style = styled.div`
	padding: 2rem;
	& h4 {
		font-size: 1.4rem;
		font-weight: normal;
		margin-bottom: 1.6rem;
	}

	@media screen and (max-width: 1000px) {
		padding: 0.1rem;
	}
`

export default Style

export const Search = styled.form`
	position: relative;
	display: inline;

	& > input {
		background: white;
		border-radius: 1.3rem;
		border: none;
		box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
		height: 2.6rem;
		margin-bottom: 1.6rem;
		margin-right: 2rem;
		outline: none;
		padding-left: 1rem;
		padding-right: 1rem;
		width: 14rem;
		z-index: 1;
	}
`

export const SearchIcon = styled.span`
	background-size: contain;
	background: url(${searchIcon}) center no-repeat;
	height: 1.4rem;
	left: .7rem;
	position: absolute;
	top: .6rem;
	width: 1.4rem;
	z-index: 10;
`

export const DepartmentSelect = styled.input`
	background: white;
	border-radius: 1.3rem;
	border: none;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	height: 2.6rem;
	margin-bottom: 1.6rem;
	margin-right: 2rem;
	outline: none;
	padding-left: .6rem;
	padding-right: 1.2rem;
	width: 10rem;
`

export const CatalogInput = styled.input`
	background: ${props => props.disabled ? `#eee` : `white`};

	height: 2.6rem;
	width: 10rem;

	border: none;
	border-radius: 1.3rem;

	margin-bottom: 1.6rem;
	margin-right: 2rem;

	outline: none;

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	padding-left: 1rem;
	padding-right: 1.2rem;
`

export const SectionInput = styled.input`
	background: ${props => props.disabled ? `#eee` : `white`};

	height: 2.6rem;
	width: 10rem;

	border: none;
	border-radius: 1.3rem;

	margin-bottom: 1.6rem;
	margin-right: 2rem;

	outline: none;

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	padding-left: 1rem;
	padding-right: 1.2rem;
`

export const AddButton = styled.button`
	background: ${props => props.disabled ? `#eee` : `#0582CA`};
	color: ${props => props.disabled ? `initial` : `white`};

	height: 2.8rem;
	width: 5rem;

	border: none;
	border-radius: 1.3rem;

	outline: none;

	${props => props.disabled ? `` : `cursor: pointer;`}

	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);

	padding-left: 1rem;
	padding-right: 1.2rem;
`
export const AddManyButton = styled.button`
	height: 2.8rem;
	width: 10rem;
	margin-left: 1rem;
	border: none;
	border-radius: 1.3rem;
	box-shadow: 0px 2px 5px -1px rgba(0,0,0,0.15);
	white-space: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	cursor: pointer;
	background: #0582CA;
	color: white;
`

export const Table = styled.table`
	/* border: 1px solid black; */
	width: 400px;
	padding: 10px;

	& th {
		font-size: 1.4rem;
	}

	& td {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 2px;
		text-align: center;

		& img {
			opacity: .5;
			cursor: pointer;

			:hover {
				opacity: 1;
			}
		}
	}

	& .loading {
		& td {
			border-bottom: none;

			& img {
				opacity: 1;
			}
		}
	}

	@media screen and (max-width: 1000px) {
		width: 100%;
		padding: 0px;
		padding-bottom: 2rem;
	}
`

export const TableContainer = styled.div`
	display: flex;

	@media screen and (max-width: 1000px) {
		flex-direction: column;
	}
`

export const Sort = styled.button`
	background: url(${iconSort}) center no-repeat;
	border: none;
	height: 1.5rem;
	cursor: pointer;
`
const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(720deg);
	}
`

export const Loading = styled.td`
	width: 15rem;
	height: 15rem;

	& img {
		width: 15rem;
		height: 15rem;
	}

	${
	props => !props.loaded ?
		css`
		`
		:
		css`
			animation: ${rotate} 2.5s infinite;
		`
}
`

export const UserListTable = styled.div`

`

export const CourseTable = styled.div`
	margin-right: 5rem;

	@media screen and (max-width: 1000px) {
		margin-bottom: 2rem;

		& from {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
`

export const UserList = styled.div`
	margin-bottom: 5rem;

	@media screen and (max-width: 1000px) {
		margin-bottom: 2rem;
	}
`

export const TableHeader = styled.div`
	& div {
		@media screen and (max-width: 1000px) {
			text-align: center;
			padding-bottom: 0rem;
		}
		
		@media screen and (max-width: 320px) {
			text-align: center;
			padding-bottom: 1rem;
		}
	}
`