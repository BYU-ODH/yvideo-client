import styled, {css} from 'styled-components'
import trashIcon from 'assets/trash.svg'
import saveIcon from 'assets/save.svg'

const Style = styled.div`
	padding: 2rem;
`

export default Style

export const BoxRow = styled.div`
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
	background-color: white;

	& > div {
		display: grid;
		padding-top:1rem;
		padding-bottom: 1rem;
		padding-right: 1rem;
	}
`

export const FileTitle = styled.div`
	display: flex;
	margin-left: 1rem;
	& > h4 {
		display: flex;
		align-items: center;
	}
`

export const Buttons = styled.div`
	display: flex;
`

const TextButton = css`
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;
	background: transparent;
	border: none;
	cursor: pointer;
	outline: none;
`

export const EditButton = styled.button`
	color: #0582CA;
	${TextButton}

	display: flex;
	align-items: center;
  justify-content: center;
	text-align: center !important;
	& > span {
		margin-right: 0.1rem;
	}
`

export const SaveIcon = styled.span`
	background: url(${saveIcon}) center no-repeat;
	height: 2.5rem;
	width: 2rem;
`

export const InnerContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	padding: 15px;
`

export const Column = styled.div`
	/* margin-right: 1.5rem; */
	margin-left: 1.5rem;

	& > div {
		display: flex;
		align-items: center;
		line-height: 2rem;
		margin-bottom: 1rem;

		& > h4 {
			margin-right: 0.5rem;
		}
	}

	& textarea {
		margin-top: 1rem;
		width: 100%;
	}
`

export const RemoveIcon = styled.span`
	background: url(${trashIcon}) center no-repeat;
	height: 2.5rem;
	width: 2rem;
`

export const RemoveButton = styled.button`
	display: flex;
	align-items: center;
  justify-content: center;
	color: var(--red);
	${TextButton}
	text-align: center !important;

	& > span {
		margin-right: .1rem;
	}
`

export const CategorySelect = styled.select`
	background: white;
	font-size: 1.5rem;

	border: none;
	border-radius: 2rem;

	padding: 0 1.25rem;
	text-align-last:center;

	outline: none;
	box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.15);
`
