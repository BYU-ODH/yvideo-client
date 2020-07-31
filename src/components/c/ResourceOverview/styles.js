import styled, {css} from 'styled-components'
import trashIcon from 'assets/trash.svg'
import saveIcon from 'assets/save.svg'

const Style = styled.div`
	padding: 2rem;
`

export default Style

export const Preview = styled.div`
	display: flex;
	justify-content: flex-end;
	justify-content: space-between;

	& > div {
		display: flex;
		align-items: center;
	}
`

export const BoxRow = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 5px;
	box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
	background-color: white;
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
		margin-left: .5rem;
	}
`

export const InnerContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 2fr;
	padding-bottom: 15px;
`

export const Type = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const Column = styled.div`
	margin-right: 1.5rem;
	margin-left: 2.5rem;
	& > h4 {
		align-items: center;
		border-bottom: 1px solid #c4c4c4;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr 1.8rem;
		line-height: 2rem;
		margin-bottom: 1rem;
	}

	& > div {
		align-items: center;
		line-height: 2rem;
		margin-bottom: 1rem;
	}

	& textarea {
		width: 100%;
	}
`

export const RemoveIcon = styled.span`
	background: url(${trashIcon}) center no-repeat;
	height: 2.5rem;
	width: 2rem;
`

export const SaveIcon = styled.span`
	background: url(${saveIcon}) center no-repeat;
	height: 2.5rem;
	width: 2rem;
`

export const RemoveButton = styled.button`
	display: flex;
	align-items: center;
  justify-content: center;
	color: #ff4c4c;
	${TextButton}
	text-align: center !important;
	& > span {
		margin-left: .5rem;
	}
`

export const TitleEdit = styled.input`
	margin-left: 1rem;
	box-sizing: border-box;
`

export const FileUploadButton = styled.button`
	color: ${props => props.published ? `#FFBF00` : `#3CB371`};
	${TextButton}
`

export const Title = styled.form`
	display: flex;
	& > h4 {
		display: flex;
		align-items: center;
	}
`

export const ResourceTitle = styled.form`
	display: flex;
	margin-left: 1rem;
	& > h4 {
		display: flex;
		align-items: center;
	}
`

export const TypeButton = styled.button`
	background: transparent;
	border: none;
	outline: none;
	cursor: pointer;

	font-weight: ${props => props.selected ? `500` : `300`};
	color: ${props => props.selected ? `#0057B8` : `black`};
`