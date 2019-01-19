import React, { Component } from 'react'
import { createGlobalStyle } from 'styled-components'

import roboto from './Fonts/Roboto/Roboto-Regular.ttf'
import robotomono from './Fonts/Roboto_Mono/RobotoMono-Regular.ttf'

class Global extends Component {
	shouldComponentUpdate() {
		return false
	}
	render() {
		return (
			<SGlobal />
		)
	}
}

const SGlobal = createGlobalStyle`
	@font-face {
		font-family: 'Roboto';
		src: url(${roboto});
	}

	@font-face {
		font-family: 'Roboto Mono';
		src: url(${robotomono});
	}


	* {
		margin: 0;
	}

	html {
		font-family: 'Roboto';
		font-size: 10px;
		line-height: 10px;
	}

	body {
		font-size: 1.2rem;
		line-height: 1.4rem;
	}
`

export default Global