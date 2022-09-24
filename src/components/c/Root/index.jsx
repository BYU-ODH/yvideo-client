import React, { PureComponent } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
	Load,
	Error,
} from 'components'

import {
	Modal,
	Tooltip,
} from 'components/bits'

import {
	HeaderContainer,
	MenuContainer,
} from 'containers'

class Root extends PureComponent {

	render() {

		const {
			user,
			loading,
			modal,
			adminEndpoints,
			labAssistantEndpoints,
			instructorEndpoints,
			studentEndpoints,
			unauthEndpoints,
		} = this.props.viewstate

		const renderRoute = (entry, index) => {
			const endpoints = entry.endpoints
			const element = entry.element

			return (
				<React.Fragment key={index}>
					{
						endpoints.length === 1 ?
							<Route path={endpoints[0]} element={element}/>
							:
							endpoints.length === 2 ?
								<Route path={endpoints[0]} element={element}>
									<Route path={endpoints[1]} element={element} />
								</Route>
								:
								<Route path={endpoints[0]} element={element}>
									<Route path={endpoints[1]} element={element}>
										<Route path={endpoints[2]} element={element}/>
									</Route>
								</Route>
					}
				</React.Fragment>
			)
		}

		const renderError = (entry, index) => {
			const endpoints = entry.endpoints
			return (
				<React.Fragment key={index}>
					<Route path={endpoints[0]} element={<Error error='403' message={`You don't have permission to access this page`} />} />
				</React.Fragment>
			)
		}

		return (
			<Router>
				{ user ?
					<>
						<HeaderContainer />
						<MenuContainer />
						<Routes>

							{
								adminEndpoints?.map((adminEntry, index) =>
									user.roles === 0 ?
										renderRoute(adminEntry, index)
										:
										renderError(adminEntry, index)
								)
							}

							{
								labAssistantEndpoints?.map((assistEntry, index) =>
									user.roles <= 1 ?
										renderRoute(assistEntry, index)
										:
										renderError(assistEntry, index)
								)
							}

							{
								instructorEndpoints?.map((instructorEntry, index) =>
									user.roles <= 2 ?
										renderRoute(instructorEntry, index)
										:
										renderError(instructorEntry, index)
								)
							}

							{
								studentEndpoints?.map((studentEntry, index) =>
									user.roles <= 3 ?
										renderRoute(studentEntry, index)
										:
										renderError(studentEntry, index)
								)
							}
							<Route path='*' element={<Error error='404' message={`You've wandered too far`} />} />
						</Routes>
					</>
					:
					<>
						<Routes>
							{
								unauthEndpoints?.map((unauthEntry, index) =>
									renderRoute(unauthEntry, index)
								)
							}
							<Route path='*' element={<Error error='404' message={`You've wandered too far`} />} />
						</Routes>
					</>
				}

				<Load loading={loading} />
				<Modal active={modal.active} />
				<Tooltip />
			</Router>
		)
	}
}
export default Root
