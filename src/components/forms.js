import React, { useState, useEffect, useContext } from 'react'
import { navigate } from 'gatsby'
import { Form, Col, Button } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import { utils } from '../utils'
import Styles from './forms.module.scss'

const textMuted = utils.getColor('textMuted')

const onRegisterSuccess = navUrl => {
	navigate(navUrl)
}

const encode = data => {
	return Object.keys(data)
		.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
		.join('&')
}

const RegisterForm = ({ data: { prefilledText, lgCol } }) => {
	const dispatch = useContext(GlobalDispatchContext)

	// independent states
	const [fieldValue, setFields] = useState({ name: '', email: '', message: prefilledText })
	const [fieldsValidation, setFieldsValidation] = useState({ name: 'secondary', email: 'secondary', message: 'secondary' })
	const [recaptchaValue, setRecaptchaValue] = useState(null)

	// dependent states
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
			validationFinished: false,
			errors: [],
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
					msg = 'Bitte eine gültige E-Mail Adresse angeben'
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
		setFormData(oldObj => {
			return { ...oldObj, errors: errors, validationFinished: true }
		})
	}, [formData.toggleSubmit, formData.submitted, fieldValue, recaptchaValue])

	useEffect(() => {
		dispatch({
			type: 'UPDATE_NOTIFICATION',
			notificationVisible: (formData.errors && formData.errors.length > 0) || false,
			messages: formData.errors || [],
		})
	}, [formData.errors])

	useEffect(() => {
		if (formData.submitted && formData.validationFinished && formData.errors && formData.errors.length === 0) {
			if (~document.location.host.indexOf('localhost')) {
				onRegisterSuccess(formData.successUrl)
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
							setFormData(oldObj => {
								return { ...oldObj, errors: ['Ein Fehler ist aufgetreten, bitte nochmal versuchen.'] }
							})
						}
					})
					.catch(err => {
						setFormData(oldObj => {
							return { ...oldObj, errors: ['Ein Fehler ist aufgetreten, bitte nochmal versuchen.'] }
						})
					})
			}
		}
	}, [formData.validationFinished])

	const lgColName = lgCol || 5
	const lgColEmail = lgCol || 7

	return (
		<Form name="Debug Test" method="POST" data-netlify="true" data-netlify-recaptcha="true" action="/danke-fuer-die-nachricht" onSubmit={onSubmit} noValidate>
			<input type="hidden" name="form-name" value="Debug Test" />
			<Form.Row>
				<Form.Group as={Col} xs={12} md={12} lg={lgColName} controlId="formName" className="mb-2">
					<Form.Label className={`h6 no-select mb-1 ${textMuted}`}>Name (Pflichtfeld)</Form.Label>
					<Form.Control type="text" placeholder="Name" name="name" spellCheck="false" onChange={onFieldChange} className={`border-${fieldsValidation.name} ${Styles.formControl}`} />
				</Form.Group>
				<Form.Group as={Col} xs={12} md={12} lg={lgColEmail} controlId="formEmail" className="mb-2">
					<Form.Label className={`h6 no-select mb-1 ${textMuted}`}>E-Mail (Pflichtfeld)</Form.Label>
					<Form.Control type="email" placeholder="E-Mail Adresse" name="email" spellCheck="false" onChange={onFieldChange} className={`border-${fieldsValidation.email} ${Styles.formControl}`} />
				</Form.Group>
			</Form.Row>
			<Form.Group controlId="formTextarea" className="mb-2">
				<Form.Label className={`h6 no-select mb-1 ${textMuted}`}>Nachricht (Pflichtfeld)</Form.Label>
				<Form.Control as="textarea" rows="3" placeholder="Nachricht" name="message" spellCheck="false" value={fieldValue.message} onChange={onFieldChange} className={`border-${fieldsValidation.message} ${Styles.formControl}`} />
			</Form.Group>
			<Form.Group className="mb-4">
				<Form.Label className={`h6 no-select mb-1 ${textMuted}`}>reCAPTCHA (Pflichtfeld)</Form.Label>
				<div className={`${Styles.recaptchaWrapper}`}>
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
