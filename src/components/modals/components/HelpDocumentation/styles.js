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
	max-height: 70vh;
	height: auto;
	overflow-y: scroll !important;
	background-color: white;
	border-radius: 10px;
	padding: 0px 20px 20px 20px;
	position: relative;
	text-align: center;
	overflow: scroll;

	& #title {
		position: fixed;
		width: 80vw;
		height: 50px;
		text-align: center;
		padding-top: 5px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.5);
		background-color: white;
	}

	& #content {
		width: 80%;
		margin: 70px auto auto auto;
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
    top: 10px;
    right: 10px;
	}
`