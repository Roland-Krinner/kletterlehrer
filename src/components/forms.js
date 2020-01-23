import React, { useContext, useState } from 'react'
import { navigate } from 'gatsby'
import { Form, Col, Button } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import '../scss/__form.scss'

const onRegisterSuccess = navUrl => {
	navigate(navUrl)
}

const encode = data => {
	return Object.keys(data)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
		.join('&')
}

const RegisterForm = ({ data: { prefilledText } }) => {
	const [fieldsState, setFields] = useState({ name: '', email: '', message: prefilledText })
	const [recaptchaValue, setRecaptchaValue] = useState(null)
	const setError = text => {
		console.log(text)
	}

	const onFieldChange = e => {
		setFields({
			...fieldsState,
			[e.target.name]: e.target.value,
		})

		console.log(fieldsState)
	}

	const onSubmit = e => {
		e.preventDefault()
		const form = e.target
		const successUrl = form.getAttribute('action')

		// notificationContext.setNotification(null)
		// if (!Object.values(fieldsState).find(f => !f)) {
		// const formIsValid = true

		if (~document.location.host.indexOf('localhost')) {
			onRegisterSuccess(successUrl)
		} else {
			fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: encode({
					...fieldsState,
					'g-recaptcha-response': recaptchaValue, //must set the recaptcha field or submissions will fail (without error)
					'form-name': form.getAttribute('name'),
				}),
			})
				.then(response => {
					if (response.status === 200 && !response.redirected) {
						//netlify doesnt give an error on recaptcha fail (only 303 redirect...) :(
						onRegisterSuccess(successUrl)
					} else {
						console.log('!!!!!!!!!!! form server response: ', response)
						setError('error occurred, please try again.')
					}
				})
				.catch(err => {
					console.log('!!!!!!!!! FORM ERROR ', err)
					setError('error occurred, please try again.')
				})
		}
		// } else {
		// 	setError('please fill all fields')
		// }
	}

	return (
		<Form name="Debug Test" method="POST" data-netlify="true" data-netlify-recaptcha="true" action="/danke-fuer-die-nachricht" onSubmit={onSubmit}>
			<input type="hidden" name="form-name" value="Debug Test" />
			<Form.Row>
				<Form.Group as={Col} xs={12} md={6} lg={12} controlId="formName" className="mb-2">
					<Form.Label className="h6 text-gray-800 mb-1">Name</Form.Label>
					<Form.Control type="text" placeholder="Name" name="name" onChange={onFieldChange} />
				</Form.Group>
				<Form.Group as={Col} xs={12} md={6} lg={12} controlId="formEmail" className="mb-2">
					<Form.Label className="h6 text-gray-800 mb-1">E-Mail</Form.Label>
					<Form.Control type="email" placeholder="E-Mail Adresse" name="email" onChange={onFieldChange} />
				</Form.Group>
			</Form.Row>
			<Form.Group controlId="formTextarea" className="mb-md-20 mb-lg-4">
				<Form.Label className="h6 text-gray-800 mb-1">Nachricht</Form.Label>
				<Form.Control as="textarea" rows="3" placeholder="Nachricht" name="message" onChange={onFieldChange} />
			</Form.Group>
			<Form.Group className="mb-md-20 mb-lg-4">
				<div className="recaptcha-wrapper">
					<ReCAPTCHA sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY} onChange={setRecaptchaValue} />
				</div>
			</Form.Group>
			<Button variant="success" type="submit" className="btn-sm btn-submit btn-block">
				{/* Nachricht senden <i className="fe fe-send ml-2"></i> */}
				Nachricht senden
			</Button>
		</Form>
	)
}

export { RegisterForm }
