import styled from 'styled-components'

export const Style = styled.div`
	margin-left: 2rem

	& button {
		color: var(--light-blue);
		outline: none;
		text-align: center;
		cursor: pointer;
		background: none;
    border: none;

		:hover {
			color: var(--navy-blue);
		}
	}
`
export default Style

export const Slash = styled.span`
	display: ${props => props.disabled ? `none` : ``};

`

