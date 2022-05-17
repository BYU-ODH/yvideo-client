import React, { PureComponent } from 'react'

import { LabAssistantTable } from 'components/bits'

import Style, { Search, SearchIcon, FeedbackMessage } from './styles'

export class LabAssistant extends PureComponent {
	render() {

		const {
			data,
			placeholder,
			searchQuery,
			showResource,
			isSubmitted,
		} = this.props.viewstate

		const {
			updateSearchBar,
			handleSubmit,
			handleShowResource,
		} = this.props.handlers

		const setNoCollections = () => {
			setTimeout(() => {
				if(document.getElementById(`no-matched-users`) !== null)
					document.getElementById(`no-matched-users`).innerHTML = `<p>No users matched your search</p>`
			}, 2000)
		}

		return (
			<Style>
				<span></span>
				<Search onSubmit={handleSubmit}>
					<SearchIcon />
					<input type='search' placeholder={placeholder} onChange={updateSearchBar} value={searchQuery} />
					<button type='submit'>Search</button>
				</Search>
				{isSubmitted && data !== null &&
					<>
						{data.length > 0 ?
							<LabAssistantTable data={data} show={showResource} handleShowResource={handleShowResource}/>
							:
							<>
								<FeedbackMessage id='no-matched-users'><p>Loading..</p></FeedbackMessage>
								<p>{	setNoCollections() }</p>
							</>
						}
					</>
				}

			</Style>
		)
	}
}

export default LabAssistant
