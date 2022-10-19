import styled from 'styled-components'

export const Style = styled.div`
	margin-left: 2rem;
`
export default Style

export const Slash = styled.span`
	display: ${props => props.disabled && `none`};

`

export const Button = styled.button`
	color: ${props => props.disabled ? `black` : `var(--light-blue)`};
	outline: none;
	text-align: center;
	cursor: ${props => props.disabled ? `default` : `pointer`};
	background: none;
	border: none;

	:hover {
		color: ${props => props.disabled ? `` : `var(--navy-blue)`};
}

`

