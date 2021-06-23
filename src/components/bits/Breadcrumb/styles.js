import styled from 'styled-components'

export const Style = styled.div`
	margin-left: 3rem

	& span {
		margin-left: 1rem
	}

	& button {
		font-size: 1.2rem;
		color: var(--light-blue);
		// background-color: var(--light-blue);
		outline: none;
		border: none;
		border-radius: 6px;
		text-align: center;
		cursor: pointer;
		font-weight:4300;
		padding: 8px 5px;
		// text-decoration: underline;

		:hover {
			background-color: var(--navy-blue);
		}
	}
`
export default Style

export const Slash = styled.span`
	display: ${props => props.disabled ? `none` : ``};

`

