import React, { useEffect, useState } from 'react'

// import Style, { } from './styles'

const Captcha = (props) => {

	const [checked, setChecked] = useState(false)

    useEffect(() => {

    }, [setChecked])

    const handleCheckboxChange = () => {
        setChecked(!checked)
        props.handleCaptcha(!checked)
    }

    return (
        <div style={{ width: '150px', height: '75px', display: 'flex'}}>
            <input type="checkbox" checked={checked} onClick={handleCheckboxChange}/><h3>I am not a robot</h3>
        </div>
    );
}

export default Captcha
