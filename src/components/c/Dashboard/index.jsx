import React, { PureComponent } from 'react'

import { Wrapper, Content, PreviewEmpty } from './styles'

class DashboardComponent extends PureComponent {
	render() {

		const {
			recentVideos,
			collections,
		} = this.props.viewstate

		return (
			<Wrapper>
				<Content header>
					<p>Recently Viewed</p>
				</Content>
				<Content>
					{recentVideos.length !== 0 ?
						recentVideos.map(item => (
							<p>preview video</p>
							// <PreviewVideo key={item.id} data={item} />
						))
						:
						<PreviewEmpty>no recent videos :(</PreviewEmpty>
					}
				</Content>
				<Content header>
					<p>Collections</p>
				</Content>
				<Content>
					{collections.length > 0 ?
						collections.map(id => (
							<p>preview collection</p>
							// <PreviewCollection key={id} data={collections[id]} />
						))
						:
						<PreviewEmpty>no collections :(</PreviewEmpty>
					}
				</Content>
			</Wrapper>
		)
	}
}

export const Dashboard = DashboardComponent
