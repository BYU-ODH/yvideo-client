import styled from 'styled-components'

const Style = styled.div`
	display: ${props => props.minimized !== false ? `initial` : `none`};
	padding: 20px;
	overflow-y: scroll;

	& .allSubs {
		margin-top: 1rem;
		padding-top: 2rem;
	}

	& .closeEditor {
		width: 2rem;
		text-align: right;
		cursor: pointer;
		margin-right: 10px;
		margin-left: 90%;
	}

	& .title {
		display: flex;

		& .titleLabel {
			width: 6rem;
		}
	}

	& .center {
		width: 100%;
		display: flex;
		font-size: 1.5rem;

		& .sideTabInput {
			margin: auto 10px auto auto !important;
			padding: 0px 10px;
			width: 120px;
			height: 4rem;
			margin: 10px;
			border: 1px solid var(--royal-blue);
		}

		& label {
			margin: 15px auto 15px auto;
			width: 150px;
			text-align: left;
		}

		& p {
			font-size: 12px;
			margin: 15px auto 15px auto;
		}
	}

	& .sideButton {
		width: 50%;
		margin-left: 25%;
		border: none;
		background-color: var(--light-blue);
		height: 40px;
		color: white;
		border-radius: 5px;
		transition: .5s ease-out;
		cursor: pointer;

		&:active {
			border-radius: 5px;
			border: none;
			background-color: var(--navy-blue);
		}
	}

	& #sideTabMessage{
		margin-left: 10px;
		font-size: 1.3rem;
	}

	& #sideTabExplanation{
		margin-left: 10px;
		font-size: 1.3rem;
	}

	& .censorMenu {
		font-size: 1.5rem;
		& label {
			margin: 15px 5px 15px 15px;
			width: 150px;
			text-align: left;
		}

		& .tableHeader {
			width: 90%;
			margin-left: 10px;
			& th {
				width: 50px;
			}
		}
	}

	& .censorList {
		width: 100%;
		height: auto;
		max-height: 30vh;
		margin-left: 10px;
		overflow-y: scroll;
		position: relative;

		& td {
			display: inline-flex;
			width: 50px !important;
			margin: auto;
			& input {
				margin: auto;
				width: 90% !important;
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
			}

			& .trashIcon {
				margin: auto;
				cursor: pointer;
			}
		}

		& #loader {
			background-color: rgba(196, 196, 196, 0.7);
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bolder;
		}
	}

	& .addCensor {
		position: absolute;
		float: left;
		margin-left: 20px;
	}

	& .arrowDown {
		width: 100%;
		text-align: center;
	}

	& .subCard {
		border-bottom: 1px solid var(--light-blue);
		padding: 1rem;
	}
	& .subTitleCard {
		font-size: 2rem;
		border-bottom: 1px solid var(--light-blue);
		padding: 1rem;
		color: black;
		margin-bottom: 1rem;
	}

	& .subActive {
    background-color: #eee;
	}

	& .container {
		display: flex;
		flex-direction: column;

		& .subContainer {
			display: flex;
			justify-content: space-evenly;
			padding: 0.8rem 0;

			:hover {
				background-color: #eee;
			}

			& .subText {
				width: 20rem;
				resize: none;
			}

			& .subStartEnd {
				display: flex;
				flex-direction: column;

				& .subStart {
					width: 5rem;
					height: 2rem;
					margin-button: 0.5rem;
					padding-left: 0.8rem;
				}

				& .subEnd {
					width: 5rem;
					height: 2rem;
					margin-top: 0.5rem;
					padding-left: 0.8rem;
				}
			}

			& .subtitle-delete {
				:hover {
					cursor: pointer;
				}
			}
		}
	}

`
export const Icon = styled.div`
  background: url(${props => props.src}) center no-repeat;
  width: 20px;
  height: 16px;
	margin-left: 0.2rem;
	margin-top: -0.8rem;
	border-radius: 5px;
	position: relative;
	z-index: 1000;
	margin-bottom: -1rem;
	visibility: ${props => props.visibility ===`visible` ? `visible` : `hidden`};

	:hover {
		cursor: pointer;
	}
`
export const Help = styled.span`
	width: 20px;
	height: 20px;

	& img {
		width: 20px;
    height: 20px;
    position: absolute;
    right: -3px;
    bottom: 5px;
	}
`
export default Style