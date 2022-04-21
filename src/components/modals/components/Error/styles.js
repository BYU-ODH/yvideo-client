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
	outline: none;
	cursor: pointer;
	float: right;
	justify-self: flex-end;
`
export const Banner = styled.div`
	border-bottom: 2px solid #0582ca;
	width: 100%;
`