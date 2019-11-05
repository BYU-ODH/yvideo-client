import styled from 'styled-components'

export const Title = styled.input`
	margin-left: -0.3rem;
	font-size: 1.8rem;
	font-weight: bold;
`

export const TitleEditButton = styled.div`
	color: ${props => props.editing ? `#0582CA` : `#a4a4a4;`};
	font-weight: bold;
	cursor: pointer;
	margin-top: 0;
	margin-left: 1rem;
`

export const TitleWarning = styled.p`
&& {color: #ff0000;
position: absolute;
margin: 0;
top: 2.9rem;
z-index: 100;
}
`