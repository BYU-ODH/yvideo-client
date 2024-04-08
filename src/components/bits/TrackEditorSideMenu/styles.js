import styled from 'styled-components'

const Style = styled.div`
	display: ${props => props.minimized !== false ? `initial` : `none`};
	padding: 20px;

	& .event-content {
    height: calc(100% - 20px - 10rem);
		overflow-y: scroll;
	}
	& .event-content ::-webkit-scrollbar{
			display: block !important;
	}

	& .clock {
		position: relative;
		width: 15px;
		padding-left:2%;
		cursor: pointer;
		right: 30px;
		height: 4rem;
		display: flex;
    align-items: center;
		margin-left: -22%;
		opacity:0%;
		:hover {
			opacity:1 !important;
		}
	}

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

		& .side-tab-input {
			margin:auto 20% 5% 5% !important;
			padding: 0px 10px;
			width: 100px;
			height: 4rem;
			border: 1px solid var(--royal-blue);
			:hover {
				+ .clock {
					-webkit-filter: invert(50%);
					filter: invert(50%);
					opacity:1;
					:hover {
						opacity:1;
					}
				}
			}
		}

		& .endInput {
			margin-left: 20% !important;
		}

		.blue-highlight {
			background-color: #002e5d;
			color: white;
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
		& #save-comment:disabled{
			cursor: not-allowed;
			background-color: #ddd;
		}
	}

	& .side-button {
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

	& #side-tab-message{
		margin-left: 10px;
		font-size: 1.3rem;
	}

	& #side-tab-explanation{
		margin-left: 10px;
		font-size: 1.3rem;
	}

	& .censor-menu {
		font-size: 1.5rem;
		height: 65%;
		overflow-y: scroll;

		& label {
			margin: 15px 5px 15px 15px;
			width: 150px;
			text-align: left;
		}

		& .table-header {
			margin-left: 10px;
		}
	}

	& .censor-list {
		width: 100%;
		height: 85%;
		margin-left: 10px;
		overflow-y: scroll;
		position: relative;
		top: 20px;
		& tr {
			& i{
				opacity: 0%
			}
		}
		& td {
			width: 15%;
			padding: 2px;
			margin: auto;
			:hover {
				& i {
					opacity: 100%;
					-webkit-filter: invert(50%);
					filter: invert(50%);
				}
			}
			& input {
				margin: auto;
				display: flex;
				display: inline-block;
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

		& #time-td {
			width: 23%;
		}

		& i {
			z-index: 25 !important;
			position: absolute;
			padding-top: 5px;
			right: 14px;
			cursor: pointer;
			left: 22%;
			:hover{
				-webkit-filter: invert(0%) !important;
				filter: invert(0%) !important;
			}
		}

		// & .clockColumn {
		// 	width: 5%;
		// }

		& .td-one {
			width:30% !important;
		}

		& .flex-box {
			display: flex;
			align-items: center;
			width: 100%;
			position:relative;
		}

		& .blur-clock {
			position: absolute;
			left: 75%;
			margin-right: 10%;
			margin-top: -5%;
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

	& .add-censor {
		float: left;
		margin-left: 5px;
		background: none;
		border: none;
		position: absolute;
		bottom: 0px;
		padding-top: 0px;
	}

	& .sub-card {
		border-bottom: 1px solid var(--light-blue);
		padding: 1rem;
	}

	& .sub-active {
		background-color: var(--navy-blue);
		color: white;
	}
	& .censor-active {
		background-color: var(--navy-blue);
		color: white;
	}
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

`
export const Icon = styled.div`
	/* transform: rotate(45deg); */
  background: url(${props => props.src}) center no-repeat;
	background-size: 25px;
	cursor: pointer;
  width: 25px;
  height: 25px;
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
