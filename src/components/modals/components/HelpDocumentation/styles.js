import styled from 'styled-components'
import HexLogo from 'assets/hexborder.svg'

export const Back = styled.div`
	position: fixed;
	display: flex;
	top: 0px;
	left: 0px;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0, 0.2);
`
export const Container = styled.div`
	margin: auto;
	width: 80vw;
	height: 50vh;
	background-color: white;
	border-radius: 10px;
	padding: 20px;
	position: relative;
`
export const CloseHelp = styled.span`
	height: 30px;
	width: 30px;

	& img {
		width: 30px;
		height: 30px;
		position: absolute;
		right: 10px;
		top: 10px;
	}
`