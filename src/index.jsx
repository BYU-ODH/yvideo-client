/* eslint-disable function-paren-newline */

import React from 'react'
import ReactDOM from 'react-dom/client'

import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import store from 'services/store'

import { RootContainer } from 'containers'

const container = document.getElementById(`root`)
const root = ReactDOM.createRoot(container)
root.render(
	<Provider store={store}>
		<RootContainer />
	</Provider>,
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
// serviceWorker.register()
