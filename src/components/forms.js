import React, { useState, useContext, useEffect, useRef } from 'react'
// import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { Form, Col, Button } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import { Context as NotificationContext } from '../context/context'
import '../scss/__form.scss'

const onRegisterSuccess = navUrl => {
	navigate(navUrl)
}

const encode = data => {
	return Object.keys(data)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
		.join('&')
}

const submitForm = (formData, fieldValue, recaptchaValue, notificationContext) => {
	if (~document.location.host.indexOf('localhost')) {
		onRegisterSuccess(formData.successUrl)
		// console.log('success -> redirect')
	} else {
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				...fieldValue,
				'g-recaptcha-response': recaptchaValue, // must set the recaptcha field or submissions will fail (without error)
				'form-name': formData.form.getAttribute('name'),
			}),
		})
			.then(response => {
				if (response.status === 200 && !response.redirected) {
					// netlify doesnt give an error on recaptcha fail (only 303 redirect...) :(
					onRegisterSuccess(formData.successUrl)
				} else {
					//console.log('!!!!!!!!!!! form server response: ', response)
					notificationContext.current.setNotificationData({
						showNotification: true,
						messages: ['Ein Fehler ist aufgetreten, bitte nochmal versuchen.'],
					})
				}
			})
			.catch(err => {
				// console.log('!!!!!!!!! FORM ERROR ', err)
				notificationContext.current.setNotificationData({
					showNotification: true,
					messages: ['Ein Fehler ist aufgetreten, bitte nochmal versuchen.'],
				})
			})
	}
}

