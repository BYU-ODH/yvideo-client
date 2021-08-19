import styled from 'styled-components'

// export const ActiveBox = styled.div `
// 	height: ${props => props.height};
// 	width: ${props => props.width};
// 	top: ${props => props.top};
// 	left: ${props => props.left};
// 	border: 5px solid rgba(5, 130, 202,0.7);
// 	& canvas {
// 		width: 100%;
// 		height: 100%;
// 		background-color: transparent;
// 		backdrop-filter: blur(30px);
// 	}
// `
// export const BeforeBox = styled.div `
// 	height: ${props => props.height};
// 	width: ${props => props.width};
// 	top: ${props => props.top};
// 	left: ${props => props.left};
// 	border: 5px solid rgba(202, 5, 5,0.7);
// 	& canvas {
// 		width: 100%;
// 		height: 100%;
// 		background-color: transparent;
// 		backdrop-filter: blur(30px);
// 	}
// `
// export const AfterBox = styled.div `
// 	height: ${props => props.height};
// 	width: ${props => props.width};
// 	top: ${props => props.top};
// 	left: ${props => props.left};
// 	border: 5px solid rgba(5, 202, 12,0.7);
// 	& canvas {
// 		width: 100%;
// 		height: 100%;
// 		background-color: transparent;
// 		backdrop-filter: blur(30px);
// 	}
// `
export const CloseBox = styled.div `
	height: 7.5%;
	width: 7.5%;
	background-color: rgba(200,0,0,0.95);
	border: 3px solid rgba(200,0,0,0.8);
	position: absolute;
	top:2%;
	right:2%;
	z-index: 502;
	display: flex;
  justify-content: center;
  align-items: center;
`
export const BeforeButton = styled.div `
	height: 10%;
	width: 20%;
	background-color: rgba(255,255,255,0.95);
	border: 3px solid rgba(5, 130, 202,0.8);
	position: absolute;
	bottom: 2%;
	left: 2%;
	z-index: 500;
	display: flex;
  justify-content: center;
  align-items: center;
`
export const AfterButton = styled.div `
	height: 10%;
	width: 20%;
	background-color: rgba(255,255,255,0.95);
	border: 3px solid rgba(5, 130, 202,0.8);
	position: absolute;
	bottom: 2%;
	right: 2%;
	z-index: 501;
	display: flex;
  justify-content: center;
  align-items: center;
`