import styled from 'styled-components'

const Style = styled.div`
	width: 60vw;
	min-height: 35vh;
	height: auto;

	& #close-modal {
		position: absolute;
		right: -37px;
		top: -28px;
		cursor: pointer;
	}

	& #words-container {
		display: flex;
		width: 100%;
		height: 75%;

		& #translation-container {
			width: 60%;
			height: 100%;
			border: none;
			border-right:  1px solid rgba(0, 0, 0, 0.5);
		}
	}

	& #subtitles-selection {
		display: flex;
		align-items: center;
		margin-bottom: 20px;

		& p {
			font-size: 1.4rem;
		}
	}

	& h2 {
		position: relative;
		display: flex;
		align-items: center;
		padding-bottom: 3px;
		border-bottom: 1.5px solid rgba(0, 0, 0, 0.9);
	}

	& h4 {
		font-size: 1.4rem !important;
		margin-bottom: 10px;
	}
`
export const Select = styled.select`
	width: 100px;
	height: 25px;

	border: none;
	border-bottom: 1px solid black;
	background-color: transparent;
	font-size: 1.4rem;
	font-weight: 500;

	:focus {
		outline: none;
	}
`
export const Translation = styled.div`
	width: 100%;
	/* border: 1px solid red; */
`
export const TranslationCheck = styled.div`
	width: 100%;
	/* border: 1px solid green; */

	& div {
		display: flex;
		align-items: center;

		& input {
			width: 120px;
			border-top: none;
			border-right: none;
			border-left: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.3);
			margin-right: 5px;

			:focus {
				outline: none;
				border-bottom: 1px solid #242F36;
			}
		}
	}
`

export const ImportantWords = styled.div`
	width: 40%;
	height: 100%;
	border: none;
	padding-left: 10px;

	& input {
		width: 120px;
		border-top: none;
		border-right: none;
		border-left: none;
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		margin-right: 5px;

		:focus {
			outline: none;
			border-bottom: 1px solid #242F36;
		}
	}

	& .tags {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
`
export const Button = styled.button`
	border-radius: 10px;
	font-size: 1.3rem;
	color: white;
	background-color: rgba(5, 130, 202, .9);
	border: 2px solid transparent;
	width: 7rem !important;
	height: 20px;
	text-align: center;
	margin: 0px 0px 0px 10px;
	font-weight: bold;
	outline: 2px solid var(--navy-blue)

	:hover {
		border: 2px solid var(--navy-blue)
	}
`

export default Style
