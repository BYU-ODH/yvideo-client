import styled from 'styled-components'

import { Link } from 'react-router-dom'

const Style = styled.div`
	padding: 3rem 5rem;
	margin: 0 10rem;
	max-width: 100vw;
	overflow: scroll;
	width: 20%;
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
		font-size: 1.4rem;
		text-align: left;
	}
`

export const StyledLink = styled(Link)`
	color: #0582CA;
`
