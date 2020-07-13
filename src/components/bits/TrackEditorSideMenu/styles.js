import styled from 'styled-components'

const Style = styled.div`
	display: ${ props => props.minimized !== false ? ('initial') : ('none')};
	padding: 20px;

	& .closeEditor {
		width: 2rem;
		text-align: right;
		cursor: pointer;
		float: right;
		margin-right: 10px;
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
		height: 30vh;
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

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

`
export default Style