const RegisterForm = ({ data: { prefilledText } }) => {
	const notificationContext = useRef(useContext(NotificationContext))

	const [fieldValue, setFields] = useState({ name: '', email: '', message: prefilledText })
	const [fieldsValidation, setFieldsValidation] = useState({ name: 'secondary', email: 'secondary', message: 'secondary' })
	const [recaptchaValue, setRecaptchaValue] = useState(null)
	const [errorMessages, setErrorMessages] = useState(null)
	const [formData, setFormData] = useState({})

	const onFieldChange = e => {
		setFields({
			...fieldValue,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = e => {
		e.preventDefault()
		setFormData({
			form: e.target,
			successUrl: e.target.getAttribute('action'),
			submitted: true,
			toggleSubmit: typeof formData.toggleSubmit === 'undefined' ? true : !formData.toggleSubmit,
		})
	}

	useEffect(() => {
		if (!formData.submitted) {
			return
		}
		let errors = []
		for (const key in fieldValue) {
			let reg = /[a-z]/
			let msg = ''
			switch (key) {
				case 'name':
					reg = /^.+$/
					msg = 'Bitte einen Namen angeben'
					break
				case 'email':
					reg = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					msg = 'Bitte gültige E-Mail Adresse angeben'
					break
				case 'message':
					reg = /^.+$/
					msg = 'Bitte eine Nachricht angeben'
					break
				default:
					break
			}
			if (!reg.test(fieldValue[key].trim())) {
				errors.push(msg)
				setFieldsValidation(oldObj => {
					return { ...oldObj, [key]: 'danger' }
				})
			} else {
				setFieldsValidation(oldObj => {
					return { ...oldObj, [key]: 'secondary' }
				})
			}
		}
		if (recaptchaValue === null) {
			errors.push('Bitte reCAPTCHA bestätigen')
		}
		setErrorMessages(errors)
	}, [formData.toggleSubmit, formData.submitted, fieldValue, recaptchaValue])

	useEffect(() => {
		notificationContext.current.setNotificationData({
			showNotification: errorMessages && errorMessages.length > 0,
			messages: errorMessages,
		})
	}, [errorMessages])

	useEffect(() => {
		if (errorMessages && errorMessages.length === 0) {
			submitForm(formData, fieldValue, recaptchaValue, notificationContext)
		}
	}, [formData.toggleSubmit])

	//const xxx__onSubmit = e => {
	// e.preventDefault()

	// setFormSubmitted(true)
	// setToggleSubmit(!toggleSubmit)

	// const form = e.target
	// const successUrl = form.getAttribute('action')

	// // setFormData({
	// // 	form: form,
	// // 	successUrl: successUrl,
	// // })

	// if (!formIsValid) {
	// 	return
	// }

	// console.log('form is valid?')
	// return
	// if (!validateForm()) {
	// 	return
	// }
	// 		if (~document.location.host.indexOf('localhost')) {
	// 			onRegisterSuccess(successUrl)
	// 		} else {
	// 			fetch('/', {
	// 				method: 'POST',
	// 				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	// 				body: encode({
	// 					...fieldValue,
	// 					'g-recaptcha-response': recaptchaValue, // must set the recaptcha field or submissions will fail (without error)
	// 					'form-name': form.getAttribute('name'),
	// 				}),
	// 			})
	// 				.then(response => {
	// 					if (response.status === 200 && !response.redirected) {
	// 						// netlify doesnt give an error on recaptcha fail (only 303 redirect...) :(
	// 						onRegisterSuccess(successUrl)
	// 					} else {
	// 						// console.log('!!!!!!!!!!! form server response: ', response)
	// 						setNotificationData({
	// 							showNotification: true,
	// 							messages: ['Ein Fehler ist aufgetreten, bitte nochmal versuchen.'],
	// 						})
	// 					}
	// 				})
	// 				.catch(err => {
	// 					// console.log('!!!!!!!!! FORM ERROR ', err)
	// 					setNotificationData({
	// 						showNotification: true,
	// 						messages: ['Ein Fehler ist aufgetreten, bitte nochmal versuchen.'],
	// 					})
	// 				})
	// 		}
	// 	}

	return (
		<Form name="Debug Test" method="POST" data-netlify="true" data-netlify-recaptcha="true" action="/danke-fuer-die-nachricht" onSubmit={onSubmit} noValidate>
			<input type="hidden" name="form-name" value="Debug Test" />
			<Form.Row>
				<Form.Group as={Col} xs={12} md={6} lg={12} controlId="formName" className="mb-2">
					<Form.Label className="h6 text-gray-800 mb-1">Name (Pflichtfeld)</Form.Label>
					<Form.Control type="text" placeholder="Name" name="name" spellCheck="false" onChange={onFieldChange} className={'border-' + fieldsValidation.name} />
				</Form.Group>
				<Form.Group as={Col} xs={12} md={6} lg={12} controlId="formEmail" className="mb-2">
					<Form.Label className="h6 text-gray-800 mb-1">E-Mail (Pflichtfeld)</Form.Label>
					<Form.Control type="email" placeholder="E-Mail Adresse" name="email" spellCheck="false" onChange={onFieldChange} className={'border-' + fieldsValidation.email} />
				</Form.Group>
			</Form.Row>
			<Form.Group controlId="formTextarea" className="mb-md-20 mb-lg-4">
				<Form.Label className="h6 text-gray-800 mb-1">Nachricht (Pflichtfeld)</Form.Label>
				<Form.Control as="textarea" rows="3" placeholder="Nachricht" name="message" spellCheck="false" value={fieldValue.message} onChange={onFieldChange} className={'border-' + fieldsValidation.message} />
			</Form.Group>
			<Form.Group className="mb-md-20 mb-lg-4 recaptcha-form-group">
				<div className="recaptcha-wrapper">
					<ReCAPTCHA sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY} onChange={setRecaptchaValue} />
				</div>
			</Form.Group>
			<Button variant="success" type="submit" className="btn-sm btn-submit btn-block">
				Nachricht senden
			</Button>
		</Form>
	)
}

export { RegisterForm }

// const validateForm = () => {
// 	let errorMessages = []
// 	const tempFields = { ...fieldsValidation }
// 	for (const key in fieldValue) {
// 		let reg = /[a-z]/
// 		let msg = ''
// 		switch (key) {
// 			case 'name':
// 				reg = /^.+$/
// 				msg = 'Bitte einen Namen angeben'
// 				break
// 			case 'email':
// 				reg = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// 				msg = 'Bitte gültige E-Mail Adresse angeben'
// 				break
// 			case 'message':
// 				reg = /^.+$/
// 				msg = 'Bitte eine Nachricht angeben'
// 				break
// 			default:
// 				break
// 		}
// 		if (!reg.test(fieldValue[key].trim())) {
// 			errorMessages.push(msg)
// 			tempFields[key] = 'danger'
// 		} else {
// 			tempFields[key] = 'secondary'
// 		}
// 	}

// 	if (recaptchaValue === null) {
// 		errorMessages.push('Bitte reCAPTCHA bestätigen')
// 	}

// 	// set border colors from temp obj
// 	setFieldsValidation({
// 		...tempFields,
// 	})

// 	setNotificationData({
// 		showNotification: errorMessages.length > 0,
// 		messages: errorMessages,
// 	})

// 	return errorMessages.length === 0
// }

// useEffect(() => {
// 	if (formSubmitted) {
// 		validateForm()
// 	}
// }, [fieldValue, formSubmitted, recaptchaValue]) // validate form onSubmit, input change, ReCAPTCHA change
