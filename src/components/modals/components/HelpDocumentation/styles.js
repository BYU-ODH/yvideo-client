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
	height: auto;
	background-color: white;
	border-radius: 10px;
	padding: 20px;
	position: relative;
	text-align: center;

	& #content {
		width: 80%;
		margin: auto;
		text-align: left;

		& .large-img{
			flex-direction: column;
			& img {
				width: 100%;
			}
		}

		& .section {
			font-size: 1.5rem;
			padding: 10px;
			display: flex;

			& p {
				margin: auto;
				flex: 1;
				line-height: 20px;

				& ul {
					text-align: left;
					border: 1px solid red;
				}
			}

			& img {
				margin: auto;
			}
		}
	}

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