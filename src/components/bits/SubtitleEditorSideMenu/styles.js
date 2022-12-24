import styled from 'styled-components'

const Style = styled.div`
	display: ${props => props.minimized !== false ? `initial` : `none`};
	padding: 20px;

	& .all-subs {
		margin-top: 1rem;
		padding-top: 2rem;
		scroll-behavior: smooth;
	}

	& .close-editor {
		width: 2rem;
		text-align: right;
		cursor: pointer;
		margin-right: 10px;
		margin-left: 90%;
	}

	& .title-sub {
		width: 19rem;
		text-align:left;
		cursor: pointer;
		margin-right: 100px;
		margin-left: 0.4%;
	}

	& .title-sub-disable {
		width: 19rem;
		text-align:left;
		cursor: pointer;
		margin-right: 100px;
		margin-left: 0.4%;
		border-color: red;
	}

	& .title-warn {
		color:red;
		font-weight: bold;
		visibility: visible;
	}

	& .title-warn-disable {
		visibility: hidden;
	}

	& .title {
		display: flex;

		& .title-label {
			width: 6rem;
		}
	}

	& .center {
		width: 100%;
		display: flex;
		font-size: 1.5rem;

		& .side-tab-input {
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

	& .sub-active {
    background-color: rgba(5, 130, 202, 0.3);
	}

	& .container {
		display: flex;
		flex-direction: column;

		& .sub-container {
			display: flex;
			justify-content: space-evenly;
			padding: 1rem;

			:hover {
				background-color: rgba(5, 130, 202, 0.3);
			}

			& .sub-text {
				width: 20rem;
				resize: none;
			}

			& .sub-start-end {
				display: flex;
				flex-direction: column;

				& .sub-start {
					width: 6.5rem;
					height: 2rem;
					margin-button: 0.5rem;
					padding-left: 0.3rem;
				}

				& .sub-end {
					width: 6.5rem;
					height: 2rem;
					margin-top: 0.5rem;
					padding-left: 0.3rem;
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
	margin-top: -1rem;
	border-radius: 5px;
	position: relative;
	z-index: 10;
	margin-bottom: -1rem;
	visibility: ${props => props.visibility === `visible` ? `visible` : `hidden`};

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
