import styled from 'styled-components'

const Style = styled.div`
	overflow: none;

	& .content-cancel {
		margin: 5px 2rem 0px 27%;
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

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `#0582ca`};
	background: transparent;
	border: 2px solid #0582ca;
	border-radius: 1rem;
	outline: none;
	cursor: pointer;
	padding: 3px;
`