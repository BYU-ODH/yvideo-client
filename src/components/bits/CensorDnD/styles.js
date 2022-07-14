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
