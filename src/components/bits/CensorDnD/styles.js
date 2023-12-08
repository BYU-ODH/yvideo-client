import styled from 'styled-components'

export const CloseBox = styled.div `
	height: 8%;
	width: auto;
	background-color: rgba(255, 255, 255, 0.95);
	border: 2px solid rgba(5, 130, 202, 0.8);
	border-radius: 5px;
	position: absolute;
	top: 2%;
	right: 2%;
	z-index: 502;
	display: flex;
  justify-content: center;
  align-items: center;
	& img {
		width: 100%;
		height: 100%;
	}
	cursor: pointer;
`
export const BeforeButton = styled.div `
	height: 10%;
	width: 10%;
	background-color: rgba(255, 255, 255, 0.95);
	border: 2px solid rgba(5, 130, 202, 0.8);
	border-radius: 5px;
	position: absolute;
	bottom: 2%;
	left: 2%;
	z-index: 500;
	display: flex;
  justify-content: center;
  align-items: center;
	cursor: pointer;

	& img {
		padding-left: 11px;
	}
`
export const AfterButton = styled.div `
	height: 10%;
	width: 10%;
	background-color: rgba(255, 255, 255, 0.95);
	border: 2px solid rgba(5, 130, 202, 0.8);
	border-radius: 5px;
	position: absolute;
	bottom: 2%;
	right: 2%;
	z-index: 501;
	display: flex;
  justify-content: center;
  align-items: center;
	cursor: pointer;
`
