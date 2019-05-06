import styled from 'styled-components'

export const MainBody = styled.div`
	& ::-webkit-scrollbar {
		display: none;
	}

	& * {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
`