import styled from 'styled-components'

export const Style = styled.div`
	margin-top: 2.5rem;
	& a {
		margin-bottom: 2rem;
		text-decoration: none;
	}

	& span {
		font-size: 14px;

	}

	& .breadcrumb-item+.breadcrumb-item::before {
		float: none;
	}
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
	text-decoration: none;

	:hover {
		color: ${props => props.disabled ? `` : `var(--navy-blue)`};
}

`

