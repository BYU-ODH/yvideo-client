import React, { PureComponent } from 'react';

export class Feedback extends PureComponent {

	/*
			TODO: Work on style. Form style. Alert style.
	*/

	render(){

		const {
			email,
			name,
			title,
			body,
			file,
		} =  this.props.viewstate

		const {
			setFile,
			setBody,
			setTitle,
			setEmail,
			setName,
			handleCaptcha,
			handleSubmit,
		} =  this.props.handlers

    return (
        <div>
            <form className="test-mailing" onSubmit={handleSubmit}>
                <h1>Form</h1>
                <input type="text" placeholder="Name" required onChange={ e => setName(e.target.value)}/><br/>
                <input type="email" placeholder="Your Email" required onChange={ e => setEmail(e.target.value)}/><br/>
                <input type="text" placeholder="Subject" required onChange={ e => setTitle(e.target.value)}/>
                <div>
                <textarea
                    id="feedback-body"
                    onChange={e => setBody(e.target.value)}
                    placeholder="Type your feedback or message for the admins to see"
                    required
                    value={body}
                    style={{width: '100%', height: '150px'}}
                />
                </div>
                <input type="file" accept={".jpg,.jpeg"} onChange={e => setFile({type: e.target.files[0].type, attachment: e.target.files[0]})}/>
                {/* <Captcha handleCaptcha={handleCaptcha}/> */}
                <input type="submit" value="Submit" className="btn btn--submit"  />
            </form>
        </div>
    );
	}
}


export default Feedback
