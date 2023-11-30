import styled from 'styled-components'

const Style = styled.div`
	overflow: none;
	margin-left: 10%;
	& p {
		font-size: 13px;
	}

	& button {
		display: inline;
		font-size: 1rem;
		color: ${props => props.color || `#0582ca`};
		background: transparent;
		border: 2px solid #0582ca;
		border-radius: 1rem;
		outline: none;
		cursor: pointer;
		padding: 3px;
		margin-left:3%;
	}

	& .content-cancel {
		color: #0582ca;
		:hover {
			background-color: #0582ca;
			color: #ffffff;
		}
	}

	& .content-delete {
		color: var(--red);
		border: 2px solid var(--red);
		:hover {
			background-color: var(--red);
			color: #ffffff;
		}
	}
`
export default Style