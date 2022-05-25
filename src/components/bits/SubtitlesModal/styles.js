import styled from 'styled-components'

const Style = styled.div`
	position: absolute;
	height: calc(100vh - 8.4rem);
	max-height: calc(100vh - 8.4rem);
	width: 100%;
	/* max-height: 65vh; */
	z-index: 100;
	display: ${props => props.visible ? `block` : `none`}
	background-color: rgba(0,0,0,0.9);

	& .inner {
		background-color: #ffffff;
		margin-top: 10%;
		margin-left: 20%;
		margin-right: 20%;
		margin-bottom: 0px;
		border-radius: 10px;
		overflow: none;
		border: 3px solid #0582ca;
		text-align: center;
		& .modalSection {
			width: 50%;
			margin-top: 2rem;
			margin-bottom: 2rem;
			&.modalButton{
				width: 80%;
				margin-right: 10%;
				margin-left: 10%;
				padding: 10px;
				border-radius: 2rem;
				border: 3px solid #0582ca;
				background-color: #ffffff;
				font-weight: 500;
				font-size:1.5rem;
				cursor: pointer;
				:hover{
					background-color: #0582ca;
					color: #ffffff;
				}
			}
		}
			& .modalSectionRight {
				width: 50%;
				margin-top: 2rem;
				margin-bottom: 2rem;
				margin-right: 25%;
				margin-left: 25%;
				border: 3px solid #0582ca;
				border-radius: 1rem;
				display: block;
				float: none;
				padding: 2rem;
				font-size: 1.5rem;
			}
		}
		& .closeModal{
			padding:5px;
			cursor: pointer;
			opacity:1;
			float: right;
			:hover {
				opacity:0.7:
			}
		}
	& .create-button {
		padding: 5px;
		border-radius: 1rem;
		border: 3px solid #0582ca;
		background-color: #ffffff;
		font-weight: 500;
		cursor: pointer;
		:hover{
			background-color: #0582ca;
			color: #ffffff;
		}
	}

	& .delete {
		background-color: #ffffff;
		margin-top: 15%;
		margin-left: 32%;
		margin-right: 32%;
		margin-bottom: 0px;
		border-radius: 10px;
		overflow: none;
		border: 3px solid #0582ca;
		text-align: center;
		padding: 1.5rem;

		& .delete-button {
			margin-top: 5rem;
			display: flex;
			justify-content: space-evenly;
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