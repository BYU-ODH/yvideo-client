import styled from 'styled-components'

const Style = styled.div`
	padding: 3rem 5rem;
	margin: 0 2rem;
	max-width: 100vw;
	overflow: scroll;
`

export default Style

export const Table = styled.table`
	background: white;
	box-shadow: 0 2px 5px -1px rgba(0,0,0,0.15);

	& th {
		padding: 1rem;
		text-align: left;
	}

	& td {
		padding: 1rem;
		text-align: left;
	}
`
