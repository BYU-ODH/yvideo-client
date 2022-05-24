import styled from 'styled-components'

const Style = styled.div`
	overflow: none

	& .inner {
		background-color: #ffffff;
		overflow: none;
		text-align: center;
		& .header {
			display: flex;
			flex-direction: row;
			justify-content: center;

			& img {
				position: absolute;
				cursor: pointer;
				right: 17px;
				top: 16px;
			}
		}

		& table {
			width: 100%;
		}

		& .modalSection {
			& .modalButton {
				width: 100%;
				padding: 10px;
				border-radius: 2rem;
				border: 3px solid #0582ca;
				font-weight: 500;
				font-size: 1.5rem;
				cursor: pointer;
				:hover {
					background-color: #0582ca;
					color: #ffffff;
				}
			}
		}
			& .modalSectionRight {
				width: 61%;
				margin-top: 2rem;
				margin-left: 25%;
				border: 3px solid #0582ca;
				border-radius: 1rem;
				display: block;
				padding: 2rem;
				font-size: 1.5rem;
			}
		}
	& .modalSectionRightTitle {
		margin: 10px;
	}

	& #subFileInput {
		margin: 35px 0px 25px 0px;
		width: 100%;
		display: block;
	}

	& .create-button {
		margin: 10px;
		padding: 5px;
		border-radius: 1rem;
		border: 3px solid #0582ca;
		background-color: #ffffff;
		font-weight: 500;
		cursor: pointer;
		:hover {
			background-color: #0582ca;
			color: #ffffff;
		}
	}

	& .delete-div {
		border-radius: 10px;
		overflow: none;
		border: 3px solid #0582ca;
		text-align: center;
		padding: 1.5rem;

		& .delete-buttons {
			margin-top: 5rem;
			display: flex;
			justify-content: space-evenly;
		}

		& .url-content-cancel {
			:hover {
				background-color: #0582ca;
				color: #ffffff
			}
		}

		& .url-content-delete {
			color: #ff4c4c;
			border: 3px solid #ff4c4c;
			:hover {
				background-color: #ff4c4c;
				color: #ffffff;
			}
		}
	}
`
export default Style

export const Button = styled.button`
	font-size: 1.5rem;
	color: ${props => props.color || `black`};
	background: transparent;
	border: 3px solid #0582ca;
	border-radius: 1rem;
	outline: none;
	cursor: pointer;
	padding: 5px;
`