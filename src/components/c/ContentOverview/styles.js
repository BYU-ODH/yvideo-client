import styled, { keyframes, css } from 'styled-components'
import { Link } from 'react-router-dom'
import trashIcon from 'assets/trash_icon.svg'
import translationsBlack from 'assets/translation_black.svg'
import translations from 'assets/translation.svg'
import translationsLight from 'assets/translation_light.svg'
import captions from 'assets/captions.svg'
import captionsBlack from 'assets/captions_black.svg'
import captionsLight from 'assets/captions_light.svg'
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

	line-height: 1.5rem;
	letter-spacing: .05rem;
	font-size: 1.2rem;
	font-weight: bold;
	display: flex;
	width: fit-content;
  align-items: flex-start;
  justify-content: center;
`

export const Icon = styled.li`
	width: 2rem;
	height: 2rem;
	background-size: contain;
	list-style: none;

	& h3 {
		font-size: 10;
	}

	&.translation{
		background: url(${props => props.checked ? translationsBlack : translationsLight}) center no-repeat;
		display: block;
	}

	&.translation-always-on{
		background: url(${translations}) center no-repeat;
		position: relative;
		display: block;
	}

	&.captions {
		background: url(${props => props.checked ? captionsBlack : captionsLight}) center no-repeat;
		display: block;
	}

	&.annotations {
		background: url(${annotations}) center no-repeat;
		display: ${props => props.checked ? `block` : `none`};
	}

	&.caption-always-on{
		background: url(${captions}) center no-repeat;
		position: relative;
		display: block;
	}
`

export const ContentIcons = styled.div`
	width: 3.5rem;
	height: 3.5rem;
	background-size: contain;
	list-style: none;
	margin-bottom: 1rem;
	display: block;

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

	& .content-title {
		font-weight: 500;
		text-overflow: ellipsis;
		font-size: 17px;
	}


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
	color: ${props => props.published ? `var(--yellow)` : `#0582CA`};
	font-weight: bold;
	display: flex;
	line-height: 1.5rem;
	letter-spacing: .05rem;

	background: transparent;
	width: fit-content;

	border: none;

	cursor: pointer;
	outline: none;

`

export const RemoveButton = styled.button`
	color: var(--red);
	font-weight: bold;
	line-height: 1.5rem;
	letter-spacing: .05rem;
	display: flex;

	background: transparent;
	width: fit-content;

	border: none;

	cursor: pointer;
	outline: none;

`

export const TrashIcon = styled.span`
	background: url(${trashIcon}) center no-repeat;
	color: var(--red);
	height: 2.8rem;
	width: 1.65rem;
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
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
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
		grid-template-columns: 1fr 6rem 2.8rem;
		line-height: 2rem;
		margin-bottom: 1rem;
		font-size: 1.4rem;

		& > img {
			cursor: pointer;
		}
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
