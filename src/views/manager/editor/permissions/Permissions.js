import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getCollectionPermissions, updateCollectionPermissions } from 'redux/actions'

import { Container, Search, DepartmentSelect, CatalogInput, SectionInput, AddButton } from './styles'

import PermissionTable from './permissionTable/PermissionTable'

class Permissions extends Component {

	state = {
		department: `*`,
		catalog: ``,
		section: ``,
		tafaculty: ``,
		exception: ``,
		disabled: {
			catalog: true,
			section: true,
			submit: true,
			tafaculty: true,
			exception: true
		}
	}

	componentDidMount = () => {
		const { collection, getCollectionPermissions } = this.props
		if (collection.id !== null) getCollectionPermissions(this.props.collection.id)
	}

	componentDidUpdate = prevProps => {
		const { collection, getCollectionPermissions } = this.props
		if (collection !== prevProps.collection && collection !== undefined)
			getCollectionPermissions(this.props.collection.id)
	}

	handleDepartmentChange = e => {
		this.setState({
			department: e.target.value,
			catalog: ``,
			section: ``,
			disabled: {
				...this.state.disabled,
				catalog: e.target.value === `*`,
				section: true,
				submit: e.target.value === `*`
			}
		})
	}

	handleCatalogChange = e => {
		this.setState({
			department: this.state.department,
			catalog: e.target.value,
			section: ``,
			disabled: {
				...this.state.disabled,
				catalog: false,
				section: e.target.value === ``,
				submit: false
			}
		})
	}

	handleSectionChange = e => {
		this.setState({
			department: this.state.department,
			catalog: this.state.catalog,
			section: e.target.value,
			disabled: {
				...this.state.disabled,
				catalog: false,
				section: false,
				submit: false
			}
		})
	}

	handleTaFacultyChange = e => {
		this.setState({
			...this.state,
			tafaculty: e.target.value,
			disabled: {
				...this.state.disabled,
				tafaculty: e.target.value === ``
			}
		})
	}

	handleExceptionChange = e => {
		this.setState({
			...this.state,
			exception: e.target.value,
			disabled: {
				...this.state.disabled,
				exception: e.target.value === ``
			}
		})
	}

	addCourse = e => {
		const { department, catalog, section } = this.state

		const body = { department }

		if (catalog) body.catalogNumber = catalog
		if (section) body.sectionNumber = section

		e.preventDefault()
		this.props.updateCollectionPermissions(body, `/api/collection/${this.props.collection.id}/linkCourses`)
	}

	addTaFaculty = e => {
		e.preventDefault()
		this.props.updateCollectionPermissions(this.state.tafaculty, `/api/collection/${this.props.collection.id}/addTA`)
	}

	addException = e => {
		e.preventDefault()
		this.props.updateCollectionPermissions(this.state.exception, `/api/collection/${this.props.collection.id}/addException`)
	}

	render() {

		const { collection } = this.props
		const { permissions = {} } = this.props.permissionsCache

		if (permissions[collection.id] === undefined) return null

		const { admins = [], courses = [], exceptions = [] } = permissions[collection.id]

		const reducedCourses = courses.map(item => ({
			Department: item.department,
			Catalog: item.catalogNumber,
			Section: item.sectionNumber
		}))

		const reducedAdmins = admins.map(item => ({
			Name: item.name,
			NetID: item.username,
			Email: item.email
		}))

		const { department, catalog, section, disabled, tafaculty, exception } = this.state

		return (
			<Container>

				<h4>Courses</h4>

				<form onSubmit={this.addCourse}>
					<DepartmentSelect value={department} onChange={this.handleDepartmentChange}>
						<option value='*' disabled>Select Department</option>
						{departments.map((item, index) =>
							<option value={item.code} key={index}>
								{`${item.code} - ${item.name}`}
							</option>)}
					</DepartmentSelect>
					<CatalogInput type='number' min='0' onChange={this.handleCatalogChange} value={catalog} placeholder='Enter Catalog Number' disabled={disabled.catalog} />
					<SectionInput type='number' min='0' onChange={this.handleSectionChange} value={section} placeholder='Enter Section Number' disabled={disabled.section} />
					<AddButton type='submit' disabled={disabled.submit}>Add</AddButton>
				</form>
				<PermissionTable placeholder={`Enter courseID`} data={reducedCourses} />

				<h4>TA / Faculty</h4>

				<Search onSubmit={this.addTaFaculty}>
					<input type='search' placeholder={`Enter netID or name`} onChange={this.handleTaFacultyChange} value={tafaculty} />
					<AddButton type='submit' disabled={disabled.tafaculty}>Add</AddButton>
				</Search>
				<PermissionTable data={reducedAdmins} />

				<h4>Audit Exceptions</h4>

				<Search onSubmit={this.addException}>
					<input type='search' placeholder={`Enter netID or name`} onChange={this.handleExceptionChange} value={exception} />
					<AddButton type='submit' disabled={disabled.exception}>Add</AddButton>
				</Search>
				<PermissionTable data={exceptions} />

			</Container>
		)
	}
}

