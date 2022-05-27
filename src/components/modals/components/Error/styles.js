import styled from 'styled-components'
export const Style = styled.div`
	margin: auto;
	width: 50vw;
	max-height: 70vh;
	height: auto;
	overflow-y: scroll !important;
	background-color: white;
	border-radius: 5px;
	position: relative;
	text-align: center;
`
export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: none;
	cursor: pointer;
	float: right;
	justify-self: flex-end;
`
export const Banner = styled.div`
	border-bottom: 2px solid #0582ca;
	width: 100%;
`

export const h1Style = {
	textAlign:`center`,
	justifySelf:`center`,
	margin:`auto`,
	width: `50%`,
	padding: `20px`,
}

export const h2Style = {
	padding: `20px`,
	textAlign:`left`,
	lineHeight: 1.5,
}