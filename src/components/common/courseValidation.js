let noDeptList = false
const deptList = process.env.REACT_APP_DEPT_LIST !== undefined ? process.env.REACT_APP_DEPT_LIST.split(`,`) : noDeptList = true

export const validateDept = dept => {
	if (noDeptList) return true
	else if (deptList.indexOf(dept) !== -1 || dept === ``) return true
	else return false
}

export const validateCourse = course => {
	if ((course.match(/^\d{3}[A-Z]?$/) && course.indexOf(` `) === -1) || course === ``) return true // eslint-disable-line no-extra-parens
	else return false
}

export const validateSection = section => {
	if (section.match(/^\d{3}$/) || section === ``) return true
	else return false
}