const mapStateToProps = state => ({
	state,
	permissionsCache: state.permissionsCache
})

const mapDispatchToProps = {
	getCollectionPermissions,
	updateCollectionPermissions
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)

const departments = [
	{
		code: `A HTG`,
		name: `American Heritage`
	},
	{
		code: `ACC`,
		name: `Accounting`
	},
	{
		code: `AEROS`,
		name: `Aerospace Studies`
	},
	{
		code: `AFRIK`,
		name: `Afrikaans`
	},
	{
		code: `AM ST`,
		name: `American Studies`
	},
	{
		code: `ANES`,
		name: `Ancient Near Eastern Studies`
	},
	{
		code: `ANTHR`,
		name: `Antrhopology`
	},
	{
		code: `ARAB`,
		name: `Arabic`
	},
	{
		code: `ARMEN`,
		name: `Armenian`
	},
	{
		code: `ART`,
		name: `Art`
	},
	{
		code: `ARTED`,
		name: `Art Education`
	},
	{
		code: `ARTHC`,
		name: `Art History and Curatorial Studies`
	},
	{
		code: `ASIAN`,
		name: `Asian Studies`
	},
	{
		code: `ASL`,
		name: `American Sign Language`
	},
	{
		code: `BIO`,
		name: `Biology`
	},
	{
		code: `BULGN`,
		name: `Bulgarian`
	},
	{
		code: `C S`,
		name: `Computer Science`
	},
	{
		code: `CAMBO`,
		name: `Cambodian`
	},
	{
		code: `CANT`,
		name: `Cantonese`
	},
	{
		code: `CE EN`,
		name: `Civil and Environmental Engineering`
	},
	{
		code: `CEBU`,
		name: `Cebuano`
	},
	{
		code: `CFM`,
		name: `Construction and Facilities Management`
	},
	{
		code: `CH EN`,
		name: `Chemical Engineering`
	},
	{
		code: `CHEM`,
		name: `Chemistry and Biochemistry`
	},
	{
		code: `CHIN`,
		name: `Chinese - Mandarin`
	},
	{
		code: `CL CV`,
		name: `Classical Civilization`
	},
	{
		code: `CLSCS`,
		name: `Classics`
	},
	{
		code: `CMLIT`,
		name: `Comparative Literature`
	},
	{
		code: `CMPST`,
		name: `Comparative Studies`
	},
	{
		code: `COMD`,
		name: `Communication Disorders`
	},
	{
		code: `COMMS`,
		name: `Communications`
	},
	{
		code: `CPSE`,
		name: `Counseling Psychology and Special Education`
	},
	{
		code: `CREOL`,
		name: `Hatian Creole`
	},
	{
		code: `CSANM`,
		name: `Computer Science Animation`
	},
	{
		code: `DANCE`,
		name: `Dance`
	},
	{
		code: `DANSH`,
		name: `Danish`
	},
	{
		code: `DES`,
		name: `Design`
	},
	{
		code: `DESAN`,
		name: `Design - Animation`
	},
	{
		code: `DESGD`,
		name: `Design - Graphic Design`
	},
	{
		code: `DESIL`,
		name: `Design - Illustration`
	},
	{
		code: `DESPH`,
		name: `Design - Photography`
	},
	{
		code: `DIGHT`,
		name: `Digital Humanities and Technology`
	},
	{
		code: `DUTCH`,
		name: `Dutch`
	},
	{
		code: `EC EN`,
		name: `Electrical and Computer Engineering`
	},
	{
		code: `ECE`,
		name: `Early Childhood Education`
	},
	{
		code: `ECON`,
		name: `Economics`
	},
	{
		code: `EDLF`,
		name: `Educational Leadership and Foundations`
	},
	{
		code: `EIME`,
		name: `Educational Inquiry, Measurement, and Evaluation`
	},
	{
		code: `EL ED`,
		name: `Elementary Education`
	},
	{
		code: `ELANG`,
		name: `English Language`
	},
	{
		code: `EMBA`,
		name: `Executive Master of Business Administration`
	},
	{
		code: `ENG T`,
		name: `Engineering Technology`
	},
	{
		code: `ENGL`,
		name: `English`
	},
	{
		code: `ENT`,
		name: `Entrepreneurial Management`
	},
	{
		code: `ESL`,
		name: `English as a Second Language`
	},
	{
		code: `ESTON`,
		name: `Estonian`
	},
	{
		code: `EUROP`,
		name: `European Studies`
	},
	{
		code: `EXDM`,
		name: `Experience Design and Management`
	},
	{
		code: `EXSC`,
		name: `Exercise Sciences`
	},
	{
		code: `FIN`,
		name: `Finance`
	},
	{
		code: `FINN`,
		name: `Finnish`
	},
	{
		code: `FLANG`,
		name: `Foreign Language Courses`
	},
	{
		code: `FNART`,
		name: `Fine Arts`
	},
	{
		code: `FREN`,
		name: `French`
	},
	{
		code: `GEOG`,
		name: `Geography`
	},
	{
		code: `GEOL`,
		name: `Geological Sciences`
	},
	{
		code: `GERM`,
		name: `German`
	},
	{
		code: `GREEK`,
		name: `Greek (Classical)`
	},
	{
		code: `GSCM`,
		name: `Global Supply Chain Management`
	},
	{
		code: `GWS`,
		name: `Global Women's Studies`
	},
	{
		code: `HAWAI`,
		name: `Hawaiian`
	},
	{
		code: `HCOLL`,
		name: `Humanities College`
	},
	{
		code: `HEB`,
		name: `Hebrew`
	},
	{
		code: `HINDI`,
		name: `Hindi`
	},
	{
		code: `HIST`,
		name: `History`
	},
	{
		code: `HLTH`,
		name: `Public Health`
	},
	{
		code: `HMONG`,
		name: `Hmong`
	},
	{
		code: `HONRS`,
		name: `Honors Program`
	},
	{
		code: `HRM`,
		name: `Human Resource Management`
	},
	{
		code: `HUNG`,
		name: `Hungarian`
	},
	{
		code: `IAS`,
		name: `International and Area Studies`
	},
	{
		code: `ICLND`,
		name: `Icelandic`
	},
	{
		code: `ICS`,
		name: `International Cinema Studies`
	},
	{
		code: `IHUM`,
		name: `Interdisciplinary Humanities`
	},
	{
		code: `INDES`,
		name: `Industrial Design`
	},
	{
		code: `INDON`,
		name: `Indonesian`
	},
	{
		code: `IP&amp;T`,
		name: `Instructional Psychology and Technology`
	},
	{
		code: `IS`,
		name: `Information Systems`
	},
	{
		code: `IT&amp;C`,
		name: `Information Technology and Cybersecurity`
	},
	{
		code: `IT`,
		name: `Information Technology`
	},
	{
		code: `ITAL`,
		name: `Italian`
	},
	{
		code: `JAPAN`,
		name: `Japanese`
	},
	{
		code: `KICHE`,
		name: `K'iche`
	},
	{
		code: `KIRIB`,
		name: `Kiribati`
	},
	{
		code: `KOREA`,
		name: `Korean`
	},
	{
		code: `LATIN`,
		name: `Latin (Classical)`
	},
	{
		code: `LATVI`,
		name: `Latvian`
	},
	{
		code: `LAW`,
		name: `Law`
	},
	{
		code: `LFSCI`,
		name: `Life Sciences`
	},
	{
		code: `LING`,
		name: `Linguistics`
	},
	{
		code: `LITHU`,
		name: `Lithuanian`
	},
	{
		code: `LT AM`,
		name: `Latin American Studies`
	},
	{
		code: `M COM`,
		name: `Management Communication`
	},
	{
		code: `MALAG`,
		name: `Malagasy`
	},
	{
		code: `MALAY`,
		name: `Malay`
	},
	{
		code: `MATH`,
		name: `Mathematics`
	},
	{
		code: `MBA`,
		name: `Business Administration`
	},
	{
		code: `ME EN`,
		name: `Mechanical Engineering`
	},
	{
		code: `MESA`,
		name: `Middle East Studies/Arabic`
	},
	{
		code: `MFGEN`,
		name: `Manufacturing Engineering`
	},
	{
		code: `MFG`,
		name: `Manufacturing`
	},
	{
		code: `MFHD`,
		name: `Marriage, Family, and Human Development`
	},
	{
		code: `MFT`,
		name: `Marriage and Family Therapy`
	},
	{
		code: `MIL S`,
		name: `Military Science`
	},
	{
		code: `MKTG`,
		name: `Marketing`
	},
	{
		code: `MMBIO`,
		name: `Microbiology and Molecular Biology`
	},
	{
		code: `MPA`,
		name: `Public Management`
	},
	{
		code: `MSB`,
		name: `Marriott School of Business`
	},
	{
		code: `MTHED`,
		name: `Mathematics Education`
	},
	{
		code: `MUSIC`,
		name: `Music`
	},
	{
		code: `NAVAJ`,
		name: `Navajo`
	},
	{
		code: `NDFS`,
		name: `Nutrition, Dietetics, and Food Science`
	},
	{
		code: `NES`,
		name: `Near Eastern Studies`
	},
	{
		code: `NEURO`,
		name: `Neuroscience`
	},
	{
		code: `NORWE`,
		name: `Norwegian`
	},
	{
		code: `NURS`,
		name: `Nursing`
	},
	{
		code: `PDBIO`,
		name: `Physiology and Developmental Biology`
	},
	{
		code: `PERSI`,
		name: `Persian`
	},
	{
		code: `PETE`,
		name: `Physical Education Teacher Education`
	},
	{
		code: `PHIL`,
		name: `Philosophy`
	},
	{
		code: `PHSCS`,
		name: `Physics and Astronomy`
	},
	{
		code: `PHY S`,
		name: `Physical Science`
	},
	{
		code: `PLANG`,
		name: `Professional Language`
	},
	{
		code: `POLI`,
		name: `Political Science`
	},
	{
		code: `POLSH`,
		name: `Polish`
	},
	{
		code: `PORT`,
		name: `Portuguese`
	},
	{
		code: `PSYCH`,
		name: `Psychology`
	},
	{
		code: `PWS`,
		name: `Plant and Wildlife Sciences`
	},
	{
		code: `QUECH`,
		name: `Quechua`
	},
	{
		code: `REL A`,
		name: `Rel A - Ancient Scripture`
	},
	{
		code: `REL C`,
		name: `Rel C - Church History and Doctrine`
	},
	{
		code: `REL E`,
		name: `Rel E - Religious Education`
	},
	{
		code: `ROM`,
		name: `Romanian`
	},
	{
		code: `RUSS`,
		name: `Russian`
	},
	{
		code: `SAMOA`,
		name: `Samoan`
	},
	{
		code: `SC ED`,
		name: `Secondary Education`
	},
	{
		code: `SCAND`,
		name: `Scandinavian Studies`
	},
	{
		code: `SFL`,
		name: `School of Family Life`
	},
	{
		code: `SLAT`,
		name: `Second Language Teaching`
	},
	{
		code: `SLOVK`,
		name: `Slovak`
	},
	{
		code: `SOC`,
		name: `Sociology`
	},
	{
		code: `SOC W`,
		name: `Social Work`
	},
	{
		code: `SPAN`,
		name: `Spanish`
	},
	{
		code: `STAC`,
		name: `Student Activities`
	},
	{
		code: `STAT`,
		name: `Statistics`
	},
	{
		code: `STDEV`,
		name: `Student Development`
	},
	{
		code: `STRAT`,
		name: `Strategic Management`
	},
	{
		code: `SWAHI`,
		name: `Swahili`
	},
	{
		code: `SWED`,
		name: `Swedish`
	},
	{
		code: `SWELL`,
		name: `Student Wellness`
	},
	{
		code: `T ED`,
		name: `Teacher Education`
	},
	{
		code: `TAGAL`,
		name: `Tagalog`
	},
	{
		code: `TAHTN`,
		name: `Tahitian`
	},
	{
		code: `TECH`,
		name: `Technology`
	},
	{
		code: `TEE`,
		name: `Technology and Engineering Education`
	},
	{
		code: `TELL`,
		name: `Teaching English Language Learners`
	},
	{
		code: `TES`,
		name: `Technology and Engineering Studies`
	},
	{
		code: `TEST`,
		name: `Test`
	},
	{
		code: `THAI`,
		name: `Thai`
	},
	{
		code: `TMA`,
		name: `Theatre and Media Arts`
	},
	{
		code: `TONGA`,
		name: `Tongan`
	},
	{
		code: `TRM`,
		name: `Therapeutic Recreation and Management`
	},
	{
		code: `TURK`,
		name: `Turkish`
	},
	{
		code: `UNIV`,
		name: `University Requirements`
	},
	{
		code: `VIET`,
		name: `Vietnamese`
	},
	{
		code: `WELSH`,
		name: `Welsh`
	},
	{
		code: `WRTG`,
		name: `Writing`
	}
]