import styled, { keyframes, css} from 'styled-components'
import { Link } from 'react-router-dom'
import saveIcon from 'assets/save.svg'
import translation from 'assets/translation.svg'
import captions from 'assets/captions.svg'
import annotations from 'assets/annotations.svg'
import videoeditorIcon from 'assets/video-edit.svg'
import subtitlesIcon from 'assets/subtitles.svg'
import clipIcon from 'assets/clip-manager.svg'
import settingsIcon from 'assets/settings.svg'

const Style = styled.div`
	padding: 2rem;

	& * {
		:focus {
			outline: none;
		}
	}

	& .expired {
		& .content-title {
		width: 100%;
		position: relative;
		font-weight: 500;
		text-overflow: ellipsis;

			& span {
				position: absolute;
				right: 0px;
			}
		}

		& p {
			font-style: italic;
		}
	}

	@media screen and (max-width: 1000px) {
		padding: 1rem;
	}

`

export default Style

const shimmer = keyframes`
	0% {
		background-position: -30rem 0;
	}
	100% {
		background-position: 30rem 0;
	}
`

export const Preview = styled.div`

	display: flex;

	& > div:nth-child(1) {
		min-width: 14rem;
		margin: 0px 2rem 0px 0px;

		@media screen and (max-width: 1000px) {
			min-width: 0;
			margin: 0;
		}
	}

	& > div:nth-child(2) {

		/* flex: 1; */

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 0px 0px 0px 2rem;

		& .content-title {
			font-weight: 500;
			text-overflow: ellipsis;
		}

		& ul {
			margin: 0;
			padding: 0;

			display: grid;
			grid-template-columns: repeat(3, 2rem);
			grid-gap: .5rem;
		}

		& em {
			font-weight: lighter;
		}
	}

	& > div:nth-child(3) {
		flex: 1;
		display: flex;
		justify-content: flex-end;
	}

	& > div:nth-child(4) {
		display: flex;
		justify-content: flex-end;
	}

	@media screen and (max-width: 1000px) {
		align-items: center;
	}

	:hover{
		& .LinksWrapper{
			& .video-editor-wrapper{
				& .video-editor{
					background: url(${videoeditorIcon}) center no-repeat;
				}
			}

			& .subtitle-editor-wrapper{
				& .subtitle-editor {
					background: url(${subtitlesIcon}) center no-repeat;
				}
			}

			& .clip-manager-wrapper{
				& .clip-manager {
					background: url(${clipIcon}) center no-repeat;
				}
			}
		}
	}
`

const TextButton = css`
	background: transparent;
	border: none;
	color: #0582CA;
	outline: none;
	height: fit-content;
	cursor: pointer;
`
export const EditButton = styled.button`
	${TextButton}

	font-size: 1.5rem;
	font-weight: bold;
  display: flex;
	position: absolute;
	right: 0;
	margin-right: 5rem;
  align-items: center;
  justify-content: center;

  text-align: center !important;
  & > span {
    margin-right: .4rem;
  }
`
export const SaveIcon = styled.span`
  background: url(${saveIcon}) center no-repeat;
  height: 1.8rem;
  width: 1.65rem;
`

export const Icon = styled.li`
	width: 2rem;
	height: 2rem;
	background-size: contain;
	list-style: none;

	&.translation {
		background: url(${translation}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}

	&.captions {
		background: url(${captions}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}

	&.annotations {
		background: url(${annotations}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}
`

export const ContentIcons = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	background-size: contain;
	list-style: none;
	margin-bottom: 1rem;

	position: relative;
	left: 50%;
	-webkit-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	transform: translateX(-50%);
`

export const SettingsIcon = styled.button`
	width: 1.5rem;
	height: 1.5rem;
	margin-right: 1rem;
	margin-left: 3rem;
	background-size: contain;
	list-style: none;
	background: url(${settingsIcon}) center no-repeat;
	border: none;
	cursor: pointer;
`

export const TitleWrapper = styled.div`
	display: inline-flex;
`

export const Placeholder = styled.div`
	width: 10rem;
	height: 6.1rem;
	background-color: #eee;
	background-image: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
	background-repeat: no-repeat;

	animation: ${shimmer} 2s linear infinite;
	animation-fill-mode: forwards;
`

export const Thumbnail = styled.div`
	width: 10rem;
	height: 6.1rem;
	background-color: #eee;
	background-size: no-repeat;
	background-size: cover;
	background-image: url(${props => props.src});
`

export const TitleEdit = styled.input`
	position: relative;
	display: inline-block;
	top: -.3rem;
	left: -.2rem;
	margin-bottom: -.6rem;
`

export const PublishButton = styled.button`
	color: ${props => props.published ? `#FFBF00` : `#0582CA`};
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;

	background: transparent;
	width: fit-content;

	border: none;
	padding: 0;

	cursor: pointer;
	outline: none;
`

export const RemoveButton = styled.button`
	color: #ff4c4c;
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;

	background: transparent;
	width: fit-content;

	border: none;
	padding-left: 20px;

	cursor: pointer;
	outline: none;
`

export const StyledLink = styled(Link)`
	${TextButton} //reuses TextButton css
	/* color: black; */
	/* color: #c8c8c8; */
	color: white;
`

export const LinksWrapper = styled.div`
	align-items: center;
`

export const IconWrapper = styled.div`
	margin-left: 2rem;
	cursor: pointer;

	:hover{
		background-color: black !important;
    -webkit-filter: invert(100%);
    filter: invert(100%);
	}
`

export const InnerContainer = styled.div`
	display: grid;
	grid-gap: 2rem;
	margin-top: 10px;
	grid-template-columns: 1fr 1fr 1.5fr 1fr;
	padding: 2rem 3rem 3rem 3rem;
	border-radius: 5px;
	box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
	background-color: white;

	& .tags {
		display: flex;
		flex-wrap: wrap;
	}

	@media screen and (max-width: 1000px) {
		display: flex;
		flex-direction: column;
	}
`

export const Column = styled.div`
	margin-right: 1rem;

	& > h4 {
		align-items: center;
		border-bottom: 1px solid #c4c4c4;
		display: grid;
		grid-gap: 1rem;
		grid-template-columns: 1fr 1.8rem;
		line-height: 2rem;
		margin-bottom: 1rem;
		font-size: 1.4rem;
	}

	& div {
		display: flex;
		line-height: 2rem;
		margin-bottom: 1rem;
		font-size: 1.4rem;

		& > h4 {
			margin-right: 1rem;
		}
	}

	& textarea {
		width: 100%;
	}

	& .target-language {
		border-bottom: 1px solid #c4c4c4;
	}

	& #add-tag {
		border-radius: 10px;
    font-size: 1.3rem;
    color: white;
    background-color: var(--light-blue);
    border: 2px solid transparent;
    width: 5rem !important;
    margin: 0px 0px 0px 10px;
    font-weight: bold;

		:hover {
			border: 2px solid var(--navy-blue)
		}
	}

	& .words-modal {
		border-radius: 10px;
    font-size: 1.3rem;
    color: white;
    background-color: var(--light-blue);
    border: 2px solid transparent;
    width: 6rem !important;
    margin: 0px 0px 0px 5px;
    font-weight: bold;

		:hover {
			border: 2px solid var(--navy-blue)
		}
	}
`

export const Setting = styled.div`
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr 1.8rem;
	justify-content: space-between;
	margin-bottom: .5rem;

	& > p {
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: inherit;
	}
`
