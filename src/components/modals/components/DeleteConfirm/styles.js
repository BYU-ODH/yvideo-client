import styled from 'styled-components'

const Style = styled.div`
	overflow: none

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
